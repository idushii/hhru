<template>
  <div id="app">
    <MyHeader />
    <b-container class="container">
      <b-row>
        <b-col cols="8">
          <b-card title="График">
            <p>Количество предложений</p>
            <Chart :keywords="keywords" />
          </b-card>
        </b-col>
        <b-col>
          <b-card title="Что ищем?">
            <b-form>
              <b-form-group v-for="(item, index) in keywords" :key="`item--${item}`">
                <b-form-input
                  :value="keywords[index]"
                  placeholder="Поле поиска"
                  @keyup.enter="e => removeKeyWord(index, e)"
                ></b-form-input>
              </b-form-group>
              <b-form-group>
                <b-form-input
                  v-model="newKeyWord"
                  placeholder="Еще запрос"
                  @keyup.enter="AddKeyWord"
                ></b-form-input>
              </b-form-group>
            </b-form>
          </b-card>
        </b-col>
        <b-col cols="12" v-for="(item, index) in keywords" :key="`item${item}`">
          <Items @showAll="show(index)" :isShowAll="showIndex == index" :search="item" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Chart from "@/components/Chart.vue";
import Items from "@/components/Items.vue";
import MyHeader from "@/components/MyHeader.vue";

@Component({
  data: () => ({
    //keywords: ["VueJS"],
    keywords: ["VueJS", "ReactJS", "Angular", "TypeScript", "Dart"],
    showIndex: null,
    newKeyWord: ""
  }),
  methods: {
    show(index) {
      if (this.showIndex == index) this.showIndex = null;
      else this.showIndex = index;
    },
    AddKeyWord() {
      this.keywords.push(this.newKeyWord);
      this.newKeyWord = "";
    },
    removeKeyWord(index, e) {
      console.log(e.target.value);
      if (e.target.value == "") this.keywords.splice(index, 1);
      else this.$set(this.keywords, index, e.target.value);
    }
  },
  components: {
    Items,
    Chart,
    MyHeader
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
.container {
  margin-top: 1rem;
}
</style>
