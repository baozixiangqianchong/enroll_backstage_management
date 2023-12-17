<template>
  <!-- 草稿箱页面 -->
  <div class="add">
    <div class="top-all">
      <el-checkbox :model-value="isAll" @change="allCheck" />
      <div class="button">
        <el-button @click="Delete">删除草稿</el-button>
      </div>
    </div>
    <div class="xtx-cart-page">
      <div class="container m-top-20">
        <div class="cart">
          <table>
            <!-- 通知列表 -->
            <tbody>
              <tr v-for="i in draftdata" :key="i.ID" @click="Draft(i)">
                <td>
                  <el-checkbox
                    :model-value="i.is_read"
                    @change="(selected, event) => singCheck(i, selected, event)"
                    @click.stop
                  />
                  <!--   @click.stop防止冒泡 -->
                </td>
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
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getAllDraft, deleteDraft } from "@/apis/Info.js";
import { useRouter } from "vue-router";
import { InformWay } from "@/stores/inform.js";

const inform = InformWay();
const router = useRouter();

//定义渲染变量
const draftdata = ref([]);
//定义跳转页面时传递的变量
const begindata = ref([]);
//定义多选框初始时的状态
const isAll = ref("false");

//初始数据
const draftList = async () => {
  const res = await getAllDraft();
  res.data.forEach((item) => {
    if (item.CreatedAt !== null && item.CreatedAt !== "0001-01-01T00:00:00Z") {
      const date = new Date(item.CreatedAt);
      // 使用toLocaleString方法并传递适当的选项
      item.CreatedAt = item.CreatedAt = date.toLocaleString(undefined, {
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
  begindata.value = res.data;
  Alter();
};

const Alter = () => {
  /**
   * 如果直接让noticeList.value= details.value，只是引用赋值，操作的还是同一个对象
   * 使用 JSON.parse(JSON.stringify(obj)) 进行深拷贝
   */
  draftdata.value = JSON.parse(JSON.stringify(begindata.value));
  //过滤掉换行，和加粗
  draftdata.value.forEach((item) => {
    item.content = item.content
      .replace(/<br\s*\/?>/g, "。 ")
      .replace(/<[^>]+>/g, "");
  });
};

//单点回调，改变数据
const singCheck = (item, selected, event) => {
  item.is_read = selected;
  //得到数据是false的数量
  const Selected_length = draftdata.value.filter(
    (item) => item.is_read === false
  ).length;
  //如果单选框全部为true则，全选框亮，反之不亮
  if (Selected_length <= 0) {
    isAll.value = true;
  } else {
    isAll.value = false;
  }
};
//全选功能
const allCheck = (read) => {
  isAll.value = read;
  draftdata.value.forEach((item) => (item.is_read = read));
};

//删除草稿
const Delete = async () => {
  const trueIDs = draftdata.value
    .filter((item) => item.is_read === true)
    .map((item) => item.ID);
  if (trueIDs.length > 0) {
    let data = { id: trueIDs };
    await deleteDraft(data);
    //重新渲染数据
    draftList();
  }
};

//点击信息，跳转到编辑页面
const Draft = (i) => {
  //将选中的信息保存道本地
  //过滤得到自己想要的数据
  const item = begindata.value.find((item) => item.ID === i.ID);
  //将数据保存本地，跳转页面
  inform.Anew(item);
  router.push("/recruit/word");
};

onMounted(() => {
  draftList();
});
</script>

<style lang="scss" scoped>
.add {
  padding: 0 10px;

  .top-all {
    padding-top: 20px;
    height: 35px;
    padding-left: 30px;
    display: flex;
    .button {
      padding: 0 30px;
    }
  }
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

        th {
          font-size: 16px;
          font-weight: normal;
          line-height: 50px;
        }

        .message {
          padding-left: 30px;
          .title {
            color: #000;
            font-weight: normal;
          }
          .content {
            margin-left: 25px;
            width: 950px;
            white-space: nowrap; /*默认normal 自动换行*/
            overflow: hidden;
            text-overflow: ellipsis; /*默认是clip 超出部分直接切除*/
          }
        }
      }
    }
  }
}
</style>
