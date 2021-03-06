
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import { Form, HasError, AlertError } from 'vform'
import moment from 'moment';

import Gate from "./Gate";
Vue.prototype.$gate = new Gate(window.user);

import swal from 'sweetalert2'
window.swal = swal;

const toast = swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

window.toast = toast;

window.Form=Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
Vue.component('pagination', require('laravel-vue-pagination'));

import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import Users from './components/Users'
import Developer from './components/Developer'
import YoutubeDash from './Youtube/YoutubeDash.vue';
import VideoDetail from './Youtube/VideoDetail.vue';
import Videos from './Youtube/Videos.vue';
import NotFound from './components/NotFound'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
window.eventBus = new Vue({});

import VueProgressBar from 'vue-progressbar'
Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '3px'
  })

export const  routes = [
    { path: '/dashboard', component: require('./components/Dashboard.vue') },
    { path: '/developer', component: require('./components/Developer.vue') },
    { path: '/users', component: require('./components/Users.vue') },
    { path: '/Profile', component: require('./components/Profile.vue') },
    {path: '/', component: YoutubeDash, 'name': 'youtube-dash'},
    {path: '/channel', component: YoutubeDash, 'name': 'youtube-dash'},
    {path: '/video/:id', component: VideoDetail, 'name': 'youtube-video'},
    {path: '/videos/:title', component: Videos, 'name': 'youtube-videos'},
    { path: '*', component: require('./components/NotFound.vue') }
  ]

const router = new VueRouter({
    mode:'history',
    routes:[
        {path: '/Profile', component: Profile},
        {path: '/Dashboard', component: Dashboard},
        {path: '/developer', component: Developer},
        {path: '/Users', component: Users},
        {path: '/', component: YoutubeDash, 'name': 'youtube-dash'},
        {path: '/video/:id/:title', component: VideoDetail, 'name': 'youtube-video'},
        {path: '/video/:title', component: Videos, 'name': 'youtube-videos'},
        {path: '/*', component: NotFound}] // short for `routes: routes`
  })

Vue.filter('upText', function(text){
    return text.charAt(0).toUpperCase() + text.slice(1)
});

Vue.filter('myDate',function(created){
    return moment(created).format('MMMM Do YYYY');
});

let Fire = new Vue();
window.Fire = Fire;
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
Vue.component(
    'passport-clients',
    require('./components/passport/Clients.vue').default
);

Vue.component(
    'passport-authorized-clients',
    require('./components/passport/AuthorizedClients.vue').default
);

Vue.component(
    'passport-personal-access-tokens',
    require('./components/passport/PersonalAccessTokens.vue').default
);
Vue.component(
    'not-found',
    require('./components/NotFound.vue').default
);


Vue.component('example-component', require('./components/ExampleComponent.vue').default);

var app = new Vue({
    
    router,
    data:{
        search:''
    },
    methods:{
        searchit: _.debounce(() => {
            Fire.$emit('searching');
        },1000),

        printme() {
            window.print();
        }
    }
}).$mount('#app');;
