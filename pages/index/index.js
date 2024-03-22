// pages/index/index.js
const userDB = wx.cloud.database().collection("user")
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        profileSrc: "",
        userName: "",
        login: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    login() {
        // console.log(111111111111);
        var that = this;
        wx.getUserProfile({
            desc: '获取用户头像和昵称',
            success(res) {
                console.log(res);
                // 设置全局用户信息
                app.globalData.userInfo = res.userInfo

                // 设置局部用户信息
                that.setData({
                    profileSrc: res.userInfo.avatarUrl,
                    userName: res.userInfo.nickName,
                    login: true
                })
                userDB.where({
                    _openid: app.globalData.user_openid
                }).get({
                    success: res => {
                        //原先没有添加，这里添加
                        if (!res.data[0]) {
                            console.log("add");
                            //将数据添加到数据库
                            wx.cloud.database().collection('user').add({
                                data: {
                                    profileSrc: that.data.profileSrc,
                                    nickName: that.data.userName
                                },
                                success: res => {
                                    wx.showToast({
                                        title: '登录成功',
                                        icon: 'none'
                                    })
                                    that.navigateToInformation();
                                }
                            })
                        } else {
                            //已经添加过了
                            that.setData({
                                userInfo: res.data[0]
                            })
                            wx.showToast({
                                title: '登录成功',
                                icon: 'none'
                            })
                            that.navigateToInformation();
                        }
                    }
                })
            }
        })
    },

    navigateToInformation() {
        wx.switchTab({
            url: '/pages/information/information'
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})