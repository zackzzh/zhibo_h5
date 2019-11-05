new Vue({
    el: '#friend',
    data() {
        return {
            active: null, //导航索引
            title: ["全部", "待付款", "待发货", "待收货", "已完成", "退款"],
            orderList: [], //订单列表
            status: "P", //订单状态
            item: {}, //发过凭证对应订单
            showPayment: false, //发货凭证显示
            fileList: [], //上传凭证图片
            merchantExpressNo: '', //商家发货物流单号
            showUser: false, //拒绝凭证显示
            merchantRemark: '', //拒绝退货原因
        }
    },
    created() {
        setTimeout(() => {
            var url = window.location.href;
            var urlparams = GetRequest(url)
            if (urlparams && urlparams.status) {
                this.status = urlparams.status
            } else {
                this.status = null;
                this.active = 0;
            }
            switch (this.status) {
                case 'CY':
                    this.active = 1;
                    break;
                case 'P':
                    this.active = 2;
                    break;
                case 'FXR':
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
                key: 'orders_item',
                query: item
            })
        },
        /**
         * 初始化数据
         * @param {*} val 
         */
        load(val) {
            $api.queryList(val).then((res) => {
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
                        status: 'P'
                    })
                    this.active = 2;
                    this.status = 'P'
                    break;
                case 3:
                    this.load({
                        status: 'FXR'
                    })
                    this.active = 3;
                    this.status = 'FXR'
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
         * 
         * 上传发货凭证弹窗
         */
        merchant(item) {
            this.showPayment = true;
            this.item = item;
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
                this.fileList = []
                this.merchantExpressNo = ''
                $toast(res);
                var data = {
                    status: this.status
                }
                this.load(data)
            })
        },

        onClickLeft(val) {
            if (isIphone) {
                window.webkit.tbback();
            } else {
                window.android.tbback();
            }
        },
        /**
         * 
         * 拒绝退货凭证弹窗
         */
        refuse(item) {
            this.showUser = true;
            this.item = item;
        },
        /**
         * 不同意申请退货
         * @param {*} item 
         */
        confirmUser() {
            var sum = ''
            console.log('this.fileList', this.fileList)
            this.fileList.forEach((data, index) => {
                if (this.fileList.length - 1 == index) {
                    sum += (data.content)
                } else {
                    sum += (data.content + '$')
                }
            });
            var params = {
                refuseNo: this.item.refuseNo,
                merchantPic: sum,
                merchantRemark: this.merchantRemark
            }
            $api.uploadRefuseByMerchant(params).then((res) => {
                $toast(res);
                this.fileList = []
                this.merchantRemark = ''
                var params = {
                    status: this.status
                }
                this.load(params)
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
                var data = {
                    status: this.status
                }
                this.load(data)
            })
        }
    }
});