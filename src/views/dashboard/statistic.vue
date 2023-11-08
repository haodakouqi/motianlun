<template>
  <div class="statistic">
    <el-card class="box-card"  v-for="t in props.data" :key="t.label">
      <div class="statistic-item">
          <div class="item-header">
            <div class="item-header-label">
              {{t.label}}
            </div>
            <div @click="goPage(t.path)" class="item-right">
              <el-icon :size="16" color="rgb(30, 30, 30)">
                <ArrowRight />
              </el-icon>
            </div>
          </div>
          <div class="item-wrapper">
            <div class="item-content">
              <el-statistic
                v-for="k in t.data" :key="k.name"
                :title="k.name"
                :value="k.value"
              />
              <!-- <div v-for="k in t.data" :key="k.name" class="item-content-media">
                <div class="left">{{ k.name }}</div>
                <div>{{ k.value }}</div>
              </div> -->
            </div>
          </div>
          
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from "vue-router";
import {
  ArrowRight,
} from '@element-plus/icons-vue'
const props = defineProps({
  data: Array
})

const router = useRouter();

const goPage = (path: String) => {
  router.push(path)
}
</script>

<style lang="scss">
:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--el-fill-color) !important;
}
.statistic {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  min-height: 110px;
  font-size: 28px;
  // .el-statistic {
  //   --el-statistic-content-font-size: 28px;
  // }
  .el-card {
    flex: 1;
  }
  .statistic-item {
    flex: 1;
    height: 100%;
    border-radius: 4px;
    background-color: var(--el-bg-color-overlay);
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      .item-header-label {
        display: inline-flex; 
        align-items: center;
        font-size: 16px;
        color: rgb(30, 30, 30);
        font-weight: 600;
      }
      .item-right {
        cursor: pointer;
      }
    }
    .item-wrapper {
      flex: 1;
      .item-content {
        font-size: 15px;
        display: flex;
        justify-content: space-between;
        .el-statistic {
          --el-statistic-title-font-size: 16px;
          --el-statistic-content-font-size: 20px;
          .el-statistic__head {
            margin-bottom: 10px;
          }
        }
      }
    }
  }

  .green {
    color: var(--el-color-success);
  }
  .red {
    color: var(--el-color-error);
  }
}
</style>
