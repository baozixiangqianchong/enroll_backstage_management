<template>
  <el-row class="all">
    <el-col :span="4" class="tree">
      <div style="background-color: #fff">
        <el-input
          v-model="query"
          placeholder="搜索"
          @input="onQueryChanged"
          style="padding: 5px 15px 0"
        />
        <el-tree
          :data="TreeData"
          :props="props"
          :style="{
            'font-size': '14px',
            margin: '0px',
            padding: '10px 15px',
          }"
          @node-click="handleNodeClick"
        />
      </div>
    </el-col>
    <el-col :span="20" class="main-view">
      <div style="float: right; margin: 20px">
        <el-popconfirm title="是否在最后新增一列?" @confirm="handleAddedTrain">
          <template #reference>
            <el-button
              :icon="Plus"
              type="success"
              :disabled="tableData.length == 0"
            >
              新增列
            </el-button>
          </template>
        </el-popconfirm>
        <el-popconfirm title="是否删除最后一列?" @confirm="handleDeleteTrain">
          <template #reference>
            <el-button
              :icon="Delete"
              type="danger"
              :disabled="tableData.length == 0"
            >
              删除列
            </el-button>
          </template>
        </el-popconfirm>
      </div>
      <el-table :data="tableData" :border="true" style="padding-left: 1px">
        <el-table-column prop="name" width="80">
          <template #="scoped">
            <div style="padding-left: 10px">{{ scoped.row.name }}</div>
          </template>
        </el-table-column>

        <el-table-column
          v-for="(item, index) in loading"
          :key="index"
          width="300"
        >
          <template #="scoped">
            <div v-if="scoped.row.Record[index]">
              <Editor
                v-model="scoped.row.Record[index].content"
                mode="default"
                @onBlur="handleBlur(scoped.row.Record[index])"
              />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>
<script setup>
import { Plus, Delete } from "@element-plus/icons-vue";

import {
  Menus,
  InterviewRecord,
  AddedTrain,
  DeleteTrain,
} from "@/apis/home.js";

import {
  sendWebsocket,
  closeWebsocket,
  websocketSend,
} from "@/utils/websocket.js";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Editor } from "@wangeditor/editor-for-vue";

// 树状筛选框
const query = ref("");

//接口返回树状数据
const treeRef = ref([]);

//展示树状组件信息
const TreeData = ref([]);

// 树状数据展示格式
const props = {
  children: "children",
  label: "name",
};

// 展示数据
const tableData = ref([]);

// 评论人的数量
const loading = ref(0);

//场id
const arrangeId = ref();

// 初始化侧边数据
const menus = async () => {
  const res = await Menus(2);
  treeRef.value = res.data;
  TreeData.value = treeRef.value;
};

// 搜搜框
const onQueryChanged = (query) => {
  // includes判断是否包含
  TreeData.value = treeRef.value.filter((item) => item.name.includes(query));
};

//点击树状组件
const handleNodeClick = (data) => {
  showData(data.id);
};

// 请求数据接口方法
const showData = (id) => {
  InterviewRecord(id).then((res) => {
    localStorage.setItem("arrangeId", res.data.id);
    arrangeId.value = res.data.id;
    tableData.value = res.data.Students;
    loading.value = res.data.Students[0].Record.length;
  });
};

onMounted(() => {
  menus();
  sendWebsocket(wsMessage, wsError);
});

//富文本框失去焦点
const handleBlur = (e) => {
  // 发起ws数据
  websocketSend(e);
};

// 监听服务器传来的变化
const wsMessage = (data) => {
  const dataJson = data;
  // 这里写拿到数据后的业务代码
  if (tableData.value.length !== 0) {
    console.log(tableData.value);
    tableData.value
      .flatMap((innerArray) => innerArray)
      .forEach((element) => {
        element.Record.forEach((a) => {
          console.log(dataJson.arrange_id, a.arrange_id);
          if (
            dataJson.arrange_id == a.arrange_id &&
            dataJson.content_id == a.content_id &&
            dataJson.student_id == a.student_id
          ) {
            a.content = dataJson.content;
          }
        });
      });
  }
};

const wsError = () => {
  // 比如取消页面的loading
  console.log("ws连接错误的回调函数");
};

// 页面销毁时关闭ws。因为有可能ws连接接收数据尚未完成，用户就跳转了页面
// 在需要主动关闭ws的地方都可以调用该方法
onBeforeUnmount(() => {
  closeWebsocket();
});

// 新增列
const handleAddedTrain = async () => {
  await AddedTrain(arrangeId.value);
  showData(arrangeId.value);
};

// 删除列
const handleDeleteTrain = async () => {
  await DeleteTrain(arrangeId.value, loading.value - 1);
  showData(arrangeId.value);
};
</script>

<style lang="scss">
.all {
  width: 100%;
  height: 100%;
  background-color: #f0f2f5;
  .tree {
    padding: 0 15px;
  }
  .main-view {
    background-color: #fff;
  }
}

.el-table tbody tr:hover > td {
  background: #ffffff !important;
}
.cell {
  padding: 0px !important;
}
.el-table {
  .el-table__cell {
    padding: 0px !important;
  }
}
</style>

<style src="@wangeditor/editor/dist/css/style.css"></style>
