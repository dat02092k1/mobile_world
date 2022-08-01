import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import List from '../views/products/List.vue'
import Form from '../views/products/Form.vue'
import ListUser from '../views/users/ListUser.vue'
import FormUser from '../views/users/FormUser.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/product',
    name: 'product.list',
    component:List
  },
  {
    path: '/product/create',
    name: 'product.create',
    component:Form
  },
  {
    path: '/product/edit/:id',
    name: 'product.edit',
    component:Form
  },
  {
    path: '/user',
    name: 'user.list',
    component:ListUser
  },
  {
    path: '/user/create',
    name: 'user.create',
    component:FormUser
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router
