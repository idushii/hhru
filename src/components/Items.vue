<template>
  <div class="Items">
    <h2 v-if="Result"  @click="showAll">{{search}}: {{Result.found}}</h2>
    <template v-if="isShowAll">
      <div class="item" v-for="item in Result.items" :key="`item-${item.id}`">
        <h3>{{item.name}}</h3>
        <div v-if="item.address">{{item.address.city}}</div>
        <div v-if="item.snippet">
          <div v-html="item.snippet.requirement" />
          <div v-html="item.snippet.responsibility" />
        </div>
        <a :href="item.alternate_url" target="_blank">Ссылка</a>
        <div v-if="false">{{item}}</div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { load, endpoints } from "../api";

@Component
export default class Items extends Vue {
  @Prop() private search!: string;
  @Prop() private isShowAll!: boolean;

  Result = [];
  async mounted() {
    this.Result = await this.$store.dispatch('items/addItem', {type: endpoints.vacancies, params: {
      text: this.search,
      per_page: 100,
      page: 1
    }})
  }

  showAll() {
    this.$emit('showAll')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.Items h2 {
  display: block;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.item {
  margin-bottom: 1rem;
  h3 {
    margin-bottom: 5px;
  }
}
</style>
