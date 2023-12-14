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
        <el-button :icon="Plus" type="success">新增列</el-button>
      </div>
      <el-table :data="tableData" :border="true" style="width: 100%">
        <el-table-column prop="name" width="100" />
        <el-table-column v-for="(item, index) in 2" :key="index" width="300">
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
import { Plus } from "@element-plus/icons-vue";

import { Menus, InterviewRecord } from "@/apis/home.js";

import { sendWebsocket, closeWebsocket } from "@/utils/websocket.js";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Editor } from "@wangeditor/editor-for-vue";

const handleBlur = (e) => {
  console.log("e", e);
  // 防止用户多次连续点击发起请求，所以要先关闭上次的ws请求。
  closeWebsocket();
  // 发起ws请求
  sendWebsocket(
    "ws://39.101.77.206:8181/march/admin/InterviewRecord",
    e,
    wsMessage,
    wsError
  );
};

// 树状数据展示格式
const props = {
  children: "children",
  label: "name",
};

// 树状筛选框
const query = ref("");

//接口返回树状数据
const treeRef = ref([]);

//展示树状组件信息
const TreeData = ref([]);

const menus = async () => {
  const res = await Menus(2);
  treeRef.value = res.data;
  TreeData.value = treeRef.value;
};
const onQueryChanged = (query) => {
  // includes判断是否包含
  TreeData.value = treeRef.value.filter((item) => item.name.includes(query));
};

const tableData = ref([]);

//点击树状组件
const handleNodeClick = (data) => {
  InterviewRecord(data.id).then((res) => {
    localStorage.setItem("arrangeId", res.data.id);
    tableData.value = res.data.Students;
  });
};

onMounted(() => {
  menus();
});

const wsMessage = (data) => {
  const dataJson = data;
  console.log("dataJson", dataJson);
  // 这里写拿到数据后的业务代码
};

const wsError = () => {
  // 比如取消页面的loading
};

const requestWs = (id, index, a) => {
  // 防止用户多次连续点击发起请求，所以要先关闭上次的ws请求。
  closeWebsocket();
  // 跟后端协商，需要什么参数数据给后台
  const arrange_id = localStorage.getItem("arrangeId");
  const obj = {
    arrange_id: Number(arrange_id),
    student_id: id,
    content_id: index,
    content: html.value,
  };
  // 发起ws请求
  sendWebsocket(
    "ws://39.101.77.206:8181/march/admin/InterviewRecord",
    obj,
    wsMessage,
    wsError
  );
};

// 页面销毁时关闭ws。因为有可能ws连接接收数据尚未完成，用户就跳转了页面
// 在需要主动关闭ws的地方都可以调用该方法
onBeforeUnmount(() => {
  closeWebsocket();
});
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
