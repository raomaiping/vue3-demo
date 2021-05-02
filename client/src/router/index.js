import { createRouter, createWebHistory } from 'vue-router';
import ResourceHome from '@/views/ResourceHome.vue';
import ResourceNew from '@/views/ResourceNew.vue';
import ResourceDetailPage from '@/views/ResourceDetailPage.vue';
const routes = [
  { path: "/", name: "base", redirect: { name: "home" } },
  {
    path: "/home",
    name: "home",
    component: ResourceHome
  },
  {
    path: "/home/new",
    name: "new",
    component: ResourceNew
  },
  {
    path: "/home/:id",
    name: "detail",
    component: ResourceDetailPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass: "active"
});


export default router;