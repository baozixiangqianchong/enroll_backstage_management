<template>
  <!-- 时间安排 -->
  <div class="add">
    <div class="top-input">
      <!-- 类型选框 -->
      <div>
        <el-cascader
          v-model="typedata"
          :options="type"
          placeholder="类型"
          style="width: 130px"
        />
      </div>
      <!-- 场次名称 -->
      <div>
        <el-input
          v-model="sessionName"
          placeholder="场次名"
          style="width: 140px"
        ></el-input>
      </div>
      <!--  面试地点 -->
      <div>
        <el-input
          placeholder="地点"
          v-model="place"
          style="width: 140px"
        ></el-input>
      </div>
      <!-- 时间范围 -->
      <div class="block">
        <!-- <span class="demonstration">时间范围</span> -->
        <el-date-picker
          v-model="time"
          type="datetimerange"
          range-separator="To"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          @change="change"
        />
      </div>
      <!-- 单场时间 -->
      <div class="demonstration">
        <el-input
          v-model="interval"
          placeholder="单场分钟"
          style="width: 90px"
        ></el-input>
      </div>

      <el-button @click="Arrange">获取</el-button>
    </div>
    <div class="create-data">
      <el-table :data="planData" stripe style="width: 100%">
        <el-table-column prop="TimeArrange.visit" label="开始时间" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="gender" label="性别" />
        <el-table-column prop="class" label="班级" />
        <el-table-column prop="phone" label="电话" />
        <el-table-column prop="QQ" label="QQ" />
        <!-- <el-table-column prop="ID" label="修改时间">
          <template v-slot="{ row }">
            <el-button @click="amendTime(row.ID)">修改</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { addArrange } from "@/apis/arrange.js";
// 定义输入的时间间隔
const interval = ref("");
//场次名称
const sessionName = ref("");
//定义面试地点
const place = ref("");
//定义获取的列表数据
const planData = ref([]);

//定义初始的时间
const currentTime = ref(new Date()); // 获取当前时间
const nextHourTime = ref(new Date(currentTime.value)); // 创建当前时间的副本
// 在下一个小时的时间里再加一个小时
nextHourTime.value.setHours(nextHourTime.value.getHours() + 1);
//拼接后面的时区 `+08:00`
const time = ref([currentTime.value, null]);

//修改面试时间
const amendTime = (id) => {
  // console.log(id);
};

//点击确认时间，触发事件
const change = () => {
  //更改时间格式
  // time.value[0] = time.value[0].toISOString().replace("Z", "+08:00");
  // time.value[1] = time.value[1].toISOString().replace("Z", "+08:00");
};

const Arrange = async () => {
  const need_visit = ref(true);
  if (typedata.value[1] == "true") {
    need_visit.value = true;
  } else if (typedata.value[1] == "false") {
    need_visit.value = false;
  }
  time.value[0] = time.value[0].toISOString().replace("Z", "+00:00");
  time.value[1] = time.value[1].toISOString().replace("Z", "+00:00");
  //定义发送的数据
  const sendData = ref({
    type: typedata.value[0],
    start_time: time.value[0],
    end_time: time.value[1],
    once_time: parseInt(interval.value),
    name: sessionName.value,
    place: [place.value],
    need_visit: need_visit.value,
  });
  // //判断sendData是否含义空属性
  const allValues =
    sendData.value.type &&
    sendData.value.start_time &&
    sendData.value.end_time &&
    sendData.value.once_time &&
    sendData.value.name &&
    sendData.value.place &&
    sendData.value.place[0];
  if (allValues) {
    // 不含空值时发起网络请求
    const res = await addArrange(sendData.value);
    if (res.data == null) {
      ElMessage({
        message: "全部安排完啦！",
        type: "warning",
      });
    } else {
      planData.value = res.data[0].Students;
      // 将输入框内的数据清空
      interval.value = "";
      sessionName.value = "";
      place.value = "";
      time.value = [null, null];
      //修改获取到的安排时间
      planData.value.forEach((item) => {
        if (res.data[0].type == "interview") {
          item.TimeArrange.visit = item.TimeArrange.interview;
        }
        const date = new Date(item.TimeArrange.visit);
        // 使用toLocaleString方法并传递适当的选项
        item.TimeArrange.visit = date.toLocaleString(undefined, {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        });
      });
    }
  } else {
    ElMessage({
      message: "信息未填写完整！",
      type: "warning",
    });
  }
};

//定义类型框的数据
const typedata = ref([]);
const type = [
  {
    value: "visit",
    label: "宣讲",
  },
  {
    value: "interview",
    label: "面试",
    children: [
      {
        value: "true",
        label: "已宣讲",
      },
      {
        value: "false",
        label: "未宣讲",
      },
    ],
  },
];
</script>

<style lang="scss" scoped>
.add {
  .top-input {
    padding: 20px;
    width: 1100px;
    display: flex;
    justify-content: space-around;
  }
  .create-data {
    padding-top: 20px;
  }
}
</style>
