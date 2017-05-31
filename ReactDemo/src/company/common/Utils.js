/**
 * 工具类
 */
import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import $ from 'zepto-webpack'
import md5 from 'md5'
import * as Consts from './Consts'
import ConfirmWin from 'company/components/common/ConfirmWin'

class Utils {

    static getCommParams() {
        let plat = '102',
            reqid = new Date().getTime(),
            ts = parseInt(new Date().getTime() / 1000),
            sign = md5(md5(plat + reqid + ts))

        let comm_params = {
            // device: '',
            plat,
            reqid,
            sign,
            token: window.token,
            ts
        }

        comm_params = encodeURI(JSON.stringify(comm_params))

        return comm_params
    }

    /**
     * 请求方法
     * @param  {[type]} opt [description]
     * @return {[type]}     [description]
     */
    static fetch(opt) {
        // alert('fetch token: ' + window.token)

        let comm_params = Utils.getCommParams()

        let data = opt.data ? Object.assign({}, opt.data, {comm_params: comm_params}) : {comm_params: comm_params}

        let url = Consts.FETCH_HOST + opt.url
        if (opt.url.match('http')) {
            url = opt.url
        }

        Utils.printLog(url)

        $.ajax({
            url: url,
            type: opt.type || 'GET',
            data: data,
            dataType: 'json',
            contentType: opt.contentType === 'undefined' ? 'application/x-www-form-urlencoded' : opt.contentType,
            processData: opt.processData === 'undefined' ? true : opt.processData,
            success: (data, status, xhr) => {
                Utils.printLog(JSON.stringify(data))
                
                if (data.code === 0) {
                    if (opt.sCallback) {
                        opt.sCallback(data.data)
                    }
                } else {
                    Utils.alert(data.message)
                }
            },
            error: (xhr, errorType, error) => {
                Utils.alert(`请求失败 ${errorType || ''} ${error || ''}`)
            },
            beforeSend: () => {
                $('#loading').show()
            },
            complete: () => {
                $('#loading').hide()
            }
        })
    }

    /**
     * 秒转日期字符串
     * @param  {[type]} sec        [description]
     * @param  {[type]} formatType [0: 2016-01-01, 1: 8月1日]
     * @return {[type]}            [description]
     */
    static dateFormat(sec, formatType) {
        if (!sec) {
            return '--'
        }

        let date = new Date(sec * 1000)

        let Y = date.getFullYear(),
            M = date.getMonth() + 1,
            D = date.getDate()
        let MM = M < 10 ? ('0' + M) : M
        let DD = D < 10 ? ('0' + D) : D

        switch(formatType) {
            case 0:
                return `${Y}-${MM}-${DD}`
            case 1:
                return `${M}月${D}日`
            default:
                return `${Y}-${MM}-${DD}`
        }
    }

    /**
     * 分转换万元
     * @param  {[type]} fen [description]
     * @return {[type]}     [description]
     */
    static fenToWY(fen) {
        if (fen) {
            let wy = fen / 1000000

            return wy.toFixed(2)
        }
    }

    /**
     * 渲染弹窗
     * @param  {[type]} confirmWin [description]
     * @return {[type]}            [description]
     */
    static renderConfirmWin(confirmWin) {
        render(
            confirmWin,
            document.getElementById('confirmWin')
        )

        document.getElementById('confirmWin').style.display = 'block'
    }

    /**
     * 关闭弹窗
     * @return {[type]} [description]
     */
    static closeConfirmWin() {
        document.getElementById('confirmWin').style.display = 'none'
    }

    /**
     * 判断是否为空值
     * @param  {[type]}  v [description]
     * @return {Boolean}   [description]
     */
    static isEmpty(v) {
        return (
            v == 'undefined' || 
            v == null || 
            v == '' || 
            v == Consts.SELECT_NONE_VALUE
            // v.toString().match(Consts.SELECT_NONE_VALUE)
        )
    }

/**
 * 信息提示弹窗
 * @param  {[type]} msg [description]
 * @return {[type]}     [description]
 */
    static alert(msg){
        Utils.closeConfirmWin()

        let confirmConfig = {
            title: msg,
            content: '',
            btns: [{
                text: '知道了',
                handle: () => {
                    Utils.closeConfirmWin()
                }
            }]
        }

        Utils.renderConfirmWin(<ConfirmWin {...confirmConfig} />)
    }

    /**
     * 参数校验
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    static dealNeedParams(params) {
        //...
        
        return params
    }

    static printLog(content) {
        if (Consts.DEBUG_MODE) return false

        //
    }
}

export default Utils