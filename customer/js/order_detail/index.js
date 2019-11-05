new Vue({
    el: '#friend',
    data() {
        return {
            item: {}, //普通订单详情
            refuseInfo: {}, //退款订单详情
            fileList: [], //上传支付凭证
            showPayment: false, //支付凭证显示
            showPaymentPic: false, //支付凭证预览控制
            showmerchantPic: false, //物流凭证预览控制
            showuserPic: false, //申请退货凭证预览控制
            showmerchantPic: false, //商家拒绝退货凭证预览控制
            showPaymentPicImage: [], //支付凭证数据
            showmerchantPicImage: [], //物流凭证数据
            showUser: false, //申请退货弹窗
            userRemark: '', //退款说明
        }
    },
    created() {
        var item = JSON.parse(sessionStorage.getItem('account'))
        var params = {
            orderNo: item.orderNo
        }
        this.load(params);
    },
    methods: {
        //初始化数据
        load(params) {
            $api.queryOrderDetail(params).then((res) => {
                this.item = res.data.orderInfo
                if (res.data.refuseInfo) {
                    this.refuseInfo = res.data.refuseInfo
                    if (res.data.refuseInfo && res.data.refuseInfo.userPic) {
                        if (res.data.refuseInfo.userPic) {
                            this.refuseInfo.userPic = res.data.refuseInfo.userPic.split(";")
                        }
                        if (res.data.refuseInfo.merchantPic) {
                            this.refuseInfo.merchantPic = res.data.refuseInfo.merchantPic.split(";")
                        }
                    }
                }
            })
        },
        /**
         * 支付凭证预览
         */
        paymentPic() {
            this.showPaymentPic = true
        },
        /**
         * 物流凭证预览
         */
        merchantmentPic() {
            this.showmerchantPic = true
        },
        /**
         * 申请退货凭证预览
         */
        userPic() {
            this.showuserPic = true
        },
        /**
         * 商家拒绝退货凭证预
         */
        merchantPic() {
            this.showmerchantPic = true
        },
        //返回键
        onClickLeft() {
            $back()
        },
        /**
         * 待支付
         * @param {*} item 
         */
        pay(item) {
            $go({
                path: 'account',
                key: 'account',
                query: item
            })
        },
        /**
         * 
         * 上传支付凭证弹窗
         */
        uploadPayment(item) {
            this.showPayment = true;
            this.paymentItem = item;
        },
        /**
         * 上传支付凭证
         */
        confirmPayment() {
            var params = {
                orderNo: this.paymentItem.orderNo,
                userPaymentPic: this.fileList[0].content
            }
            $api.uploadPaymentPic(params).then((res) => {
                //做些什么
                this.showPayment = false;
                $toast(res);
                $back()
            })
        },
        /**
         * 取消订单
         * @param {*} item 
         */
        cancel(item) {
            var params = {
                orderNo: item.orderNo,
            }
            $api.cancel(params).then((res) => {
                //做些什么
                $toast(res);
                $back()
            })
        },
        /**
         * 确认收货
         * @param {*} item 
         */
        confirm_goods(item) {
            vant.Dialog.confirm({
                title: '确认收货',
                message: '确认收到这件商品'
            }).then(() => {
                var params = {
                    orderNo: item.orderNo
                }
                $api.confirm(params).then((res) => {
                    $toast(res);
                    $back()
                })
            }).catch(() => {});
        },
        /**
         * 申请退货
         * @param {*} item 
         */
        returnGoods() {
            this.showUser = true
        },

        //退款申请提交
        confirmUser() {
            var sum = ''
            this.fileList.forEach((data, index) => {
                if (this.fileList.length - 1 == index) {
                    sum += (data.content)
                } else {
                    sum += (data.content + '$')
                }
            });
            var params = {
                orderNo: this.item.orderNo,
                userPic: sum,
                userRemark: this.userRemark
            }
            $api.applyRefuse(params).then((res) => {
                $toast(res);
                $back()
            })
        },
    }
})