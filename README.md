#leaflet加载百度地图 
 
- 查看examples\www_baselayer_baidu.html 示例加载百度地图
```javascript
  var layer = L.tileLayer.baidu({ layer: 'vec' });  //百度电子地图
  var layer = L.tileLayer.baidu({ layer: 'img' });             //百度卫星地图
  var layer = L.tileLayer.baidu({ layer: 'vec',bigfont:true });   //百度电子地图-大字体
  var layer = L.tileLayer.baidu({ layer: 'img', bigfont: true });   //百度卫星地图-大字体 
  var layer = L.tileLayer.baidu({ layer: 'time' }) //实时交通信息
  
  map.addLayer(layer);  
```

- 查看examples\www_baselayer.html 示例加载谷歌和高德地图

