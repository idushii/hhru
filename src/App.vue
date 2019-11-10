<template>
  <div id="app">
    <Chart :keywords="keywords" />
    <Items
      @showAll="show(index)"
      :isShowAll="showIndex == index"
      v-for="(item, index) in keywords"
      :search="item"
      :key="`item${item}`"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Chart from "@/components/Chart";
import Items from "@/components/Items.vue";

@Component({
  data: () => ({
    //keywords: ["VueJS"],
    keywords: ["VueJS", "ReactJS", "Angular", "TypeScript", "Dart"],
    showIndex: null
  }),
  methods: {
    show(index) {
      if (this.showIndex == index) this.showIndex = null;
      else this.showIndex = index;
    }
  },
  components: {
    Items,
    Chart,
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
</style>
