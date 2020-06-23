import React, {useState} from 'react';
import './App.css';
import Header from './Header-introducao-react';

function AppIntroducao() {
  //imutabilidade nunca se pode alterar uma forma/valor do estado de maneira direta, se cria um novo valor pra esse estado com as modificações desejadas
  const [counter, setCounter] = useState(0); //retorna array [valor do estado, função pra atualizar o valor do estado]

  function handleButtonClick(){
    setCounter(counter + 1);
  }
  
  return (
    <div>
      <Header title="Hello World" />

    <h1>{counter}</h1>
    <button type="button" onClick={handleButtonClick}>Aumentar</button>
    </div>
  );
}

export default AppIntroducao;
