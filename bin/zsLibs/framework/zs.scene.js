window.zs=window.zs||{},function(e){"use strict";class t{constructor(){this._isPreloading=!1,this._isSceneLoading=!1,this._current=null,this._nodes={}}static get inst(){return null==t._inst&&(t._inst=new t),t._inst}get nodes(){return this._nodes}get current(){return this._current}get next(){return this._next}get staticNode(){return this._staticNode}get dynamicNode(){return this._dynamicNode}get preloadNode(){return this._preloadNode}get isSceneLoading(){return this._isSceneLoading}get isPreloading(){return this._isPreloading}static URLCombine(e,t){let n=this.basePath+"/"+e;return null!=t&&t.trim().length>0&&(n+="."+t),n}async load(e,n,i){if(this._isSceneLoading)return void zs.log.warn("正在加载其他场景······","Scene");let r="";r=e instanceof Laya.Scene3D?e.url:n?e:t.URLCombine(e,"ls"),null!=this._current&&r!=this._current.url&&(this._current.destroy(!0),Laya.loader.clearRes(this._current.url));let s=null;e instanceof Laya.Scene3D?s=e:(this._isSceneLoading=!0,s=await zs.resource.load(r,zs.ResourceType.Scene3D).catch(e=>e),this._isSceneLoading=!1),this._current=Laya.stage.addChildAt(s,i||0),this.build()}async loadNext(e,t){if(this._isSceneLoading)return void zs.log.warn("正在加载其他场景······","Scene");let n=null;this._current&&(n=this._current.url,this._current.destroy(!0)),e&&null!=this._next&&n!=this._next.url&&(Laya.loader.clearRes(n),n=this._next.url),null==n&&zs.log.fatal("场景加载错误，当前无场景且未预加载场景"),this._isSceneLoading=!0;let i=await zs.resource.load(n,zs.ResourceType.Scene3D).catch(e=>e);this._isSceneLoading=!1,this._current=Laya.stage.addChildAt(i,t||0),this.build()}async preload(e,t){if(this._isPreloading)console.warn("正在预加载其他场景······");else{if(this._isPreloading=!0,null==this._current||this._current.url!=e){let e=await zs.utils.loadScene3D(url).catch(e=>e);this._next=e}this._isPreloading=!1}}build(){if(null==this._current)return void zs.log.fatal("当前场景为空，无法构建场景");if(t.nodesDef)for(let e in t.nodesDef){let n=this._current.getChildByName(e);null==n&&(n=this._current.addChild(new Laya.Sprite3D(e))),this._nodes[e]=n,t.nodesDef[e]=n}if(this._staticNode=this._current.getChildByName(t.node_static),this._dynamicNode=this._current.getChildByName(t.node_dynamic),this._preloadNode=this._current.getChildByName(t.node_preload),null==this._staticNode)return zs.log.warn("构建世界场景警告！节点Static丢失！无法自动构建场景！");if(null==this._dynamicNode)return zs.log.warn("构建世界场景警告！节点Dynamic丢失！无法自动构建场景！");if(null==this._preloadNode)return zs.log.warn("构建世界场景警告！节点Preload丢失！无法自动构建场景！");let e=[];if(this._preloadNode&&this._staticNode)for(let n=0,i=this._preloadNode.numChildren;n<i;n++){let i=this._preloadNode.getChildAt(n),r=this._current.getChildByName(i.name);if(!(null==r||r.numChildren<=0)){e.push(r),t.onBuildPrefab&&t.onBuildPrefab.runWith(i);for(let e=0,n=r.numChildren;e<n;e++){let n=r.getChildAt(e);if(t.onPlacePrefab)t.onPlacePrefab.runWith([i,n]);else{Laya.Sprite3D.instantiate(i,this._staticNode,!1,n.transform.position,n.transform.rotation).transform.setWorldLossyScale(n.transform.getWorldLossyScale())}}}}t.onBuildWorld&&t.onBuildWorld.run(),Laya.ILaya.Browser.onIOS&&"qq_"==zs.platform.config.platformMark?zs.log.warn("手Q平台IOS系统使用静态合批将引发崩溃，自动跳过场景静态合批","Scene"):Laya.StaticBatchManager.combine(this._staticNode),this._preloadNode.destroy(!0);for(let t=0;t<e.length;t++)null!=e[t]&&e[t].destroy(!0)}}t.basePath="3dres/Conventional",t.nodesDef=null,t.node_static="static",t.node_dynamic="dynamic",t.node_preload="preload",t.onBuildPrefab=null,t.onPlacePrefab=null,t.onBuildWorld=null,e.scene=t}(window.zs=window.zs||{});