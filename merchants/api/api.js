const $api = {
    // 获取订单详情
    queryOrderDetail: (params) => {
        return request({
            url: "/order/queryOrderDetail",
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
     *商家发货接口
     *
     */
    addExpress: (params) => {
        return request({
            url: "/order/addExpress",
            data: params,
            method: 'POST'
        })
    },
    /**
     *商家确认退货接口
     *
     */
    confirmRefuse: (params) => {
        return request({
            url: "order/confirmRefuse",
            params: params,
            method: 'get'
        })
    },
    /**
     *商家提交退货资料接口
     *
     */
    uploadRefuseByMerchant: (params) => {
        return request({
            url: "/order/uploadRefuseByMerchant",
            data: params,
            method: 'POST'
        })
    },
    /**
     *申请提现接口
     *
     */
    apply: (params) => {
        return request({
            url: "/balance/apply",
            params: params,
            method: 'get'
        })
    },
    /**
     *查询用户余额接口
     *
     */
    query: (params) => {
        return request({
            url: "/balance/query",
            params: params,
            method: 'get'
        })
    },
    /**
     *查询商户银行账户信息
     *
     */
    queryBank: (params) => {
        return request({
            url: "/balance/queryBank",
            params: params,
            method: 'get'
        })
    },
    /**
     *查询商户提现记录
     *
     */
    queryRecord: (params) => {
        return request({
            url: "/balance/queryRecord",
            params: params,
            method: 'get'
        })
    },
    /**
     *查询钱包明细接口
     *
     */
    queryChargesList: (params) => {
        return request({
            url: "/balance/queryChargesList",
            params: params,
            method: 'get'
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
}