// app.js
App({
    onLaunch() {
        // 展示本地存储能力
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 初始化云环境
        wx.cloud.init({
                env: "cloud1-4gaipt62bd15a377",
                traceUser: true
            }),

            // 登录
            wx.login({
                success: res => {
                    // 发送 res.code 到后台换取 openId, sessionKey, unionId
                }
            }),

            // 云函数获取用户信息
            wx.cloud.callFunction({
                name: 'get_openId',
                success: res => {
                    // console.log(res.result.userInfo);
                    // 获取用户openid
                    this.globalData.user_openid = res.result.userInfo.openId;
                    // console.log("openid:"+this.globalData.user_openid);
                },
            })
    },
    globalData: {
        user_openid: '',
        userInfo: {}
    }
})