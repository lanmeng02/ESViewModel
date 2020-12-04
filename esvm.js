//methods
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

    if (c == null || c == "") {
        var str = this.replace(/^s*/, "");
        return str;
    }
    else {

        var str = this;
        var ps=-1;

        for(var i=0;i<str.length;i++){

            if(str.charAt(i)==c){
                ps=i;
            }
            else{
                break;
            }
        }
        if(ps>=0){
            return str.substr(ps+1,str.length-ps-1);
        }
        else{
            return str;
        }

    }
}

//去除字符串尾部空格或指定字符
String.prototype.trimEnd = function (c) {
    if (c == null || c == "") {
        var str = this;
        var rg = /s/;
        var i = str.length;
        while (rg.test(str.charAt(--i)));
        return str.slice(0, i + 1);
    }
    else {
        var str = this;
        var rg = new RegExp(c);
        var i = str.length;
        while (rg.test(str.charAt(--i)));
        return str.slice(0, i + 1);
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

function _es_getvar(code) {
    var yusuanfu="=+-*/%(){} ";
    var arr=new Array();
    var bl="";
    for (var i=0;i<code.length;i++){
        if(yusuanfu.indexOf(code[i])==-1){
            bl+=code[i];
        }
        else {
            if(bl!="")
            {
                if(!_es_isnumber(bl)) {

                    arr.push(bl);
                }
            }
            bl="";
        }
    }
    if(bl!="")
    {

        if(!_es_isnumber(bl)) {

            arr.push(bl);
        }

    }

    return arr;
}

if (!Object.prototype.watch) {
    Object.defineProperty(Object.prototype, "watch", {
        enumerable: false
        , configurable: true
        , writable: false
        , value: function (prop, handler) {
            var
                oldval = this[prop]
                , newval = oldval
                , getter = function () {
                    return newval;
                }
                , setter = function (val) {
                    oldval = newval;
                    newval=val;

                    return newval = handler.call(this, prop, oldval, val);
                }
            ;

            if (delete this[prop]) { // can't watch constants
                Object.defineProperty(this, prop, {
                    get: getter
                    , set: setter
                    , enumerable: true
                    , configurable: true
                });
            }
        }
    });
}

// object.unwatch
if (!Object.prototype.unwatch) {
    Object.defineProperty(Object.prototype, "unwatch", {
        enumerable: false
        , configurable: true
        , writable: false
        , value: function (prop) {
            var val = this[prop];
            delete this[prop]; // remove accessors
            this[prop] = val;
        }
    });
}

var _es_objects=new ESArray();
function  ESArray() {
    this.objects=new Array();
    this.add=function (dx,p,fullp) {
        var lx=_es_typeof(dx);

            if(fullp==""){
                fullp=p;
            }
            this.objects.push({obj:dx,name:p,fullname:fullp,nodes:new Array()});
            if(lx=="array"){
                for(var pp in dx){
                    this.objects.push({obj:dx[pp],name:p,fullname:fullp+"["+pp+"]",nodes:new Array()});
                }
            }



    }
    this.get=function (sy) {
        return this.objects[sy];
    }
    this.findbyobj=function (dx) {
        for (var i=0;i<this.objects.length;i++){
            if(this.objects[i].obj==dx){
                return this.objects[i];
            }
        }
        return  null;
    }
    this.findbyfullname=function (fullname) {
        for (var i=0;i<this.objects.length;i++){
            if(this.objects[i].fullname==fullname){
                return this.objects[i];
            }
        }
        return  null;
    }
    this.delete=function (dx) {
        for (var i=0;i<this.objects.length;i++){
            if(this.objects[i].obj==dx){
                this.objects.splice(i,1);
                break;
            }
        }

    }
    this.setnodesvalue=function(esobj,value){
        for (var p in esobj.nodes){
            var node=esobj.nodes[p];

            _es_setnodevalue(node,value);
        }
    }
}
function _es_vartypeof(obj) {
    var   gettype=Object.prototype.toString;
    return   gettype.call(obj).toLowerCase();
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
function  _es_addevent(node,sj,fn,obj) {
    node.addEventListener(sj,function () {fn(this,obj);

    },false);
}
function  _es_htmltonode(innerhtml,tagname) {
    var node=document.createElement(tagname);
    node.innerHTML=innerhtml;
    return node;
}
function _es_setAttr(node,attr,value,cunzai=true){
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
                var _nodes = pnodes[m].querySelectorAll(cs[i]);

                for (var m = 0; m < _nodes.length; m++) {
                    var _n = _nodes[m];
                    var you = false;
                    for (var n = 0; n < nodes.length; n++) {
                        if (nodes[n] == _n) {
                            you = true;
                            break;
                        }
                    }
                    if (!you) {
                        nodes.push(_n);
                    }

                }

            }
        }
    }
    else {


        for (var i = 0; i < cs.length; i++) {
            var _nodes = pnodes.querySelectorAll(cs[i]);

            for (var m = 0; m < _nodes.length; m++) {
                var _n = _nodes[m];
                var you = false;
                for (var n = 0; n < nodes.length; n++) {
                    if (nodes[n] == _n) {
                        you = true;
                        break;
                    }
                }
                if (!you) {
                    nodes.push(_n);
                }

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
function  _es_setnodevalue(node,value) {
    if(node!=null){
        var vtype=_es_typeof(value);
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

function _es_prevdodata(options,pobject,pname) {
    if(arguments.length==1){
        pobject=window;
        pname="window";
    }
    else if(arguments.length==2){
        pname="window";
    }

    var fname=pname;


  for (var p in options){
        var dx=options[p];
        var lx=_es_typeof(dx);
        if(lx=="object"){
            console.log(p);
            if(pname=="") {
                fname = p;

            }
            else{
                fname=pname+"."+p;
            }

            _es_prevdodata(dx,dx,fname);


        }
        else if(pname!=""){
            fname=pname+"."+p;
        }
         pobject[p] = dx;
        if(lx!="function") {
            _es_objects.add(dx,p,fname);
           // _es_nodes.push({obj: dx, name: p, fullname: fname, nodes: new Array()});
        }
  }
}
//render
function _es_render_vc(esnode,first) {
    var attrobj = _es_getAttr(esnode.node, "vc");
    if(attrobj.valid){
        var incode=_es_incode(attrobj.value);
        if(incode.valid) {
            var fvar = incode.fvar;
            var evalobj =_es_eval( incode.fobj);
            if(evalobj.valid){


                var _subnodes= _es_getchildnodes(esnode.node);
                var _html=esnode.node.innerHTML;
                var len=evalobj.value.length;
                if(len>0) {
                    var _obj=evalobj.value[0];
                    for (var p in _obj) {
                        _html = _html.replaceAll( "." + p, incode.fobj + "[@no]." + p);
                    }
                }
               _es_removechildnodes(esnode.node);


               for (var i=0;i<len;i++)
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
            var fvar =_es_eval( tocode.fvar);
            var evalobj =_es_eval( tocode.fobj);

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
function _es_render_vmvevps(nodes,obj) {

}
//对象
function ESNode(node) {
    this.node=node;
    this.clonenode=node.cloneNode(true);

}
function ESVM(options) {
  this.options=options;
  this._init=function () {


  }
  this._es_render_vm=function (node,first) {
      var vmpobj=_es_getAttr(node,"vm");
      if(vmpobj.valid){
          var pv=_es_eval(vmpobj.value);

          if(pv.valid){

              //变化
              if(node.tagName=="INPUT"){


                  _es_addevent(node,"change",function (obj,pvv) {
                      _es_evalsetvalue(pvv,obj.value);

                  },vmpobj.value);
              }
              var zhi=vmpobj.value;

              if(zhi.endWith("]")){
                  var ps=zhi.lastIndexOf("[");
                  if(ps>-1) {
                      zhi = zhi.substr(0, ps);
                  }
              }
              var _esobject=_es_objects.findbyfullname(zhi);
              if(_esobject&&first){
                  _esobject.nodes.push(node);
              }
              _es_setnodevalue(node,pv.value);
              var _esobject=_es_objects.findbyfullname(vmpobj.value);
              if(_esobject&&first){
                  _esobject.nodes.push(node);
              }
          }

      }
  }
  this._es_render_ve=function (node,first) {
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
  this._es_render_vps=function(nodes,first){
      console.log(nodes);
      for(var i=0;i<nodes.length;i++){
          this._es_render_vp(nodes[i],first);
      }
  }
  this._es_render_vp=function (node,first) {
      if(arguments.length==1){
          first=true;
      }
      var vpobj=_es_getAttr(node,"vp");
      if(vpobj.valid){

          var provalue=vpobj.value;
          var cs=provalue.split("^");
          var proname=cs[0].toLowerCase();
          var provalue=cs[1].trimStart("{").trimEnd("}");

          if(cs.length==3){
              var proobj=_es_eval(cs[2]);
              var bls=_es_getvar(cs[2]);
              for (var i=0;i<bls.length;i++){
                  var fullname=bls[i];
                 var _esobj= _es_objects.findbyfullname(fullname);
                  if(_esobj&&first){
                      _esobj.nodes.push(node);
                  }
              }
            if(proobj.valid&&proobj.value) {
                if (proname == "style") {
                    node.style = node.style.cssText + provalue;

                }
                else {
                    _es_setAttr(node,proname,provalue,false);
                }
            }
            else{

                node.style = node.style.cssText.replace(provalue,"");
                console.log(node.style.cssText);
            }
          }
          else{
              if(proname=="style"){
                  node.style= node.style.cssText+provalue;

              }
              else {
                  _es_setAttr(node,proname,provalue,false);
              }
          }

      }
  }
  this._es_render=function(){
   var vc_nodes=_es_getnodesbypros("[vc]",document);
   for(i in vc_nodes){
       var esnode=new ESNode(vc_nodes[i]);
       _es_render_vc(esnode,true);
   }
   var vmep_nodes=_es_getnodesbypros("[vm]|[ve]|[vp]",document);
   for(i in vmep_nodes){
       var node=vmep_nodes[i];
       this._es_render_vm(node,true);
       this._es_render_ve(node,true);
       this._es_render_vp(node,true);
   }
  }
    this._es_objwatch=function(objv,pobject){

        var dx=this;
        for(var p in objv) {

            var obj=pobject;
            var subobj=pobject[p];

            var lx = _es_typeof(subobj);

            if(lx=="string"||lx=="number"||lx=="boolean"||lx=="array"){

                obj.watch(p, function (id, oldval, newval) {

                    if(oldval!=newval) {
                        var _lx = _es_typeof (this);
                        var _zhilx=_es_typeof(this[id]);
                        var _esobj=null;
                        if(this==window){
                            _esobj=_es_objects.findbyfullname(id);
                        }
                        else  if(_zhilx=="array"){
                            _esobj=_es_objects.findbyobj(this);

                            //数组重新赋值
                            for(var pp in oldval){
                                var _esobj2=_es_objects.findbyfullname(_esobj.fullname+"."+id+"["+pp+"]");
                                _es_objects.setnodesvalue(_esobj2,newval[pp]);
                                //
                               // this._es_render_vp(_esobj2.nodes,false);
                            }
                        }
                        else if(_lx=="array"){


                            _esobj=_es_objects.findbyobj(this);

                            _esobj=_es_objects.findbyfullname(_esobj.fullname+"["+id+"]");


                        }
                        else{
                            _esobj=_es_objects.findbyobj(this);
                        }
                        if(_lx=="object"&&_esobj){

                            _esobj=_es_objects.findbyfullname(_esobj.fullname+"."+id);

                        }

                        var _slx=_es_typeof(this[id]);

                        if(_slx!="object"&&_esobj){

                            _esobj.obj=newval;

                        }




                        if(_esobj){
                            dx._es_render_vps(_esobj.nodes,false);
                            for (var i=0;i<_esobj.nodes.length;i++){
                                var node=_esobj.nodes[i];
                                _es_setnodevalue(node,newval);
                            }
                        }


                    }
                    return newval;
                })
            }

            else{
                this._es_objwatch(subobj,subobj);
            }


        }
    }
    _es_prevdodata(options,window,"");
    this._es_render();
    this._es_objwatch(options,window);
}