<template>
  <div class="item">
    <h3>{{name}}</h3>
    <div v-if="address">{{address.city}}</div>
    <div v-if="snippet">
      <div v-html="snippet.requirement" />
      <div v-html="snippet.responsibility" />
    </div>
    <a :href="alternate_url" target="_blank">Ссылка</a>
    <div v-if="false">{{item}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

interface IAddress {
  city: string;
}

interface ISnippet {
  city: string;
}

@Component
export default class Item extends Vue {
  @Prop() private name!: string;
  @Prop() private alternate_url!: string;
  @Prop() private address!: IAddress;
  @Prop() private snippet!: ISnippet;
}
</script>

<style lang="scss" scoped>
.item {
  margin-top: 1rem;
  margin-bottom: 1rem;
  h3 {
    margin-bottom: 5px;
  }
}
</style>