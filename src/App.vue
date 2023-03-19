<template>
  <div>
    <TradeItens />
  </div>
</template>

<script>
import TradeItens from './components/TradeItens.vue';
import api from './server/api.js';

export default {
  components: { TradeItens },
  data() {
    return {
      selectedCoin: 'BTC',
      quotes: null,
    };
  },
  methods: {
    setSelectedCoin(coin) {
      this.selectedCoin = coin;
    },
    buscarDados(dataEntrada, dataSaida) {
      const url = `/${this.selectedCoin}/trades/${dataEntrada}/${dataSaida}/`;

      api.coins(url).then((response) => {
        this.quotes = response.data;
      });
    },
  },
};
</script>

<style>
</style>
