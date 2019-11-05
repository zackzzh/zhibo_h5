new Vue({
    el: '#friend',
    data() {
        return {
            bankInfo: {}, //获取平台转账银行转账
            address: {}, //获取地址
            total_price: '', //获取总价
            item: {}, //获取订单数据
        }
    },
    created() {
        //订单数据
        var item = JSON.parse(sessionStorage.getItem('account'))
        this.item = item
        //获取默认地址
        var address = JSON.parse(sessionStorage.getItem('bank_transfer')).address
        this.address = address
        //获取默认地址
        var total_price = JSON.parse(sessionStorage.getItem('bank_transfer')).total_price
        this.total_price = total_price
        this.load()
    },
    methods: {
        //返回键
        onClickLeft() {
            $back()
        },
        /**
         * 查询平台的转账银行账号接口
         */
        load() {
            $api.querySysBank().then((res) => {
                this.bankInfo = res.data.bankInfo
                console.log('res', res);
            })
        },
        /**
         * 
         */
        toOrder() {
            $go({
                path: 'orders'
            })
        }
    }
})