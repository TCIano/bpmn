<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import router from './router'
import request from './utils/request';
const goToHome = () => {
  router.push('/home');
}

// //获取验证码
// export const getCode = (phone) => {
//   return request({
//     method: 'POST',
//     url: '/redfadaf/getCode',
//     data: {
//       phone,
//     }
//   })
// }

// //登录接口
// export const login = (phone, code) => {
//   return request({
//     method: 'POST',
//     url: '/redfadaf/getCode',
//     data: {
//       phone,
//       code,
//     }
//   })
// }
// //登录
// const getLogin = async () => {

//   await getCode()
//   await login()

// }
</script>

<template>
  <div>
    <a-button type='primary' @click='goToHome'>跳转</a-button>
    <router-view></router-view>
  </div>
</template>

<style scoped>

</style>
