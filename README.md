#leaflet加载百度地图 
 
- leaflet加载互联网常见墨卡托坐标系地图，如天地图、高德、谷歌地图[demo](https://muyao1987.github.io/leaflet-tileLayer-baidu/examples/www_baselayer.html)

- leaflet加载百度地图 [demo](https://muyao1987.github.io/leaflet-tileLayer-baidu/examples/www_baselayer_baidu.html):
```javascript
  var layer = L.tileLayer.baidu({ layer: 'vec' });  //百度电子地图
  var layer = L.tileLayer.baidu({ layer: 'img' });             //百度卫星地图
  var layer = L.tileLayer.baidu({ layer: 'vec',bigfont:true });   //百度电子地图-大字体
  var layer = L.tileLayer.baidu({ layer: 'img', bigfont: true });   //百度卫星地图-大字体 
  var layer = L.tileLayer.baidu({ layer: 'time' }) //实时交通信息
  
  map.addLayer(layer);  
```


