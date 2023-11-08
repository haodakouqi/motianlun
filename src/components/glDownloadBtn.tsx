import { defineComponent, ref, computed } from 'vue'
import { $ExportXLSX } from "@/utils/methods";
import { downloadExcelTemplate } from '@/api/common'
// 状态组件需要使用 defineComponent
export default defineComponent({
  props: {
    downloadData: Object
  },
  setup(props) {
    const isLoading = ref(false)
    const parentData = computed(() => props.downloadData)

    // 导出数据
    const exportTable = async () => {
      try {
        isLoading.value = true;
        const res = await downloadExcelTemplate(parentData.value.type)
        isLoading.value = false;
        $ExportXLSX({
          data: res.data,
          FileName: parentData.value.FileName || '下载模板'
        })
      } catch (error) {
        isLoading.value = false;
      }
    }
    return () => (
      <>
        <el-button
          link
          type="primary"
          loading={isLoading.value}
          onClick={() => exportTable()}
        >
          下载模板
        </el-button>
      </>
    )
  }
})
