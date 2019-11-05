new Vue({
    el: '#friend',
    data() {
        return {
            checked: false,
            message: '',
            show: false,
            payRadio: '1',
            showAddress: false,
            item: {},
            address: {},
            JianBaoInfo: '', //鉴宝内容
            totalPrice: '',
            isIdentify: '0', //是否需要鉴宝费，0不需要1需要
        }
    },
    created() {
        this.loadJianBao();
        //订单数据
        var item = JSON.parse(sessionStorage.getItem('account'))

        //获取默认地址
        var address = JSON.parse(sessionStorage.getItem('address'))
        if (address && address.id) {
            this.address = address
        } else {
            this.loadAddress();
        }
        if (item.isIdentify === '0') {
            this.checked = false
            this.isIdentify = '0'
            //初始化金额
            this.totalPrice = item.priceGoods + item.pricePurchase
        } else {
            this.checked = true
            this.isIdentify = '1'
            //初始化金额
            this.totalPrice = item.priceGoods + item.pricePurchase + item.priceIdentify
        }
        this.item = item;
        //获取鉴宝基础数据
    },
    methods: {
        //返回键
        onClickLeft() {
            $back()
        },
        //获取用户默认地址
        loadAddress() {
            $api.queryDefaultAddr().then((res) => {
                console.log('res', res);
                this.address = res.data.addressInfo
            })
        },
        //跳转至添加地址
        toAddress() {
            $go({
                path: 'address',
                key: 'address',
                query: 1
            })
        },
        /**
         * 获取鉴宝基础数据
         */
        loadJianBao() {
            $api.JianBao().then((res) => {
                this.JianBaoInfo = res.data.JianBaoInfo.content
            })
        },
        /**
         * 鉴宝宝服务说明
         */
        talk() {
            vant.Dialog.alert({
                title: '鉴宝服务说明',
                message: this.JianBaoInfo
            }).then(() => {});
        },
        /**
         * 确认付款
         */
        pay() {
            switch (this.payRadio) {
                case '1':
                    if (isIphone) {
                        window.webkit.messageHandlers.weChatPay.postMessage({
                            type: "wx",
                            orderNo: this.item.orderNo
                        });
                    } else {
                        window.android.onPaymentType("wx", String(this.item.orderNo));
                    }

                    break;
                case '2':
                    if (isIphone) {
                        window.webkit.messageHandlers.aliPay.postMessage({
                            type: "zfb",
                            orderNo: this.item.orderNo
                        });
                    } else {
                        window.android.onPaymentType("zfb", String(this.item.orderNo));
                    }

                    break;
                default:
                    $go({
                        path: 'bank_transfer',
                        key: 'bank_transfer',
                        query: {
                            total_price: this.totalPrice,
                            address: this.address
                        }
                    })
                    break;

            }
        },
        /**
         * 付款前先提交鉴宝费和地址
         */
        payShow() {
            var params = {
                orderNo: this.item.orderNo,
                mailName: this.address.contactName,
                mailPhone: this.address.contactMobile,
                mailAddress: this.address.fullAddress,
                isIdentify: this.isIdentify
            }
            $api.updateAddrInfo(params).then((res) => {
                if (res.code == 200) {
                    this.show = true;
                }
            })
        },
        /**
         * 鉴宝费多选款
         */
        priceIdentifyChange() {
            if (this.checked) {
                this.totalPrice = this.item.priceIdentify + this.item.priceGoods + this.item.pricePurchase
                this.isIdentify = '1'
            } else {
                this.totalPrice = this.item.priceGoods + this.item.pricePurchase
                this.isIdentify = '0'
            }
        }
    }
})