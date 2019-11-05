new Vue({
    el: '#friend',
    data() {
        return {
            chosenAddress: null,
            list: [],
            type: 0,
        }
    },
    created() {
        // 获取地址列表
        this.getAddress()
        /**
         * type 判断是从订单进来还是个人中心进来
         */
        var type = JSON.parse(sessionStorage.getItem('address'))
        this.type = type
        console.log('type', type);
    },
    methods: {
        /**
         * 初始化获取地址
         */
        getAddress() {
            // 获取地址列表
            $api.queryAddrList().then((res, req) => {
                this.list = res.data.addressList.map((item) => {
                    if (item.type === '1') {
                        this.chosenAddress = item.id
                    }
                    return item
                })
            })
        },
        onClickLeft(val) {
            $back();
        },
        /**
         * 新增地址
         */
        onAdd() {
            // console.log('新增地址');
            $go({
                path: 'address_edit',
            })
            sessionStorage.removeItem('address_edit');
        },
        /**
         * 编辑
         * @param {*} val 
         */
        onEdit(val) {
            // console.log('编辑地址:', val);
            $go({
                path: 'address_edit',
                key: 'address_edit',
                query: val
            })
        },
        /**
         * //删除地址
         * @param {*} val 
         */
        onRemove(val) {
            console.log('删除地址', val);
            var params = {
                addressId: val.id
            }
            $api.delAddr(params).then(res => {
                if (res.code == 200) {
                    this.getAddress()
                }
                $toast(res);
            })
        },
        /**
         * 默认地址修改
         * @param {*} val 
         */
        onChange(val) {
            console.log('onChange', val);
            var params = {
                addressId: val.id
            }
            $api.setDefault(params).then((res, req) => {
                $toast(res);
            })
        },
        /**下单选择地址后返回对呀的页面
         * 返回所选的地址
         * @param {*} item 
         */
        backAddress(item) {
            if (this.type >= 1) {
                $go({
                    path: 'account',
                    key: 'address',
                    query: item
                })
            }
        }
    }
});