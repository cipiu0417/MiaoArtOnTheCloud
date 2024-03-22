// pages/check/check.js
const DB = wx.cloud.database();
const goodsDB = wx.cloud.database().collection("goods");
const cartDB = wx.cloud.database().collection("cart");
const likeDB = wx.cloud.database().collection("like");
const userDB = wx.cloud.database().collection("user");
const app = getApp()

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        topic: '',
        cartList: [],
        likeList: [],
        avatarUrl: defaultAvatarUrl,
        nickName: '微信用户'
    },

    onChooseAvatar(e) {
        const {
            avatarUrl
        } = e.detail
        this.setData({
            avatarUrl,
        })
    },

    sure() {
        var that  = this;
        userDB.where({
            _openid: app.globalData.user_openid
        }).update({
            data: {
                profileSrc: that.data.avatarUrl,
                nickName: that.data.nickName
            }
        })
        wx.navigateBack();
    },

    getNewName(e) {
        // console.log(e.detail.value);
        this.setData({
            nickName: e.detail.value
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options.topic);
        this.setData({
            topic: options.topic
        })
        this.getCart();
        this.getLike();
    },

    getCart() {
        var that = this;
        cartDB.where({
            _openid: app.globalData.user_openid
        }).get({
            success: res => {
                // console.log(res.data);
                var tempList = res.data;
                for (let i = 0; i < res.data.length; i++) {
                    goodsDB.where({
                        goods_id: res.data[i].goods_id
                    }).get({
                        success: res => {
                            // console.log(res.data[0]);
                            tempList[i].name = res.data[0].name;
                            tempList[i].price = res.data[0].price;
                            console.log(tempList);
                            that.setData({
                                cartList: tempList
                            })
                        }
                    })
                }
            }
        })
    },

    getLike() {
        var that = this;
        likeDB.where({
            _openid: app.globalData.user_openid
        }).get({
            success: res => {
                // console.log(res.data);
                var tempList = res.data;
                for (let i = 0; i < res.data.length; i++) {
                    goodsDB.where({
                        goods_id: res.data[i].goods_id
                    }).get({
                        success: res => {
                            // console.log(res.data[0]);
                            tempList[i].name = res.data[0].name;
                            tempList[i].price = res.data[0].price;
                            // console.log(tempList);
                            that.setData({
                                likeList: tempList
                            })
                        }
                    })
                }
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})