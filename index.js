var img = document.getElementsByTagName("img");
var imgDiv = document.getElementsByClassName("img-class")[0];
var btn = document.getElementsByClassName("btn")[0].getElementsByTagName("span");
var pre = document.getElementsByClassName("pre")[0];
var next = document.getElementsByClassName("next")[0];
var len = img.length,
    index = 0,
    timer;
//更改图片，与小圆点颜色
function changeImg(index) {
    for (var i = 0; i  < len; i++) {
        //先将图片设置为不可见
        img[i].style.display = "none";
        btn[i].style.backgroundColor ="rgb(128, 128, 128)";
    }
    img[index].style.display = "inline-block";
    btn[index].style.backgroundColor = "rgb(240, 248, 255)";
}
//changeImg 与 autoPlay 分开写
function autoPlay() {
    //当超出图片数量时，重置index
    if (index >= len) {
        index = 0;
    }
    changeImg(index);
    index ++;    
}

timer = setInterval(autoPlay, 1000);

imgDiv.onmouseover = function () {
    clearInterval(timer);//鼠标移入，清除定时器
}

imgDiv.onmouseout = function () {
    timer = setInterval(autoPlay, 1000);//鼠标移出，定时器继续
}

for (var i = 0; i < btn.length; i++) {
    (function (i) {
        btn[i].onmouseover = function () {
            clearInterval(timer);//鼠标移入小圆点，清除定时器
            for (var j = 0; j < btn.length; j++) {
                img[j].style.display = "none";
                btn[j].style.backgroundColor = "rgb(128, 128, 128)";
            } 
            img[i].style.display = "inline-block";//圆点对应的图片显示，其余隐藏
            btn[i].style.backgroundColor = "rgb(235, 225, 225)" ;
            console.log(btn[i]);   
        } 
        btn[i].onmouseout = function (){
            timer = setInterval(autoPlay, 1000);//鼠标移出小圆点，定时器继续
        }               
    })(i);//立即执行函数，解除闭包
}
pre.onclick = function(){
    //避免数组越界
    if(index == len){
        index --;
    }
    //切换至第一张时，不可在继续
    if (index <= 0) {
        return false;
    }
    changeImg(index);
    index --; 
};
next.onclick = function(){
    //切换至最后一张时，不可再继续
    if (index >= len ) {
        return false;
    }
    changeImg(index);
    index  ++;    
};