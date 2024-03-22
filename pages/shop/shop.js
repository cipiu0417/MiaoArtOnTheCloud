// pages/shop/shop.js
const DB = wx.cloud.database();
const goodsDB = wx.cloud.database().collection("goods");
const cartDB = wx.cloud.database().collection("cart");
const likeDB = wx.cloud.database().collection("like");
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsList: [],
        keyword: '',
        likeClicked: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getGoodsList();
    },

    getGoodsList() {
        var that = this;
        goodsDB.get({
            success: res => {
                // console.log(res);
                var tmp = [];
                for (let i = 0; i < res.data.length; i++) {
                    tmp.push(res.data[i])
                }
                that.setData({
                    goodsList: tmp
                })
                that.getLike();
            }
        })
    },

    getLike() {
        var that = this;
        var tempList = [];
        console.log(that.data.goodsList.length);
        for (let i = 0; i < that.data.goodsList.length; i++) {
            tempList[i] = false;
        }
        // 扫描likeDB，里面有的元素就设为true
        likeDB.where({
            _openid: app.globalData.user_openid
        }).get({
            success: res => {
                for (let i = 0; i < res.data.length; i++) {
                    // console.log(res.data[i].goods_id);
                    tempList[res.data[i].goods_id] = true;
                    // console.log(tempList[res.data[i].goods_id]);
                }
                // console.log(tempList);
                that.setData({
                    likeClicked: tempList
                })
            }
        })
    },

    addToLike(e) {
        var that = this;
        var index = e.currentTarget.dataset.index
        console.log(index);
        // 如果还没有加入收藏夹
        if (!that.data.likeClicked[index]) {
            // goodsDB.where({
            //     goods_id: index
            // }).update({
            //     data: {
            //         isLiked: true
            //     },
            //     success: res=> {
            //         console.log(res);
            //     }
            // })
            var tempList = that.data.likeClicked
            tempList[index] = true
            that.setData({
                likeClicked: tempList
            })
            // 获取当前index对应的商品信息存入cart数据库中
            likeDB.add({
                data: {
                    goods_id: index
                },
                success: res => {
                    wx.showToast({
                        title: '收藏夹添加成功',
                    })
                }
            })

        }
        // 如果已经加入收藏夹，再次点击则从收藏夹中删除
        else if (that.data.likeClicked[index]) {
            // goodsDB.where({
            //     goods_id: index
            // }).update({
            //     data: {
            //         isLiked: false
            //     },
            //     success: res=> {
            //         console.log(res);
            //     }
            // })
            var tempList = that.data.likeClicked
            tempList[index] = false
            that.setData({
                likeClicked: tempList
            })
            // 取消收藏则从cart数据库中删除
            likeDB.where({
                goods_id: index,
                _openid: app.globalData.user_openid
            }).remove({
                success: res => {
                    // console.log('success delete like, goods_id = ' + index);
                    wx.showToast({
                        title: '已取消收藏'
                    })
                }
            })
        }
        that.getGoodsList();
    },

    SaddToLike() {
        wx.showToast({
          title: '搜索页无法收藏',
          icon:'error'
        })
    },

    SbuyRightNow() {
        wx.showToast({
            title: '搜索页无法预定',
            icon:'error'
          })
    },

    buyRightNow(e) {
        // console.log('buy right now');
        var index = e.currentTarget.dataset.index
        console.log(index);
        wx.showModal({
            title: '提示',
            content: '确认预定吗？',
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                    // 获取当前时间
                    var nowDate = new Date((new Date).getTime() + 8 * 60 * 60 * 1000);
                    // 格式化
                    var nowReturnDate = nowDate.toJSON().split('T').join(' ').substr(0, 19);
                    cartDB.add({
                        data: ({
                            goods_id: index,
                            time: nowReturnDate
                        }),
                        success: res => {
                            wx.showToast({
                                title: '预定成功'
                            })
                        }
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },

    getKeyWord(e) {
        this.setData({
            keyword: e.detail.value
        })
    },

    goSearch() {
        var that = this
        goodsDB.where({
            name: DB.RegExp({
                regexp: that.data.keyword,
                options: 'i'
            })
        }).get({
            success: res => {
                if(res.data.length == 0) {
                  wx.showToast({
                    title: '暂无相关商品',
                    icon: 'error'
                  })
                  return
                }
                console.log(res.data);
                var tmpList = [];
                for(let i = 0; i < res.data.length; i++) {
                    tmpList[i] = res.data[i]
                }
                that.setData({
                  goodsList: tmpList
                })
              }
        })
        that.setData({
            keyword: ''
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
        // this.getGoodsList();
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