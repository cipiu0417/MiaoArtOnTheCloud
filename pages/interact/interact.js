// pages/interact/interact.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        deg: 0,
        selectIndex: 2
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    // 圆盘转动控制
    touchStart(e) {
        // console.log("start");
        console.log(e);
        var pointCenter = {
            x: e.currentTarget.offsetLeft,
            y: e.currentTarget.offsetTop,
        }
        var pointStart = {
            x: e.touches[0].pageX,
            y: e.touches[0].pageY
        }
        this.setData({
            pointStart: pointStart,
            pointCenter: pointCenter
        })
    },
    touchMove(e) {
        // console.log("move");
        // console.log(e);
        var pointStart = this.data.pointStart;
        var pointCenter = this.data.pointCenter;
        var pointEnd = {
            x: e.touches[0].pageX,
            y: e.touches[0].pageY
        }
        // console.log(pointStart);
        // console.log(pointEnd);
        var a2 = (pointStart.x - pointEnd.x) * (pointStart.x - pointEnd.x) + (pointStart.y - pointEnd.y) * (pointStart.y - pointEnd.y);
        // console.log((pointStart.y-pointEnd.y));
        var b2 = (pointStart.x - pointCenter.x) * (pointStart.x - pointCenter.x) + (pointStart.y - pointCenter.y) * (pointStart.y - pointCenter.y)
        var c2 = (pointEnd.x - pointCenter.x) * (pointEnd.x - pointCenter.x) + (pointEnd.y - pointCenter.y) * (pointEnd.y - pointCenter.y);
        var cosa = (b2 + c2 - a2) / (2 * Math.sqrt(b2) * Math.sqrt(c2));
        var flag = 1;
        if (pointStart.x - pointEnd.x > 0) flag = -1;
        var deg = Math.acos(cosa);
        // deg = Math.round(deg/45);
        this.setData({
            deg: this.data.deg + flag * deg * 2
        })
    },
    touchEnd(e) {
        // console.log("end");
        // console.log(e);
        var deg = this.data.deg;
        deg = Math.round(deg / 45) * 45;
        this.setData({
            selectIndex: (-(deg / 45 - 2) + 8 * 10000) % 8,
            deg: deg
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