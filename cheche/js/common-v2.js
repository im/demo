var API = {
    getData: function (url, params, callback) {
        var self = this;
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            data: params
        }).always(function (data) {
            callback && typeof callback === 'function' && callback.apply(this, arguments);
        });
    },
    postData: function (url, params, callback) {
        var self = this;
        $.ajax({
            contentType: "application/json;",
            type: "POST",
            url: url,
            dataType: "json",
            data: JSON.stringify(params),
            success: function (response) {
                callback && typeof callback === 'function' && callback.apply(this, arguments);
            }
        });
    }
};

var Contrant = {
    isInWechat: (/MicroMessenger/i).test(navigator.userAgent)
};

var Cheche = {
    marketingCode: null,
    _isLogin: null,
    _loginMobile : '',
    isLogin: function (afterCallback) {
        var self = this;
        if (this._isLogin == null) {
            API.getData("/v1.3/users/hasLogin", {}, function (response) {
                if (response.code == 200 && response.data && response.data.result == true){
                    self._isLogin = true;
                    self._loginMobile = response.data.mobile;
                }
                else
                    self._isLogin = false;
                afterCallback.apply(self, {});
            });
        }
    },
    _isAttend: null,
    isAttend: function (afterCallback) {
        var self = this;
        if (this._isAttend == null) {
            API.getData("/v1.3/marketings/" + this.marketingCode + "/attendance", {}, function (response) {
                if (response.code == 200 && response.data && response.data.isAttend && response.data.isAttend === 'true')
                    self._isAttend = true;
                else
                    self._isAttend = false;
                afterCallback.apply(self, {});
            });
        }
    },
    attend:function(callbackMap){
        API.postData("/v1.3/marketings/" + Cheche.marketingCode, {userType: "1"}, function (response) {
            var callback = callbackMap[response.code];
            if (callback){
                callback.apply(self, response);
            }
            else
                Util.showTips(response.message);
        });
    },
    //checkLoginForAttend: function (mobile,code,callbackMap) {
    //    var self = this;
    //    if(mobile == '' || mobile == this._loginMobile){
    //        self.attend(callbackMap);
    //    }else{
    //        API.getData('/v1.3/users/login', {mobile: mobile, validationCode: code}, function (res1) {
    //            if(res1.code!='200'){
    //                Util.showTips(res1.message);
    //            }else{
    //                self.attend(callbackMap);
    //            }
    //        });
    //    }
    //},
    //attendClick:function(telObj, ValidationCodeObj, callbackMap){
    //    var regTel = /^1[3|4|5|7|8][0-9]\d{8}$/;
    //    var tel =telObj.val();
    //    var valid = ValidationCodeObj.val();
    //    var telIsView = telObj.is(':visible');
    //    var codeIsView = ValidationCodeObj.is(':visible');
    //    if (telIsView) {
    //        if (tel.replace(/\s+/g, '') == '') {
    //            Util.showTips("手机号码不能为空");
    //            return;
    //        }
    //        if (!regTel.test(tel)) {
    //            Util.showTips("手机号码格式错误");
    //            return;
    //        }
    //    }
    //    if (codeIsView) {
    //        if (valid.replace(/\s+/g, '') == '') {
    //            ValidationCodeObj.focus();
    //            Util.showTips("验证码不能为空");
    //            return;
    //        }
    //    }
    //    Cheche.checkLoginForAttend(tel,valid, callbackMap);
    //},

    // sendSms: function (phone) {
    //     $.ajax({
    //         type: "GET",
    //         url: "/v1.3/sms/validation?mobile=" + phone + "&action=marketing",
    //         dataType: "json",
    //         success: function (res) {
    //             Util.showTips("发送成功！");
    //         },
    //         error: function (res) {
    //         }
    //     });
    // }
};

var Util = {
    isPhone: function (str) {
        return /^1[3|4|5|7|8]\d{9}$/.test(str);
    },
    //显示提示层
    // showTips: function (info) {
    //     if ($("#j-popTips").length) return;

    //     $("body").append('<div class="popTips" id="j-popTips">' + info + '</div>');
    //     setTimeout(function () {
    //         $("#j-popTips").css("opacity", 1);
    //         $("#j-tel").focus();
    //     }, 10);
    //     setTimeout(function () {
    //         $("#j-popTips").remove();
    //     }, 3000);
    // },
    //显示提示信息
    showToast: function (msg, duration, callback) {
        duration = isNaN(duration) ? 1500 : duration;
        var toastElement = $("#toast");
        if (toastElement.length <= 0) {
            toastElement = $('<div id="toast" class="toast">' + msg + '</div>').addClass("toast");
            $(document.body).append(toastElement);
        }
        setTimeout(function () {
            var d = .5;
            $(toastElement).css({
                transition: "opacity " + d + "s ease-in",
                opacity: "0"
            });
            setTimeout(function () {
                $(toastElement).remove();
                callback && typeof callback === 'function' && callback();
            }, d * 1e3);
        }, duration);
    },
    setTimer: function (selector) {
        var control = $(selector);
        if (control == null) {
            return;
        }
        control.addClass("disable");
        var second = 30;
        var timer = null;
        timer = setInterval(function () {
            second -= 1;
            if (second > 0) {
                control.text(second + "秒后重发");
            }
            else {
                control.text("获取验证码");
                control.removeClass("disable");
                clearInterval(timer);
            }
        }, 1000);
    },
};

var App = {
    bridge:null,
    initBridge:function(){
        if (!window.WebViewJavascriptBridge) {
            return;
        }
        App.bridge = window.WebViewJavascriptBridge;

        if (Cheche.ua && Cheche.ua["cc.os"] === "ios") {
            var iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
            document.documentElement.appendChild(iframe);
            setTimeout(function () {
                document.documentElement.removeChild(iframe);
            }, 0);
        }
    },
    init:function(){
        if (window.WebViewJavascriptBridge) {
            App.initBridge();
        } else {
            document.addEventListener('WebViewJavascriptBridgeReady', App.initBridge, false);
        }
    },
    callApp: function (op) {
        if (cheche.isInApp && cheche.bridge) {
            cheche.params.code = cheche.code;
            cheche.bridge.callHandler('callNative', {
                action: 'open',
                name: op,
                params: cheche.params
            }, function (response) {
                console.log('JS got response:', response)
            });
        } else {
            location.href = '/m/index.html?' + (cheche.isAlipay ? "src=alipay&" : "") + (this.companyId ? ("companyId=" + cheche.companyId + "&") : "" ) + "activity=" + cheche.code + "#base";
        }
    }
};

var Wechat = {
    init:function(marketingCode,title,content){
        Contrant.isInWechat && $.getScript([
            '/marketing/script/weixin.js',
            'https://res.wx.qq.com/open/js/jweixin-1.0.0.js'
        ], function () {
            Wechat.initWeChat(marketingCode,title,content);
        });
    },
    initWeChat: function (marketingCode,title,content) {
        var param = new WechatParam(marketingCode, title, content);
        param.winxinMemuCode = param.marketingCode;
        param.shareImg = "share.jpg";
        param.shareUrl = "http://" + window.location.host + "/marketing/m/" + param.marketingCode + '/index.html';
        param.imgUrlFromWeixin = 'http://' + window.location.host + '/marketing/m/' + param.marketingCode + "/imgs/" + param.shareImg;
        initializeJSSDK(param);
    }
};

var Controller = function(){};
Controller.prototype  = {
    container:$("#login-form"),
    phoneInput:$("#phone"),
    codeInput:$("#code"),
    getCodeButton:$("#true_code"),
    attendButton:$(".btn-default"),
    attendText:$(".f-show"),

    ev:{},
    init:function(){
        if ($.os.phone || $.os.tablet) {
            this.ev.down = 'tap';
        } else {
            this.ev.down = 'click';
        }
        var self = this;
        this.getCodeButton.on(this.ev.down, function () {
            var phone = self.phoneInput.val().trim();
            if (Util.isPhone(phone) && !$(this).hasClass('disable')) {
                Util.setTimer($(this));
                API.getData("/v1.3/sms/validation?mobile=" + phone + "&&action=marketing", null, null);
            } else {
                if (!$(this).hasClass('disable')) {
                    Util.showToast("请输入正确的手机号");
                }
            }
        });
        this.attendButton.on(this.ev.down, function () {
            if(Cheche._isAttend){
                window.location.href="/m/index.html";
                return;
            }
            if(Cheche._isLogin){
                API.postData("/v1.3/marketings/"+Cheche.marketingCode, {userType: "1"}, function (response) {
                    if (response.code == 200) {
                        Util.showToast("成功");
                        window.location.href="/m/index.html";
                    }else if(response.code == 50004){
                        window.location.href="/m/index.html";
                    }else{
                        Util.showToast(response.message);
                    }
                });
                return;
            }

            var mobile = self.phoneInput.val().trim(), code = self.codeInput.val().trim();
            if (!Util.isPhone(mobile)) {
                Util.showToast("请输入正确手机号");
                return;
            }
            if (!code) {
                Util.showToast("请输入验证码");
                return;
            }

            if (Util.isPhone(mobile) && code) {
                API.getData('/v1.3/users/login', {mobile: mobile, validationCode: code}, function (response) {
                    if (response.code == 200 && response.data['userKeyInClient']) {
                        Cheche.params = {
                            userId: response.data.user.id,
                            mobile: response.data.user.mobile
                        }

                        if (Cheche.isInApp && Cheche.bridge) {
                            Cheche.bridge.callHandler('callNative', {
                                action: 'open',
                                name: 'login',
                                params: Cheche.params
                            }, function (response) {
                                console.log('JS got response:', response);
                            });
                        }

                        Cheche.logged = true;
                        Cheche.checkLogin = true;

                        API.postData("/v1.3/marketings/"+Cheche.marketingCode, {userType: "1"}, function (response) {
                            if (response.code == 200) {
                                Util.showToast("成功");
                                window.location.href="/m/index.html";
                            }else if(response.code == 50004){

                                window.location.href="/m/index.html";
                            }else{
                                Util.showToast(response.message);
                            }
                        });
                    } else {
                        Util.showToast(response.message);
                    }
                });
            }
        });
    }
}
var commonController = new Controller();