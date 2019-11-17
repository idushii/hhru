<template>
  <div class="chart">
    <canvas id="myChart" width="400" height="200"></canvas>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { load, endpoints, defaultParams, getUrl } from '../api';

const Chart = require('chart.js');

import { mapState } from 'vuex';

@Component
export default class MyChart extends Vue {
  @Prop() private keywords!: string[];

  get items() {
    return this.$store.getters['items/items'];
  }

  get Values(): number[] {
    const result: number[] = [];
    for (const text of this.keywords) {
      const url = getUrl(endpoints.vacancies, { ...defaultParams, text });
      if (this.items[url]) { result.push(this.items[url].found); }
    }
    return result;
  }

  @Watch('Values')
  public ff() {
    console.log('Values');
    this.draw();
  }

  public async draw() {
    const ctx = document.getElementById('myChart');

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.keywords,
        datasets: [
          {
            label: '# of Votes',
            data: this.Values,
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
