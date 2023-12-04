<template>
  <div>
    <button @click="requstWs">点击发起websocket请求</button>
  </div>
</template>
<script>
import { sendWebsocket, closeWebsocket } from "@/utils/websocket.js";

export default {
  beforeDestroy() {
    // 页面销毁时关闭ws。因为有可能ws连接接收数据尚未完成，用户就跳转了页面
    // 在需要主动关闭ws的地方都可以调用该方法
    closeWebsocket();
  },
  methods: {
    // ws连接成功，后台返回的ws数据，组件要拿数据渲染页面等操作
    wsMessage(data) {
      const dataJson = data;
      console.log(dataJson);
      // 这里写拿到数据后的业务代码
    },
    // ws连接失败，组件要执行的代码
    wsError() {
      // 比如取消页面的loading
    },
    requstWs() {
      // 防止用户多次连续点击发起请求，所以要先关闭上次的ws请求。
      closeWebsocket();
      const obj = {
        arrange_id: 179,
        student_id: 1,
        content_id: 2,
        content: "嘿嘿嘿咸亨v大家好我是小孩子",
        user_id: 1,
      };
      // 发起ws请求
      sendWebsocket(
        "ws://39.101.77.206:8181/march/admin/InterviewRecord",
        obj,
        this.wsMessage,
        this.wsError
      );
    },
  },
};
</script>
