<!-- 收件人组件 -->
<template>
  <div class="xtx-cart-page">
    <div class="container m-top-20">
      <div class="cart">
        <table>
          <thead>
            <tr>
              <th width="1">
                <el-checkbox :model-value="setstore.isAll" @change="allCheck" />
              </th>
              <th width="120">姓名</th>
              <th width="80">性别</th>
              <th width="130">班级</th>
              <th width="110">状态</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in tableData" :key="i.ID">
              <td>
                <el-checkbox
                  :model-value="i.flag"
                  @change="(selected) => singCheck(i, selected)"
                />
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
                <p>{{ i.state }}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { setStore } from "@/stores/set.js";

const setstore = setStore();
const tableData = ref([]);

//页面刷新调接口渲染
const AllSignUpAPI = () => {
  tableData.value = JSON.parse(JSON.stringify(setstore.setInfo));
  state();
};

//单点回调，改变数据
const singCheck = (i, selected) => {
  setstore.singCheck(i.ID, selected);
  tableData.value = JSON.parse(JSON.stringify(setstore.setInfo));
  state();
};
//点击全选
const allCheck = (flag) => {
  setstore.allCheck(flag);
  tableData.value = JSON.parse(JSON.stringify(setstore.setInfo));
  state();
};
// 更改状态
const state = () => {
  if (tableData.value !== undefined)
    tableData.value.forEach((item) => {
      if (item.state == 1) {
        item.state = "已报名";
      } else if (item.state == 2) {
        item.state = "已宣讲";
      } else if (item.state == 3) {
        item.state = "已面试";
      } else if (item.state == 4) {
        item.state = "已通知";
      }
    });
  // console.log("****", tableData.value);
};
onMounted(() => {
  AllSignUpAPI();
});
</script>

<style scoped lang="scss">
.xtx-cart-page {
  height: 100%;
  .cart {
    // background: #b3bbc7;
    // color: #fff;

    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;

      th,
      td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;

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
    }
  }

  .tc {
    text-align: center;
  }
}
</style>
