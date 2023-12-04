<template>
  <div class="add">
    <el-tabs v-model="activeName" type="border-card" class="demo-tabs">
      <el-tab-pane label="宣讲" name="visit">
        <div v-for="item in visitData" :key="item.id">
          <div class="sessionName">
            <span>场次名称：{{ item.Name }}</span>
          </div>
          <div class="place">
            <span>宣讲地点：{{ item.place }}</span>
          </div>
          <div class="sheet">
            <div class="xtx-cart-page">
              <div class="container m-top-20">
                <div class="cart">
                  <table>
                    <thead>
                      <tr>
                        <th class="header" width="50">头像</th>
                        <th class="header" width="205">宣讲时间</th>
                        <th class="header" width="80">姓名</th>
                        <th class="header" width="80">性别</th>
                        <th class="header" width="145">班级</th>
                        <th class="header" width="150">电话</th>
                        <th class="header" width="150">QQ</th>
                        <th class="header" width="150">编辑</th>
                      </tr>
                    </thead>
                    <!-- 商品列表 -->
                    <tbody>
                      <tr v-for="i in item.Students" :key="i.ID">
                        <td class="tc">
                          <el-avatar :size="50" :src="i.avatar">
                            <img :src="i.avatar" />
                          </el-avatar>
                        </td>
                        <td class="tc">
                          <p class="name ellipsis">
                            {{ i.TimeArrange.visit }}
                          </p>
                        </td>
                        <td class="tc">
                          <p class="name ellipsis">
                            {{ i.name }}
                          </p>
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
                        <td class="tc">
                          <p class="f16 red">{{ i.QQ }}</p>
                        </td>
                        <td class="tc">
                          <el-popconfirm title="是否确认取消?">
                            <template #reference>
                              <el-button type="danger" link>取消安排</el-button>
                            </template>
                          </el-popconfirm>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="面试" name="initerview">
        <div v-for="item in interviewData" :key="item.id">
          <div class="sessionName">
            <span>场次名称：{{ item.Name }}</span>
          </div>
          <div class="place">
            <span>面试地点：{{ item.place }}</span>
          </div>
          <div class="sheet">
            <div class="xtx-cart-page">
              <div class="container m-top-20">
                <div class="cart">
                  <table>
                    <thead>
                      <tr>
                        <th class="header" width="50">头像</th>
                        <th class="header" width="175">面试时间</th>
                        <th class="header" width="80">姓名</th>
                        <th class="header" width="80">性别</th>
                        <th class="header" width="145">班级</th>
                        <th class="header" width="150">电话</th>
                        <th class="header" width="150">QQ</th>
                        <th class="header" width="150">编辑</th>
                      </tr>
                    </thead>
                    <!-- 商品列表 -->
                    <tbody>
                      <tr v-for="i in item.Students" :key="i.ID">
                        <td class="tc">
                          <el-avatar :size="50" :src="i.avatar">
                            <img :src="i.avatar" />
                          </el-avatar>
                        </td>
                        <td class="tc">
                          <p class="name ellipsis">
                            {{ i.TimeArrange.interview }}
                          </p>
                        </td>
                        <td class="tc">
                          <p class="name ellipsis">
                            {{ i.name }}
                          </p>
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
                        <td class="tc">
                          <p class="f16 red">{{ i.QQ }}</p>
                        </td>
                        <td class="tc">
                          <el-popconfirm title="是否确认取消?">
                            <template #reference>
                              <el-button type="danger" link>取消安排</el-button>
                            </template>
                          </el-popconfirm>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getArrange } from "@/apis/home.js";

//定义渲染数据
const showData = ref([]);
//定义宣讲数据
const visitData = ref([]);
//定义面试数据
const interviewData = ref([]);
//定义初始选项卡的选中
const activeName = ref("visit");

//声明获取初始数据的方法
const Arrange = async () => {
  const res = await getArrange();
  //修改获得的数据时间格式
  res.data.forEach((item) => {
    // 使用toLocaleString方法并传递适当的选项
    item.Students.forEach((i) => {
      const begin = new Date(i.TimeArrange.interview);
      const plan = new Date(i.TimeArrange.visit);
      i.TimeArrange.interview = begin.toLocaleString(undefined, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
      i.TimeArrange.visit = plan.toLocaleString(undefined, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
    });
  });

  // 过滤得到宣讲和面试的数据
  visitData.value = res.data.filter((item) => item.type == "visit");
  interviewData.value = res.data.filter((item) => item.type === "interview");
};
onMounted(() => {
  Arrange();
});
</script>

<style lang="scss" scoped>
.add {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: auto;
  border-radius: 15px;
  .demo-tabs {
    .sessionName {
      padding: 10px;
      font-size: 22px;
    }
    .place {
      padding: 10px;
      font-size: 22px;
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
            .header {
              font-weight: 600;
              color: #909399;
            }
            border-spacing: 0;
            border-collapse: collapse;
            line-height: 24px;
            width: 100%;
            th,
            td {
              padding: 10px 10px;
              border-bottom: 1px solid #e6e5e5;

              &:first-child {
                text-align: left;
                padding-left: 30px;
                color: #999;
              }
            }
            thead {
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

        .goods {
          > div {
            width: 150px;
            font-size: 16px;
            padding-left: 10px;
          }
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
  }
}
/* 整个滚动条 */
.add::-webkit-scrollbar {
  /* 对应纵向滚动条的宽度 */
  width: 5px;
  /* 对应横向滚动条的宽度 */
  height: 5px;
}

/* 滚动条上的滚动滑块 */
.add::-webkit-scrollbar-thumb {
  background-color: #e3e4e4;
  border-radius: 32px;
}

/* 滚动条轨道 */
.add::-webkit-scrollbar-track {
  background-color: #ffffff;
  border-radius: 32px;
}
</style>
