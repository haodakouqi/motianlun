<template>
  <div class="gl-statistic">
    <div class="statistic-card" v-for="t in props.data" :key="t.label">
      <el-statistic :value="t.value">
        <template #title>
          <div class="statistic-header">
            {{t.label}}
            <!-- <el-tooltip
              effect="dark"
              content="Number of users who logged into the product in one day"
              placement="top"
            >
              <el-icon style="margin-left: 4px" :size="12">
                <Warning />
              </el-icon>
            </el-tooltip> -->
          </div>
        </template>
      </el-statistic>
      <!-- <div class="statistic-footer">
        <div class="footer-item">
          <span>比昨天</span>
          <span class="green">
            24%
            <el-icon>
              <CaretTop />
            </el-icon>
          </span>
        </div>

        <div class="footer-item">
          <el-icon :size="14">
            <ArrowRight />
          </el-icon>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import {
  ArrowRight,
  CaretBottom,
  CaretTop,
  Warning,
} from '@element-plus/icons-vue'
const props = defineProps({
  data: Array
})
</script>

<style lang="scss" scoped>
:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--el-fill-color) !important;
}
.gl-statistic {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  min-height: 110px;
  .el-statistic {
    --el-statistic-content-font-size: 28px;
  }
  
  .statistic-card {
    flex: 1;
    height: 100%;
    padding: 20px;
    border-radius: 4px;
    background-color: var(--el-bg-color-overlay);
    .statistic-header {
      display: inline-flex; 
      align-items: center;
      font-size: 16px;
      margin-bottom: 12px;
      color: #97a8be;
    }
    .statistic-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      font-size: 12px;
      color: var(--el-text-color-regular);
      margin-top: 16px;
      .footer-item {
        display: flex;
        justify-content: space-between;
        align-items: center;

        span:last-child {
          display: inline-flex;
          align-items: center;
          margin-left: 4px;
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
