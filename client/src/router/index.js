import Vue from "vue";
import VueRouter from "vue-router";

// vue 모든 주소를 routes에 기록
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => {
      return import ('../components/HomeView.vue')
    }
  },
  {
    path: '/:id',
    name: 'Article',
    component: () => {
      return import ('../components/ArticleView.vue')
    }
  }
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
  });
  
  export default router;