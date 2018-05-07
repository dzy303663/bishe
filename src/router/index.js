import Vue from 'vue'
import Router from 'vue-router'
import store from '.././store'
import { Loading, Message } from 'element-ui'
import Index from '@/components/index'
import LoginIndex from '@/components/index/loginIndex'
import User from '@/components/class/user.vue'
import Personal from '@/components/class/Personal'
import classIndex from '@/components/class/index'
import classing from '@/components/class/classing'
import arclass from '@/components/class/arClass'
import control from '@/components/class/control'
import question from '@/components/class/question'
import dataDownload from '@/components/class/dataDownload'
import student_class from '@/components/class/student_class'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [{
        path: 'LoginIndex',//登录成功页面
        component: LoginIndex
      }]
    },
    {
      path: '/User/:role/:id',
      name: 'user',
      component: User,
      children: [
        {
          path: 'Personal',
          component: Personal
        },
        {
          path: 'index',
          component: classIndex
        },
        {
          path: 'classing',
          component: classing,
         /*  children:[
            { 
              path: 'studentClass',
              component: student_class
            }
          ] */
        },
        {
          path: 'arclass',
          component: arclass
        },
        {
          path: 'control',
          component: control
        },
        {
          path: 'questions',
          component: question
        },
        {
          path: 'datadownload',
          component: dataDownload
        },
        {
          path: 'studentClass',
          component: student_class
        }
      ]
    },
    {
      path: '/',
      redirect: '*'
    }
  ]
})

// 判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
  if (store.state.login_state) {// 判断是否登录
    console.log("已登录");
    next();
  } else {// 没登录则跳转到登录界面
    console.log("未登录");
    if (to.path == '/') {//如果是登录页面路径，就直接next()
      next();
    } else {//不然就跳转到登录；
      Message.error({
        message: '请先登录'
      })
      next('/');
    }
  }
});

export default router