<template>
  <el-row class="all">
    <el-col :span="4" class="tree">
      <div style="background-color: #fff">
        <el-tree
          :data="TreeData"
          :props="props"
          :style="{
            'font-size': '14px',
            margin: '0px',
            padding: '10px 15px',
          }"
          :load="loadNode"
          lazy
          @node-click="handleNodeClick"
        />
      </div>
    </el-col>
    <el-col :span="20" class="main-view">
      <div>
        <div class="sessionName">
          <span class="place">
            <text> 场次名称：</text>
            {{ arrangeData.Name ? arrangeData.Name : "暂无" }}
          </span>
          <span class="place">
            <text>宣讲地点：</text>
            {{ arrangeData.place ? arrangeData.place : "暂无" }}
          </span>
          <div>
            <el-popconfirm title="确认取消吗?" @confirm="cancelPart">
              <template #reference>
                <el-button type="danger" :disabled="ids.length === 0">
                  取消安排
                </el-button>
              </template>
            </el-popconfirm>
          </div>
        </div>

        <div class="sheet">
          <el-table
            :data="arrangeData.Students"
            stripe
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column prop="avatar" label="头像" width="120">
              <template #="scoped">
                <div>
                  <img :src="scoped.row.avatar" alt="" style="width: 80px" />
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="TimeArrange.visit"
              label="宣讲时间"
              width="180"
            >
            </el-table-column>
            <el-table-column prop="name" label="姓名" />
            <el-table-column prop="gender" label="班级" />
            <el-table-column prop="phone" label="电话" />
            <el-table-column prop="QQ" label="QQ" />
          </el-table>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Menus } from "@/apis/home.js";

import { arrangeDetail, cancelField, cancelTime } from "@/apis/arrange.js";

//定义取消数据
const ids = ref([]);
//定义展示数据
const arrangeData = ref([]);
// 定义当前的格式
const type = ref(0);
// 场id
const arrangeId = ref();

// 复选框
const handleSelectionChange = (val) => {
  ids.value = val.map((item) => item.ID);
};

// 树状数据展示格式
const props = {
  children: "children",
  label: "name",
  isLeaf: "leaf",
};

//展示树状组件信息
const TreeData = ref([]);
// 懒加载
const loadNode = async (node, resolve) => {
  if (node.level === 0) {
    return resolve([
      {
        id: 3,
        name: "宣讲",
        type: "",
      },
      {
        id: 2,
        name: "面试",
        type: "",
      },
    ]);
  }
  if (node.level === 1) {
    Menus(node.data.id).then((res) => {
      const newData = res.data.map((item) => {
        return {
          ...item,
          leaf: true,
        };
      });
      resolve(newData);
    });
  }
};

//点击树状组件
const handleNodeClick = async (data) => {
  arrangeId.value = data.id;
  // 不是第一层就请求接口
  if (data.type != "") {
    const res = await arrangeDetail(data.id);
    if (res.data) {
      type.value = 1;
      // 使用toLocaleString方法并传递适当的选项
      res.data.Students.forEach((i) => {
        if (res.data.type == "interview") {
          type.value = 2;
          i.TimeArrange.visit = i.TimeArrange.interview;
        }
        i.TimeArrange.visit = formatDatePart(i.TimeArrange.visit);
      });
    }
    arrangeData.value = res.data;
    if (res.data.Students.length == 0) {
      let arrId = [];
      arrId.push(res.data.id);
      await cancelField(arrId);
      arrangeData.value = null;
    }
  }
};

// 转换时间格式
const formatDatePart = (dateTime) => {
  const dateTimeObject = new Date(dateTime);
  const year = dateTimeObject.getFullYear().toString().slice(2); // 获取年份的后两位
  const month = ("0" + (dateTimeObject.getMonth() + 1)).slice(-2); // 获取月份，并确保是两位数
  const day = ("0" + dateTimeObject.getDate()).slice(-2); // 获取日期，并确保是两位数
  const hours = ("0" + dateTimeObject.getHours()).slice(-2); // 获取小时，并确保是两位数
  const minutes = ("0" + dateTimeObject.getMinutes()).slice(-2); // 获取分钟，并确保是两位数

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

//取消部分安排学生
const cancelPart = async () => {
  await cancelTime(ids.value, type.value, arrangeId.value);
};

onMounted(() => {});
</script>

<style lang="scss" scoped>
.all {
  width: 100%;
  height: 100%;
  background-color: #f0f2f5;
  .tree {
    padding: 0 15px;
  }
  .main-view {
    background-color: #fff;
    .sessionName {
      padding: 15px;
      display: flex;
      .place {
        padding-right: 25px;
        font-size: 23px;
        text {
          font-size: 18px;
          color: #6b6969;
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
