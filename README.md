#leaflet加载百度地图 



- leaflet加载百度地图 [example](https://muyao1987.github.io/leaflet-tileLayer-baidu/examples/www_baselayer_baidu.html):
```javascript
  var layer = L.tileLayer.baidu({ layer: 'vec' });  //百度电子地图
  var layer = L.tileLayer.baidu({ layer: 'img' });             //百度卫星地图
  var layer = L.tileLayer.baidu({ layer: 'vec',bigfont:true });   //百度电子地图-大字体
  var layer = L.tileLayer.baidu({ layer: 'img', bigfont: true });   //百度卫星地图-大字体 
  var layer = L.tileLayer.baidu({ layer: 'time' })	//实时交通信息
  var layer = L.tileLayer.baidu({ layer: 'custom', customid:'dark' })  //自定义样式地图，customid可选值：dark,midnight,grayscale,hardedge,light,redalert,googlelite,grassgreen,pink,darkgreen,bluish
  
  map.addLayer(layer);  
```
 ![image](https://muyao1987.github.io/leaflet-tileLayer-baidu/examples/img/baidu.jpg)

 
- leaflet加载互联网常见墨卡托坐标系地图，如天地图、高德、谷歌地图，重点在URL地址 [example](https://muyao1987.github.io/leaflet-tileLayer-baidu/examples/www_baselayer.html)
```javascript
高德地图: L.tileLayer('http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',{ subdomains: 1234 });
高德影像: L.layerGroup([
     L.tileLayer('http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',{ subdomains: 1234 });
     L.tileLayer('http://webst0{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8', { subdomains: 1234 })
 ])

 天地图: L.layerGroup([
      L.tileLayer('http://t{s}.tianditu.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}',{ subdomains: ['0'; '1'; '2'; '3'; '4'; '5'; '6'; '7'] });
      L.tileLayer('http://t{s}.tianditu.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}', {  subdomains: ['0'; '1'; '2'; '3'; '4'; '5'; '6'; '7'] })
 ]);
 天地图影像: L.layerGroup([
     L.tileLayer('http://t{s}.tianditu.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}', {  subdomains: ['0'; '1'; '2'; '3'; '4'; '5'; '6'; '7'] });
     L.tileLayer('http://t{s}.tianditu.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}', { subdomains: ['0'; '1'; '2'; '3'; '4'; '5'; '6'; '7'] })
 ]);
 天地图地形: L.layerGroup([
    L.tileLayer('http://t{s}.tianditu.cn/DataServer?T=ter_w&X={x}&Y={y}&L={z}', { subdomains: ['0'; '1'; '2'; '3'; '4'; '5'; '6'; '7'] });
    L.tileLayer('http://t{s}.tianditu.cn/DataServer?T=cta_w&X={x}&Y={y}&L={z}', { subdomains: ['0'; '1'; '2'; '3'; '4'; '5'; '6'; '7'] })
 ]);

 Google地图: L.tileLayer('http://mt1.google.cn/vt/lyrs=m@207000000&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=Galile');
 Google影像: L.layerGroup([
     L.tileLayer('http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&gl=CN&x={x}&y={y}&z={z}&s=Gali');
     L.tileLayer('http://mt1.google.cn/vt/imgtp=png32&lyrs=h@207000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil')
 ]);
```

 ![image](https://muyao1987.github.io/leaflet-tileLayer-baidu/examples/img/gaode.jpg)