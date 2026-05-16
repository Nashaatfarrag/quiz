<template>
  <div id="app" class="min-vh-100 bg-light">
    <Header :current-index="currentIndex" :total="questions.length" />
    
    <div class="container py-4">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div v-if="loading" class="text-center py-5">
            <div class="spinner-border text-primary" style="width: 4rem; height: 4rem;" role="status"></div>
            <p class="mt-3">جاري تحميل الأسئلة...</p>
          </div>
          
          <QuestionBox
            v-else-if="questions.length && currentIndex < questions.length"
            :question="questions[currentIndex]"
            @next="nextQuestion"
            @correct="handleCorrect"
          />
          
          <div v-else class="text-center py-5">
            <h2 class="mb-4">🎉 انتهى الاختبار!</h2>
            <h3 class="mb-4">نتيجتك: <strong class="text-success">{{ score }} / {{ questions.length }}</strong></h3>
            <button @click="restart" class="btn btn-primary btn-lg">ابدأ اختبار جديد</button>
          </div>
        </div>
      </div>
    </div>

    <footer class="bg-dark text-light py-4 mt-auto">
      <div class="container text-center">
        <p>Developed by <strong>Mohamed Nashaat</strong> 🚀</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Header from './components/Header.vue'
import QuestionBox from './components/QuestionBox.vue'

const questions = ref([])
const currentIndex = ref(0)
const score = ref(0)
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await fetch('https://opentdb.com/api.php?amount=10&type=multiple')
    const data = await res.json()
    questions.value = data.results
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})

const nextQuestion = () => {
  currentIndex.value++
}

const handleCorrect = () => {
  score.value++
}

const restart = () => {
  currentIndex.value = 0
  score.value = 0
  loading.value = true
  fetch('https://opentdb.com/api.php?amount=10&type=multiple')
    .then(res => res.json())
    .then(data => {
      questions.value = data.results
      loading.value = false
    })
}
</script>

<style>
body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
</style>