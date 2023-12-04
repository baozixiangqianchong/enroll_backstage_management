<!-- 展示信息表格页面 -->
<template>
  <div class="add" style="height: 100%">
    <div class="top">
      <div class="screen">
        <!-- 姓名查找框 -->
        <el-input
          style="width: 200px; height: 34px"
          v-model="search"
          size="small"
          placeholder="姓名查找"
        />
        <!-- 性别选项框 -->
        <div class="sex">
          <el-select
            v-model="sex"
            clearable
            placeholder="性别"
            style="width: 100px"
          >
            <el-option
              v-for="item in genderbox"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <!-- 状态 -->
        <div class="preach">
          <el-select
            v-model="preach"
            clearable
            placeholder="进度"
            style="width: 100px"
          >
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <!-- 页面跳转框 -->
        <div class="send" v-if="deliverydata.length > 0">
          <el-button size="small" @click="transmit"> 发送信息 </el-button>
        </div>
      </div>
      <!-- 列表人数 -->
      <div class="statistics">
        <text> {{ tableData.length }}</text
        >人
      </div>
    </div>
    <!-- 表格信息 -->
    <div class="sheet">
      <div class="xtx-cart-page">
        <div class="container m-top-20">
          <div class="cart">
            <table>
              <thead class="thead">
                <tr>
                  <th width="15">
                    <el-checkbox
                      :model-value="setinter.isAll"
                      @change="allCheck"
                    />
                  </th>
                  <th width="40">头像</th>
                  <th width="150">报名时间</th>
                  <th width="80">姓名</th>
                  <th width="80">性别</th>
                  <th width="120">班级</th>
                  <th width="160">电话</th>
                  <th width="200">
                    <el-tooltip content="报名  面试  通过" placement="top">
                      进度
                    </el-tooltip>
                  </th>
                </tr>
              </thead>
              <!-- 信息列表 -->
              <tbody>
                <tr v-for="i in tableData" :key="i.ID" @click="open(i)">
                  <td>
                    <el-checkbox
                      :model-value="i.flag"
                      @change="(selected) => singCheck(i, selected)"
                      @click.stop
                    />
                    <!--   @click.stop防止冒泡 -->
                  </td>
                  <td class="tc">
                    <el-avatar :size="50" :src="i.avatar">
                      <img :src="i.avatar" />
                    </el-avatar>
                  </td>
                  <td>
                    <div class="tc">
                      <p class="name ellipsis">
                        {{ i.CreatedAt }}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div class="tc">
                      <div>
                        <p class="name ellipsis">
                          {{ i.name }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="tc">
                    <p>{{ i.gender }}</p>
                  </td>
                  <td class="tc">
                    <p>{{ i.class }}</p>
                  </td>
                  <td class="tc">
                    <p class="f16 red">{{ i.phone }}</p>
                  </td>
                  <td class="tc state">
                    <span v-if="i.state <= 2">
                      <el-icon><StarFilled color="red" /></el-icon>
                      <el-icon><Star /> </el-icon>
                      <el-icon><Star /> </el-icon>
                    </span>
                    <span v-if="i.state === 3">
                      <el-icon><StarFilled color="red" /></el-icon>
                      <el-icon><StarFilled color="red" /></el-icon>
                      <el-icon><Star /> </el-icon>
                    </span>
                    <span v-if="i.state > 3">
                      <el-icon><StarFilled color="red" /></el-icon>
                      <el-icon><StarFilled color="red" /></el-icon>
                      <el-icon><StarFilled color="red" /></el-icon>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 个人详情页面 -->
  <el-drawer v-model="drawer" title="个人详情" :with-header="true">
    <div class="person">
      <div class="via">
        <text>头像</text>
        <el-avatar :size="40" :src="perdata.avatar" class="avatar">
          <img :src="perdata.avatar" />
        </el-avatar>
      </div>

      <div class="name"><text>姓名：</text>{{ perdata.name }}</div>
      <div class="name"><text>性别：</text>{{ perdata.gender }}</div>
      <div class="name"><text>班级：</text>{{ perdata.class }}</div>
      <div class="name"><text>电话：</text>{{ perdata.phone }}</div>
      <div class="name"><text>QQ ：</text>{{ perdata.QQ }}</div>
      <div class="name"><text>学号：</text>{{ perdata.student_number }}</div>
      <div class="name"><text>报名时间：</text>{{ perdata.CreatedAt }}</div>
      <div class="name"><text>担任职务：</text>{{ perdata.job }}</div>
      <div class="myself">
        <text>自我介绍：</text>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;{{ perdata.selfIntroduction }}</span>
      </div>
      <div class="name"><text>当前进度：</text>{{ status }}</div>
    </div>
  </el-drawer>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { setStore } from "@/stores/set.js";
import { getDetailInfo } from "@/apis/home.js";
import { Star, StarFilled } from "@element-plus/icons-vue";
const setinter = setStore();
const router = useRouter();

//性别框
const sex = ref("");
//面试情况(状态)
const preach = ref("");
//搜索名称
const search = ref("");
//渲染数据
const tableData = ref([]);
//是否打开弹出框
const drawer = ref(false);
//下拉选项框里的数据
const genderbox = [
  {
    value: "男",
    label: "男",
  },
  {
    value: "女",
    label: "女",
  },
];
const options1 = [
  {
    value: "5",
    label: "待宣讲",
  },
  {
    value: "2",
    label: "已宣讲",
  },
  {
    value: "6",
    label: "待面试",
  },
  {
    value: "3",
    label: "已面试",
  },
  {
    value: "7",
    label: "待录取",
  },
  {
    value: "4",
    label: "已录取",
  },
];

//定义状态数据
const status = ref("");
//向个人信息传送数据
const perdata = ref([]);
//个人信息组件
const open = async (val) => {
  const res = await getDetailInfo(val.ID);

  //改变时间
  const date = new Date(res.data.CreatedAt);
  // 使用toLocaleString方法并传递适当的选项
  res.data.CreatedAt = date.toLocaleString(undefined, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  drawer.value = true;
  perdata.value = res.data;

  if (perdata.value.state == 1) {
    status.value = "已报名";
  } else if (perdata.value.state == 2) {
    status.value = "已宣讲";
  } else if (perdata.value.state == 3) {
    status.value = "已面试";
  } else if (perdata.value.state == 4) {
    status.value = "已通知";
  }
};

//复选框选中的人的储存信息
let deliverydata = ref([]);

//发送信息，跳转页面
const transmit = () => {
  router.push({
    path: "/recruit/word",
  });
};

let timerId; // 用于存储定时器标识符

//数据监听
watch(
  [sex, preach, search],
  debounce(([newSex, newPreach, newSearch]) => {
    console.log("变化了", [newSex, newPreach, newSearch]);
    // 向接口传递参数，进行搜索
    setinter.getScreen(sex.value, preach.value, search.value);
    // 设置一个定时器，在1秒后再次调用 AllSignUpAPI() 方法
    timerId = setTimeout(AllSignUpAPI, 1000); // 存储定时器标识符
  }, 100)
);
// 输入框防抖思想
function debounce(fn, delay) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

//页面刷新调接口渲染
const AllSignUpAPI = () => {
  // 将请求数据赋值渲染
  tableData.value = setinter.setInfo;
  deliverydata.value = setinter.setflag;
  clearTimeout(timerId);
};
//单点回调，改变数据
const singCheck = (item, selected) => {
  setinter.singCheck(item.ID, selected);
  AllSignUpAPI();
};
//点击全选
const allCheck = (flag) => {
  setinter.allCheck(flag);
  AllSignUpAPI();
};
onMounted(() => {
  setinter.setData();
  AllSignUpAPI();
});
</script>

<style scoped lang="scss">
.add {
  position: relative;

  .top {
    display: flex;
    justify-content: space-between;
    height: 80px;
    .screen {
      display: flex;
      margin-left: 20px;
      width: 640px;
      align-items: center;
      justify-content: space-around;
      .send {
        width: 100px;
        button {
          width: 100px;
          height: 35px;
          // background-color: #2cc95e;
          font-size: 16px;
        }
      }
    }

    .statistics {
      line-height: 80px;
      margin-right: 40px;
      text {
        padding-right: 6px;
        font-size: 30px;
        font-weight: 700;
      }
    }
  }

  .sheet {
    border-radius: 15px;
    border-top: 1px solid #eceaea;
    height: 80%;
    overflow: auto;
    .xtx-cart-page {
      height: 100%;
      border-radius: 20px;
      .cart {
        background: #fff;
        color: #666;
        border-radius: 20px;

        table {
          border-spacing: 0;
          border-collapse: collapse;
          line-height: 24px;
          width: 100%;
          th,
          td {
            padding: 10px;
            border-bottom: 1px solid #e6e5e5;

            &:first-child {
              text-align: left;
              padding-left: 30px;
              color: #999;
            }
          }
          .state {
            i {
              margin: 0 5px;
            }
          }
          .thead {
            tr {
              background-color: #f7f7f7;
            }
          }
          tr:hover {
            background-color: #f7f7f7;
          }
          th {
            font-size: 16px;
            font-weight: normal;
            line-height: 50px;
          }
        }
      }
      .tc {
        text-align: center;
      }

      .f16 {
        font-size: 16px;
      }

      .action {
        .red {
          font-size: 18px;
          margin-right: 20px;
          font-weight: bold;
        }
      }
    }
  }
  /* 整个滚动条 */
  .sheet::-webkit-scrollbar {
    /* 对应纵向滚动条的宽度 */
    width: 5px;
    /* 对应横向滚动条的宽度 */
    height: 5px;
  }

  /* 滚动条上的滚动滑块 */
  .sheet::-webkit-scrollbar-thumb {
    background-color: #e3e4e4;
    border-radius: 32px;
  }

  /* 滚动条轨道 */
  .sheet::-webkit-scrollbar-track {
    background-color: #ffffff;
    border-radius: 32px;
  }
}

.person {
  div {
    margin: 10px;
    text {
      font-weight: bold;
      color: #272727;
    }
    color: #666;
  }
  .via {
    display: flex;
    align-items: center;
    .avatar {
      margin-left: 15px;
      img {
        padding: 10px;
      }
    }
  }
  .myself {
    text {
      display: block;
    }
  }
}
</style>
