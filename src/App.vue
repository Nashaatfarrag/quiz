<template>
  <div id="app">
    <Header :index="index" />
    <b-container class="bv-example-row">
      <b-row align="center">
        <b-col style="margin:auto; max-width:800px;">
          <!-- <p>number of correct answers so far : {{answeredCorrectly}}</p> -->
          <QuestionBox
            v-if="questions.length && index < questions.length"
            :currentquestion="questions[index]"
            :next="next"
            v-on:correctAnswer="updateCounter($event)"
          />
          <p class="mb-3" v-else>
            thank you you got
            <strong>{{answeredCorrectly}} / 10</strong>
          </p>
        </b-col>
      </b-row>
    </b-container>
    <footer id="footer">
      <b-container>
    
        <p>
          developed by
          <strong>Mohamed Nashaat</strong>
        </p>
      </b-container>
    </footer>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import QuestionBox from "./components/QuestionBox.vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'


export default {
  name: "app",
  components: {
    Header,
    QuestionBox,
    FontAwesomeIcon
  },
  data() {
    return {
      questions: [],
      index: 0,
      answeredCorrectly: 0,
      myIcon: faSpinner
    };
  },
  methods: {
    next() {
      this.index++;
    },
    updateCounter(val) {
      console.log(val);
      this.answeredCorrectly++;
    }
  },
 
  mounted: function() {
    fetch("https://opentdb.com/api.php?amount=10", {
      method: "get"
    })
      .then(response => {
        // console.log(response);
        return response.json();
      })
      .then(jsonData => {
        this.questions = jsonData.results;
      });
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#footer {
  margin-bottom: 0%;
}
</style>
