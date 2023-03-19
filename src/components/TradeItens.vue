<template>
  <div>
    <!-- Coin Select -->
    <label for="coin-select">Select a coin:</label>
    <select id="coin-select" v-model="selectedCoin">
      <option v-for="(coin, index) in coins" :key="index" :value="coin">{{ coin }}</option>
    </select>

    <!-- Date Range -->
    <form>
      <label for="dataEntrada">Initial Date:</label>
      <input type="date" id="dataEntrada" v-model="dataEntrada">

      <label for="dataSaida">End Date:</label>
      <input type="date" id="dataSaida" v-model="dataSaida">

      <button @click.prevent="buscarDados">Search Datas</button>
    </form>

    <!-- Table -->
    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Price</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(quote, key) in quotes" :key="key">
            <td>{{ selectedCoin }}</td>
            <td>{{ formatDate(quote.date) }}</td>
            <td>{{ quote.price }}</td>
            <td>{{ quote.amount }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { coins } from '../utils/arrayCoins.js';
import api from '../server/api.js';

export default {
  data() {
    const today = new Date().toISOString().substr(0, 10); // obter a data atual no formato ISO yyyy-MM-dd
    return {
      coins: Object.keys(coins[0]),
      selectedCoin: 'BTC',
      dataEntrada: today, // definir a data de entrada como a data atual
      dataSaida: '',
      quotes: null,
    };
  },

  methods: {
    buscarDados() {
      const dataEntrada = new Date(this.dataEntrada).getTime() / 1000;
      const dataSaida = new Date(this.dataSaida).getTime() / 1000;

      api.coins(this.selectedCoin, dataEntrada, dataSaida).then((response) => {
        this.quotes = response.data;
      });
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date * 1000).toLocaleDateString('en-US', options);
    },
  },
};
</script>

<style>
.table-container {
  max-height: 500px;
  overflow: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

.table th {
  background-color: #f2f2f2;
  font-weight: bold;
}
</style>