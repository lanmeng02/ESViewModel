function toolboxbianliobj(obj,pobj,treedom,jibie){
    var jb=jibie;
    var jbstr="";
    for(var m=0;m<jb;m++){
        jbstr+="--";
    }
    for(var p in obj){

        var _obj=pobj[p];
        var lx=_es_typeof(_obj);
        if(lx=="function"){
            continue;
        }
        var dv = document.createElement('div');
        dv.innerHTML='<div>'+jbstr+p+'['+lx+'] <span>显隐</span><span>表单</span></div>';
        treedom.append(dv);
         if(lx=="object"){
             toolboxbianliobj(_obj,_obj,dv,++jb);
        } else if(lx!="function") {
             if(lx!="array") {
                 var sdv = document.createElement('div');
                 sdv.innerHTML = '<div>' + _obj + '</div>';
               //  dv.append(sdv);
             }

         }

    }
}
function moveotoolbox() {

    var dv = document.createElement('div');
    dv.style="border:1px solid #ccc;background-color:#ffffff;width:250px;height:400px;position:absolute;top:10px;right:10px; overflow:auto;";
    dv.innerHTML='<div  style="background-color: #ccc;height:20px; text-align: right; padding-right: 10px;"><span id="toolboxclosebtn" title="关闭" style="cursor:pointer;">X</span></div><div id="toolboxtree" style="padding: 10px;line-height: 25px;"></div>';
    document.body.append(dv);
    document.getElementById("toolboxclosebtn").addEventListener("click",function (ev) {this.parentNode.parentNode.style.display="none";  },false);
    var treedom=document.getElementById("toolboxtree");
    treedom.addEventListener("mousedown",function (ev) {
        ev=ev||window.event; //IE8以下事件对象是window.event
        ev.cancelBubble=true;
    },false);
    for (var p in window){
        var obj=window[p];

        if(obj instanceof ESVM){

           var options=obj.options;
           toolboxbianliobj(options,window,treedom,0);

        }

    }
    var x = 0;
    var y = 0;
    var l = 0;
    var t = 0;
    var isDown = false;
//鼠标按下事件
    dv.onmousedown = function (e) {
        //获取x坐标和y坐标
        x = e.clientX;
        y = e.clientY;

        //获取左部和顶部的偏移量
        l = dv.offsetLeft;
        t = dv.offsetTop;
        //开关打开
        isDown = true;
        //设置样式
        dv.style.cursor = 'move';
    }
//鼠标移动
    window.onmousemove = function (e) {
        if (isDown == false) {
            return;
        }
        //获取x和y
        var nx = e.clientX;
        var ny = e.clientY;
        //计算移动后的左偏移量和顶部的偏移量
        var nl = nx - (x - l);
        var nt = ny - (y - t);

        dv.style.left = nl + 'px';
        dv.style.top = nt + 'px';
    }
//鼠标抬起事件
    dv.onmouseup = function () {
        //开关关闭
        isDown = false;
        dv.style.cursor = 'default';
    }
}