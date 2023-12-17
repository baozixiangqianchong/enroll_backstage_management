<template>
  <!-- 系统首页界面 -->
  <div class="all">
    <div class="left-right">
      <div class="left_side">
        <div class="lcm">
          <!-- 三个模块 -->
          <div class="lcm-junior" style="background-color: #fc9b46">
            <div class="logo">
              <i class="iconfont icon-renqun"></i>
            </div>
            <div class="collect">
              <span class="text">总人数</span>
              <span class="number" style="color: #dc654bda">
                {{ allData.sum }}
              </span>
            </div>
          </div>
          <div class="lcm-junior" style="background-color: #4d84f4">
            <div class="logo">
              <i class="iconfont icon-renqun"></i>
            </div>
            <div class="collect">
              <span class="text">已面试</span>
              <span class="number" style="color: #2e65ef">
                {{ allData.interviewed_num }}
              </span>
            </div>
          </div>

          <div class="lcm-junior" style="background-color: #6bdfcf">
            <div class="logo">
              <i class="iconfont icon-renqun"></i>
            </div>
            <div class="collect">
              <span class="text">已录取</span>
              <span class="number" style="color: #2dcfc0">
                {{ allData.enroll_num }}
              </span>
            </div>
          </div>
        </div>
        <div class="male-female">
          <!-- 饼图 -->
          <div class="female">
            <div class="per">
              <div class="title">男女占比</div>
              <div class="sex">
                <div>
                  <img src="../../../assets/img/nv.png" />
                  <div style="height: 20px"></div>
                  <img src="../../../assets/img/man.png" alt="" />
                </div>

                <div id="career" style="width: 240px; height: 180px"></div>
              </div>
            </div>
            <div class="per">
              <div class="title">各专业占比</div>
              <div class="sex">
                <div id="gender" style="width: 240px; height: 180px"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right_side">
        <div class="wd">
          <!-- 表格数据 -->
          <div class="sheet">
            <el-table :data="tableData" style="width: 95%" height="370">
              <el-table-column prop="type" label="专业" align="center" />
              <el-table-column prop="boy_num" label="男生" />
              <el-table-column prop="girl_num" label="女生" />
              <el-table-column prop="sum" label="总人数" />
              <el-table-column prop="enroll_num" label="录取人数" />
            </el-table>
          </div>
        </div>
      </div>
    </div>

    <div class="flow">
      <div id="area" style="width: 100%; height: 100%"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from "vue";
import echarts from "../../../assets/echarts.js";
import { BySpeciaIty, getSeven } from "@/apis/home.js";

//统计总的报名情况，生成表格
const tableData = ref([]);
const allData = ref({
  sum: "",
  interview: "",
  enroll: "",
});

//饼图男女
const sumdata = ref([]);
//饼图专业
const careerdata = ref([
  { value: 0, name: "男" },
  { value: 0, name: "女" },
]);

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
    chartPiegender.value.setOption(piesumdata.value);
    charArea.value.setOption(areasigndata.value);
  }
};

const piesumdata = ref({
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
    subtext: "",
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
      data: [0, 0, 0, 0, 0, 0, 0],
    },
  ],
});

//获取列表信息
const formData = async () => {
  const res = await BySpeciaIty();
  tableData.value = res.data.filter((item) => item.type != "总");
  allData.value = res.data[0];
  // 使用map方法提取type和sum属性的值
  // 各专业总人数占比
  sumdata.value = tableData.value.map((item) => ({
    value: item.sum,
    name: item.type,
  }));
  // 得到男女
  let additio = tableData.value.map((item) => ({
    girl: item.girl_num,
    boy: item.boy_num,
  }));
  let girl_num = 0;
  let boy_num = 0;
  // 进行计算男女的总数
  additio.forEach((item) => {
    girl_num = girl_num + item.girl;
    boy_num = boy_num + item.boy;
  });
  careerdata.value[0].value = boy_num;
  careerdata.value[1].value = girl_num;
  piesumdata.value.series[0].data = sumdata.value;
  piecareerdata.value.series[0].data = careerdata.value;
  echartsResize();
};

// 获取近七天报名人数
const getSevenDay = async () => {
  //报名人数面积图
  const seven_count = ref([]);
  const seven_days = ref([]);
  const res = await getSeven();
  // 人数数组
  seven_count.value = res.data.map((item) => item.Count);
  // 日期数组
  seven_days.value = res.data.map((item) => formatDatePart(item.Date));
  areasigndata.value.series[0].data = seven_count.value;
  areasigndata.value.xAxis[0].data = seven_days.value;
};

// 转换时间格式
const formatDatePart = (dateTime) => {
  const dateTimeObject = new Date(dateTime);
  const year = dateTimeObject.getFullYear().toString().slice(2); // 获取年份的后两位
  const month = ("0" + (dateTimeObject.getMonth() + 1)).slice(-2); // 获取月份，并确保是两位数
  const day = ("0" + dateTimeObject.getDate()).slice(-2); // 获取日期，并确保是两位数
  // const hours = ("0" + dateTimeObject.getHours()).slice(-2); // 获取小时，并确保是两位数
  // const minutes = ("0" + dateTimeObject.getMinutes()).slice(-2); // 获取分钟，并确保是两位数

  return `${year}-${month}-${day}`;
};

onMounted(() => {
  formData();
  getSevenDay();
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
.all {
  background-color: #f0f2f5;
  height: 100%;
  // width: 100%;
  overflow: auto;
  .left-right {
    display: flex;
    grid-gap: 20px;
  }
  .wd {
    background-color: #fff;
    border-radius: 15px;

    .sheet {
      padding-top: 11px;
      display: flex;
      justify-content: center;
      border-top: 1px solid #eceaea;
      width: 100%;
    }
  }
  .left_side {
    width: 55%;
    height: 100%;

    .lcm {
      display: flex;
      justify-content: space-between;
      background-color: #fff;
      padding: 20px 20px;
      margin-bottom: 20px;
      border-radius: 15px;
      .lcm-junior {
        width: 30%;
        padding: 5px;
        border-radius: 15px;
        display: flex;
        justify-content: space-around;
        align-items: center; /* 垂直居中 */
        .logo {
          padding: 10px;

          i {
            font-size: 60px;
            color: #555555a9;
          }
        }
        .collect {
          padding: 10px;
          span {
            display: block;
          }
          .text {
            font-size: 22px;
            width: 70px;
            color: #ffffffdd;
          }
          .number {
            font-size: 32px;
            font-weight: 600;
            float: right;
            padding: 0 10px;
          }
        }
      }
    }

    .male-female {
      background-color: #fff;
      border-radius: 15px;
      margin-bottom: 20px;

      .female {
        display: flex;
        justify-content: space-around;
        .per {
          .title {
            font-weight: 600;
            font-size: 20px;
            color: #666666f6;
            margin: 8px 0;
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
  .right_side {
    width: 43%;
    height: 100%;
    .copy {
      height: 36%;
    }
  }
}
.flow {
  background-color: #fff;
  border-radius: 15px;
  padding-top: 15px;
  width: 99%;
  height: 320px;
}
</style>
