<template>
  <!-- 系统首页界面 -->
  <div class="add">
    <div class="lcm">
      <!-- 三个模块 -->
      <div class="lcm-junior">
        <div class="collect">
          <span class="text">总人数</span>
          <span class="number" style="color: #1ec468">
            {{ allData.sum }}
          </span>
          <span class="text">人</span>
        </div>
      </div>
      <div class="lcm-junior">
        <div class="collect">
          <span class="text">已面试</span>
          <span class="number" style="color: #fba80a">
            {{ allData.interviewed_num }}
          </span>
          <span class="text">人</span>
        </div>
      </div>
      <div class="lcm-junior">
        <div class="collect">
          <span class="text">已录取</span>
          <span class="number" style="color: #239cfc">
            {{ allData.enroll_num }}
          </span>
          <span class="text">人</span>
        </div>
      </div>
    </div>
    <div class="male-female">
      <!-- 饼图 -->
      <!-- <div class="title">各专业占比</div> -->
      <div class="female">
        <div class="per">
          <h2>男女占比</h2>
          <div class="sex">
            <img src="../../../assets/img/nv.png" />
            <div id="career" style="width: 240px; height: 160px"></div>
          </div>
        </div>
        <div class="per">
          <h2>各专业占比</h2>
          <div class="sex">
            <img src="../../../assets/img/man.png" alt="" />
            <div id="gender" style="width: 240px; height: 160px"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="wd">
      <!-- 表格数据 -->
      <div class="sheet">
        <div class="xtx-cart-page">
          <div class="container m-top-20">
            <div class="cart">
              <table>
                <thead class="thead">
                  <tr>
                    <th>专业</th>
                    <th>男生</th>
                    <th>女生</th>
                    <th>总人数</th>
                    <th>录取人数</th>
                  </tr>
                </thead>
                <!-- 商品列表 -->
                <tbody>
                  <tr v-for="i in tableData" :key="i.ID">
                    <td>
                      <div class="tc">
                        {{ i.type }}
                      </div>
                    </td>
                    <td>
                      <div class="tc">
                        {{ i.boy_num }}
                      </div>
                    </td>
                    <td>
                      <div class="tc">
                        {{ i.girl_num }}
                      </div>
                    </td>
                    <td>
                      <div class="tc">
                        <div>
                          {{ i.sum }}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="tc">
                        <div>
                          {{ i.enroll_num }}
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flow">
      <div id="area" style="width: 600px; height: 360px"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from "vue";
import echarts from "../../../assets/echarts.js";
import { BySpeciaIty } from "../../../apis/home";

//统计总的报名情况，生成表格
const tableData = ref([]);
const allData = ref({
  sum: "",
  interview: "",
  enroll: "",
});

//饼图男女
const genderdata = ref([]);
//饼图专业
const careerdata = ref([]);
//报名人数面积图
const areadata = ref([]);

//定义Echarts
const charPiecareer = ref();
const chartPiegender = ref();
const charArea = ref();

//屏幕大小变化重新加载
window.addEventListener("resize", () => {
  if (charPiecareer.value) {
    charPiecareer.value.dispose();
    chartPiegender.value.dispose();
    charArea.value.dispose();
    // dispose()，Echarts自带的销毁图表实例的方法
    echartsResize();
  }
});
const echartsResize = () => {
  // 使用刚指定的配置项和数据显示图表。
  charPiecareer.value = echarts.init(document.getElementById("career"));
  chartPiegender.value = echarts.init(document.getElementById("gender"));
  charArea.value = echarts.init(document.getElementById("area"));
  if (charPiecareer.value && chartPiegender.value && charArea.value) {
    // 使用刚指定的配置项option和数据显示图表。
    charPiecareer.value.setOption(piecareerdata.value);
    chartPiegender.value.setOption(piegenderdata.value);
    charArea.value.setOption(areasigndata.value);
  }
};

const piegenderdata = ref({
  title: {
    // text: "男女占比",
    fontSize: 10,
    left: "left",
    fontWeight: "bold",
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)",
  },
  legend: {
    orient: "vertical",
    fontSize: 10,
    left: "left",
  },
  series: [
    {
      center: ["60%", "50%"], // 设置图表在容器中的位置为中心
      name: "人数",
      type: "pie",
      radius: ["40%", "80%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 16,
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 0, name: "计科" },
        { value: 0, name: "数据" },
        { value: 0, name: "物联" },
        { value: 0, name: "其他" },
      ],
    },
  ],
});

const piecareerdata = ref({
  title: {
    // text: "各专业占比",
    // subtext: "",
    fontSize: 10,
    left: "center",
    fontWeight: "bold",
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)",
  },
  legend: {
    orient: "vertical",
    fontSize: 10,
    left: "left",
  },
  series: [
    {
      center: ["60%", "50%"], // 设置图表在容器中的位置为中心
      name: "人数",
      type: "pie",
      radius: ["40%", "80%"],
      // avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 16,
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 0, name: "计科" },
        { value: 0, name: "数据" },
        { value: 0, name: "物联" },
        { value: 0, name: "其他" },
      ],
    },
  ],
});

const areasigndata = ref({
  title: {
    text: "近七天报名人数",
    left: "center",
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985",
      },
    },
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
  ],
  yAxis: [
    {
      type: "value",
    },
  ],
  series: [
    {
      name: "Search Engine",
      type: "line",
      stack: "Total",
      label: {
        show: true,
        position: "top",
      },
      areaStyle: {},
      emphasis: {
        focus: "series",
      },
      data: [0, 2, 1, 34, 30, 0, 20],
    },
  ],
});

//获取列表信息
const formData = async () => {
  const res = await BySpeciaIty();
  console.log("饼图数据", res.data);
  tableData.value = res.data.filter((item) => item.type != "总");
  allData.value = res.data[0];
  // 使用map方法提取type和sum属性的值
  genderdata.value = tableData.value.map((item) => ({
    value: item.boy_num,
    name: item.type,
  }));
  careerdata.value = tableData.value.map((item) => ({
    value: item.girl_num,
    name: item.type,
  }));
  piegenderdata.value.series[0].data = genderdata.value;
  piecareerdata.value.series[0].data = careerdata.value;
  echartsResize();
};

onMounted(() => {
  formData();
});
onUnmounted(() => {
  //跳转页面销毁图表
  if (charPiecareer.value) {
    charPiecareer.value.dispose();
    chartPiegender.value.dispose();
    charArea.value.dispose();
  }
});
</script>

<style lang="scss" scoped>
.add {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  grid-template-rows: 0.5fr 1fr;
  grid-gap: 20px;
  background-color: #f0f2f5;
  height: 100%;
  overflow: auto;

  .wd {
    background-color: #fff;
    border-radius: 15px;

    .sheet {
      border-radius: 15px;
      border-top: 1px solid #eceaea;
      width: 100%;

      .xtx-cart-page {
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
              border-bottom: 1px solid #e6e5e5;
              color: #999;
            }
            tbody {
              tr:hover {
                background-color: #f7f7f7;
              }
            }
            th {
              font-size: 16px;
              font-weight: bold;
              line-height: 30px;
            }
            .thead {
              background-color: #ecf3fe;
            }
          }
        }
        .tc {
          text-align: center;
        }

        .f16 {
          font-size: 16px;
        }
      }
    }
  }
  .flow {
    background-color: #fff;
    border-radius: 15px;
    padding-top: 15px;
  }

  .lcm {
    display: flex;
    list-style-type: none;
    justify-content: space-between;
    justify-items: center;
    align-items: center;
    .lcm-junior {
      width: 31%;
      height: 60%;
      .collect {
        background-color: #5ae5b3;
        display: flex;
        justify-content: center; /* 水平居中 */
        align-items: center; /* 垂直居中 */
        width: 100%;
        height: 100%;
        border-radius: 15px;
        .text {
          font-size: 20px;
          color: #666;
        }
        .number {
          font-size: 32px;
          font-weight: 600;
          padding: 0 5px;
        }
      }
    }
  }
  .male-female {
    background-color: #fff;
    border-radius: 15px;
    .title {
      font-weight: 600;
      font-size: 20px;
      color: #666;
      text-align: center;
      margin: 15px;
    }
    .female {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .per {
        text-align: center;
        h2 {
          margin: 5px;
        }
        .sex {
          display: flex;
          justify-content: space-around;
          align-items: center;
          img {
            margin: 0 10px;
            width: 40px;
            height: 43px;
          }
        }
      }
    }
  }
}
</style>
