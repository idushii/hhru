<template>
  <div class="chart">
    <canvas id="myChart" width="400" height="200"></canvas>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { load, endpoints, defaultParams, getUrl } from "../api";

var Chart = require("chart.js");

import { mapState } from "vuex";

@Component
export default class MyChart extends Vue {
  @Prop() private keywords!: string[];

  get items() {
    return this.$store.getters["items/items"];
  }

  get Values(): number[] {
    let result: number[] = [];
    for (let text of this.keywords) {
      let url = getUrl(endpoints.vacancies, { ...defaultParams, text });
      if (this.items[url]) result.push(this.items[url].found);
    }
    return result;
  }

  @Watch("Values")
  ff() {
    console.log("Values");
    this.draw();
  }

  async draw() {
    var ctx = document.getElementById("myChart");

    var myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: this.keywords,
        datasets: [
          {
            label: "# of Votes",
            data: this.Values,
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
