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
            <p class="tips">Для удаления элемента очистите поле ввода и нажмите enter</p>
            <p class="tips">Для добавления элемента введите текст и нажмите enter</p>
          </b-card>
        </b-col>
        <b-col cols="12" v-for="(item, index) in keywords" :key="`item${item}`">
          <Items @showAll="show(index)" :isShowAll="showIndex == index" :search="item" />
        </b-col>
      </b-row>
      <b-col>
        <p class="tips my-footer">Обратите внимание, что данные локально кешируются при первом запросе. Для получения актуальной информации очистите кеш.</p>
      </b-col>
      <b-row></b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref, Watch } from "vue-property-decorator";
import Chart from "@/components/Chart.vue";
import Items from "@/components/Items.vue";
import MyHeader from "@/components/MyHeader.vue";

@Component({
  components: {
    Items,
    Chart,
    MyHeader
  }
})
export default class App extends Vue {
  keywords = ["VueJS", "ReactJS", "Angular", "TypeScript", "Dart"];
  showIndex: number = -1;
  newKeyWord = "";

  show(index: number) {
    if (this.showIndex == index) this.showIndex = -1;
    else this.showIndex = index;
  }

  AddKeyWord() {
    this.keywords.push(this.newKeyWord);
    this.newKeyWord = "";
  }

  removeKeyWord(index: number, e: any) {
    console.log(e.target.value);
    if (e.target.value == "") this.keywords.splice(index, 1);
    else this.$set(this.keywords, index, e.target.value);
  }

  @Watch("keywords")
  ff() {
    localStorage.setItem("Hh ru api testing", JSON.stringify(this.keywords));
  }

  created() {
    let local = localStorage.getItem("Hh ru api testing") || "[]";
    if (local && local != "[]") {
      this.keywords = JSON.parse(local);
    }
  }
}
</script>

<style lang="scss">
.container {
  margin-top: 1rem;
}

.tips {
  font-size: 0.8rem;
}

.my-footer {
  margin-top: 3rem;
  margin-bottom: 3rem;
  text-align: center;
}
</style>
