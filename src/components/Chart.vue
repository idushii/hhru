<template>
  <div class="chart">
    <h2>График</h2>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { load, endpoints } from "../api";

@Component
export default class Items extends Vue {
  @Prop() private keywords!: string[];

  Result = [];
  async mounted() {
    
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
