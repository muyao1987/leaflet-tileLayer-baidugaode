# Leaflet加载国内百度、高德、谷歌、天地图等地图

> 原作者：火星科技 木遥（qq:346819890）
> 更多 Leaflet 示例：[http://mars2d.cn](http://mars2d.cn)

## 项目简介

本项目是火星科技（marsgis/mars3d）开源的 Leaflet 互联网地图底图加载插件与示例集合，包含两部分内容：

- **百度地图加载插件**（`src/tileLayer.baidu.js`）：对外提供 `L.CRS.Baidu` 坐标系和 `L.tileLayer.baidu()` 图层工厂函数，解决百度"百度墨卡托"投影与标准 Web 墨卡托不一致导致的瓦片位置偏移问题，支持矢量、卫星影像、自定义样式、实时路况等多种百度底图；
- **常见互联网地图加载示例**：高德、谷歌、天地图、腾讯、GeoQ 等常见墨卡托坐标系瓦片地图，使用 Leaflet 原生 `L.tileLayer` 拼接瓦片 URL 即可加载。

## 功能特性

- 提供 `L.CRS.Baidu`：基于 proj4leaflet 定义的百度墨卡托坐标系（克拉索夫斯基椭球参数、投影原点在左上角、0~18 级分辨率），使用时传入地图的 `crs` 选项即可；
- 提供 `L.tileLayer.baidu(option)` 工厂函数，一行代码切换多种百度底图：
  - `vec`：百度矢量地图（含大字体样式）；
  - `img` / `img_d` / `img_z`：卫星影像与影像注记，可合并或单独加载；
  - `custom`：百度自定义样式地图（dark、midnight、grayscale 等 11 种）；
  - `time`：实时路况图层；
- 附带高德、天地图、谷歌、GeoQ 等地图的瓦片 URL 写法示例，见 `examples/www_baselayer.html`。

## 在线示例

- [百度地图在线Demo](http://mars2d.cn/editor.html?id=layer-tile/online/baidu)
- [高德在线Demo](http://mars2d.cn/editor.html?id=layer-tile/online/gaode)
- [谷歌在线Demo](http://mars2d.cn/editor.html?id=layer-tile/online/google)
- [腾讯在线Demo](http://mars2d.cn/editor.html?id=layer-tile/online/tentect)
- [天地图在线Demo](http://mars2d.cn/editor.html?id=layer-tile/online/tdt)

本地示例（用浏览器直接打开即可运行）：

- `examples/www_baselayer_baidu.html`：百度各类底图示例；
- `examples/www_baselayer.html`：高德、天地图、谷歌、GeoQ 等底图示例。

## 安装引入

无需构建工具，在页面中按顺序引入 Leaflet、proj4、proj4leaflet 及本插件即可（加载百度底图必须依赖 proj4 系列）：

```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
<script src="https://cdn.bootcss.com/proj4js/2.4.3/proj4.js"></script>
<script src="https://cdn.bootcss.com/proj4leaflet/1.0.1/proj4leaflet.min.js"></script>
<!-- 百度底图插件 -->
<script src="../src/tileLayer.baidu.js"></script>
```

高德、谷歌、天地图等标准墨卡托地图不需要 proj4，仅引入 Leaflet 后使用 `L.tileLayer` 即可。

## 使用示例

### 加载百度地图

注意：必须将地图的 `crs` 选项赋值为 `L.CRS.Baidu`。

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

### 加载天地图、高德、谷歌地图

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

## 配置参数说明

`L.tileLayer.baidu(option)` 支持的配置参数：

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `layer` | String | `'vec'` | 底图类型，可选值见下表 |
| `bigfont` | Boolean | `false` | 是否使用大字体样式，仅 `vec`、`img` 类型生效 |
| `customid` | String | `'midnight'` | 自定义样式编号，仅 `layer: 'custom'` 时生效 |
| `name` | String | 无 | 图层名称，用于 `L.control.layers` 图层控件中展示 |

`layer` 可选值：

| 取值 | 说明 | 返回类型 |
| --- | --- | --- |
| `vec` | 百度矢量地图（含道路、注记），默认值 | `L.TileLayer` |
| `img` | 卫星影像 + 影像注记（内部合并 `img_d` 与 `img_z`） | `L.LayerGroup` |
| `img_d` | 仅卫星影像 | `L.TileLayer` |
| `img_z` | 仅影像上的道路与注记 | `L.TileLayer` |
| `custom` | 自定义样式地图 | `L.TileLayer` |
| `time` | 实时路况图层 | `L.TileLayer` |

`customid` 可选值：`dark`、`midnight`、`grayscale`、`hardedge`、`light`、`redalert`、`googlelite`、`grassgreen`、`pink`、`darkgreen`、`bluish`。

## 目录结构

```
leaflet-tileLayer-baidugaode
├── src
│   └── tileLayer.baidu.js          // 百度底图插件：L.CRS.Baidu + L.tileLayer.baidu
├── examples
│   ├── www_baselayer.html          // 高德、天地图、谷歌、GeoQ 等底图示例
│   └── www_baselayer_baidu.html    // 百度各类底图示例
├── README.md
└── LICENSE
```

## 其他

更多Leaflet示例请点击： [http://mars2d.cn](http://mars2d.cn)

## 许可证

[Apache License 2.0](LICENSE)（Copyright 2017-2022 Hefei Mars Technology Co., LTD., China，[http://mars3d.cn](http://mars3d.cn)）
