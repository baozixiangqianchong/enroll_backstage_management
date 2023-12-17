<template>
  <div class="common-layout">
    <el-container>
      <!-- 头部组件 -->
      <el-header style="padding: 0px">
        <div class="header">
          <div class="logo">
            <img
              src="../../assets/img/march.png"
              style="width: 50px; height: 52px"
              alt=""
            />
            <div class="title"><span>三月软件招新后台</span></div>
          </div>

          <div class="login">
            <span>
              <i class="iconfont icon-denglu-copy"></i>
              <text>{{ name }}</text>
            </span>
            <span>
              <i class="iconfont icon-bangzhu"></i>
              <text @click="drawer = true">帮助</text>
            </span>
            <span>
              <i class="iconfont icon-tuichu"></i>
              <el-popconfirm title="是否确认退出?" @confirm="exit">
                <template #reference>
                  <text>退出登录</text>
                </template>
              </el-popconfirm>
            </span>
          </div>
        </div>
        <!-- 侧边展示帮助说明 -->
        <el-drawer v-model="drawer" title="帮助" :with-header="true">
          <help></help>
        </el-drawer>
      </el-header>
      <el-container>
        <!-- 侧边导航栏 -->
        <div class="side">
          <el-aside width="200px">
            <el-col :span="24">
              <el-menu
                class="sidebar-el-menu"
                :default-active="activeValue"
                background-color="#324157"
                text-color="#bfcbd9"
                active-text-color="#20a0ff"
                unique-opened
                router
              >
                <!-- 对items进行遍历 -->
                <template v-for="item in items">
                  <!-- 使用v-if判定是否具有第二级菜单 -->
                  <template v-if="item.subs">
                    <el-sub-menu :index="item.index" :key="item.index">
                      <template #title>
                        <!-- 如果存在第二级菜单，渲染第一级菜单标题 -->
                        <i :class="item.icon"></i>
                        <span>{{ item.title }}</span>
                      </template>

                      <!-- 遍历第二级菜单 -->
                      <template v-for="subItem in item.subs">
                        <!-- 判定是否具有第三级菜单 -->
                        <el-sub-menu
                          v-if="subItem.subs"
                          :index="subItem.index"
                          :key="subItem.index"
                        >
                          <!-- 如果存在第三级菜单，渲染第二级菜单标题 -->
                          <i :class="subItem.icon"></i>
                          <template #title>{{ subItem.title }}</template>

                          <!-- 遍历第三级菜单，并渲染第三级菜单标题 -->
                          <el-menu-item
                            v-for="(threeItem, i) in subItem.subs"
                            :key="i"
                            :index="threeItem.index"
                          >
                            {{ threeItem.title }}
                          </el-menu-item>
                        </el-sub-menu>

                        <!-- 如果不存在第三级菜单，渲染第二级菜单标题 -->

                        <el-menu-item
                          v-else
                          :index="subItem.index"
                          :key="subItem.index"
                        >
                          <!--  -->
                          <i :class="subItem.icon"></i>
                          <span> {{ subItem.title }}</span>
                        </el-menu-item>
                      </template>
                    </el-sub-menu>
                  </template>

                  <!-- 如果不存在第二级菜单，渲染第一级菜单标题 -->
                  <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                      <i :class="item.icon"></i>
                      <span>{{ item.title }}</span>
                    </el-menu-item>
                  </template>
                </template>
              </el-menu>
            </el-col>
          </el-aside>
        </div>
        <!-- 内容展示 -->
        <el-main>
          <div class="main">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { onMounted, watch, ref } from "vue";
//引入API--useRouter
import { useRoute, useRouter } from "vue-router";
//导入需要修改的token变量
import { userLogin } from "@/stores/user";
//引入系统帮助组件
import Help from "@/components/Help.vue";

//筛选路由，让选中的路由高亮
const activeValue = ref("");
//是否打开侧边抽屉
const drawer = ref(false);

//定义route变量接收一下API
const route = useRoute();
const router = useRouter();

//定义用户名变量
const name = ref("");

const user = userLogin();

//侧边导航数据
const items = ref([
  {
    index: "home",
    icon: "iconfont icon-quanbu",
    title: "招新首页",
  },
  {
    index: "crew",
    icon: "iconfont icon-zhaosheng2",
    title: "报名信息",
  },
  {
    index: "1",
    title: "信息通知",
    icon: "iconfont icon-tongzhi",
    subs: [
      {
        index: "word",
        icon: "iconfont icon-youxiang",
        title: "写邮件",
      },
      {
        index: "outbox",
        icon: "iconfont icon-yifasong",
        title: "已发送",
      },
      {
        index: "drafts",
        icon: "iconfont icon-caogaoxiang",
        title: "草稿箱",
      },
    ],
  },
  {
    index: "2",
    title: "面试管理",
    icon: "iconfont icon-peizhiguanli",
    subs: [
      {
        index: "timeplan",
        icon: "iconfont icon-shijian",
        title: "时间安排",
      },
      {
        index: "crewplan",
        icon: "iconfont icon-ziyouanpai",
        title: "人员安排",
      },
      {
        index: "record",
        icon: "iconfont icon-jifei",
        title: "安排记录",
      },
    ],
  },
  {
    index: "interview",
    icon: "iconfont icon-bijiben",
    title: "面试记录",
  },
]);

//点击退出登录
const exit = () => {
  router.push("/");
  ElMessage({
    message: "退出成功！",
    type: "success",
  });
};

onMounted(() => {
  activeValue.value = route.path;
  // 使用 split() 方法将字符串分割为数组
  const parts = activeValue.value.split("/");
  // 获取数组的最后一个元素(对应的路由)
  activeValue.value = parts[parts.length - 1];

  //将用户名赋值给name
  name.value = user.userInfo.username;
});
// 必须写这个监听，有时候path变了，但是检测不到
watch(
  () => route.path,
  () => {
    activeValue.value = route.path;
    // 使用 split() 方法将字符串分割为数组
    const parts = activeValue.value.split("/");
    // 获取数组的最后一个元素,
    activeValue.value = parts[parts.length - 1];
  }
);
</script>

<style lang="scss" scoped>
.common-layout {
  background-color: #f0f2f5;
  height: 100vh;
  overflow: hidden;
  .header {
    background-color: #242f42;
    height: 100%;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
      margin-left: 20px;
      display: flex;
      align-items: center;
      .title {
        font-size: 28px;
        margin: 0 20px;
        font-weight: 600;
      }
    }

    .login {
      margin-right: 50px;
      span {
        margin: 0 5px;
        cursor: pointer;
        i {
          margin: 0 5px;
          color: #fff;
          font-size: 20px;
          font-weight: 600;
        }
      }
    }
  }

  .side {
    background-color: #324157;
    height: 100vh;

    i {
      margin: 8px;
      icon {
        font-size: 20px;
      }
    }
  }

  .main {
    border-radius: 15px;
    height: 85.5vh;
    background-color: #fff;
    // overflow: auto;
    position: relative;
  }
}
</style>
