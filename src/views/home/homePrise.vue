<template>
<div class="homePrise">
  <div class="cybermb-plan_bg" id="memberPart">
    <div class="cybermb-plan">
      <div class="cybermb-box">
        <h2 class="cybermb-title">
          <span>了解我们的套餐价格</span>
        </h2>
        <p class="cybermb-subtitle">
          选择合适您的服务
        </p>
        <!-- 会员队列 -->
        <div class="plan_content">
          <div
            v-for="t in planList"
            :key="t.title"
            class="plan_content-item"
            :class="['plan_content-item', t.isPopular ? 'popular' : '']"
          >
            <div v-if="t.isPopular" class="popular_tip">
              最受欢迎的
            </div>
            <h2>
              <span>{{ t.title }}</span>
            </h2>
            <p>{{ t.des }}</p>
            <div class="plan_content-item_price">
              <span class="curency">{{ t.curency }}</span>
              <span class="price">
                {{ t.price }}
              </span>
              <span class="period" v-if="t.price !== '0'">/{{ t.period }}</span>
            </div>
            <div class="plan_content-item_btn">
              <button v-if="t.price" @click="goPage(1)">
                {{ t.btn }}
                <i></i>
              </button>
            </div>
            <div class="plan_content-item_subtitle">
              <div class="square"></div>
              <span>服务内容</span>
            </div>
            <div v-for="k in t.subitem" :key="k.content" class="plan_content-item_sub_wrapper">
              <SvgIcon iconClass="mark_right" size="16" style="margin-right: 8px" />
              <span>{{ k.content }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { priceList } from '@/config'
export default defineComponent({
  components: {
    // footerTip,
  },
  setup() {
    const goPage: any = inject("goPage");
    const planList = priceList.map((t, ti) => {
      return {
        ...t
      };
    });
    return {
      planList,
      goPage
    }
  }
})
</script>
<style lang="scss" scoped>
$color-title: #2d3446;
$color-subtitle: #677392;
.homePrise{
  padding: 120px 0 105px 0;
  background: linear-gradient(264.96deg, rgba(204, 228, 255, 0.23) 0%, rgba(227, 241, 255, 0) 100%, rgba(252, 253, 255, 0.95) 100%, rgba(255, 255, 255, 1) 100%);
  .cybermb-title {
    font-size: 38px;
    font-weight: 500;
    color: $color-title;
    font-family: PingFang SC-Medium, PingFang SC;
    line-height: 46px;
    text-align: center;
  }
  .cybermb-subtitle {
    font-size: 16px;
    line-height: 24px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: $color-subtitle;
    text-align: center;
  }
  .cybermb-plan_bg {
    // background: url(../../../assets/images/cybermember/cybermb-plan.png) no-repeat;
    // background-size: cover;
  }
  .cybermb-plan {
    width: 1000px;
    margin: 0 auto;
    .cybermb-subtitle {
      margin: 12px 0px 50px;
    }
    // 会员队列
    .plan_content {
      text-align: left;
      display: grid;
      grid-template-columns: repeat(4, 241px);
      grid-template-rows: 460px;
      grid-gap: 12px;
      .plan_content-item {
        position: relative;
        padding: 34px 24px 10px;
        background: #ffffff;
        border-radius: 8px 8px 8px 8px;
        opacity: 1;
        border: 1px solid #e1e8f9;
        &:hover {
          box-shadow: 0px 9px 28px 8px rgba(45, 52, 70, 0.05), 0px 6px 16px 0px rgba(45, 52, 70, 0.08),
            0px 3px 6px -4px rgba(45, 52, 70, 0.12);
          .popular_tip {
            box-shadow: 0px 9px 28px 8px rgba(45, 52, 70, 0.05), 0px 6px 16px 0px rgba(45, 52, 70, 0.08),
              0px 3px 6px -4px rgba(45, 52, 70, 0.12);
          }
        }
        // 暗色系
        &.popular {
          background: #191d26;
          border-radius: 0px 0px 8px 8px;
          &:hover {
            box-shadow: -2px 6px 27px 0 rgba(34, 172, 53, 0.16);
          }
          .popular_tip {
            position: absolute;
            top: -24px;
            left: 0;
            height: 24px;
            line-height: 24px;
            text-align: center;
            width: 100%;
            background: #FA8C16;
            border-radius: 8px 8px 0px 0px;
            font-size: 12px;
            font-family: PingFang SC-Medium, PingFang SC;
            font-weight: 500;
            color: #ffffff;
            // -webkit-background-clip: text;
          }
          h2,
          .plan_content-item_sub_wrapper {
            color: #ffffff;
          }
          p {
            color: #9ca9cb;
          }
          .plan_content-item_price {
            .price {
              color: #ffffff;
            }
            .curency,
            .period {
              color: #9ca9cb;
            }
          }
          button {
            // background: linear-gradient(78deg, #00be1a 0%, #0085ff 100%);
            background: #FA8C16;
            box-shadow: 0px 4px 8px 0px rgba(34, 172, 53, 0.26);
            border-radius: 6px 6px 6px 6px;
            color: #fff;
            
            i {
              display: block;
              width: 8px;
              height: 8px;
              background: #fff;
              border-radius: 50%;
              border-radius: 50%;
              position: relative;
              margin-left: 1.25rem;
              vertical-align: middle;
              &:before {
                content: "";
                display: block;
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.8);
                transform: scale(0);
                animation: circleScale 2s linear infinite;
                @keyframes circleScale {
                  0% {
                    opacity: 1;
                    -webkit-transform: scale(1);
                    -moz-transform: scale(1);
                    -ms-transform: scale(1);
                    transform: scale(1);
                    -o-transform: scale(1);
                  }
                  100% {
                    opacity: 0;
                    -webkit-transform: scale(3);
                    -moz-transform: scale(3);
                    -ms-transform: scale(3);
                    transform: scale(3);
                    -o-transform: scale(3);
                  }
                }
              }
            }
          }
          .plan_content-item_subtitle {
            color: #8c8c8c;
            .square {
              background: #8c8c8c;
            }
          }
        }
        h2 {
          font-size: 20px;
          font-family: PingFang SC-Medium, PingFang SC;
          font-weight: 500;
          color: #2d3446;
          line-height: 32px;
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          .tab-icon {
            width: 32px;
            height: 32px;
            margin-right: 8px;
          }
        }
        p {
          height: 40px;
          font-size: 12px;
          font-family: PingFang SC-Medium, PingFang SC;
          font-weight: 500;
          color: #677392;
          line-height: 20px;
          margin-bottom: 32px;
        }
        .plan_content-item_price {
          display: flex;
          height: 46px;
          border-radius: 0px 0px 0px 0px;
          opacity: 1;
          margin-bottom: 32px;
          .curency {
            font-size: 14px;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #677392;
            line-height: 22px;
            -webkit-background-clip: text;
            align-self: flex-start;
          }
          .price {
            font-size: 38px;
            font-family: PingFang SC-Semibold, PingFang SC;
            font-weight: 600;
            color: #2d3446;
            line-height: 46px;
            -webkit-background-clip: text;
            padding: 0 5px;
          }
          .period {
            font-size: 14px;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #677392;
            line-height: 22px;
            -webkit-background-clip: text;
            align-self: flex-end;
          }
        }
        .plan_content-item_btn {
          height: 40px;
          margin-bottom: 33px;
        }
        button {
          height: 40px;
          width: 100%;
          // background: linear-gradient(270deg, #A3E1FF 0%, #55A7FF 100%);
          background: linear-gradient(285deg, #69BEFF 0%, #388AFF 100%);
          border-radius: 8px 8px 8px 8px;
          opacity: 1;
          // border: 1px solid var(--el-color-primary);
          line-height: 38px;
          font-size: 16px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: var(--system-text-primary);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .plan_content-item_subtitle {
          height: 20px;
          font-size: 12px;
          font-family: PingFang SC-Medium, PingFang SC;
          font-weight: 500;
          color: #677392;
          margin-bottom: 11px;

          display: flex;
          align-items: center;
          .square {
            width: 3px;
            height: 12px;
            background: #677392;
            border-radius: 0px 0px 0px 0px;
            opacity: 1;
            margin-right: 4px;
          }
        }
        .plan_content-item_sub_wrapper {
          font-size: 12px;
          font-family: PingFang SC-Medium, PingFang SC;
          font-weight: 500;
          color: #2d3446;
          line-height: 20px;
          margin-bottom: 10px;

          display: flex;
          align-items: center;
          .mark-icon {
            margin-top: 2px;
            margin-right: 8px;
          }
          span {
            margin-left: 4px;
            white-space: pre-line;
          }
        }
      }
    }
  }
}
</style>
