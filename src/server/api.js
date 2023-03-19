import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.mercadobitcoin.net/api',
});

export default {
    coins(coin, dataEntrada, dataSaida) {
      const url = `/${coin}/trades/${dataEntrada}/${dataSaida}/`;
      return api.get(url);
    },
  };
