import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom'; //useHistory permite navegar de um componente para outro sem ter um botão, só através de uma linha de código.
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet'; //biblioteca JS para mapas iterativos
import axios from 'axios'; //usado para consumir apis
import { LeafletMouseEvent } from 'leaflet';
import api from '../../services/api';

import './styles.css';
import '../Components/Modal/styles.css'

import logo from '../../assets/logo.svg';

import ModalComponent from '../Components/Modal';

// Quando cria um estado pra um array ou objeto temos que manualmente informar o tipo de variável que será armazenada ali dentro
interface Item{
    id: number,
    title: string,
    image_url: string
} 

interface IBGEUFResponse{
    sigla: string;
}

interface IBGECityResponse{
    nome: string;
}

const CreatePoint = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
    });

    const [selectedUf, setSelectedUf] = useState('0'); //Armazena qual uf o usuário selecionou, e o valor 0 é o mesmo da option que não tem conteúdo nenhum ainda
    const [selectedCity, setSelectedCity] = useState('0'); 
    const [selectedItems, setSelectedItems] = useState<number[]>([]); //começa com array vazio, o usuário vai selecionar id do item 

    // const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);

    const [openModal, setOpenModal] = useState(false);
    
    const history = useHistory();

    //Disparado uma única vez com segundo parâmetro vazio, independente de quantas vezes o componente CreatePoint mude
    useEffect(() => {
        api.get("items").then(response => {
            setItems(response.data);
        });
    }, []);

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const ufInitials = response.data.map(uf => uf.sigla);
            setUfs(ufInitials);
        });
    }, []);
    
    useEffect(() => {
        if (selectedUf === '0'){
            return;
        }

        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios/`).then(response => {
            const cityNames = response.data.map(city => city.nome);
            setCities(cityNames);
        });
    }, [selectedUf]);

    useEffect(() => {
        //api do navegador trazendo a posição atual da localização
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setInitialPosition([latitude, longitude]);
        });
    });

    //esse event recebe a uf que o usuário selecionou
    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>){
        const uf = event.target.value;
        console.log(uf);

        setSelectedUf(uf);
    }
    
    //esse event recebe a city que o usuário selecionou
    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>){
        const city = event.target.value;
        console.log(city);

        setSelectedCity(city);
    }

    function handleMapClick(event: LeafletMouseEvent){
        console.log(event.latlng);
        setInitialPosition([
            event.latlng.lat,
            event.latlng.lng,
        ])
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        console.log(event.target);

        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    }

    function handleSelectItem(id: number){
        //findIndex retorna um número acima de zero ou igual se ele ja tiver dentro do array
        const alreadySelected = selectedItems.findIndex(item => item === id); 
        
        //se tiver igual ou acima de zero ele remove
        if(alreadySelected >= 0){
            //selecionando os itens diferentes do id atual
            const filteredItems = selectedItems.filter(item => item !== id);
            setSelectedItems(filteredItems);
        }else{
            //adiciona
            //aproveitar o que já tem dentro do selectedItems, e colocar o id novo que eu to querendo selecionar
            setSelectedItems([...selectedItems, id]);
        }
    }

    async function handleSubmit(event: FormEvent){
        event.preventDefault();

        const { name, email, whatsapp } = formData;
        const uf = selectedUf;
        const city = selectedCity;
        const [latitude, longitude] = initialPosition;
        const items = selectedItems;

        const data = {
            name,
            email,
            whatsapp,
            uf,
            city,
            latitude,
            longitude,
            items
        };

        //segundo parâmetro vai o data para criar esse ponto
        const feedback = await api.post('points', data);

        console.log(feedback);

        if(feedback.status === 200){
            console.log('Ponto de coleta criado!');
            setOpenModal(true);
        }

        setTimeout(function(){
            history.push('/');
        }, 3000);
    }
    
    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta"/>
            
            <Link to="/">
                <FiArrowLeft />
                Voltar para home
            </Link>
            </header>

            <form onSubmit={handleSubmit}>
                <h1>Cadastro do<br/>
                ponto de coleta</h1>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input type="text"
                            name="name"
                            id="name"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="name">E-mail</label>
                            <input type="email"
                            name="email"
                            id="email"
                            onChange={handleInputChange}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input type="text"
                            name="whatsapp"
                            id="name"
                            onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    {/* primeira posição do array latitude e segunda longitude */}
                    <Map center={initialPosition} zoom={14} onClick={handleMapClick}>
                        {/* TileLayer é o design que será utilizado */}
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker position={initialPosition}/>
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado(UF)</label>
                            <select name="uf" id="uf" value={selectedUf} onChange={handleSelectUf}>
                                <option value="0">Selecione uma UF</option>
                                {ufs.map(uf => (
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="uf">Cidade</label>
                            <select name="city" id="city" value={selectedCity} onChange={handleSelectCity}>
                                <option value="0">Selecione uma cidade</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Ítens de coleta</h2>
                        <span>Selecione um ou mais ítens abaixo</span>
                    </legend>
                    
                    <ul className="items-grid">
                        {items.map(item => (
                            //sempre que eu quiser passar um parâmetro pra função eu crio uma arrow function
                            <li key={item.id} 
                            onClick={() => handleSelectItem(item.id)}
                            className={selectedItems.includes(item.id) ? 'selected' : ''}>
                                <img src={item.image_url} alt={item.title}/>
                                <span>{item.title}</span>
                            </li>
                        ))}
                    </ul>
                </fieldset>

                <button type="submit">Cadastrar ponto de coleta</button>
            </form>

            {/* <div className={!openModal ? 'hide modal-success' : 'show modal-success'}>
                <div className="conteudo-modal">
                    <div>
                        <FiCheckCircle color="#34CB79" size={40} />
                    </div>
                    <h1>Cadastro concluído!</h1>
                </div>
            </div> */}

            <ModalComponent className={!openModal ? 'hide modal-success' : 'show modal-success'} />
        </div>
    )
}

export default CreatePoint;