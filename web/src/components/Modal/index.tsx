import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import './styles.css';

interface Props {
  className?: string;
}

function ModalComponent(props: Props) {
  //essa função é um componente do tipo????? = div
  return (
    <div className={props.className}>
      <div className="conteudo-modal">
        <div>
          <FiCheckCircle color="#34CB79" size={40} />
        </div>
        <h1>Cadastro Concluido!</h1>
      </div>
    </div>
  );
}

export default ModalComponent;
