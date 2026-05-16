import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faQuestionCircle, faCheckCircle, faTimesCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons'

// Add icons to the library
library.add(faQuestionCircle, faCheckCircle, faTimesCircle, faArrowRight)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')