import './bootstrap';
import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import { createPinia } from 'pinia'
import Todo from './components/Todo.vue';

const vuetify = createVuetify({ components, directives })
const pinia = createPinia();

createApp({})
    .component('Todo', Todo)
    .use(vuetify)
    .use(pinia)
    .mount('#app');
