<template>
  <div class="add">
    <!-- 左边部分 -->
    <div class="add-left">
      <!-- 主题框 -->
      <div class="theme">
        <div class="title">
          <label for="input-title">主 题</label>
        </div>
        <input
          v-model="data.title"
          class="input"
          id="input-title"
          placeholder="输入主题"
        />
      </div>
      <!-- 富文本框 -->
      <div class="rich-text">
        <Editor v-model="data.content" class="editor" />
      </div>
      <!-- 按钮部分 -->
      <div class="button">
        <el-popconfirm title="是否确认发送？" @confirm="confirmEvent">
          <template #reference>
            <el-button>发送</el-button>
          </template>
        </el-popconfirm>
        <el-button @click="SaveDraft">保存草稿</el-button>
        <el-button @click="drawer = true">修改收件人 </el-button>
      </div>
    </div>
    <!-- 右边部分 -->
    <div class="add-right">
      <!-- 展示选中人员 -->
      <div class="roll">
        <div class="recipient" @click="drawer = true">收件人</div>

        <div>
          <el-table :data="Selected">
            <!--  -->
            <el-table-column label="姓名" prop="name" />
            <el-table-column label="性别" prop="gender" />
            <el-table-column label="班级" prop="class" />
            <el-table-column label="状态" prop="state" />
          </el-table>
        </div>
      </div>
      <div class="amend">
        <el-drawer
          v-model="drawer"
          :before-close="handleClose"
          title="修改收件人"
          :with-header="true"
        >
          <perlist />
        </el-drawer>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import perlist from "@/components/PerList.vue";
import Editor from "@/components/Editor.vue";
import { SendAPI, addDraft, updateDraft } from "@/apis/Info.js";
import { setStore } from "@/stores/set.js";
import { InformWay } from "@/stores/inform.js";

const inform = InformWay();
const sendlist = setStore();

const drawer = ref(false); //组件是否打开

//渲染主要内容,标题
const data = ref({
  content: "",
  title: "",
  students_id: [],
});

//草稿箱传过来的信息的IDSelected.value.map
const amendID = ref("");

//接收传过来的人员信息,储存收件人信息
const Selected = ref([]);

//收件人信息
const addRessee = () => {
  //   //将传过来的数据赋值给数组
  Selected.value = JSON.parse(JSON.stringify(sendlist.setflag));
  state(); // 更改状态
  //   //过滤得到ID的数组，用于发送接口
  if (!Selected.value) {
    data.value.students_id = Selected.value.map((obj) => obj.ID);
  }
};

//气泡确认框点击确认
const confirmEvent = () => {
  //调用发送信息的方法
  send();
};

const handleClose = () => {
  drawer.value = false;
  //将传过来的数据赋值给数组
  Selected.value = JSON.parse(JSON.stringify(sendlist.setflag));
  state(); // 更改状态
  data.value.students_id = Selected.value.map((obj) => obj.ID);
};

//点击存入草稿箱
const SaveDraft = async () => {
  if (amendID.value != undefined) {
    if (
      data.value.content == undefined ||
      data.value.title == undefined ||
      data.value.content == "" ||
      data.value.title == ""
    ) {
      ElMessage({
        message: "请输入完成！",
        type: "warning",
      });
    } else {
      ElMessage({
        message: "消息保存成功！",
        type: "success",
      });
      await updateDraft(amendID.value, data.value.title, data.value.content);
      //将全部人都改为未选中状态
      sendlist.allCheck(false);
    }
  } else {
    if (
      data.value.content == undefined ||
      data.value.title == undefined ||
      data.value.content == "" ||
      data.value.title == ""
    ) {
      ElMessage({
        message: "请输入完整！",
        type: "warning",
      });
    } else {
      ElMessage({
        message: "消息保存成功！",
        type: "success",
      });
      await addDraft(data.value.content, data.value.title);
      //将全部人都改为未选中状态
      sendlist.allCheck(false);
      //将传过来的ID赋值给数组
      Selected.value = sendlist.setflag;
    }
  }
};

//取出草稿箱中的信息，渲染到页面
const getDeaft = () => {
  //将草稿箱中传过来的数据渲染到页面
  data.value.content = inform.sketch.content;
  data.value.title = inform.sketch.title;
  amendID.value = inform.sketch.ID;

  //将保存的本地数据改为空，防止下次进入还在
  inform.Anew("");
};

//点击发送,将信息发送到数据库
const send = async () => {
  if (
    data.value.content == undefined ||
    data.value.title == undefined ||
    data.value.content == "" ||
    data.value.title == ""
  ) {
    ElMessage({
      message: "请输入完成！",
      type: "warning",
    });
  } else {
    ElMessage({
      message: "消息发送成功！",
      type: "success",
    });
    await SendAPI(data.value);
    data.value.content = "";
    data.value.title = "";
    //将全部人都改为未选中状态
    sendlist.allCheck(false);
    //将setflag里面的数据全部清空
    Selected.value = sendlist.setflag;
  }
};
// 更改状态
const state = () => {
  // if (!Selected.value)
  Selected.value.forEach((item) => {
    if (item.state == 1) {
      item.state = "已报名";
    } else if (item.state == 2) {
      item.state = "已宣讲";
    } else if (item.state == 3) {
      item.value = "已面试";
    } else if (item.state == 4) {
      item.state = "已通知";
    }
  });
};
onMounted(() => {
  //取出草稿箱中的信息
  getDeaft();
  //获取收件人
  addRessee();
});
</script>

<style lang="scss" scoped>
.add {
  display: flex;
  background-color: #f0f2f5;
  height: 100%;
  justify-content: space-between;
  .add-left {
    background-color: #fff;
    border-radius: 15px;
    width: 72%;
    .theme {
      padding: 30px 0px 10px;
      display: flex;
      height: 30px;
      border-bottom: 2px solid #e8eaec;
      .title {
        width: 55px;
        padding: 7px;
      }
      .input {
        width: 100%;
        border: none;
        padding: 18px 10px;
        margin-right: 5px;
      }
      .input:focus {
        outline: none;
      }
    }
  }

  .add-right {
    width: 26%;
    background-color: #fff;
    border-radius: 15px;
    position: relative;
    overflow: hidden;
    .roll {
      overflow: auto;
      height: 90%;
      .recipient {
        cursor: pointer;
        padding: 10px;
        font-weight: 600;
        color: #7a7a7a;
        font-size: 24px;
      }
    }
    .roll::-webkit-scrollbar {
      /* 对应纵向滚动条的宽度 */
      width: 5px;
      /* 对应横向滚动条的宽度 */
      height: 5px;
    }

    /* 滚动条上的滚动滑块 */
    .roll::-webkit-scrollbar-thumb {
      background-color: #e3e4e4;
      border-radius: 32px;
    }

    /* 滚动条轨道 */
    .roll::-webkit-scrollbar-track {
      background-color: #ffffff;
      border-radius: 32px;
    }
  }
  .button {
    padding: 10px;
    padding-top: 50px;
  }
  .rich-text {
    margin-top: 15px;
    height: 70%;
    width: 100%;
  }
}
</style>
