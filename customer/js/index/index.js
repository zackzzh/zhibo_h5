new Vue({
    el: '#friend',
    data() {
        return {
            item: {}
        }
    },
    created() {
        var url = window.location.href;
        var urlparams = GetRequest(url)
        var params = {
            orderNo: urlparams.orderNo
        }
        this.load(params);

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
        //初始化数据
        load(params) {
            $api.queryOrderDetail(params).then((res) => {
                this.item = res.data.orderInfo
                console.log('res', res);
            })
        },
        //立即购买
        buy() {
            $go({
                path: 'account',
                key: 'account',
                query: this.item
            })
        }
    }
})