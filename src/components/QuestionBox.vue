<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <h5 class="card-title mb-4" v-html="question.question"></h5>
      
      <div class="list-group mb-4">
        <button
          v-for="(answer, index) in shuffledAnswers"
          :key="index"
          @click="selectAnswer(index)"
          :class="['list-group-item', 'list-group-item-action', getAnswerClass(index)]"
          v-html="answer"
          :disabled="answered"
        ></button>
      </div>

      <div class="d-flex gap-2">
        <button 
          class="btn btn-success flex-grow-1" 
          @click="submitAnswer"
          :disabled="selectedIndex === null || answered"
        >
          تأكيد الإجابة
        </button>
        <button 
          class="btn btn-primary flex-grow-1" 
          @click="next"
          :disabled="!answered"
        >
          التالي
        </button>
      </div>

      <div class="mt-4 text-start small">
        <p><strong>التصنيف:</strong> {{ question.category }}</p>
        <p><strong>الصعوبة:</strong> {{ question.difficulty }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import _ from 'lodash' // Note: lodash not in deps, we'll use native shuffle

const props = defineProps({
  question: Object
})

const emit = defineEmits(['next', 'correct'])

const selectedIndex = ref(null)
const answered = ref(false)
const shuffledAnswers = ref([])

// Shuffle function without lodash
const shuffle = (array) => {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

const answers = computed(() => {
  return [...props.question.incorrect_answers, props.question.correct_answer]
})

const correctIndex = computed(() => {
  return shuffledAnswers.value.indexOf(props.question.correct_answer)
})

const getAnswerClass = (index) => {
  if (!answered.value) return ''
  if (index === correctIndex.value) return 'list-group-item-success'
  if (index === selectedIndex.value) return 'list-group-item-danger'
  return ''
}

const selectAnswer = (index) => {
  if (!answered.value) selectedIndex.value = index
}

const submitAnswer = () => {
  answered.value = true
  if (selectedIndex.value === correctIndex.value) {
    emit('correct')
  }
}

const next = () => {
  emit('next')
}

onMounted(() => {
  shuffledAnswers.value = shuffle(answers.value)
})

watch(() => props.question, () => {
  selectedIndex.value = null
  answered.value = false
  shuffledAnswers.value = shuffle(answers.value)
})
</script>

<style scoped>
.list-group-item {
  margin-bottom: 8px;
  cursor: pointer;
}
</style>