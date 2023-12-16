import { ElMessage } from "element-plus";
import { userLogin } from '@/stores/user.js';

let websock = null
let messageCallback = null
let errorCallback = null
let wsUrl = "ws://39.101.77.206:8181/march/admin/interviewRecord/InterviewRecord";
// let wsUrl = "ws://yangchengxi.e3.luyouxia.net:11992/march/admin/interviewRecord/InterviewRecord"
// 接收ws后端返回的数据
function websocketonmessage(e) {
    console.log(e, "接收后端返回的数据");
    messageCallback(JSON.parse(e.data))
    // messageCallback(e.data)

}

/**
 * 发起websocket连接
 * @param {Object} agentData 需要向后台传递的参数数据
 */
export function websocketSend(agentData) {
    // 加延迟是为了尽量让ws连接状态变为OPEN   
    setTimeout(() => {
        // 添加状态判断，当为OPEN时，发送消息
        if (websock.readyState === websock.OPEN) { // websock.OPEN = 1 
            // 发给后端的数据需要字符串化
            websock.send(JSON.stringify(agentData))
        }
        if (websock.readyState === websock.CLOSED) { // websock.CLOSED = 3 
            console.log('websock.readyState=3')
            ElMessage.error('ws连接异常，请稍候重试')
            errorCallback()
        }
    }, 500)
}

// 关闭ws连接
function websocketclose(e) {
    // e.code === 1000  表示正常关闭。 无论为何目的而创建, 该链接都已成功完成任务。
    // e.code !== 1000  表示非正常关闭。
    if (e && e.code !== 1000) {
        ElMessage.error('ws连接关闭')
        // errorCallback()
        // // 如果需要设置异常重连则可替换为下面的代码，自行进行测试
        // if (tryTime < 10) {
        //   setTimeout(function() {
        //    websock = null
        //    tryTime++
        //    initWebSocket()
        //    console.log(`第${tryTime}次重连`)
        //  }, 3 * 1000)
        //} else {
        //  ElMessage.error('重连失败！请稍后重试')
        //}
    }
}
// 建立ws连接
function websocketOpen(e) {
    console.log('ws连接成功', e)
}

// 初始化weosocket
export function initWebSocket() {
    if (typeof (WebSocket) === 'undefined') {
        ElMessage.error('您的浏览器不支持WebSocket，无法获取数据')
        return false
    }
    //从pinia获取token数据
    const user = userLogin()
    //按照后端的要求拼接token数据
    const token = `Bearer ${user.userInfo.token}`
    console.log(token);
    // ws请求完整地址
    const requstWsUrl = `${wsUrl}?token=${encodeURIComponent(token)}`
    websock = new WebSocket(requstWsUrl)

    websock.onmessage = function (e) {
        websocketonmessage(e)
    }
    websock.onopen = function () {
        websocketOpen()
    }
    websock.onerror = function () {
        ElMessage.error('ws连接异常，请稍候重试')
        errorCallback()
    }
    websock.onclose = function (e) {
        websocketclose(e)
    }
}

/**
 * 发起websocket请求函数
 * @param {string} url ws连接地址
 * @param {Object} agentData 传给后台的参数
 * @param {function} successCallback 接收到ws数据，对数据进行处理的回调函数
 * @param {function} errCallback ws连接错误的回调函数
 */
export function sendWebsocket(successCallback, errCallback) {
    initWebSocket()
    messageCallback = successCallback
    errorCallback = errCallback
    // websocketSend(agentData)
}

/**
 * 关闭websocket函数
 */
export function closeWebsocket() {
    console.log("关闭链接")
    if (websock) {
        console.log("关闭连");
        websock.close() // 关闭websocket
        websock.onclose() // 关闭websocket
    }
}

