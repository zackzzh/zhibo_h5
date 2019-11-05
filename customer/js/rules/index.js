new Vue({
    el: '#friend',
    data() {
        return {
            title: '', //标题
            type: '', //接口类型
            termsInfo: {} //基础数据
        }
    },
    created() {
        // 查询系统相关协议接口，传入参数：type（=1用户注册协议,=2商家入驻条款,=3购买帮助,=4商家使用帮助,=5我的公益,=6关于天宝,=7提现规则）；返回：content协议内容
        setTimeout(() => {
            var url = window.location.href;
            var urlparams = GetRequest(url)
            if (urlparams && urlparams.type) {
                this.type = urlparams.type
            }
            var options = JSON.parse(sessionStorage.getItem('rules'))
            if (options && options.type) {
                this.type = options.type
            }
            switch (Number(this.type)) {
                case 1:
                    this.title = '用户注册协议'
                    break;
                case 2:
                    this.title = '商家入驻条款'
                    break;
                case 3:
                    this.title = '购买帮助'
                    break;
                case 4:
                    this.title = '商家使用帮助'
                    break;
                case 5:
                    this.title = '我的公益'
                    break;
                case 6:
                    this.title = '关于天宝'
                    break;
                case 7:
                    this.title = '提现规则'
                    break;
            }
            this.load({
                type: this.type
            })
        }, 500);
    },

    methods: {
        //返回键
        onClickLeft() {
            if (this.type == 7) {
                $back()
                sessionStorage.removeItem('rules')
            } else {
                if (isIphone) {
                    window.webkit.tbback();
                } else {
                    window.android.tbback();
                }
            }
        },
        /**
         * 初始化规则数据
         */
        load(type) {
            $api.sysTerms(type).then((res) => {
                this.termsInfo = res.data.termsInfo
            })
        }
    }
})