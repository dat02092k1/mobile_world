import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueAxios from 'vue-axios'
import axios from 'axios'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { createPinia } from 'pinia';
import $swal from 'sweetalert2';
import './index.css'

const pinia = createPinia();
const app = createApp(App).use(router).use(pinia).use(VueSweetalert2).mount('#app')
// app.use(VueSweetalert2);
window.$swal = $swal;
// app.use(VueAxios, { $request: axios })
// app.mount('#app')
  