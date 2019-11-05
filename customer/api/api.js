const $api = {
    // 获取订单详情
    queryOrderDetail: (params) => {
        return request({
            url: "/order/queryOrderDetail",
            params: params,
            method: 'GET'
        })
    },
    // 获取省份数据列表
    getProvinceList: (params) => {
        return request({
            url: "/base/getProvinceList",
            params: params,
            method: 'GET'
        })
    },
    /**
     * 获取城市数据列表
     * params.provinceCode省编码
     */
    getCityListByProvince: (params) => {
        return request({
            url: "/base/getCityListByProvince",
            params: params,
            method: 'GET'
        })
    },
    /**
     * 获取城市地区数据列表
     * params.cityCode城市编码
     */
    getAreaListByCityCode: (params) => {
        return request({
            url: "/base/getAreaListByCityCode",
            params: params,
            method: 'GET'
        })
    },
    /**
     * 获取街道数据列表
     * params.areaCode地区编码
     */
    getStreetListByAreaCode: (params) => {
        return request({
            url: "/base/getStreetListByAreaCode",
            params: params,
            method: 'GET'
        })
    },
    /**
     * 保存收货地址
     *
     */
    addAddr: (params) => {
        return request({
            url: "/appUser/addAddr",
            data: params,
            method: 'POST'
        })
    },
    /**
     *收货地址列表
     *
     */
    queryAddrList: (params) => {
        return request({
            url: "/appUser/queryAddrList",
            params: params,
            method: 'get'
        })
    },

    /**
     *收货地址设为默认接口
     *
     */
    setDefault: (params) => {
        return request({
            url: "/appUser/setDefault",
            params: params,
            method: 'get'
        })
    },
    /**
     *删除用户收货地址记录接口
     *
     */
    delAddr: (params) => {
        return request({
            url: "/appUser/delAddr",
            params: params,
            method: 'get'
        })
    },
    /**
     *更新用户收货地址记录接口
     *
     */
    updateAddr: (params) => {
        return request({
            url: "/appUser/updateAddr",
            data: params,
            method: 'POST'
        })
    },
    /**
     *查询用户的收货地址信息详情接口
     *
     */
    queryAddrDetail: (params) => {
        return request({
            url: "/appUser/queryAddrDetail",
            params: params,
            method: 'GET'
        })
    },
    /**
     *查询用户的收货地址信息详情接口
     *
     */
    queryDefaultAddr: (params) => {
        return request({
            url: "/appUser/queryDefaultAddr",
            params: params,
            method: 'GET'
        })
    },
    /**
     *查询订单列表接口
     *
     */
    queryList: (params) => {
        return request({
            url: "/order/queryList",
            params: params,
            method: 'GET'
        })
    },
    /**
     *查询鉴宝服务信息接口
     *
     */
    JianBao: (params) => {
        return request({
            url: "/base/JianBao",
            params: params,
            method: 'GET'
        })
    },
    /**
     *查询平台的转账银行账号接口
     *
     */
    querySysBank: (params) => {
        return request({
            url: "/pay/querySysBank",
            params: params,
            method: 'GET'
        })
    },
    /**
     *用户银行转账后上传支付凭证接口
     *
     */
    uploadPaymentPic: (params) => {
        return request({
            url: "/order/uploadPaymentPic",
            data: params,
            method: 'POST'
        })
    },

    /**
     *用户银行转账后上传支付凭证接口
     *
     */
    cancel: (params) => {
        return request({
            url: "/order/cancel",
            params: params,
            method: 'get'
        })
    },
    /**
     *用户申请退货接口
     *
     */
    applyRefuse: (params) => {
        return request({
            url: "/order/applyRefuse",
            data: params,
            method: 'POST'
        })
    },
    /**
     *用户确认收货接口
     *
     */
    confirm: (params) => {
        return request({
            url: "/order/confirm",
            params: params,
            method: 'get'
        })
    },
    /**
     *订单更新用户收货地址接口
     *
     */
    updateAddrInfo: (params) => {
        return request({
            url: "/order/updateAddrInfo",
            data: params,
            method: 'POST'
        })
    },
    /**
     * 查询系统相关协议接口
     *
     */
    sysTerms: (params) => {
        return request({
            url: "/base/sysTerms",
            params: params,
            method: 'get'
        })
    },
    /**
     * 查询问题反馈类型列表
     *
     */
    getSuggestionType: (params) => {
        return request({
            url: "/base/getSuggestionType",
            params: params,
            method: 'get'
        })
    },
    /**
     * 提交投诉建议接口
     *
     */
    addSuggestion: (params) => {
        return request({
            url: "/base/addSuggestion",
            data: params,
            method: 'POST'
        })
    },
}