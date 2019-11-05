new Vue({
    el: '#friend',
    data() {
        return {
            item: {},
            suggestionTypeList: [], //投诉建议列表
            typeId: null,
            remark: '',
            fileList: []
        }
    },
    created() {
        
        this.load();
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
        load() {
            $api.getSuggestionType().then((res) => {
                this.suggestionTypeList = res.data.suggestionTypeList
            })
        },
        /**
         * 投诉建议选择
         */
        tonext(item) {
            this.typeId = item.id
        },
        /**
         * 意见提交
         */
        comfirm() {
            var sum = ''
            this.fileList.forEach((data, index) => {
                if (this.fileList.length - 1 == index) {
                    sum += (data.content)
                } else {
                    sum += (data.content + '$')
                }
            });
            var params = {
                typeId: this.typeId,
                remark: this.remark,
                imgData: sum,
            }
            $api.addSuggestion(params).then((res) => {
                $toast(res)
                this.typeId = null;
                this.remark = '';
                this.fileList = [];
            })
        }
    }
})