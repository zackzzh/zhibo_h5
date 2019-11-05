new Vue({
    el: '#friend',
    data() {
        return {
            recordList: [],
            balanceInfo: {} //账户余额信息
        }
    },
    mounted() {
        setTimeout(() => {
            this.load();
            this.queryRecord();
        }, 500);
    },
    methods: {
        /**
         * 初始化数据
         */
        load() {
            $api.query().then((res) => {
                this.balanceInfo = res.data.balanceInfo
            })
        },
        /**
         * 提现记录
         * @param {*} val 
         */
        queryRecord() {
            $api.queryRecord().then((res) => {
                this.recordList = res.data.recordList
            })
        },
        onClickLeft(val) {
            $back();
        },
        /**
         * 跳转新闻详情
         */
        handleDetail(item) {

        }
    }
});