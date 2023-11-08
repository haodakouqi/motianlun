<template>
  <div>
    <section class="landing-contact-us">
      <div id="contactCustomerService" class="mainWidth">
        <div class="box">
          <h2>{{ contactData.title }}</h2>
          <!-- <div class="box-main">
            <span class="contacts">{{ contactData.contacts }}</span>
            <span class="position">（{{ contactData.position }}）</span>
            <span class="email"><img src="@/assets/images/contact-icon.png" />{{ contactData.email }}</span>
          </div> -->
          <el-button type="primary" :maskClosable="false" @click="OpenCallMeDialog">联系我们</el-button>
        </div>
      </div>
      <div class="landingPage-footer">
        <p class="bottom-record-text">
          西安新时科技有限公司
          <!-- <a
            class="record-link"
            href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=61019002001964"
            target="_blank"
          >
            <img src="@/assets/images/icons/record-icon.png" alt />陕公网安备61019002001964号
          </a> -->
        </p>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
export default defineComponent({
  setup() {
    const OpenCallMeDialog: any = inject("OpenCallMeDialog");
    return {
      contactData: {
        title: "联系我们，立即领取您的专属解决方案",
        contacts: "nick尼克",
        position: "商务",
        email: "ccou.gu@qq.com"
      },
      loading: false,
      OpenCallMeDialog
    }
  }
})
</script>
<style lang="scss" scoped>
.landing-contact-us {
  background: #262626;
  #contactCustomerService {
    width: 1200px;
    margin: 0 auto;
    // height: 302px;
    text-align: center;
    padding: 70px 0 0;
    .box {
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }
    h2 {
      font-size: 32px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
      line-height: 36px;
      margin-bottom: 40px;
    }
    .box-main {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-bottom: 50px;
      .contacts {
        font-size: 20px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 30px;
      }
      .position {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.8);
        line-height: 30px;
      }
      .email {
        font-size: 16px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #ffffff;
        line-height: 30px;
        margin-left: 84px;
        img {
          display: inline-block;
          margin-right: 10px;
          position: relative;
          top: 2px;
        }
      }
    }
    .el-button {
      width: 140px;
      height: 40px;
      border-radius: 23px;
      margin-bottom: 30px;
    }
  }

  .landingPage-footer {
    height: 62px;
    display: flex;
    align-items: center;
    justify-content: center;
    .bottom-record-text {
      position: inherit;
      color: #fff;
      a,
      a:hover {
        color: #fff;
      }
    }
  }
}
</style>
