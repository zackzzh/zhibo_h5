new Vue({
    el: '#friend',
    data() {
        return {
            amount: '',
            balanceInfo: {},
            bankInfo: {}

        }
    },
    created() {
        setTimeout(() => {
            this.load();
            this.loadBank()
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
        /**
         * 初始化银行账号信息
         */
        loadBank() {
            $api.queryBank().then((res) => {
                this.bankInfo = res.data.bankInfo
                console.log('res', res)
            })
        },
        //返回键
        onClickLeft() {
            $back()
        },
        //提现明细
        onClickRight() {
            $go({
                path: 'withdrawal_record'
            })
        },
        /**
         * 输入框值变化
         */
        accountValue(value) {
            if (value > this.balanceInfo.usableAmount) {
                vant.Toast.fail({
                    message: '输入金额不能大于可提现金额'
                })
                this.amount = ''
            }
        },
        /**
         * 用户申请提现
         */
        apply() {
            var params = {
                amount: this.amount
            }
            $api.apply(params).then((res) => {
                this.load()
                this.amount = ''
                $toast(res)
            })
        }
    }
})