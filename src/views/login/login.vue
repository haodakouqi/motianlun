<template>
  <div class="loginPage">
    <Logo class="logo" :visible="true" />
    <div class="loginPage-main">
      <div class="loginPage-img">
        <div class="loginPage-img-main">
          <img :src="loginLeftPng"/>

          <div class="loginPage-img-title">
            一站式代理商服务平台
          </div>
        </div>
      </div>

      <div class="loginPage-form">
        <div class="loginPage-form-main">
          <el-form
            ref="formRef"
            :model="formData"
            label-width="80px"
            label-position="top"
          >
            <div v-if="isLogin" key="loginFormKey">
              <h1>欢迎回来</h1>
              <div class="loginPage-form-subtitle">
                <div class="subtitle-name">没有账户？</div>
                <el-button
                  link
                  style="--el-button-text-color: var(--el-color-primary); --el-font-size-base: 14px;--el-button-hover-link-text-color:var(--el-color-primary)"
                  @click="isLoginChange"
                >
                  免费注册
                </el-button>
              </div>
              <el-form-item
                label="邮箱"
                prop="loginName"
                :rules="{
                  required: true,
                  message: '请输入邮箱',
                  trigger: 'blur',
                }"
              >
                <el-input
                  size="large"
                  v-model="formData.loginName"
                  placeholder="邮箱"
                  type="text"
                  maxlength="30"
                  clearable
                >
                </el-input>
              </el-form-item>
              <el-form-item
                label="密码"
                prop="password"
                :rules="{
                  required: true,
                  message: '请输入密码',
                  trigger: 'blur',
                }"
              >
                <el-input
                  size="large"
                  v-model="formData.password"
                  placeholder="密码"
                  maxlength="30"
                  type="password"
                  show-password
                  clearable
                >
                </el-input>
              </el-form-item>
            </div>
            <div v-else key="registerFormKey">
              <h1>创建你的企业</h1>
              <div class="loginPage-form-subtitle">
                <div class="subtitle-name">已有账户？</div>
                <el-button
                  link
                  style="--el-button-text-color: var(--el-color-primary); --el-font-size-base: 14px;--el-button-hover-link-text-color:var(--el-color-primary)"
                  @click="isLoginChange"
                >
                  立即登录
                </el-button>
              </div>
              <el-form-item
                label="用户名"
                prop="userName"
                :rules="{
                  required: true,
                  message: '请输入用户名',
                  trigger: 'blur',
                }"
              >
                <el-input
                  size="large"
                  v-model="formData.userName"
                  placeholder="用户名"
                  type="text"
                  maxlength="30"
                  clearable
                >
                </el-input>
              </el-form-item>
              <el-form-item
                label="邮箱"
                prop="loginName"
                :rules="[
                  {
                    required: true,
                    message: '请输入邮箱',
                    trigger: 'blur',
                  },
                  emailReg
                ]"
              >
                <el-input
                  v-model.trim="formData.loginName"
                  placeholder="请输入邮箱"
                  clearable
                  size="large"
                />
              </el-form-item>
              <el-form-item
                label="密码"
                prop="password"
                :rules="[
                  {
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur',
                  },
                  pswReg
                ]"
              >
                <el-input
                  size="large"
                  v-model="formData.password"
                  placeholder="密码"
                  maxlength="30"
                  type="password"
                  show-password
                  clearable
                >
                </el-input>
              </el-form-item>
              <el-form-item
                label="手机号"
                prop="phone"
                :rules="[
                  {
                    required: true,
                    message: '请输入手机号',
                    trigger: 'blur',
                  },
                  phoneReg
                ]"
              >
                <el-input
                  v-model.trim="formData.phone"
                  placeholder="请输入手机号"
                  clearable
                  size="large"
                />
              </el-form-item>
              <el-form-item
                label="邀请码"
                prop="inviteCode"
                :rules="[
                  {
                    required: true,
                    message: '请输入邀请码',
                    trigger: 'blur',
                  },
                ]"
              >
                <el-input
                  v-model.trim="formData.inviteCode"
                  placeholder="请输入邀请码"
                  clearable
                  size="large"
                />
              </el-form-item>
              <el-form-item
                prop="agree"
                :rules="[
                  {
                    required: true,
                    message: '请选择协议',
                    trigger: 'change',
                  }
                ]"
              >
                <div class="agreement">
                  <el-checkbox
                    v-model="formData.agree"
                    label="我已阅读并同意"
                    true-label="1"
                    false-label=""
                  />
                  <span class="agreement-a" @click="openPage('serviceAgreement')">《服务条款》</span>
                  <span class="agreement-a" @click="openPage('privacyAgreement')">《隐私协议》</span>
                </div>
              </el-form-item>
            </div>
            <el-button
              class="login-form-btn"
              type="primary"
              :loading="isLoading"
              @click="submitForm(formRef)"
              style="width: 100%;margin-top: 10px"
              size="large"
            >
              {{ isLogin ? "登录" : "注册"}}
            </el-button>
          </el-form>
        </div>

        <!-- 中英文切换 -->
        <!-- <div class="fixed-top-right">
          <select-lang/>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
import {
  emailReg, pswReg, phoneReg
} from "@/utils/validate";

import { registerUser } from '@/api/user'

import Logo from "@/components/Logo/index.vue";
import selectLang from '@/layout/components/functionList/word.vue'
import loginLeftPng from '@/assets/login/login-left.png';

const resetForm = () => ({
  loginName: '',
  password: '',
  userName: '',
  phone: '',
  agree: '',
  inviteCode: '',
})
export default defineComponent({
  components: {
    Logo,
    selectLang
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const isLoading = ref(false)
    const isLogin = ref(true)
    if (route.query.isLogin === "0") {
      isLogin.value = false
    } else {
      isLogin.value = true
    }
    
    const formData = reactive({...resetForm()})
    
    function isLoginChange() {
      isLogin.value = !isLogin.value;
      Object.assign(formData, {...resetForm()})
    }

    const formRef = ref<FormInstance>();
    const submitForm = async (formEl: FormInstance | undefined) => {
      try {
        if (!formEl) return
        await formEl.validate();
        const { loginName, password, userName, phone, inviteCode } = formData;
        isLoading.value = true;
        if (isLogin.value) {
          await store.dispatch('user/login', {
            loginName, password
          })
          ElMessage.success({
            message: '登录成功',
            type: 'success',
            showClose: true,
            duration: 1000
          })
          router.push('/dashboard')
        } else {
          await registerUser({
            loginName, password, userName, phone, inviteCode
          })
          ElMessage.success({
            message: '注册成功',
            type: 'success',
            showClose: true,
            duration: 1000
          })
          isLogin.value = true;
        }
        isLoading.value = false;
        Object.assign(formData, {...resetForm()}, {loginName, password});
        // location.reload()
        
      } catch (error) {
        isLoading.value = false;
      }
    }

    const openPage = (name: String)=>{
      const href = router.resolve({ //使用resolve
        name,
        path: `/${name}`,
      })
      window.open(href.href, '_blank')
    }
    // console.log(`%c login-getRoutes`, 'color:#4278ff;', router.getRoutes())
    return {
      isLogin,
      isLoginChange,
      isLoading,
      loginLeftPng,
      formData,
      formRef,
      submitForm,
      openPage,
      emailReg, pswReg, phoneReg
    }
  }
})
</script>

<style lang="scss">
.loginPage {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url('@/assets/login/bg.png') no-repeat;
  background-size: cover;
  overflow: hidden;
  cursor: pointer;
  user-select: none;
  .logo {
    position: absolute;
    left: 30px;
    top: 20px;
  }
  .loginPage-main {
    display: flex;
    .loginPage-img {
      width: 55%;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      .loginPage-img-main {
        width: 600px;
        .loginPage-img-title  {
          margin-top: 15%;
          /** 文本1 */
          font-size: 36px;
          font-weight: 400;
          letter-spacing: 0px;
          line-height: 68.6px;
          color: rgba(0, 106, 227, 0.67);
          text-align: center;
          vertical-align: top;
        }
        img {
          // height: 600px;
          width: 600px;
        }
      }
    }

    .loginPage-form {
      width: 45%;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.66);
      backdrop-filter: blur(4px);
      .loginPage-form-main {
        width: 495px;
        border-radius: 24px;
        overflow: hidden;
        text-align: left;
        padding: 48px 67px;
        h1 {
          color: #121315;
          margin: 0 0 20px;
          font-size: 48px;
          font-weight: 700;
          line-height: 65.86px;
        }
        .loginPage-form-subtitle {
          display: flex;
          align-items: center;
          margin-bottom: 54px;
          .subtitle-name {
            font-size: 16px;
            font-weight: 400;
            letter-spacing: 0px;
            line-height: 21.95px;
            color: rgba(0, 0, 0, 1);
            text-align: left;
            vertical-align: top;
          }
        }
        .el-input {
          // --el-input-height: 54px;
          .el-input__wrapper {
            border-radius: 7px;
          }
        }
        .login-form-btn {
          height: 40px;
          border-radius: 7px;
          font-size: 16px;
        }
        .el-form-item__label {
          --el-form-label-font-size: 14px;
        }
        
        .agreement {
          display: flex;
          .agreement-a {
            margin-left: 5px;
            font-size: var(--el-font-size-base);
            line-height: 32px;
            color: var(--el-color-primary)
          }
        }

        // 自动填充 背景问题
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 1000px #fff inset !important; // 改变背景色
          -webkit-text-fill-color: var(--el-input-text-color); // 改变字体色
        }
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .loginPage-img {
    display: none;
  }
  .loginPage-main {
    width: 500px !important;
  }
}

@media screen and (max-width: 750px) {
  .loginPage {
    .loginPage-main {
      .loginPage-img {
        display: none;
      }
      .loginPage-form {
        width: 100vw !important;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .loginPage-form-main {
          padding : 10px !important;
          width: 90% !important;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>
