Cheche.marketingCode = "201701001";
var shareTitle = '按天买车险 首月车险免费送';
var shareContent = "不开车 就返钱";
var downEventName = ($.os.phone || $.os.tablet ) ? "tap" : "click";
$('.list-head li').on(downEventName, function () {
    //console.log(111)
    var index = $(this).index();
    $(this).addClass('on').siblings().removeClass('on');
    $('.bd .box').eq(index).show().siblings('.bd .box').hide();
});

//固定导航
var headHeight = $('.banner').height();

var navB = $(".list-head").clone(true).addClass("navFix").hide();
$('body').append(navB);
$(window).scroll(function () {
    $('.btn-price').html($(this).scrollTop() )
    if ($(this).scrollTop() > headHeight) {
        navB.show();
    }
    else {
        navB.hide();
    }
});


//图片自动轮播
TouchSlide({
    slideCell: "#focus",
    titCell: ".tab-hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
    mainCell: ".tab-bd ul",
    effect: "leftLoop",
    autoPlay: true,//自动播放
    autoPage: true //自动分页
});

function parseSearch() {
    var obj = {};
    var search = location.search.substring(location.search.indexOf("?") + 1);
    if (search) {
        search = search.split("&");
        for (var i in search) {
            var tmp = search[i].split("=");
            obj[tmp[0]] = tmp[1];
        }
    }
    return obj;
}

$(".btn-price").on(downEventName, (function () {
    var params = parseSearch();
    var bridge = window.WebViewJavascriptBridge;
    if ((/cc.app/).test(navigator.userAgent)) {
        bridge.callHandler('callNative', {
            action: 'open',
            name: "base",
            params: {
                code: params.activity,
                companyId: params.companyId || ""
            }
        }, function (response) {
            console.log('JS got response:', response);
        });
    } else {
        location.href = '/m/index.html' + location.search + "#base";
    }
}));
window.onload = function () {
    App.init();
    $('#loading').hide();
    Wechat.init(Cheche.marketingCode, shareTitle, shareContent);


};
