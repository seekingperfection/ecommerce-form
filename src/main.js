import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/styles.css";

import VueCardFormat from 'vue-credit-card-validation';

import birthDatepicker from 'vue-birth-datepicker';

import VueLodash from 'vue-lodash'
import lodash from 'lodash'
 
// name is optional


import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret,faLock,faQuestionCircle,faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret, faLock, faQuestionCircle, faMapMarkerAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueLodash, { name: 'custom' , lodash: lodash })

Vue.use(VueCardFormat, birthDatepicker);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
