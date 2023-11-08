<template>
  <div class="layout-container">
    <!-- <div class="global-model mb-20">
      <el-button
        type="primary"
        @click="openUserModal('ADD')"
      >
        添加
      </el-button>
    </div> -->
    <div
      v-loading="listData.isLoading"
      class="global-module"
    >
      <el-table
        :data="listData.info"
        row-key="id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column
          v-for="col in tableCol"
          :key="col.prop"
          :prop="col.prop"
          :formatter="col.formatter"
          :label="col.label"
          :width="col.width"
        />
      </el-table>
    </div>

    <!-- 添加/编辑用户 -->
    <!-- <mediaDialog
      ref="mediaDialog"
      :dialog-data="dialogData"
      @submit="getList(listData.current)"
    /> -->

  </div>
</template>

<script lang="ts">
import { h, defineComponent, ref, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getMenuTree } from "@/api/user";
// import mediaDialog from "./mediaDialog.vue";;

import { 
  glUseMediaListSelect
} from "@/utils/globalSearchSelect"
import { MENU_ENUM } from "@/utils/enum";
/**
 * @description: 表格函数
 * @param {*}
 */
function usetable() {
    const searchForm = reactive({
      platform: '',
      name: ''
    })
    const listData = reactive({
      isLoading: false,
      searchParams: {},
      info: []
    })
    const getList = async() => {
      try {
        listData.isLoading = true;
        const res = await getMenuTree();
        listData.info = (res.data || []);
        // listData.total = res.data;
      } catch (error) {
        listData.info = [];
        // listData.total = 0;
      }
      listData.isLoading = false;
    }

    return { searchForm, listData, getList }
}
/**
 * @description: 操作权限
 * @param {*}
 */
function useoperate() {
  const mediaDialog = ref(null)
  const dialogData = ref({})

  const openUserModal = ($type = "ADD", data = {}) => {
    dialogData.value = {
      $type,
      ...data
    }
    mediaDialog.value.visible = true;
  }


  return { 
    dialogData, mediaDialog, openUserModal
  }
}

export default defineComponent({
  components: {
    // mediaDialog
  },
  setup(props, ctx) {
    const { searchForm, listData, getList } = usetable();
    const handleSearch = () => {
      listData.searchParams= {...searchForm}
      listData.current = 1
      getList();
    }

    const { glMediaListData, glGetMediaList } = glUseMediaListSelect();

    const {
    dialogData, mediaDialog, openUserModal
    } = useoperate();


    
    onMounted(() => {
      handleSearch()
    })
    return {
      handleSearch,
      searchForm, listData, getList,
      glMediaListData, glGetMediaList,

      dialogData, mediaDialog, openUserModal
    }
  },
  computed: {
    permissionButtons() {
      return this.$route.meta.permissionButtons || [];
    },
    tableCol() {
      const _this = this;
      return [
        {
          label: "Id",
          prop: "id"
        },
        {
          label: "类型",
          prop: "type",
          formatter: (row:any) => {
            return MENU_ENUM[row.type]?.label || "--";
          }
        },
        {
          label: "中文名",
          prop: "name"
        },
        {
          label: "路由名称",
          prop: "code"
        }
      ];
    }
  }
});
</script>
<style lang="scss">

</style>
