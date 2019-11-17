<template>
  <b-card class="Items">
    <h2 v-if="Result" @click="showAll">{{search}}: {{Result.found}}</h2>
    <template v-if="isShowAll">
      <item v-for="item in Result.items" :key="`item-${item.id}`"  
        :name="item.name" 
        :alternate_url="item.alternate_url" 
        :address="item.address" 
        :snippet="item.snippet" 
      />
    </template>
  </b-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { load, endpoints } from '../api';
import item from './item.vue';

@Component({
  components: {
    item,
  },
})
export default class Items extends Vue {

  public Result = [];
  @Prop() private search!: string;
  @Prop() private isShowAll!: boolean;

  public async mounted() {
    this.Result = await this.$store.dispatch('items/addItem', {
      type: endpoints.vacancies,
      params: {
        text: this.search,
        per_page: 100,
        page: 1,
      },
    });
  }

  public showAll() {
    this.$emit('showAll');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.Items {
  margin-top: 1rem;
  h2 {
    display: block;
    margin: 0rem;
    font-size: 1.5rem;
    cursor: pointer;
  }
}

.item {
  margin-top: 1rem;
  margin-bottom: 1rem;
  h3 {
    margin-bottom: 5px;
  }
}
</style>
