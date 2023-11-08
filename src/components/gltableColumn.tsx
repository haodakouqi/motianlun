import { defineComponent, ref, reactive, onMounted } from 'vue'

// 状态组件需要使用 defineComponent
export default defineComponent({
  name: 'gltableColumn',
  props: {
    data: Array
  },
  setup(props) {
    return () => (
      <>
        {
          props.data.map((col: any) => {
            return (
              <el-table-column
                fixed={col.fixed}
                key={col.prop}
                prop={col.prop}
                formatter={col.formatter}
                label={col.label}
                width={col.width}
                min-width={col['min-width']}
                v-slots={col.scopedSlots}
              >
              </el-table-column>
            )
          })
        }
      </>
    )
  }
})
