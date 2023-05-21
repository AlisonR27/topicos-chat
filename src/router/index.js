import { createRouter, createWebHistory } from 'vue-router'
import NoChat from '../views/post-auth/NoChat.vue'
import Chat from '../views/post-auth/Chat.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import AuthedIndex from '../views/post-auth/Index.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/chat/',
      name: 'post-auth',
      component: AuthedIndex,
      children: [
        {
          path: '/',
          name: 'no-chat',
          component: NoChat
        },
        {
          path: ':id',
          name: 'chat',
          component: Chat,
          props:true
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})

const isAuthenticated = function () {
  const curr_user = localStorage.getItem('current_user');
  console.log(curr_user)
  if (curr_user == null) {
    return false 
  } else {
    return true;
  }
}

router.beforeEach((to, from, next) => {
  if (isAuthenticated() || to.name == 'login' || to.name == 'register') next();
  else next({ name: 'login'});
})
export default router
