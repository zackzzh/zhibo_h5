new Vue({
    el: '#friend',
    data() {
        return {
            balanceInfo: {},
        }
    },
    created() {
        setTimeout(() => {
            this.load();
        }, 500);
    },

    methods: {
        /**
         * 初始化获取用户余额接口
         */
        load() {
            $api.query().then((res) => {
                this.balanceInfo = res.data.balanceInfo
                console.log('res', res)
            })
        },
        //返回键
        onClickLeft() {
            if (isIphone) {
                window.webkit.tbback();
            } else {
                window.android.tbback();
            }
        },
        //钱包明细
        onClickRight() {
            $go({
                path: 'wallet_detail'
            })
        },
        //提现
        toWithdrawal() {
            $go({
                path: 'withdrawal'
            })
        },
        rules() {
            $go({
                path: 'rules',
                key: 'rules',
                query: {
                    type: 7
                }
            })
        }
    }
})