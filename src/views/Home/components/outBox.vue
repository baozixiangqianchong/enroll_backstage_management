<template>
  <!-- 已发送信息 -->
  <div class="add">
    <div class="xtx-cart-page">
      <div class="container m-top-20">
        <div class="cart">
          <table>
            <!-- 通知列表 -->
            <tbody>
              <tr v-for="i in noticeList" :key="i.ID" @click="Drawer(i)">
                <td class="tc message">
                  <div class="title">
                    {{ i.title }}
                  </div>
                  <div class="content" v-html="i.content"></div>
                </td>
                <td class="tc">
                  {{ i.CreatedAt }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- 侧边信息详情 -->
    <el-drawer v-model="drawer" title="通知详情" :with-header="true">
      <div>
        <div class="title">
          <span>标题：</span>

          <span> {{ initial.title }}</span>
        </div>
        <div class="content">
          内容：
          <span v-html="initial.content"></span>
        </div>
        <div>收件人</div>
        <div>已读</div>
        <div class="read">
          <div class="demo-type" v-for="item in read" :key="item.ID">
            <div class="oneself">
              <div>
                <el-avatar :size="45" :src="item.avatar">
                  <img :src="item.avatar" />
                </el-avatar>
              </div>
              {{ item.name }}
            </div>
          </div>
        </div>
        <div>未读</div>
        <div class="read">
          <div class="demo-type" v-for="item in unread" :key="item.ID">
            <div class="oneself">
              <div>
                <el-avatar :size="45" :src="item.avatar">
                  <img :src="item.avatar" />
                </el-avatar>
              </div>
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getAllMsg, getDetailsMsg } from "@/apis/Info.js";

//抽屉是否打开
const drawer = ref(false);
//定义渲染数据
const noticeList = ref([]);
//初始数据
const details = ref({});
//信息详情数据
const initial = ref({});
//已读人员数据
const read = ref([]);
//未读人员数据
const unread = ref([]);

const Drawer = async (val) => {
  //得到自己点击的数据
  let data = details.value.find((item) => item.ID === val.ID);
  const res = await getDetailsMsg(data.ID);
  initial.value = res.data;
  //打开抽屉
  drawer.value = true;
  //过滤得到已读和未读的人员数据
  read.value = initial.value.Students.filter((item) => item.is_read === true);
  unread.value = initial.value.Students.filter(
    (item) => item.is_read === false
  );
};

const AllMsg = async () => {
  const res = await getAllMsg();
  details.value = res.data;

  //改变时间
  details.value.forEach((item) => {
    if (item.CreatedAt !== null && item.CreatedAt !== "0001-01-01T00:00:00Z") {
      const date = new Date(item.CreatedAt);
      // 使用toLocaleString方法并传递适当的选项
      item.CreatedAt = date.toLocaleString(undefined, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
    } else {
      // 如果日期为空或默认值，你可以设置为空字符串或其他默认值
      item.CreatedAt = "";
    }
  });
  Alter();
};

const Alter = () => {
  /**
   * 如果直接让noticeList.value= details.value，只是引用赋值，操作的还是同一个对象
   * 使用 JSON.parse(JSON.stringify(obj)) 进行深拷贝
   */
  noticeList.value = JSON.parse(JSON.stringify(details.value));
  //过滤掉换行，和加粗
  noticeList.value.forEach((item) => {
    item.content = item.content
      .replace(/<br\s*\/?>/g, "。 ")
      .replace(/<[^>]+>/g, "");
  });
};

onMounted(() => {
  AllMsg();
});
</script>

<style lang="scss" scoped>
.add {
  padding: 0px 10px;

  .xtx-cart-page {
    height: 100%;
    .cart {
      background: #fff;
      color: #666;
      table {
        border-spacing: 0;
        border-collapse: collapse;
        line-height: 24px;
        width: 100%;
        th,
        td {
          padding: 10px;

          border-bottom: 1px solid #e9e8e8;
          // border-bottom: 1px solid #d31919;
          &:first-child {
            text-align: left;
            padding-left: 30px;
            color: #999;
          }
        }
        tr:hover {
          background-color: #f6f6f6;
        }
        th {
          font-size: 16px;
          font-weight: normal;
          line-height: 50px;
        }
        .ellipsis {
          .name {
            width: 220px;
            white-space: nowrap; /*默认normal 自动换行*/
            overflow: hidden;
            text-overflow: ellipsis; /*默认是clip 超出部分直接切除*/
          }
        }
        .message {
          .title {
            color: #000;
            font-weight: normal;
          }
          .content {
            margin-left: 25px;
            width: 700px;
            white-space: nowrap; /*默认normal 自动换行*/
            overflow: hidden;
            text-overflow: ellipsis; /*默认是clip 超出部分直接切除*/
          }
        }
      }
    }
  }
  .read {
    .demo-type {
      width: 70px;
      display: inline-block;
      padding: 5px;
      .oneself {
        text-align: center;
        width: 70px;
      }
    }
  }
}
</style>
