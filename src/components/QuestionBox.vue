/* eslint-disable */
<template>
  <div>
    <b-jumbotron>
      <p slot="lead" v-html="'Question : ' + currentquestion['question']"></p>
      <b-list-group>
        <b-list-group-item
          v-for="(answer,index) in shuffledAnswers"
          :key="index"
          v-on:click="selectedAnswer(index)"
          :class="myClass(index)"
          v-html="answer"
        ></b-list-group-item>
      </b-list-group>
      <b-button variant="success" v-on:click="submitAnswer" :disabled="answered ">Submit answer</b-button>
      <b-button v-on:click="myNext" variant="primary">Next</b-button>
      <div style="margin-top:20px;" algin="left" class="text-left">
        <p>
          <strong>Category</strong>
          : {{currentquestion.category}}
        </p>
        <p>
          <strong>Difficulty</strong>
          : {{currentquestion.difficulty}}
        </p>
      </div>
    </b-jumbotron>
  </div>
</template>
<script>
import _ from "lodash";

export default {
  props: {
    currentquestion: Object,
    next: Function
  },
  mounted() {
    this.shuffleAnswers();
    // console.log(this.currentquestion);
  },
  data() {
    return {
      selectedIndex: null,
      shuffledAnswers: [],
      answered: false,
      answeredCorrectly: false
    };
  },
  computed: {
    answers() {
      let answers = [...this.currentquestion.incorrect_answers];
      answers.push(this.currentquestion.correct_answer);
      return answers;
    },
    correct_idx: function() {
      return this.shuffledAnswers.indexOf(this.currentquestion.correct_answer);
    }
  },
  methods: {
    myClass(index) {
      let classes = "";
      if (this.correct_idx === index && this.answered) {
        classes = "correct";
      } else if (this.selectedIndex === index && this.answered) {
        classes = "incorrect";
      } else if (this.selectedIndex === index) {
        classes = "selected";
      }
      return classes;
    },
    countCorrectAnswers() {
      this.$emit("correctAnswer", true);
    },
    selectedAnswer(index) {
      this.selectedIndex = index;
    },
    shuffleAnswers() {
      this.shuffledAnswers = _.shuffle(this.answers);
    },

    myNext() {
      this.answered = false;
      this.next();
    },
    submitAnswer() {
      this.answered = true;
      if (
        this.shuffledAnswers[this.selectedIndex] ===
        this.currentquestion.correct_answer
      ) {
        this.answeredCorrectly = true;
        this.$swal({
          toast : true ,
          position : 'top',
          showConfirmButton: false,
          text : "correct answer",
          type : 'success',
          timer : 2000 

        });
        this.countCorrectAnswers();
      }
    }
  },
  watch: {
    currentquestion() {
      (this.selectedIndex = null), this.shuffleAnswers();
    }
  }
};
</script>

<style scoped>
.list-group {
  margin: 5px;
}
.list-group-item:hover {
  background-color: rgb(194, 194, 194);
  cursor: pointer;
}
.btn {
  margin: 5px;
}
.selected {
  background-color: #FCECC9;
}
.correct {
  background-color: #2CC860;
}
.incorrect {
  background-color: #F93943;
}
</style>
