
import './App.css';
import {FiSearch} from  'react-icons/fi'
import { useState } from 'react';
import api from './sources/api';

function App() {
  const [inputBarra, setInputBarra] = useState('');
  const [cep, setCep] = useState({});

  async function buscarCep(){
    if(inputBarra === ''){
      alert("Insira o CEP!");
      return;
    }
    else{
      try{
        const response = await api.get(`${inputBarra}/json`);
        setCep(response.data);
        setInputBarra('');
      }
      catch{
        alert("ERRO!");
        setInputBarra('');
      }
    }

  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>
      <div className="containerInput">
        <input type="text" placeholder="Digite o CEP" value={inputBarra} onChange={(e) => setInputBarra(e.target.value)}/>
        <button className="buttonSearch" onClick={buscarCep}><FiSearch size={25} color="white"/></button>
      </div>
      {Object.keys(cep).length > 0 && (
      <main className="info">
        <h2>CEP: {cep.cep}</h2>
        <span>Logradouro: {cep.logradouro} </span>
        <span>Complemento: {cep.complemento}</span>
        <span>Bairro: {cep.bairro}</span>
        <span>Localidade: {cep.localidade}</span>
        <span>UF: {cep.uf}</span>
      </main> 
      )}
      
    </div>
  );
}

export default App;
