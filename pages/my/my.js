// pages/my/my.js
const userDB = wx.cloud.database().collection("user")
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        nickname: '',
        profileSrc: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        userDB.where({
            _openid: app.globalData.user_openid
        }).get({
            success: res => {
                // console.log(res);
                that.setData({
                    nickname: res.data[0].nickName,
                    profileSrc: res.data[0].profileSrc
                })
            }
        })
    },
    
    checkCart() {
        // console.log('cart');
        wx.navigateTo({
          url: '/pages/check/check?topic=cart',
        })
    },

    checkLike() {
        // console.log('like');
        wx.navigateTo({
            url: '/pages/check/check?topic=like',
          })
    },

    announce() {
        wx.navigateTo({
            url: '/pages/check/check?topic=announce',
          })
    },

    logOut() {
        wx.showModal({
          title: '提示',
          content: '确定退出登录吗',
          complete: (res) => {
            if (res.cancel) {
              console.log('no');
            }      
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/index/index',
              })
            }
          }
        })
    },

    personalSet() {
        wx.navigateTo({
          url: '/pages/check/check?topic=setting',
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
        var that = this;
        userDB.where({
            _openid: app.globalData.user_openid
        }).get({
            success: res => {
                // console.log(res);
                that.setData({
                    nickname: res.data[0].nickName,
                    profileSrc: res.data[0].profileSrc
                })
            }
        })
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