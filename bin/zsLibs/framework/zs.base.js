window.zs=window.zs||{},window.zs.base=window.zs.base||{},function(i){"use strict";class s{constructor(i,s,t){this.thisArg=s,i.prototype instanceof zs.proxy.NativeLoading?(this.loading=i.make(),this.loading.init(),t.call(s),zs.Timer.inst.frameLoop(1,this,this.onProgress)):this.window=zs.fgui.window.create().attach(i).fit().update(i,i=>{this.loading=i,t.call(s),zs.Timer.inst.frameLoop(1,this,this.onProgress)}).show()}onProgress(){if((!this.loading||this.loading.run(this.thisArg.progress||0))&&this.thisArg.readyStart){if(this.thisArg.start(),zs.Timer.inst.clear(this,this.onProgress),this.loading&&this.loading instanceof zs.proxy.NativeLoading){let i=this.loading.owner;i.removeSelf(),this.loading.destroy(),i.destroy()}this.window&&this.window.dispose()}}get progress(){return null==this.loading?0:this.loading.current}static init(i,t,o){return new s(i,t,o)}}(window.zs.base=window.zs.base||{}).entry=s}();