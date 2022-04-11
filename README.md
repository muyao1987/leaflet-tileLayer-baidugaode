# Leaflet加载国内百度、高德、谷歌、天地图等地图 

## 加载百度地图
  [在线Demo](http://mars2d.cn/editor.html?id=layer-tile/online/baidu)

```javascript
  //注意将map的crs赋值 crs: L.CRS.Baidu 详情请阅读示例页面 
var map = L.map('map', {
	crs: L.CRS.Baidu,
	minZoom: 3,
	maxZoom: 18,
	attributionControl: false,
	center: [31.834912, 117.220102],
	zoom: 12
});


//控制地图底图
L.control.layers({
	"百度地图": L.tileLayer.baidu({ layer: 'vec' }).addTo(map),
	"百度卫星": L.tileLayer.baidu({ layer: 'img' }),
	"百度地图-大字体": L.tileLayer.baidu({ layer: 'vec', bigfont: true }),
	"百度卫星-大字体": L.tileLayer.baidu({ layer: 'img', bigfont: true }),
	"自定义样式-黑色地图": L.tileLayer.baidu({ layer: 'custom', customid: 'dark' }),
	"自定义样式-蓝色地图": L.tileLayer.baidu({ layer: 'custom', customid: 'midnight' }) //自定义样式地图，customid可选值：dark,midnight,grayscale,hardedge,light,redalert,googlelite,grassgreen,pink,darkgreen,bluish
}, {
	"实时交通信息": L.tileLayer.baidu({ layer: 'time' })
}, { position: "topright" }).addTo(map);
```


 
## 加载天地图、高德、谷歌地图
  加载互联网常见墨卡托坐标系地图，如天地图、高德、谷歌地图。重点在URL地址。
  
   [高德在线Demo](http://mars2d.cn/editor.html?id=layer-tile/online/gaode)、
   [谷歌在线Demo](http://mars2d.cn/editor.html?id=layer-tile/online/google)、
   [腾讯在线Demo](http://mars2d.cn/editor.html?id=layer-tile/online/tentect)、
   [天地图在线Demo](http://mars2d.cn/editor.html?id=layer-tile/online/tdt)

```javascript
//控制地图底图
var baseLayers = {
	"高德地图": L.tileLayer('http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', { subdomains: "1234" }).addTo(map),
	"高德影像": L.layerGroup(
		[
			L.tileLayer('http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}', { subdomains: "1234" }),
			L.tileLayer('http://webst0{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8', { subdomains: "1234" })
		]
	),
	//天地图tk可以换成自己申请的key
	"天地图": L.layerGroup([
		L.tileLayer('http://t{s}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=56b81006f361f6406d0e940d2f89a39c', { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] }),
		L.tileLayer('http://t{s}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=56b81006f361f6406d0e940d2f89a39c', { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] })
	]),
	"天地图影像": L.layerGroup([
		L.tileLayer('http://t{s}.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=56b81006f361f6406d0e940d2f89a39c', { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] }),
		L.tileLayer('http://t{s}.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=56b81006f361f6406d0e940d2f89a39c', { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] })
	]),
	"天地图地形": L.layerGroup([
		L.tileLayer('http://t{s}.tianditu.gov.cn/ter_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=56b81006f361f6406d0e940d2f89a39c', { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] }),
		L.tileLayer('http://t{s}.tianditu.gov.cn/cta_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cta&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=56b81006f361f6406d0e940d2f89a39c', { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] })
	]),

	"Google地图": L.tileLayer('http://mt1.google.cn/vt/lyrs=m@207000000&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=Galile'),
	"Google影像": L.layerGroup([
		L.tileLayer('http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&gl=CN&x={x}&y={y}&z={z}&s=Gali'),
		L.tileLayer('http://mt1.google.cn/vt/imgtp=png32&lyrs=h@207000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil')
	]),

	"GeoQ ": L.tileLayer('http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}'),
	"GeoQ 藏蓝": L.tileLayer('http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}'),
	"GeoQ 灰": L.tileLayer('http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}')
};

L.control.layers(baseLayers, {}, { position: "topright" }).addTo(map);
```

 

## 其他
更多Leaflet示例请点击： [http://mars2d.cn](http://mars2d.cn)
