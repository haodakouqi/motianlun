<template>
<div class="aboutUs">
  <el-image style="height: 400px;width: 100%" :src="aboutUsBg" fit="cover" />
  <div class="aboutUs-main">
    <div class="aboutUs-main-left">
      <div class="title-box">
        <div>ABOUT</div>
        <div class="last">US</div>
      </div>
      <div class="name">关于我们</div>
    </div>
    <div class="aboutUs-main-content">
      <div class="line"></div>
      <p class="first">
        西安新时科技有限公司是一家集大数据采集、云计算分析处理、人工智能技术研发为一体的高新科技型企业。团队在大数据分析、人工智能投放数据处理、数据模型应用处理等方面深耕多年。服务行业涉及电商、网络游戏、社交、教育、小说、生活服务等。
      </p>
      <p>
        团队希望将最先进的技术方案融入到业务团队的管理及运营工作当中，通过直观的数据系统报表，让企业享受到尖端科技带来的运营的效率提升，最终实现降本增效，为GMV增长保驾护航。
      </p>
      <p>
        custifyMedia是一站式代理商管理平台，让项目管理更高效，让数据运营更有价值，突破流量红利期后增长的瓶颈！
      </p>
    </div>
  </div>
</div>
</template>

<script>
import { defineComponent } from 'vue'
import aboutUsBg from "@/assets/images/aboutUsBg.png";
export default defineComponent({
  components: {
    // footerTip,
  },
  setup() {
    return { aboutUsBg }
  }
})
</script>
<style lang="scss" scoped>
.aboutUs{
    padding-bottom: 10px;
    &-main {
      transform: translateY(-80px);
      width: 1200px;
      margin: 0 auto;
      padding: 63px 60px 103px;
      display: flex;
      justify-content: space-around;
      gap: 20px;
      background: #fff;
      border-radius: 6px;
      &-left {
        .title-box {
          display: flex;
          font-size: 45px;
          font-weight: 600;
          margin-bottom: 15px;
          color: #333333;
          gap: 5px;
          .last{
            color: rgba(212,220,250,0.53);
          }
        }
        .name {
          font-size: 28px;
          font-weight: 400;
          color: #757A8D;
          line-height: 40px;
          letter-spacing: 1px;
        }
      }
      &-content {
        .line {
          width: 146px;
          height: 5px;
          background: -webkit-linear-gradient(left, #ADD6FF 0%, #75ADFD 100%);
          background: linear-gradient(90deg, #ADD6FF 0%, #75ADFD 100%);
          border-radius: 3px;
          margin: 20px 0 30px;
        }
        .first {
          margin-bottom: 20px;
        }
        p {
          font-size: 18px;
          font-weight: 500;
          color: #656A7F;
          line-height: 40px;
          & + p{
            margin-top: 50px;
          }
        }
      }
    }
}
</style>
