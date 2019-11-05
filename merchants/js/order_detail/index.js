new Vue({
    el: '#friend',
    data() {
        return {
            refuseInfo: {}, //退货信息
            item: {}, //订单信息
            showPaymentPic: false, //支付凭证预览控制
            showmerchantPic: false, //物流凭证预览控制
            showuserPic: false, //申请退货凭证预览控制
            showmerchantPic: false, //商家拒绝退货凭证预览控制
            showPaymentPicImage: [], //支付凭证数据
            showmerchantPicImage: [], //物流凭证数据
            showPayment: false, //发货凭证显示
            fileList: [], //上传凭证图片
            merchantExpressNo: '', //商家发货物流单号
            showUser: false, //拒绝凭证显示
            merchantRemark: '', //拒绝退货原因

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
                this.showPaymentPicImage.push(this.item.userPaymentPic)
                this.showmerchantPicImage.push(this.item.merchantExpressPic)
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
        //返回键
        onClickLeft() {
            $back()
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
        /**
         * 
         * 上传发货凭证弹窗
         */
        merchant() {
            this.showPayment = true;
        },
        /**
         * 上传发货凭证
         */
        confirmPayment() {
            var params = {
                orderNo: this.item.orderNo,
                merchantExpressPic: this.fileList[0].content,
                merchantExpressNo: this.merchantExpressNo
            }
            $api.addExpress(params).then((res) => {
                //做些什么
                this.showPayment = false;
                $toast(res);
                $back()
            })
        },
        /**
         * 
         * 拒绝退货凭证弹窗
         */
        refuse() {
            this.showUser = true;
        },
        /**
         * 不同意申请退货
         * @param {*} item 
         */
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
                refuseNo: this.refuseInfo.refuseNo,
                merchantPic: sum,
                merchantRemark: this.merchantRemark
            }
            $api.uploadRefuseByMerchant(params).then((res) => {
                $toast(res);
                $back()
            })
        },
        /**
         * 同意申请退货
         * @param {*} item 
         */
        confirm(item) {
            var params = {
                refuseNo: item.refuseNo,
            }
            $api.confirmRefuse(params).then((res) => {
                $toast(res);
                $back()
            })
        }
    }
})