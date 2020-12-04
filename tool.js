function toolboxbianliobj(obj,pobj,treedom){
  
    for(var p in obj){
         
      
        var _obj=pobj[p];
        var lx=_es_typeof(_obj);
        var dv = document.createElement('div');
        dv.innerHTML='<div>'+p+'['+lx+']</div>';
        treedom.append(dv);
         if(lx=="object"){
             toolboxbianliobj(_obj,_obj,dv);
        } else if(lx!="function") {
             var sdv = document.createElement('div');
             sdv.innerHTML='<div>'+_obj+'</div>';
             dv.append(sdv);
         }

    }
}
function moveotoolbox() {

    var dv = document.createElement('div');
    dv.style="border:1px solid #ccc;background-color:#ffffff;width:150px;height:400px;position:absolute;top:10px;right:10px; overflow:auto;";
    dv.innerHTML='<div id="toolboxclosebtn" style="background-color: #ccc;height:20px; text-align: right; padding-right: 10px;"><span title="关闭" style="cursor:pointer;">X</span></div><div id="toolboxtree"></div>';
    document.body.append(dv);
    document.getElementById("toolboxclosebtn").addEventListener("click",function (ev) {this.parentNode.style.display="none";  });
    var treedom=document.getElementById("toolboxtree");
    for (var p in window){
        var obj=window[p];

        if(p=="esvm"){
          
           var options=obj.options;
           toolboxbianliobj(options,window,treedom);

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