<template>
  <div class="layout-container">
    <div class="global-search">
      <el-form :model="searchForm">
        <div class="global-form">
          <el-form-item>
            <el-select
              v-model="searchForm.platform"
              placeholder="媒体/名称"
              clearable
              filterable
              remote
              :remote-method="glGetMediaList"
              :loading="glMediaListData.isLoading"
              @focus="glGetMediaList('')"
            >
              <el-option
                v-for="item in glMediaListData.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-button
            :loading="listData.isLoading"
            type="primary"
            @click="handleSearch"
          >
            查询
          </el-button>
        </div>
      </el-form>
    </div>
    <div class="global-model mb-20">
      <el-button
        type="primary"
        @click="openUserModal('ADD')"
      >
        添加媒体
      </el-button>
    </div>
    <div
      v-loading="listData.isLoading"
      class="global-module"
    >
      <el-table
        :data="listData.info"
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
      <el-pagination
        class="mt-20"
        :total="listData.total"
        :page-sizes="[10, 20, 30, 40]"
        v-model:current-page="listData.current"
        v-model:page-size="listData.pageSize"
        layout="total,sizes, prev, pager, next, jumper"
        @size-change="handleSearch"
        @current-change="getList"
      />
    </div>

    <!-- 添加/编辑用户 -->
    <mediaDialog
      ref="mediaDialog"
      :dialog-data="dialogData"
      @submit="getList(listData.current)"
    />

  </div>
</template>

<script lang="ts">
import { h, defineComponent, ref, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getMediaPage } from "@/api/system";
import mediaDialog from "./mediaDialog.vue";;

import { 
  glUseMediaListSelect
} from "@/utils/globalSearchSelect"

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
      info: [],
      pageSize: 10,
      current: 1,
      total: 0
    })
    const getList = async() => {
      try {
        const params = {
          pageSize: listData.pageSize,
          current: listData.current,
          ...listData.searchParams
        };
        listData.isLoading = true;
        const res = await getMediaPage(params);
        listData.info = (res.data.data || []);
        listData.total = res.data.total;
      } catch (error) {
        listData.info = [];
        listData.total = 0;
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
    mediaDialog
  },
  setup(props, ctx) {
    const store = useStore()
    const mediaOptions = store.state.user.mediaOptions;

    const statusOptions = reactive([])
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
      mediaOptions,
      statusOptions,
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
          label: "媒体编码",
          prop: "id"
        },
        {
          label: "媒体名称",
          prop: "mediaName"
        },
        {
          label: "创建时间",
          prop: "createTime",
          width: 160,
        }
      ];
    }
  }
});
</script>
<style lang="scss">

</style>
