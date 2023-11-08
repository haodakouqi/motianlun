/** 动态路由实现基础组件 */

/** 引入vuex实例 */
import store from '@/store'
/** 引入路由相关的资源 */
import router from '../index'


/** 引入全局Layout组件 */
import Layout from '@/layout/index.vue'
/** 引入多级菜单控制器组件 */
import MenuBox from '@/components/menu/index.vue'
/** 引入带有系统自定义name的组件，方便keep-alive实现 */
// import { createNameComponent } from '../createNode'
/** 引入所有的配置清单 */
import routeComponentPath from './routeComponentPath'
import { noPage } from '../defaultComponent'
import { getMenuApi } from '@/api/user'
import { $isEmpty } from "@/utils/methods";

/** 获取后台模板配置清单 */
const getMenu = async () => {
  const result = await getMenuApi()
  const backRoutes = getComponents(result.data)
  return backRoutes
}

/** 循环取出component */
const getComponents = (data: any[], level = 1, parentPath = "") => {
  const newData: any[] = data.map((item) => {
    const { code, name, children, type, ...last } = item;
    const path = `${parentPath}/${code}`
    if (type === 1 && !$isEmpty(children)) {
      if (level == 1) {
        return {
          ...last,
          path,
          name: code,
          component: Layout,
          children: getComponents(children, level + 1, path),
          "alwayShow": true,
          meta: {
            title: name,
            "icon": "sfont system-page"
          },
        }
      } else {
        return {
          ...last,
          path,
          name: code,
          component: MenuBox,
          children: getComponents(children, level + 1, path),
          "alwayShow": true,
          meta: {
            title: name,
            "icon": "sfont system-page"
          },
        }
      }
    } else {
      const component = routeComponentPath[code] || noPage;
      const page = {
        ...last,
        path,
        name: code,
        component,
        meta: {
          title: name,
          "icon": "sfont system-page"
        },
      }
      if (level == 1) {
        return {
          path:'/',
          name: '',
          component: Layout,
          children: [page],
          "alwayShow": true,
          topMenu: true, // 顶级菜单
          meta: {
            title: '',
            "icon": "sfont system-page"
          },
        }
      } else {
        return page
      }
    }
  })
  return newData
}

/**
 * @des 登录了之后会执行这个方法，实现动态路由的功能
 */
export async function getAuthRoutes() {
  // 判断token是否存在，存在则调用添加路由的方法
  const token = localStorage.getItem("token");
  if (token) {
    const data = await getMenu()
    store.commit('user/setResourcesTree', data)
    console.log(`%c permission`, 'color:#4278ff;', store.state.user);

    const addRouteList = []
    
    data.forEach(item => {
      const removeRoute = router.addRoute(item)
      addRouteList.push(removeRoute)
    })
    const noRoute = router.addRoute({
      // 找不到路由重定向到404页面
      path: "/:pathMatch(.*)",
      redirect: "/404",
      meta: { title: '' },
    })
    addRouteList.push(noRoute)
    store.commit('user/setRemoveRouteList', addRouteList)
  }
}
