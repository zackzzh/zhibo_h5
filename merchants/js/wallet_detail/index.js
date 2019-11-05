new Vue({
    el: '#friend',
    data() {
        return {
            active: null, //导航索引
            status: 0,
            title: ["待结算金额", "可提现金额"],
            orderList: []
        }
    },
    created() {
        setTimeout(() => {
            this.load({
                status: this.status
            })
        }, 500);
    },

    methods: {
        //返回键
        onClickLeft() {
            if (isIphone) {
                window.webkit.tbback();
            } else {
                window.android.tbback();
            }
        },
        //导航切换
        tabs(value) {
            if (value === 0) {
                this.load({
                    status: 0
                })
            } else {
                this.load({
                    status: 1
                })
            }
        },
        /**
         * 初始化数据
         */
        load(params) {
            $api.queryChargesList(params).then((res) => {
                this.orderList = res.data.chargesList
            })
        }
    }
})