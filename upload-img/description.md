### 单张&多张图片上传本地预览

> 通过 FileReader 对象 实现单张多张图片上传

```javascript
    var noTips = document.getElementById('no-tips');
    var imgName = document.getElementById('img-name');
    var imgSize = document.getElementById('img-size');
    var uploadImg = document.getElementById('upload-img');


    //判断浏览器是否支持FileReader接口
    if (typeof FileReader == 'undefined') {
        noTips.style.display = 'block';
        //使选择控件不可操作
        uploadImg.setAttribute("disabled", "disabled");
    }


    uploadImg.onchange = function () {
        xmTanUploadImg(this);
    }

    //选择图片，马上预览
    function xmTanUploadImg(obj) {
        var file = obj.files[0];

        console.log(file);
        console.log(file.name);
        console.log(name)

        imgName.innerHTML = '图片名字：' + file.name;
        imgName.style.display = 'block';
        imgSize.innerHTML = '图片大小：' + file.size + 'kb';
        imgSize.style.display = 'block';

        var reader = new FileReader();

        //读取文件过程方法
        reader.onloadstart = function (e) {
            console.log("开始读取....");
        }
        reader.onprogress = function (e) {
            console.log("正在读取中....");
        }
        reader.onabort = function (e) {
            console.log("中断读取....");
        }
        reader.onerror = function (e) {
            console.log("读取异常....");
        }
        reader.onload = function (e) {
            console.log("成功读取....");

            var img = document.getElementById("xmTanImg");
            img.src = e.target.result;
            //或者 img.src = this.result;  //e.target == this
        }

        reader.readAsDataURL(file)
    }
```