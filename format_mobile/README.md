### 格式化手机号

    *  不能使用type="number" 类型的input number 没有selectionStart

```javascript

  $.fn.formatMobile = function (config) {
          var o = this;
          config = $.extend({
              success: function () {

              },
              change: function () {

              }
          }, config);
          var addSpace = function (str) {
              return str.replace(/\s/g, '').replace(/(^\d{3})(?=\d)/g, "$1 ").replace(/(\d{4})(?=\d)/g, "$1 ");
          }
          var setCursorPosition = function (elem, index, index_delta) {
              var val = elem.value;
              var len = val.length;

              // 超过文本长度直接返回
              if (len < index) return;

              index += index_delta

              elem.focus()
              if (elem.setSelectionRange) { // 标准浏览器
                  elem.setSelectionRange(index, index)
              }
          };
          o.val(addSpace(o.val()));
          config.success(o.val().replace(/\D/g, ''));
          o.on('input', function () {
              var curpos = o[0].selectionStart;
              var oldValue = o.val();
              var indexDelta = 0
              if (oldValue[curpos - 1] == ' ') {
                  indexDelta = -1
              } else {  // 光标前有空格填充时
                  var beforeCursor = oldValue.slice(0, curpos)
                  var beforeCursorSpaced = addSpace(beforeCursor)
                  indexDelta = beforeCursorSpaced.length - beforeCursor.length
              }

              var clearSpaceVal = o.val().replace(/\D/g, '');
              o.val(addSpace(clearSpaceVal.substring(0, 11)));
              if (clearSpaceVal.length >= 11) {
                  o.blur();
                  config.success(o.val().replace(/\D/g, ''))
              } else {
                  config.change(o.val().replace(/\D/g, ''))
              }
              setCursorPosition(o[0], curpos, indexDelta);
          })
      }
```

###格式化银行卡号

```javascript

   $.fn.formatCardNum = function (config) {
          var o = this;
          config = $.extend({}, config);
          var addSpace = function (str) {
              return str.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
          }
          o.on('input', function () {
              var clearSpaceVal = o.val().replace(/\D/g, '');
              o.val(addSpace(clearSpaceVal));
              config.change(o.val());
          })
      }
```


##有问题反馈
在使用中有任何问题，欢迎反馈给我，可以用以下联系方式跟我交流

* 邮件(81195314@qq.com)
* QQ: 81195314
* weibo: [@采蘑菇的丶糖小米 ](http://weibo.com/210303106)

