//useEffect carrega os itens, dispara uma ação qundo entra na tela, ou quando muda alguma informação
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Constants from 'expo-constants';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg'; //permite carregar um svg externo
import api from '../../services/api';
import * as Location from 'expo-location'; //pacote de geolocalizacao

//sempre que armazenamos um vetor no estado temos que informar o formato desse vetor
interface item {
  id: number;
  title: string;
  image_url: string;
}

interface Point {
  id: number;
  name: string;
  image: string;
  image_url: string;
  latitude: number;
  longitude: number;
}

interface ParamsHome {
  uf: string;
  city: string;
}

const Points = () => {
  // <item[]> composto por um array com o formato item
  const [items, setItems] = useState<item[]>([]); //como é mais de um item, entra no array
  const [points, setPoints] = useState<Point[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]); //array numérico só dos ids

  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]); //array numérico só dos ids

  const navigation = useNavigation();

  const route = useRoute();

  const routeParamsHome = route.params as ParamsHome;

  useEffect(() => {
    async function loadPosition() {
      //pedir permissão para o usuário para acessarmos a localização dele
      //retorna um objeto com a propriedade status
      const { status } = await Location.requestPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Oooops....',
          'Precisamos de sua permissão para obter a sua localização'
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync(); //traz a localização do usuário
      const { latitude, longitude } = location.coords;

      setInitialPosition([latitude, longitude]);
    }

    loadPosition();
  });

  useEffect(() => {
    api.get('items').then((response) => {
      setItems(response.data);
    });
  }, []);

  useEffect(() => {
    // essa chamada é executada toda vez que o usuário selecionar ou desmarcar um item
    api
      .get('points', {
        //pega do query params
        params: {
          city: routeParamsHome.city,
          uf: routeParamsHome.uf,
          items: selectedItems,
        },
      })
      .then((response) => {
        setPoints(response.data);
      });
  }, [selectedItems]); //por isso o selectedItem é passado como parâmetro

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleNavigateToDetail(id: number) {
    // esse objeto é passado como parâmetro para próxima rota
    navigation.navigate('Detail', { point_id: id });
  }

  function handleSelectItem(id: number) {
    //findIndex retorna um número igual ou acima de zero se ele ja estiver dentro do array
    const alreadySelected = selectedItems.findIndex((item) => item === id);

    //se tiver igual ou acima de zero ele remove
    if (alreadySelected >= 0) {
      //selecionando os itens diferentes do id atual
      const filteredItems = selectedItems.filter((item) => item !== id);
      setSelectedItems(filteredItems);
    } else {
      //adiciona
      //aproveitar o que já tem dentro do selectedItems, e colocar o id novo que eu to querendo selecionar
      setSelectedItems([...selectedItems, id]);
    }
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <Text style={styles.title}>Bem vindo.</Text>
        <Text style={styles.description}>
          Encontre no mapa um ponto de coleta.
        </Text>

        {/* border radius só funciona nas views */}
        <View style={styles.mapContainer}>
          {initialPosition[0] !== 0 && (
            <MapView
              style={styles.map}
              loadingEnabled={initialPosition[0] === 0}
              initialRegion={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
                latitudeDelta: 0.3,
                longitudeDelta: 0.3,
              }}
            >
              {points.map((point) => (
                <Marker
                  key={String(point.id)}
                  onPress={() => handleNavigateToDetail(point.id)}
                  coordinate={{
                    latitude: point.latitude,
                    longitude: point.longitude,
                    // sempre que uma função recebe um parâmetro colocamos uma arrow function
                  }}
                >
                  <View style={styles.mapMarkerContainer}>
                    {/* quando a imagem é externa precisa dessa propriedade uri */}
                    <Image
                      style={styles.mapMarkerImage}
                      source={{ uri: point.image_url }}
                    />
                    <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                  </View>
                </Marker>
              ))}
            </MapView>
          )}
        </View>
      </View>
      <View style={styles.itemsContainer}>
        {/* showsHorizontalScrollIndicator sem a barra aparecendo */}
        {/* contentContainerStyle entende-se como parte do conteudo */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 25 }}
        >
          {items.map((item) => (
            // transformamos em arrow function para a função não sair executando assim que o app for startado
            <TouchableOpacity
              key={String(item.id)}
              activeOpacity={0.5}
              // React native suporta vetores com vários estilos
              style={[
                styles.item,
                selectedItems.includes(item.id) ? styles.selectedItem : {},
              ]}
              onPress={() => handleSelectItem(item.id)}
            >
              <SvgUri width={42} height={42} uri={item.image_url} />
              <Text style={styles.itemTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  title: {
    fontSize: 20,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Roboto_400Regular',
  },

  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  mapMarker: {
    width: 90,
    height: 80,
  },

  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: '#34CB79',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover',
  },

  mapMarkerTitle: {
    flex: 1,
    fontFamily: 'Roboto_400Regular',
    color: '#FFF',
    fontSize: 13,
    lineHeight: 23,
  },

  itemsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 32,
  },

  item: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#eee',
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',

    textAlign: 'center',
  },

  selectedItem: {
    borderColor: '#34CB79',
    borderWidth: 2,
  },

  itemTitle: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    fontSize: 13,
  },
});

export default Points;
