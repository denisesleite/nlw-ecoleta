import React from 'react';
//forma mais facil de informar ao componente quais sao as props que ele pode receber
//FC - Function Component

interface HeaderProps {
    //obrigatório sem nada
    //não obrigatório com ponto de interrogação
    title: string;
}

//Estado armazenar informação apartir do componente, informações mantidas pelo próprio componente

const Header: React.FC<HeaderProps> = (props) => {
    return (
        <header>
            <h1>{props.title}</h1>
        </header>
    )
}

export default Header;