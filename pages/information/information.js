// pages/information/information.js
const DB = wx.cloud.database();
const _ = DB.command;
const contentDB = wx.cloud.database().collection("content");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        header: [],
        choice: -1,
        keyword: '',
        searchRes: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        contentDB.get({
            success: res => {
                // console.log(res);
                var tmp = []
                for (let i = 0; i < res.data.length; i++) {
                    tmp.push(res.data[i].topic)
                }
                that.setData({
                    header: tmp
                })
            }
        })
    },

    getKeyWord(e) {
        console.log(e.detail.value);
        this.setData({
            keyword: e.detail.value
        })
    },

    goSearch() {
        var that = this
        contentDB.where({
            text: DB.RegExp({
                regexp: that.data.keyword,
                options: 'i'
            })
        }).get({
            success: res => {
                if(res.data.length == 0) {
                  wx.showToast({
                    title: '暂无相关资料',
                    icon: 'error'
                  })
                  return
                }
                console.log(res.data);
                var tmpList = [];
                for(let i = 0; i < res.data.length; i++) {
                    tmpList[i] = res.data[i].textnum
                }
                that.setData({
                  searchRes: tmpList
                })
                that.showSearchResult();
              }
        })
        that.setData({
            keyword: ''
        })
    },

    showSearchResult() {
        wx.navigateTo({
          url: '/pages/detail/detail?search=1&searchRes=' + this.data.searchRes,
        })
    },

    getCard(e) {
        var that = this;
        that.setData({
            choice: e.target.dataset.index + 1
        })
        console.log(that.data.choice);
        wx.navigateTo({
            url: '/pages/detail/detail?choice=' + that.data.choice,
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