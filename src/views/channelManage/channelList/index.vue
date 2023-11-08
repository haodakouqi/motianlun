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
          <el-form-item>
            <el-select
              v-model="searchForm.channelCode"
              placeholder="渠道编码/名称"
              clearable
              filterable
              remote
              :remote-method="glGetChannelList"
              :loading="glChannelListData.isLoading"
              @focus="glGetChannelList('')"
            >
              <el-option
                v-for="item in glChannelListData.options"
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
        @click="openAddModal('ADD')"
      >
        添加渠道
      </el-button>
    </div>
    <div
      v-loading="listData.isLoading"
      class="global-module"
    >
      <el-table
        :data="listData.info"
      >
        <gltableColumn 
          :data="tableCol"
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
    <channelDialog
      ref="channelDialog"
      :dialog-data="dialogData"
      @submit="getList(listData.current)"
    />

    <!-- 利润设置 -->
    <rebateListDialog
      ref="rebateListDialog"
      :dialog-data="dialogData"
    />

    <!-- 资产授权 -->
    <authAssetsDialog 
      ref="authAssetsDialog"
      :dialog-data="dialogData"
    />
  </div>
</template>

<script lang="tsx">
import { defineComponent, ref, reactive, onMounted,watch } from 'vue'
import { useStore } from 'vuex'
import {
  Edit,
  CreditCard,
} from '@element-plus/icons-vue'
import { getchannelPage } from "@/api/channel";
import channelDialog from "./channelDialog.vue";
import rebateListDialog from "./rebateListDialog.vue";
import authAssetsDialog from "./authAssetsDialog.vue"

import {
  glUseChannelListSelect,
  glUseMediaListSelect
} from "@/utils/globalSearchSelect"

/**
 * @description: 表格函数
 * @param {*}
 */

function usetable() {
    const store = useStore()
    const mediaObj = store.state.user.mediaObj;
    const searchForm = reactive({
      platform: '',
      channelCode: ''
    })
    const listData = reactive({
      isLoading: false,
      searchParams: {},
      info: [],
      pageSize: 10,
      current: 1,
      total: 0
    })
    const getList = async () => {
      try {
        const params = {
          pageSize: listData.pageSize,
          current: listData.current,
          ...listData.searchParams
        };
        listData.isLoading = true;
        const res = await getchannelPage(params);
        listData.info = (res.data.data || []).map(t => {
          const platformList = (t.platforms || []).map(k => {
            return {id: k, mediaName: mediaObj[k] }
          })
          return { ...t, platformList }
        });
        listData.total = res.data.total;
      } catch (error) {
        console.log(`%c listData`, 'color:#4278ff;', error)
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
  const dialogData = ref({})
  
  const channelDialog = ref(null)
  const openAddModal = ($type = "ADD", data = {}) => {
    dialogData.value = {
      $type,
      ...data
    };
    // console.log(`%c qjlog`, 'color:#4278ff;', rebateDialog)
    channelDialog.value.visible = true;
  }

  // 利润设置
  const rebateListDialog = ref(null)
  const openRebateListModal = (data = {}) => {
    dialogData.value = {
      ...data
    };
    // console.log(`%c qjlog`, 'color:#4278ff;', channelDialog)
    rebateListDialog.value.visible = true;
  }

  // 授权客户
  const authAssetsDialog = ref(null)
  const openAuthAssetsDialog = (data = {}) => {
    dialogData.value = {
      ...data
    };
    // console.log(`%c qjlog`, 'color:#4278ff;', customModal)
    authAssetsDialog.value.visible = true;
  }
  return { 
    dialogData, channelDialog, openAddModal, 
    rebateListDialog, openRebateListModal,
    authAssetsDialog, openAuthAssetsDialog
  }
}

export default defineComponent({
  components: {
    channelDialog,
    rebateListDialog,
    authAssetsDialog
  },
  setup(props, ctx) {
    const store = useStore()
    const mediaOptions = store.state.user.mediaOptions;

    const { searchForm, listData, getList } = usetable();

     const {
      dialogData, channelDialog, openAddModal, 
      rebateListDialog, openRebateListModal,
      authAssetsDialog, openAuthAssetsDialog
     } = useoperate();


    
    const handleSearch = () => {
      listData.searchParams= {...searchForm}
      listData.current = 1
      console.log(`%c onMounted`, 'color:#4278ff;', this)
      getList();
    }

    const { glChannelListData, glGetChannelList } = glUseChannelListSelect();
    const { glMediaListData, glGetMediaList } = glUseMediaListSelect();

    watch(() => searchForm.platform, (newVal: any) => {
      glChannelListData.platform = newVal;
    },{ immediate: true })

    onMounted(() => {
      handleSearch()
    })
    return {
      glChannelListData, glGetChannelList,
      glMediaListData, glGetMediaList,
      Edit,
      CreditCard,

      mediaOptions,
      handleSearch,
      searchForm, listData, getList,

      dialogData, channelDialog, openAddModal, 
      rebateListDialog, openRebateListModal,
      authAssetsDialog, openAuthAssetsDialog
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
          label: "渠道编码",
          prop: "channelCode",
          width: 120
        },
        {
          label: "渠道名称",
          prop: "channelName"
        },
        {
          label: "渠道简称",
          prop: "channelAbbName"
        },
        {
          label: "合作媒体",
          prop: "corporationName",
          width: 240,
          formatter: row => {
            return row.platformList.map(t => t.mediaName).join('、');
          }
        },
        // {
        //   label: "类型",
        //   prop: "type",
        //   formatter: row => {
        //     return row.type === 1 ? "系统渠道" : "自定义渠道";
        //   }
        // },
        {
          label: "创建时间",
          prop: "createTime",
          width: 160
        },
        {
          label: "操作",
          prop: "statusDom",
          fixed: "right",
          width: 260,
          scopedSlots: {
            default: (scope: any) => {
              return (
                <> 
                  <el-button
                    type="primary"
                    icon={Edit}
                    link
                    onClick={() => _this.openAddModal('EDIT', scope.row)}
                  >
                    编辑
                  </el-button>
                  <el-button
                    type="primary"
                    icon={Edit}
                    link
                    onClick={() => _this.openAuthAssetsDialog(scope.row)}
                  >
                    授权
                  </el-button>
                  {
                    scope.row.platformList.length ? (
                      <el-button
                        type="primary"
                        icon={CreditCard}
                        link
                        onClick={() => _this.openRebateListModal(scope.row)}
                      >
                        利润设置
                      </el-button>
                    ) : ''
                  }
                </> 
              )
            }
          }
        },
      ];
    }
  }
});
</script>
<style lang="scss">

</style>
