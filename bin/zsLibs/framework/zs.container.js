window.zs=window.zs||{},window.zs.container=window.zs.container||{},function(t){"use strict";(window.zs.container=window.zs.container||{}).vec3=class{static make(t){let e=Laya.Vector3();return e.x=t,e.y=t,e.z=t,e}static add(t,e){let n=t.clone();return"number"==typeof e?(n.x+=e,n.y+=e,n.z+=e):(n.x+=e.x,n.y+=e.y,n.z+=e.z),n}static sub(t,e){let n=t.clone();return"number"==typeof e?(n.x-=e,n.y-=e,n.z-=e):(n.x-=e.x,n.y-=e.y,n.z-=e.z),n}static mul(t,e){let n=t.clone();return"number"==typeof e?(n.x*=e,n.y*=e,n.z*=e):(n.x*=e.x,n.y*=e.y,n.z*=e.z),n}static div(t,e){let n=t.clone();return"number"==typeof e?(n.x/=e,n.y/=e,n.z/=e):(n.x/=e.x,n.y/=e.y,n.z/=e.z),n}}}();