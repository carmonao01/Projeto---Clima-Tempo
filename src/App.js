import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

async function recarregarPagina(){
  window.location.reload(true);
}

//Constantes criadas para declarar localização e clima
function App() {
  const [localizacao, setarLocalizacao] = useState(false);
  const [clima, setarClima] = useState(false);
//Função que utiliza o axios para obter os parametros e permitindo a utilização da API
let obterClima = async (lat, long) => {
  let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
    params: {
      lat: lat,
      lon: long,
      appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
      lang: 'pt',
      units: 'metric'
    }
  });
  setarClima(res.data);
}

  useEffect(()=> {
    navigator.geolocation.getCurrentPosition((posicao)=> {
      obterClima(posicao.coords.latitude, posicao.coords.longitude);
      setarLocalizacao(true)
    })
  }, [])
//If-Else para decidir qual imagem aparecerá no site
if(localizacao == false){
    return (
      <Fragment>
        Habilite as permissões de localização do Browser
      </Fragment>
    )
  } else if (clima == false) {
    return (
      <Fragment>
        Carregando o clima...
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <h3>Clima de seu Local ({clima['weather'][0]['description']})</h3>
        <hr/>
        <ul>
          <li>Temperatura atual: {clima['main']['temp']}°</li>
          <li>Temperatura máxima: {clima['main']['temp_max']}°</li>
          <li>Temperatura minima: {clima['main']['temp_min']}°</li>
          <li>Pressão: {clima['main']['pressure']} hpa</li>
          <li>Humidade: {clima['main']['humidity']}%</li>
        </ul>
        <button type='button' onClick={recarregarPagina}>
          Recarregar a página
        </button>
        <hr/>
      </Fragment>
    );
  }
}

export default App;