import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

import './styles.css';

interface Props {
  onFileUploaded: (file: File) => void; //função que recebe um arquivo e retorna void, ou seja, não tem retorno
}

const Dropzone: React.FC<Props> = (props) => {
  //no parametro poderia ser desestruturado também {onFileUploaded}
  const [selectedFileUrl, setSelectedFileUrl] = useState(''); //começa com valor vazio

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]; //como tenho apenas um arquivo estará sempre na posição 0

    const fileUrl = URL.createObjectURL(file); //criando url desse arquivo

    setSelectedFileUrl(fileUrl);
    props.onFileUploaded(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*', //o que não for imagem deixa cinza 'apagado'
  });

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />
      {selectedFileUrl ? (
        <img src={selectedFileUrl} alt="Point thumbnail" />
      ) : (
        <p>
          <FiUpload />
          Imagem do estabelecimento
        </p>
      )}
    </div>
  );
};

export default Dropzone;
