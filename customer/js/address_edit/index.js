new Vue({
    el: '#friend',
    data() {
        return {
            form: {},
            areaList, //地区列表
            searchResult: [],
            checked: false,
            addressInfo: {},
            showPopup: false,
            isEdit: false,
            isProvince: false, //省弹窗控制
            actionsProvince: [], //省数据
            isCity: false, //城市弹窗控制
            actionsCity: [], //城市数据
            isArea: false, //区弹窗控制
            actionsArea: [], //区数据
            isStree: false, //街道弹窗控制
            actionsStree: [], //街道数据
        }
    },
    created() {
        const value = JSON.parse(sessionStorage.getItem("address_edit"));
        console.log('value', value);
        if (value) {
            var params = {
                addressId: value.id
            };
            setTimeout(() => {
                $api.queryAddrDetail(params).then((res) => {
                    console.log('res', res);
                    this.isEdit = true
                    this.addressInfo = res.data.addressInfo
                    this.checked = Number(res.data.addressInfo.type)
                })
            }, 300);
        }
    },
    methods: {
        load(params) {

        },
        /**
         * 省选择
         */
        provinceHandle() {
            $api.getProvinceList().then((res) => {
                console.log('res', res);
                this.actionsProvince = res.data.provinceList
                this.isProvince = true;
            })
        },
        //省确定并且获取城市数据
        onProvinceSelect(val) {
            console.log('val', val);
            this.addressInfo.provinceName = val.name
            this.addressInfo.provinceCode = val.code
            this.addressInfo.cityName = ''
            this.addressInfo.cityCode = ''
            this.addressInfo.areaName = ''
            this.addressInfo.areaCode = ''
            this.addressInfo.streetName = ''
            this.addressInfo.streetCode = ''
            this.actionsCity = [];
            this.actionsArea = [];
            this.actionsStree = [];
            var params = {
                provinceCode: val.code
            }
            $api.getCityListByProvince(params).then((res) => {
                this.actionsCity = res.data.cityList
                this.isProvince = false;
            })
        },
        /**
         * 城市选择
         */
        cityHandle() {
            this.isCity = true;
        },
        //城市确定并且获取区数据
        onCitySelect(val) {
            console.log('val', val);
            this.addressInfo.cityName = val.name
            this.addressInfo.cityCode = val.code
            this.addressInfo.areaName = ''
            this.addressInfo.areaCode = ''
            this.addressInfo.streetName = ''
            this.addressInfo.streetCode = ''
            this.actionsArea = [];
            this.actionsStree = [];
            var params = {
                cityCode: val.code
            }
            $api.getAreaListByCityCode(params).then((res) => {
                this.actionsArea = res.data.areaList
                this.isCity = false;
            })
        },
        /**
         * 区选择
         */
        areaHandle() {
            this.isArea = true;
        },
        //区确定并且获取街道数据
        onAreaSelect(val) {
            console.log('val', val);
            this.addressInfo.areaName = val.name
            this.addressInfo.areaCode = val.code
            this.addressInfo.streetName = ''
            this.addressInfo.streetCode = ''
            this.actionsStree = [];
            var params = {
                areaCode: val.code
            }
            $api.getStreetListByAreaCode(params).then((res) => {
                this.actionsStree = res.data.streetList
                this.isArea = false;
            })
        },
        /**
         * 街道选择
         */
        streeHandle() {
            this.isStree = true;
        },

        //街道确定
        onStreeSelect(val) {
            console.log('val', val);
            this.addressInfo.streetName = val.name
            this.addressInfo.streetCode = val.code
            this.isStree = false;
        },
        onClickLeft() {
            $back();
        },
        onSubmit() {
            // let addressSubmit;
            if (this.isEdit) {
                addressSubmit = $api.updateAddr(this.addressInfo).then(res => {
                    // console.log("addressUpdata", res);
                    vant.Toast.success(res.msg);
                    $go({
                        path: "address"
                    })
                    sessionStorage.removeItem('address_edit');
                })
            } else {
                addressSubmit = $api.addAddr(this.addressInfo).then(res => {
                    // console.log("addressUpdata", res);
                    vant.Toast.success(res.msg);
                    $go({
                        path: "address"
                    })
                })
            }
        },
        onLocation() {
            // 地区选择弹窗，关闭
            this.showPopup = true;
        },
        onCancel() {
            // 地区选择弹窗，关闭
            this.showPopup = false;
        },
        onConfirm(val) {
            // 地区选择弹窗，确认
            // console.log("onConfirm", val)
            this.showPopup = false;
            this.addressInfo.province = val[0].name
            this.addressInfo.city = val[1].name
            this.addressInfo.area = val[2].name
            this.addressInfo.location = val[0].name + val[1].name + val[2].name
        },
        //onClick
        onClick() {
            // 地址默认
            // console.log('地址默认:');
            this.checked = !this.checked
            if (this.checked) {
                this.addressInfo.type = 1
            } else {
                this.addressInfo.type = 0
            }
        }
    }
});