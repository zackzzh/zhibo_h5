new Vue({
    el: '#friend',
    data() {
        return {
            active: null, //导航索引
            title: ["全部", "待付款", "待发货", "待收货", "已完成", "退款"],
            orderList: [], //订单列表
            status: "", //订单状态
            showPayment: false, //支付凭证显示
            item: {}, //支付凭证对应订单
            fileList: [], //上传支付凭证图片
            showUser: false, //申请退货弹窗
            userRemark: '', //退款说明
        }
    },
    created() {
        setTimeout(() => {
            var url = window.location.href;
            console.log('url', url)
            var urlparams = GetRequest(url)
            if (urlparams.status) {
                this.status = urlparams.status
            } else {
                this.status = null;
                this.active = 0;
            }

            switch (this.status) {
                case 'CY':
                    this.active = 1;
                    break;
                case 'PFX':
                    this.active = 2;
                    break;
                case 'R':
                    this.active = 3;
                    break;
                case 'E':
                    this.active = 4;
                    break;
                case 'STQ':
                    this.active = 5;
                    break;
            }
            var parmas = {
                status: this.status
            }
            this.load(parmas);
        }, 500);
    },
    methods: {
        /**
         * 
         * @param {*} item 
         */
        lookOrder(item) {
            wx.previewImage({
                current: API_BASE_URL + item.account_statement, // 当前显示图片的http链接
                urls: [API_BASE_URL + item.account_statement] // 需要预览的图片http链接列表
            });
        },
        toDetail(item) {
            $go({
                path: 'order_detail',
                key: 'account',
                query: item
            })
        },
        /**
         * 初始化数据
         * @param {*} val 
         */
        load(val) {
            $api.queryList(val).then((res) => {
                console.log('res', res);
                this.orderList = res.data.orderList
            })
        },
        /**
         * 切换订单状态
         * @param {*} index 
         */
        tabs(index) {
            switch (index) {
                case 0:
                    this.load({})
                    this.active = 0;
                    break;
                case 1:
                    this.load({
                        status: 'CY'
                    })
                    this.active = 1;
                    this.status = 'CY'
                    break;
                case 2:
                    this.load({
                        status: 'PFX'
                    })
                    this.active = 2;
                    this.status = 'PFX'
                    break;
                case 3:
                    this.load({
                        status: 'R'
                    })
                    this.active = 3;
                    this.status = 'R'
                    break;
                case 4:
                    this.load({
                        status: 'E'
                    })
                    this.active = 4;
                    this.status = 'E'
                    break;
                default:
                    this.load({
                        status: 'STQ'
                    })
                    this.active = 5;
                    this.status = 'STQ'
                    break;
            }
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
            this.item = item;
        },
        /**
         * 上传支付凭证
         */
        confirmPayment() {
            var params = {
                orderNo: this.item.orderNo,
                userPaymentPic: this.fileList[0].content
            }
            $api.uploadPaymentPic(params).then((res) => {
                //做些什么
                this.showPayment = false;
                this.fileList = []
                $toast(res);
                var data = {
                    status: this.status
                }
                this.load(data)
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
                $toast(res);
                var params = {
                    status: this.status
                }
                this.load(params)
                //做些什么
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
                    var params = {
                        status: this.status
                    }
                    this.load(params)

                })
            }).catch(() => {});
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
                this.fileList = [];
                this.userRemark = '';
                var params = {
                    status: this.status
                }
                this.load(params)
            })
        },
        /**
         * 申请退货
         * @param {*} item 
         */
        returnGoods(item) {
            this.item = item;
            this.showUser = true
        },
        /**
         * 返回键
         * @param {*} val 
         */
        onClickLeft(val) {
            console.log('vla', val);
            if (isIphone) {
                window.webkit.tbback();
            } else {
                window.android.tbback();
            }
        },
    }
});