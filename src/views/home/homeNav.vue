<template>
<div class="homeNav">
  <div class="homeNav-header">
    <div class="header-content global-column-flex">
      <h1>让代理商管理更高效</h1>
      <!-- <h3>专注企业级应用开发一站式搭建</h3> -->
      <el-button
        type="primary"
        size="large"
        @click="OpenCallMeDialog(0)"
      >
        立即咨询
      </el-button>
    </div>
  </div>
  <div class="homeNav-main">
    <div class="main-content">
      <h1>我们的优势</h1>
      <p class="des">管控与赋能相结合</p>
      <p class="des-bottom">实现管理在线化、数字化、智能化协同办公</p>
      <div class="main-box">
        <div class="main-box-wrapper" v-for="t in mainList" :key="t.title">
          <h3>{{t.title}}</h3>
          <ul>
            <li
              class="main-box-wrapper-content"
              v-for="k in t.content"
              :key="k"
            >
              <span>{{k}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">

import { defineComponent, inject } from 'vue'
export default defineComponent({
  setup() {
    const goPage: any = inject("goPage");
    const OpenCallMeDialog: any = inject("OpenCallMeDialog");
    return {
      goPage,
      OpenCallMeDialog,
      mainList: [
        {
          title: "资产数字化",
          content: ["在线管理上游渠道资产信息及利润设置","在线管理下游客户资产信息及利润设置"]
        },
        {
          title: "多媒体管理",
          content: ["支持Meta,Google,Tiktok,Bing等多媒体的管理","支持近实时查看媒体账号金额、状态等"]
        },
        {
          title: "数据可视化",
          content: [
            "近实时观测每个渠道的广告消耗及利润趋势",
            "近实时观测每个客户的广告消耗及利润趋势",
            "近实时观测每个广告账号的消耗及利润趋势",
          ]
        },
        {
          title: "数据安全",
          content: [
            "依托阿里云，进行数据的存储和备份，保证服务的安全性",
            "加密传输，保证数据回传的速度和稳定",
            "出色的数据安全意识,全程保障您的数据安全",
          ]
        },
        // {
        //   title: "全程陪同",
        //   content: [
        //     "团队全程提供服务保证及时解决您在使用系统过程中遇到的问题以及新的诉求",
        //     "团队凭借丰富的广告行业知识，提供免费的解决方案来帮助您解决业务中的问题"
        //   ]
        // },
      ]
    }
  }
})
</script>
<style lang="scss" scoped>
.homeNav {
  .homeNav-header{
      width: 100%;
      height: 582px;
      background-image: url('@/assets/images/homeNav.png');
      background-repeat: no-repeat;
      background-size: cover;
      display: flex;
      align-items: center;
      justify-content: center;
      .header-content {
        width: 1400px;
        // backdrop-filter: blur(10px);
        // backdrop-filter: grayscale(100%);
        h1 {
          height: 92px;
          /** 文本1 */
          font-size: 60px;
          font-weight: 700;
          letter-spacing: 0px;
          line-height: 82.32px;
          // color: rgba(0, 0, 0, 1);
          color: #fff;
          text-align: center;
          margin-bottom: 70px;
        }
        h3 {
          font-size: 50px;
          font-weight: 400;
          line-height: 68.6px;
          color: rgba(0, 0, 0, 1);
          margin-bottom: 71px;
        }
        .el-button {
          width: 187px;
          height: 48px;
          font-size: 18px;
          border-radius: 9px;
          color: #fff;
          // background: linear-gradient(136deg, #82B5FF 0%, #3C89F6 100%);
        }
      }
  }
  .homeNav-main {
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('@/assets/login/bg.png') no-repeat;
    background-size: cover;
    padding: 167px 0 200px;
    .main-content {
      width: 1300px;
      h1 {
        font-size: 60px;
        font-weight: 500;
        letter-spacing: 2px;
        line-height: 45px;
        color: rgba(37, 37, 46, 1);
        text-align: center;
        margin-bottom: 50px;
      }
      .des {
        /** 文本1 */
        font-size: 24px;
        font-weight: 500;
        letter-spacing: 0px;
        line-height: 32.93px;
        color: rgba(42, 130, 228, 1);
        text-align: center;
        margin-bottom: 15px;
      }
      .des-bottom {
        font-size: 24px;
        font-weight: 500;
        letter-spacing: 0px;
        line-height: 32.93px;
        color: rgba(128, 128, 128, 1);
        text-align: center;
        vertical-align: middle;
        margin-bottom: 50px;
      }
      .main-box {
        display: flex;
        gap: 32px;
        .main-box-wrapper {
          flex: 1;
          height: 300px;
          padding: 34px 32px;
          border-radius: 19px;
          background: linear-gradient(180deg, rgba(237, 245, 255, 1) 0%, rgba(255, 255, 255, 1) 100%);
          box-shadow: 0px 2px 4px  rgba(0, 0, 0, 0.25);
          h3 {
            /** 文本1 */
            font-size: 24px;
            font-weight: 400;
            letter-spacing: 1px;
            line-height: 40px;
            color: rgba(37, 37, 46, 1);
            text-align: center;
            margin-bottom: 20px;
          }
          .main-box-wrapper-content {
            list-style-type:disc;
            list-style-position:inside;
            /** 文本1 */
            font-size: 16px;
            font-weight: 400;
            letter-spacing: 0px;
            line-height: 31px;
            color: rgba(108, 108, 108, 1);
            text-align: left;
            vertical-align: top;
            word-break: break-all;
            span {
              color: rgba(108, 108, 108, 1);
            }
          }
          .main-box-wrapper-content + .main-box-wrapper-content {
            margin-top: 20px;
          }
        }
      }
    }
  }
}
</style>
