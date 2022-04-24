import Vue from 'vue'
import App from './App.vue'
import VueCompositionAPI from '@vue/composition-api'
import { library } from '@fortawesome/fontawesome-svg-core'
//could add specific icons instead of fas
//import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.use(VueCompositionAPI)

library.add(fas, far)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
