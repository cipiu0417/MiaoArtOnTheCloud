// pages/detail/detail.js
const DB = wx.cloud.database();
const _ = DB.command;
const contentDB = wx.cloud.database().collection("content");
// 使用数据库记得设置数据库权限！！！
Page({

    /**
     * 页面的初始数据
     */
    data: {
        choice: 0,
        text: [],
        search: 0,
        searchRes: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        // 对searchRes进行处理，将字符串转换成数组
        var searchRes = [];
        if (options.searchRes) {
            for (let i = 0; i < (options.searchRes.length + 1) / 2;) {
                for (let j = 0; j < options.searchRes.length; j += 2) {
                    searchRes[i] = parseInt(options.searchRes[j]);
                    i++;
                }
            }
        }
        that.setData({
            choice: parseInt(options.choice),
            search: parseInt(options.search),
            searchRes: searchRes
        })
        if (that.data.search == 1) {
            that.getSearchResult();
        } else {
            that.getClickResult();
        }
    },

    getSearchResult() {
        var that = this;
        // 如果是搜索
        if (that.data.search == 1) {
            var tmpList = [];
            for (let i = 0; i < that.data.searchRes.length; i++) {
                contentDB.where({
                        textnum: that.data.searchRes[i]
                    })
                    .get({
                        success: function (res) {
                            console.log(res);
                            for (let j = 0; j < res.data[0].text.length; j++) {
                                tmpList[i + j] = res.data[0].text[j]
                                console.log(tmpList[i + j]);
                            }
                            that.setData({
                                text: tmpList
                            })
                        },
                        fail: function (res) {
                            console.log(666666666666);
                        }
                    })
            }
        }
    },

    getClickResult() {
        var that = this;
        // 如果是正常点击
        contentDB.where({
                textnum: that.data.choice
            })
            .get({
                success: function (res) {
                    that.setData({
                        text: res.data[0].text
                    })
                },
                fail: function (res) {
                    console.log(res);
                }
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
        if (that.data.search == 1) {
            that.getSearchResult();
        } else {
            that.getClickResult();
        }
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