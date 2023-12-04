<template>
  <div class="add">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="招新首页" name="home">
        <!-- 系统首页 -->
        <span class="text">
          &nbsp;&nbsp;&nbsp;
          用来展示招新的数据,包括报名的总人数以及各专业报名的男女人数以及男女比例，通过柱状图和饼图进行展示。
        </span>
      </el-tab-pane>
      <el-tab-pane label="报名信息" name="apply">
        <!-- 报名信息 -->
        <span class="text">
          &nbsp;&nbsp;&nbsp;展示所有报名人员的基本信息，点击个人，可弹出个人详情信息。<br />
          &nbsp;&nbsp;&nbsp;可以根据姓名，性别，以及他的状态进行人员筛选，查找道自己想要的信息。<br />
          &nbsp;&nbsp;&nbsp;进行单选、多选或全选后，点击发送信息，可以之间跳转道邮箱界面进行编辑信息，并展示自己选中的收件人。
        </span>
      </el-tab-pane>
      <el-tab-pane label="信息通知" name="inform">
        <!-- 信息通知 -->
        <span class="text">
          <b>信息通知</b>
          &nbsp;由写邮件、已发送、草稿箱三个部分组成。<br />
          &nbsp;&nbsp;&nbsp;写邮件，即编辑所有发送的信息，以及选择收件人，如果未选择收件人发送信息，即为全部发送。
          <br />
          &nbsp;&nbsp;&nbsp;已发送，即展示发送的所有信息，已发送信息无法删除，点击信息，弹出该条信息的详情页面，可查看内容，收件人，以及收件人是否已读。
          <br />
          &nbsp;&nbsp;&nbsp;草稿箱，即编辑的草稿内容，可对草稿进行删除，点击草稿跳转到——写邮件组件，可对草稿进行从新的操作。
        </span>
      </el-tab-pane>
      <el-tab-pane label="面试管理" name="manage">
        <!-- 面试管理 -->
        <span class="text">
          <b>面试管理</b>
          &nbsp;由时间安排、人员安排、安排记录三部分组成。<br />
          &nbsp;&nbsp;&nbsp;时间安排，即安排报名人员参加宣讲或面试的时间，选择安排类型，场次名称，面试地点，该场面试开始和结束时间以及面试的单场时间，即可一键生成安排的面试表。
          <br />
          &nbsp;&nbsp;&nbsp;人员安排，即对面试官的安排，添加或修改该场面试官的名称。<br />
          &nbsp;&nbsp;&nbsp;安排记录，即一键生成的报名人员安排表，分为，宣讲和面试两个部分。
        </span>
      </el-tab-pane>
      <el-tab-pane label="面试记录" name="record">
        <!-- 面试记录 -->
        <span class="text"> &nbsp;&nbsp;&nbsp;用了记录面试。 </span>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from "vue";
//定义刚开始显示的内容页面
const activeName = ref("home");
</script>

<style lang="scss" scoped>
.add {
  .text {
    color: #666;
  }
}
</style>
