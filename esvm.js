//v3重新构建支持低版本浏览器 增加兼容性

//methods
var _es_zhichiquerySelectorAll=document.querySelectorAll?true:false;

function _es_querySelectorAll(obj,selector) {
    if(_es_zhichiquerySelectorAll){
        return obj.querySelectorAll(selector);
    }
    else{
        var sx=selector.replace("[","").replace("]","");
        var shuzu=new Array();
        var els=obj.getElementsByTagName("*");
        for(var i=0;i<els.length;i++){
            var node=els[i];
            var val = node.getAttribute(sx);

            if(typeof (val)!="undefined"&&val!=null){
               shuzu.push(node);

            }
        }

        return shuzu;
    }
}




String.prototype.endWith=function(s){
    if(s==null||s==""||this.length==0||s.length>this.length)
        return false;
    if(this.substring(this.length-s.length)==s)
        return true;
    else
        return false;
    return true;
}

String.prototype.startWith=function(s){
    if(s==null||s==""||this.length==0||s.length>this.length)
        return false;
    if(this.substr(0,s.length)==s)
        return true;
    else
        return false;
    return true;
}
String.prototype.trimStart = function (c) {
    var ks = -1;
    for (var i = 0; i < this.length; i++) {
        if (this.charAt(i) == c) {
            ks = i;
        }
        else {
            break;
        }
    }
    if (ks != -1) {
        return this.substr(ks, this.length-ks-1);
    }
    else {
        return this;
    }
}

//去除字符串尾部空格或指定字符
String.prototype.trimEnd = function (c) {
    var js = 0;
    for (var i = this.length - 1; i >= 0; i--) {
        if (this.charAt(i) == c) {
            js = i;
        }
        else {
            break;
        }
    }
    if (js != 0) {
        return this.substr(0, js);
    }
    else {
        return this;
    }
}
String.prototype.replaceAll = function(s1, s2) {

    var reg=new RegExp(s1,"gm"); //创建正则RegExp对象
    return this.replace(reg,s2);

}

String.prototype.trim = function(){
    return this.replace(/^\s+|\s+$/g, "");
}
function _es_replaceAll(source,s1,s2) {
    var ps=source.indexOf(s1);
    while (ps>s2.length){
        source=source.replace(s1,s2);
        ps=source.indexOf(s1,ps)+s2.length;
    }
    return source;
}
 function _es_isnumber(val) {
    return !isNaN(val);
}
function _es_getbianliang(codestr) {
    
    var reg = /(?:\()\w+(?:\))/g;
   return codestr.match(reg); 
}
function _es_getvar(codestr) {
    var kschar="_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$.";
    var jschar="=*+-/%)({}<>''\"\" ";
   var code=codestr;
    var arr=new Array();
    var bl="";
    var ks=false;
   for(var i=0;i<code.length;i++){
       var c=String(code.charAt(i));

       if(!ks&&kschar.indexOf(c)>-1){
           bl="";
           ks=true;
       }
       else if(ks&&jschar.indexOf(c)>-1){
           arr.push(bl);
           bl="";
           ks=false;
       }
       if(ks){
           bl+=c;
       }

   }
   if(bl!=""&&ks){
       arr.push(bl);
   }

    return arr;
}
function _es_arrayadditme(array,item) {
    var you=false;
    for(var i in array){
        if(array[i]==item){
            you=true;
            break;
        }
    }
    if(!you){

        array.push(item);
    }
}
function  ESArrayToObjects(array) {
    var obj={};
    for(var i=0;i<array.length;i++){
        var _obj=array[i];
        var _lx=_es_typeof(_obj);
        if(_lx!="array"){
            obj[i]=_obj;
        }
        else {
            obj[i]=new ESArrayToObjects(_obj);
        }
    }
    return obj;
}

function  _es_ESOBJ(obj,name,fullname,vmnodes,venodes,vpnodes) {
    this.obj=obj;
    this.name=name;
    this.fullname=fullname;
    this.nodes=vmnodes;
    this.venode=venodes;
    this.vpnodes=vpnodes;
   /* this.changevalue=function (sx,value) {
        this[sx]=value;
    }*/

}

function _es_vartypeof(obj) {
    var   gettype=Object.prototype.toString;
    return   gettype.call(obj).toLowerCase();
}
function  _es_addpesobj(options,pobj) {
    for (var p in options){
        var obj=options[p];
        if(pobj==window){
            obj=window[p];
        }
        var lx=_es_typeof(obj);

            if (obj instanceof ESOBJ) {
                obj["PESOBJ"] = options;
            }
            else{
                _es_addpesobj(obj,options);
            }

    }
}
function _es_typeof(obj) {
    var lx=_es_vartypeof(obj);
    var ps=lx.indexOf(" ");
    lx=lx.substr(ps+1,lx.length-ps-2).toLowerCase();
    return lx;
}
function  _es_evalsetvalue(bl,value) {
    var blobj=_es_eval(bl);
    if(blobj.valid){
        var lx=_es_typeof(blobj.value);
        if(lx=="string"){
            return _es_eval(bl+"=\""+value.replaceAll("\"","\\\"")+"\"");
        }
        else{
          return   _es_eval(bl+"="+value);
        }
    }
}
function _es_eval(code){
    var obj={valid:false,value:null};
    try {
        if (!!(window.attachEvent && !window.opera)) {
            //ie
            obj.value= execScript(code);
            obj.valid=true;
        } else {
            //not ie
            obj.value= window.eval(code);
            obj.valid=true;
        }
    }
    catch (e) {
       
        obj.value=e;
    }
    return  obj;
}

//dom
var addStyle = function (ele, str) {
    str = str.trim().trimStart("{").trimEnd("}").trimEnd(";");
    var curstylesobj = _es_getAttr(ele, "style");
    
    if (curstylesobj.valid || curstylesobj.value == null) {
        var curstyles = "";
        if (curstylesobj.value != null) {
            //ie 6 ie7
            if (_es_typeof(curstylesobj.value) == "object"){
                curstylesobj.value = ele.style.cssText;
             }
            curstyles = curstylesobj.value.trim();
        }
        var sz_curstyles = [];
        if (curstyles != "") {
            sz_curstyles = curstyles.trimEnd(";").split(";");
        }
       
        var add_styles = str.split(";");
      
     
        for (var i = 0; i < add_styles.length; i++) {
            var s = add_styles[i].trim();
            if (s == "") {
                continue;
            }
            var cssname = s.split(":")[0].toLowerCase();
            var you = false;
            for (var m = 0; m < sz_curstyles.length; m++) {
                var ss = sz_curstyles[m].trim();
                var cssnames = ss.split(":")[0].toLowerCase();
                if (cssnames == cssname) {
                    sz_curstyles[m] = ss.split(":")[0] + ":" + s.split(":")[1];
                    you = true;
                    break;
                }
            }
            if (!you) {
                sz_curstyles.push(s);
            }

        }
        
        ele.style.cssText = sz_curstyles.join(";") + ";";
    }
    
}
var deleteStyle = function (ele, str) {
    str = str.trim().trimStart("{").trimEnd("}").trimEnd(";");
    var curstylesobj = _es_getAttr(ele, "style");
    if (curstylesobj.valid || curstylesobj.value == null) {
        var curstyles = "";
        if (curstylesobj.value != null) {
            if (_es_typeof(curstylesobj.value) == "object"){
                curstylesobj.value = ele.style.cssText;
            }
            curstyles = curstylesobj.value.trim();
        }
        var sz_curstyles = curstyles.trimEnd(";").split(";");
        var add_styles = str.split(";");
        var newsytles = [];



        for (var i = 0; i < sz_curstyles.length; i++) {
            var s =  sz_curstyles[i].trim();
            if (s == "") {
                continue;
            }
            var cssname = s.split(":")[0].toLowerCase();
            var you = false;
            for (var m = 0; m < add_styles.length; m++) {
                var ss = add_styles[m].trim();
                var cssnames = ss.split(":")[0].toLowerCase();
                
                if (cssnames == cssname) {
                  
                    you = true;
                    break;
                }
                
            }

            if (!you) {

             newsytles.push(s);
            }
        }
       
        ele.style.cssText = newsytles.join(";") + ";";
    }
}
function _es_findnodepro(node,attr,fn) {
  var jg=  _es_getAttr(node,attr);
  if(jg.valid){
      fn(node,attr,jg.value);
  }
}
function  _es_setnodestyle(node,style) {
    
}
//兼容addEventListener函数
var Event = {};
Event.addEvents = function(target,eventType,handle){
    if(document.addEventListener){
        Event.addEvents = function(target,eventType,handle){
            target.addEventListener(eventType,handle,false);
        };
    }else{
        Event.addEvents = function(target,eventType,handle){
            target.attachEvent('on'+eventType,function(){
                handle.call(target,arguments);
            });
        };
    };
    Event.addEvents(target,eventType,handle);
};


function  _es_addevent(node,sj,fn,obj) {

    Event.addEvents(node,sj,function () {fn(this,obj);

    });


}
function  _es_htmltonode(innerhtml,tagname) {
    var node=document.createElement(tagname);
    node.innerHTML=innerhtml;
    return node;
}
function _es_setAttr(node,attr,value,cunzai){
    if(typeof (cunzai)=="undefined"){
        cunzai=true;
    }
    if(cunzai){
        var val=node.getAttribute(attr);
        if(typeof(val)=="undefined"||val==null){

        }
        else{
            node.setAttribute(attr,value);
        }
    }
    else{
        node.setAttribute(attr,value);
    }

}

function _es_copyhtmlnode(node) {
    var _node=node.cloneNode(true);
    return _node;
}
function _es_getchildnodes(node){
    var _nodes=new Array();
    var child=node.childNodes;
    for (var i = 0; i <child.length; i++) {

        // if(!(child[i].nodeType == '3' && child[i].nodeName == '#text' && !/\S/.test(child[i].nodeValue)))
        if(child[i].nodeType!=3)
        { //文本节点并且是空的文本节点时，将空文本节点删除
            _nodes.push(child[i]);
        }
    }
    return _nodes;
}
function _es_removechildnodes(node) {
    var child = node.lastElementChild;

    while (child) {

        node.removeChild(child);
        child = node.lastElementChild;
    }
}
function _es_getnodesbypros(pros,pnodes){

    if(arguments.length==1){
        pnodes=document;
    }
    else {

    }

    var nodes=new Array();
    var cs=pros.split("|");
    if(_es_typeof(pnodes)=="array"){
        for(var m=0;m<pnodes.length;m++) {
            for (var i = 0; i < cs.length; i++) {

                 var _nodes=_es_querySelectorAll(pnodes[m],cs[i]);
                 for (var m = 0; m < _nodes.length; m++) {
                    var _n = _nodes[m];
                     _es_arrayadditme(nodes,_n);


                }

            }
        }
    }
    else {


        for (var i = 0; i < cs.length; i++) {


            var _nodes=_es_querySelectorAll(pnodes,cs[i]);

            for (var m = 0; m < _nodes.length; m++) {
                var _n = _nodes[m];
                _es_arrayadditme(nodes,_n);

            }

        }
    }
    return nodes;
}
function _es_getAttr(node,attr){
    var jg={valid:false,value:null};
  try {
      var val = node.getAttribute(attr);
      if (typeof (val) == "undefined" || val == null) {

      } else {
          jg.valid = true;
          jg.value = val;
      }
  }
  catch (e) {

  }
    return jg;
}
function _es_setnodesvalue(nodes,value) {
    var lx=_es_typeof(nodes);
    if(lx=="array"){
        for(var i=0;i<nodes.length;i++){
            _es_setnodevalue(nodes[i],value);
        }
    }
    else {
        _es_setnodevalue(nodes,value);
    }
}
function  _es_setnodevalue(node,value) {

    if(node!=null){

          if(value instanceof ESOBJ){
              value=value.val;
          }
            var vtype=_es_typeof(value);
        if(vtype=="undefined"){
            value="";
        }
        else if(vtype=="array"){
            var str="";
            for(var i=0;i<value.length;i++){
                 var _obj=value[i];
                 if(_obj instanceof ESOBJ) {

                     if (str != "") {
                         str += "、";
                     }
                     str +=_obj.val;
                 }
            }
            value=str;
        }
        else if(vtype=="object"){
            var valuestr="";
            for(var p in value){
                if(_es_typeof(value[p])=="function"){
                    continue;
                }
                if(valuestr!=""){
                    valuestr+="、";
                }
                valuestr+=value[p];
            }
            value=valuestr;
        }

        var tagname=node.tagName.toLowerCase();

        if(tagname=="span"||tagname=="p"||tagname=="div"||tagname=="a"){

            node.innerText=value;
        }
        else  if(tagname=="input"){
            var typeobj=_es_getAttr(node,"type");
            var type="";
            if(typeobj.valid){
                type=typeobj.value;
            }
            if(type=="radio"){

                if(node.value==value){

                    node.checked=true;
                }
                else {
                    node.checked=false;
                }
            }
            else  if(type=="checkbox"){
                var xz=false;
                if(vtype=="string"){
                    if(node.value==value){
                        xz=true;
                    }
                }
                else if(vtype=="array"){
                    for(var p in value){
                        if(value[p]==node.value){
                            xz=true;
                            break;
                        }
                    }
                }
                node.checked=xz;
            }
            else {

                node.value=value;
            }

        }
    }
}
//code
function _es_incode(code){
    code=code.trim();
    var obj={valid:false, fvar:"",fobj:"",msg:"语法错误"};
    if(/\S?\s?in\s+\S+/.test(code)){
        var ps=code.indexOf("in");
        obj.fvar=code.substr(0,ps).trim();
        obj.fobj=code.substr(ps+2,code.length-ps-2).trim();
        obj.msg="";
        obj.valid=true;
    }
    else{

    }
    return obj;
}
function _es_tocode(code){
    code=code.trim();
    var obj={valid:false, fvar:"",fobj:"",msg:"语法错误"};
    if(/\S?\s?to\s+\S+/.test(code)){
        var ps=code.indexOf("to");
        obj.fvar=code.substr(0,ps).trim();
        obj.fobj=code.substr(ps+2,code.length-ps-2).trim();
        obj.msg="";
        obj.valid=true;
    }
    else{

    }
    return obj;
}
//jibie 0调试 1异常
function _es_debug(str,jibie) {
    if(arguments.length==1){
        jibie=0;
    }
    console.log(str);
}

//render



function _es_render_ve(node,first) {
    if(arguments.length==1){
        first=true;
    }
    var veobj=_es_getAttr(node,"ve");
    if(veobj.valid){

        var provalue=veobj.value;
        var cs=provalue.split("^");
        var sj=cs[0].toLowerCase();
        var fn=cs[1];
        if(sj=="click"){

            _es_addevent(node,sj,function (dx,fnn) {
                var ro=_es_eval(fnn);

            },fn)
        }

    }
}
 
//对象
function ESNode(node) {
    this.node=node;
    this.clonenode=node.cloneNode(true);

}
function  ESOBJ(PESOBJ,name,fname,fu) {

    this.val=null;
    this.name=name;
    this.fu=fu;
    this._p=null;
    this.fname=fname;
    this.nodes=new Array();
    this.fo=function () {
        return this.fu[this.fname];
    }
    this.v=function (val) {
        if(arguments.length==0){
            return  this.val;
        }
      //  _es_debug(this.val+"->"+val);
      var sublx=_es_typeof(val);
      this.val= val;
      //change
        for(var i=0;i<this.nodes.length;i++){
            var node=this.nodes[i];
            fu._es_render_vm(node,false);
            fu._es_render_vp(node, false);
          
        }
        //pesobj
        if(this["_pobj"]){
            var pesobj=this["_pobj"];
            if(_es_typeof(pesobj)=="array"){
               var _allvalstr="";
                for(var i=0;i<pesobj.length;i++){
                    var _v=pesobj[i].val;
                    if(_v!="") {
                        if (_allvalstr != "") {
                            _allvalstr += "、";
                        }
                        _allvalstr += _v;
                    }
                }

                _es_setnodesvalue(pesobj.values.nodes,_allvalstr);

            }
        }
       return this;
    }
    this.addNode=function (node) {
        var you=false;
       for (var i=0;i<this.nodes.length;i++){
           if(this.nodes[i]==node){
               you=true;
               break;
           }
       }
       if(!you){
           this.nodes.push(node);
       }
       return node;
    }

    this.toString=function () {
        return this.val;
    }
}

function _es_zhuanESOBJ(obj,pobj,name,fullname) {
    var slx=_es_typeof(obj);
    var isjb=false;
    if(slx=="string"){
        obj=new String(obj);
        obj["nodes"]=new Array();
        isjb=true;
    }
    else if(slx=="boolean"){
        obj=new Boolean(obj);
        obj["nodes"]=new Array();
        isjb=true;
    }
    else if(slx=="number"){
        obj=new Number(obj);
        obj["nodes"]=new Array();
        isjb=true;
    }
    if(isjb){
        obj["_pobj"]=pobj;
        obj["_name"]=name;
        obj["_fname"]=fullname;
    }
    return obj;
}
function  _es_objaddfn(obj,esvmobj) {
    obj["v"]=function (v) {
        var _lx=_es_typeof(this);
        var _name=this._name;
        var _nodes=this.nodes;
        var _pobj=this._pobj;
        var _fname=this._fname;
        var newobj=this;
        var isjb=false;
        if(_lx=="string"){
            newobj=new String(v);
            isjb=true;
        }
        else if(_lx=="number"){
            newobj=new Number(v);
            isjb=true;
        }
        else if(_lx=="boolean"){
            newobj=new Boolean(v);
            isjb=true;
        }
        if(isjb){
            newobj["nodes"]=_nodes;
            newobj["_pobj"]=_pobj;
            newobj["_name"]=_name;
            newobj["_fname"]=_fname;
            _es_objaddfn(newobj,esvmobj);
            _pobj[_name]=newobj;
            esvmobj["_es_datas"][_fname]=newobj;
        }

        return newobj;
    }
}
function _es_toESOBJ(options,pobj,fullname,fu){

   var lx=_es_typeof(options);
   if(lx=="object"||lx=="array"){
      for(var p in options){
          var obj=options[p];

          var slx=_es_typeof(obj);

          if(slx!="function") {
              var  _fname=p;
              if(fullname!=""){
                  if(lx=="array"){
                      _fname=fullname+"["+p+"]";
                  }
                  else{
                      _fname=fullname+"."+p;
                  }

              }

              if(slx=="object"||slx=="array"){
                  _es_toESOBJ(obj,obj,_fname,fu);
                  var esobj=new ESOBJ(obj,p,_fname,fu);
                  esobj.v(obj);
                  esobj._p=options;
                  pobj[p]=obj;
                  fu["_es_datas"][_fname]=esobj;
              }
              else{
                  var esobj=new ESOBJ(obj,p,_fname,fu);
                  esobj.v(obj);
                  esobj._p=options;
                  options[p]=esobj;
                  pobj[p]=esobj;
                  fu["_es_datas"][_fname]=esobj;
              }




          }
        
          options["nodes"]=new Array();
          options["addNode"]=function(node){
              this["nodes"].push(node);
          }
   }

   }
  return options;
}
function _es_toString(obj) {
    var str="";
    var lx=_es_typeof(obj);
    if(lx=="function"){

    }
    else if(lx=="object"||lx=="array"){
       for(var p in obj){
           var subojb=obj[p];
           if(subojb instanceof ESOBJ) {


                  if(subojb.val!=""){
                      if(str!=""){
                          str+="、"
                      }
                      str += subojb.val;
                  }


           }
       }
    }
    else{
        str=obj.toString();
    }
    return str;
}
function ESVM(options) {
    this._es_datas=new Array();
   _es_toESOBJ(options,this,"",this);

   var dx=this;
   this._es_eval=function (code) {
       var obj={valid:false,value:null};
       try {

               //not ie
              var jg=null;
              with (dx) {
                 jg=eval(code);
              }
               obj.value= jg;
               obj.valid=true;

       }
       catch (e) {

           obj.value=e;
       }
       return  obj;
   }

   this.fo=function (fullname) {
       return this._es_datas[fullname];
   }
   this._es_render_vc=function(esnode,first) {
        var attrobj = _es_getAttr(esnode.node, "vc");

        if(attrobj.valid){
            var provalue=attrobj.value.trim();

            var vals=_es_getvar(provalue);

            //with
            if(provalue.startWith("with ")&&vals.length==2){

                var jg=dx._es_eval(vals[1]);

                if(jg.valid){
                    var provaluetype=_es_typeof(jg.value);

                    if(provaluetype=="object"){
                        var _nodes=_es_getnodesbypros("[vm]|[ve]|[vp]",esnode.node);

                        for(var i=0;i<_nodes.length;i++){
                            var _node=_nodes[i];

                            _es_findnodepro(_node,"vm",function (node,attr,val) {
                                var _vals=_es_getvar(val);
                                for(var m=0;m<_vals.length;m++){
                                    var _val=_vals[m];
                                    if(_val.startWith(".")){
                                        val=val.replaceAll(_val,vals[1]+_val);
                                    }

                                }

                                _es_setAttr(node,attr,val,true);
                            });
                        }
                    }
                    return;
                }

            }
            var jg=dx._es_eval(provalue);
            if(jg.valid){
                var provaluetype=_es_typeof(jg.value);
                for (var i=0;i<vals.length;i++){
                    var _var=dx._es_eval(vals[i]);
                    if(_var.valid){
                        _var.value.addNode(esnode);
                    }
                }

                if(provaluetype=="boolean"){
                    if(jg.value){
                        addStyle(esnode.node,"display:inherit;");

                    }
                    else{
                        addStyle(esnode.node,"display:none;");
                    }
                }
                return;
            }

            var incode=_es_incode(attrobj.value);
            if(incode.valid) {
                var fvar = incode.fvar;
                var evalobj =dx._es_eval( incode.fobj);

                if(evalobj.valid){


                    var _subnodes= _es_getchildnodes(esnode.node);
                    var _html=esnode.node.innerHTML;

                    if(evalobj.value) {
                        var _obj=evalobj.value[0];
                        for (var p in _obj) {
                            _html = _html.replaceAll( "." + p, incode.fobj + "[@no]." + p);
                        }

                    }
                    _es_removechildnodes(esnode.node);


                    for (var i=0;i< evalobj.value.length;i++)
                    {
                        var html=_html.replaceAll("@no",i);

                        var mbnodes=_es_htmltonode(html,esnode.node.tagName);
                        _subnodes= _es_getchildnodes(mbnodes);
                        for(n in _subnodes){
                            var _snode=_subnodes[n];
                            esnode.node.appendChild(_snode);
                        }
                    }
                }

            }

            var tocode=_es_tocode(attrobj.value);
            if(tocode.valid) {
                var fvar =dx._es_eval( tocode.fvar);
                var evalobj =dx._es_eval( tocode.fobj);

                if(evalobj.valid){


                    var _subnodes= _es_getchildnodes(esnode.node);
                    var _html=esnode.node.innerHTML;
                    var len=evalobj.value.length;

                    _es_removechildnodes(esnode.node);


                    for (var i=fvar.value;i<evalobj.value;i++)
                    {

                        var html=_html.replaceAll("@no",i);
                        var mbnodes=_es_htmltonode(html,esnode.node.tagName);
                        _subnodes= _es_getchildnodes(mbnodes);
                        for(n in _subnodes){
                            var _snode=_subnodes[n];
                            esnode.node.appendChild(_snode);
                        }
                    }
                }

            }

        }
    }

    this._es_render_vm=function(node,first) {
        var vmpobj=_es_getAttr(node,"vm");

        if(vmpobj.valid){

            var probj=dx.fo(vmpobj.value);

            var pv=dx._es_eval(vmpobj.value);

            if(pv.valid){
           if(first){
               
                   var objlx=_es_typeof(pv.value);
                    
                   pv.value.addNode(node);
               
           }

                //变化
                if(node.tagName=="INPUT"){


                    _es_addevent(node,"change",function (obj,pvv) {
                        var _value=obj.value;
                        var _typenode=_es_getAttr(obj,"type");

                        if(_typenode.value=="radio"||_typenode.value=="checkbox"){
                            if(!node.checked){
                                _value="";
                            }
                        }
                        var provm=_es_getAttr(obj,"vm");
                        if(provm.valid){

                            var jg=dx._es_eval(provm.value);
                            jg.value.v(_value);
                            var fulx=_es_typeof(jg.value._p);
                            if(fulx=="array"){

                                var zhistr=_es_toString(jg.value._p);
                                var _nodes=jg.value._p["nodes"];

                                for(var i=0;i<_nodes.length;i++){

                                    _es_setnodevalue(_nodes[i], zhistr);
                                }
                            }


                            var _nodes=jg.value.nodes;
                            for(var i=0;i<_nodes.length;i++){
                                dx._es_render_vp(_nodes[i],false);
                            }
                        }


                    },vmpobj.value);


                }


                if(probj) {

                    _es_setnodevalue(node, probj.toString());
                }


            }

        }
    }
    this._es_render_ve=function(node, first) {
        if (arguments.length == 1) {
            first = true;
        }
        var veobj = _es_getAttr(node, "ve");
        if (veobj.valid) {

            var provalue = veobj.value;
            var cs = provalue.split("^");
            var sj = cs[0].toLowerCase();
            var fn = cs[1];
            if (sj == "click") {

                _es_addevent(node, sj, function (dx, fnn) {
                    var ro = _es_eval(fnn);

                }, fn)
            }

        }
    }
    this._es_render_vp=function(node,first) {
        if(arguments.length==1){
            first=true;
        }
        var vpobj=_es_getAttr(node,"vp");
       
        if(vpobj.valid){

            var provalue=vpobj.value;
            var cs=provalue.split("^");
            var proname=cs[0].toLowerCase();
            var provalue = cs[1].trimStart("{").trimEnd("}");
            var bianliangs = _es_getbianliang(provalue);
            if (bianliangs != null) {
                for (var i = 0; i < bianliangs.length; i++) {
                    var bl = bianliangs[i].trimStart("(").trimEnd(")");
                    var bls = _es_getvar(bl);
                    for (var p in bls) {
                        var _pobj = dx._es_eval(bls[p]);
                        if (_pobj.valid) {
                            var _var = _pobj.value;
                            _var.addNode(node);
                            provalue = provalue.replaceAll("\\(" + bls[p] + "\\)", _var.val);
                          
                            
                        }
                       
                    }
                    
                }
            }
            
            if(cs.length==3){
                var proobj = dx._es_eval(cs[2]);
                
                var bls=_es_getvar(cs[2]);
                for (var i=0;i<bls.length;i++){
                    var fullname=bls[i];
                    var _pobj=dx._es_eval(fullname);
                    if(_pobj.valid){
                        _pobj.value.addNode(node);
                    }


                }
               
                if(proobj.valid&&proobj.value) {
                  
                    if (proname == "style") {

                      
                        addStyle(node,provalue);

                    }
                    else {
                        _es_setAttr(node,proname,provalue,false);
                    }
                }
                else{
                    if (proname == "style") {
                        
                       
                        deleteStyle(node, provalue);

                    }
                    
                   
                }
            }
            else {
               
                if(proname=="style"){

                    addStyle(node,provalue);
                }
                else {
                    _es_setAttr(node,proname,provalue,false);
                }
            }

        }
    }

   //添加
   // _es_addpesobj(options,window);
   var vcnodes=_es_getnodesbypros("[vc]",document);
   for(var i=0;i<vcnodes.length;i++){
       var vcnode=vcnodes[i];
       var esnode=new ESNode(vcnode);
       dx._es_render_vc(esnode,true);
   }

     var vmep_nodes=_es_getnodesbypros("[vm]|[ve]|[vp]",document);

    for(i in vmep_nodes){
        var node=vmep_nodes[i];

        dx._es_render_vm(node,true);
        dx._es_render_ve(node,true);
        dx._es_render_vp(node,true);
    }
}

