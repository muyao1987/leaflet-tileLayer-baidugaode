/** 
 * Leaflet 加载百度地图瓦片底图插件
 *
 * 用途：
 *   为 Leaflet 提供百度地图各类底图瓦片的加载能力，对外暴露两个接口：
 *     1. L.CRS.Baidu         —— 百度坐标系（百度墨卡托投影，基于 proj4leaflet 实现）
 *     2. L.tileLayer.baidu() —— 百度底图瓦片图层工厂函数
 *
 * 原理（投影/偏移校正）：
 *   百度地图没有使用标准 Web 墨卡托（EPSG:3857），而是采用基于克拉索夫斯基椭球体
 *   （a=6378206，b=6356584.314245179）的“百度墨卡托”投影：投影原点位于左上角，
 *   瓦片行号自上而下递增（即 tms 编号），第 z 级的地面分辨率为 2^(18-z) 米/像素。
 *   本插件通过 proj4leaflet 的 L.Proj.CRS 注册百度椭球参数、origin、bounds 与
 *   分辨率数组，构造出 L.CRS.Baidu；使用时将 L.map 的 crs 选项指定为 L.CRS.Baidu，
 *   即可完成百度底图的投影校正，再由 L.tileLayer.baidu 按所选底图类型拼接百度
 *   官方瓦片服务地址（tms: true）请求瓦片。
 *
 * 依赖：需在本文件之前依次引入 leaflet.js、proj4.js、proj4leaflet.js
 * @author 火星科技 木遥原创(qq:346819890) 
 */
//下方 L.CRS.Baidu 依赖 proj4.js 和 proj4leaflet.js，请务必在本文件之前引入
/**
 * 百度地图坐标系（BD-09 百度墨卡托投影）。
 * 通过 proj4leaflet 定义：指定百度使用的克拉索夫斯基椭球参数、坐标原点 [0, 0]
 * （位于左上角）、覆盖范围 bounds，以及各级分辨率（第 z 级为 2^(18-z) 米/像素，
 * 共 0~18 级）。加载百度瓦片时必须将地图 crs 设置为该值，否则瓦片位置会整体偏移。
 *
 * @type {L.Proj.CRS}
 *
 * @example
 * var map = L.map('map', { crs: L.CRS.Baidu, center: [31.834912, 117.220102], zoom: 12 });
 */
L.CRS.Baidu = new L.Proj.CRS('EPSG:900913', '+proj=merc +a=6378206 +b=6356584.314245179 +lat_ts=0.0 +lon_0=0.0 +x_0=0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs', {
    resolutions: function () {
        var level = 19; // 支持的最大层级：生成 0~18 共 19 级分辨率
        var res = [];
        res[0] = Math.pow(2, 18);
        for (var i = 1; i < level; i++) {
            res[i] = Math.pow(2, (18 - i))
        }
        return res;
    }(),
    origin: [0, 0],
    bounds: L.bounds([20037508.342789244, 0], [0, 20037508.342789244])
});

/**
 * 创建百度地图瓦片图层（本插件的对外工厂函数，挂在 L.tileLayer 命名空间下）。
 *
 * @param {Object} [option] 配置参数。
 * @param {string} [option.layer="vec"] 底图类型，可选值：
 *   - "vec"    百度矢量地图（含道路、注记），默认值；
 *   - "img"    百度卫星影像（内部由影像底图 img_d 与影像注记 img_z 两个图层合并而成）；
 *   - "img_d"  仅卫星影像；
 *   - "img_z"  仅影像上的道路与注记；
 *   - "custom" 百度自定义样式地图，需配合 option.customid；
 *   - "time"   实时路况图层。
 * @param {boolean} [option.bigfont=false] 是否使用大字体样式（仅 layer 为 "vec"、"img" 时生效）。
 * @param {string} [option.customid="midnight"] 自定义样式编号（仅 layer 为 "custom" 时生效），
 *   可选值：dark、midnight、grayscale、hardedge、light、redalert、googlelite、
 *   grassgreen、pink、darkgreen、bluish。
 * @param {string} [option.name] 图层名称，用于在 L.control.layers 图层控件中展示。
 * @returns {L.TileLayer|L.LayerGroup} 对应类型的瓦片图层；
 *   当 layer 为 "img" 时返回包含影像与注记两个子图层的 L.LayerGroup。
 *
 * @example
 * // 注意：必须将地图 crs 设置为 L.CRS.Baidu
 * var map = L.map('map', {
 *     crs: L.CRS.Baidu,
 *     center: [31.834912, 117.220102],
 *     zoom: 12
 * });
 * L.tileLayer.baidu({ layer: 'vec' }).addTo(map);
 *
 * @example
 * // 自定义样式（黑色地图）
 * L.tileLayer.baidu({ layer: 'custom', customid: 'dark' });
 */
L.tileLayer.baidu = function (option) {
    option = option || {};

    var layer;
    var subdomains = '0123456789';
    switch (option.layer) {
        //单图层
        case "vec":
        default:
            //'http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=pl&b=0&limit=60&scaler=1&udt=20170525'
            layer = L.tileLayer('http://online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=' + (option.bigfont ? 'ph' : 'pl') + '&scaler=1&p=1', {
                name:option.name,subdomains: subdomains, tms: true
            });
            break;
        case "img_d": 
            layer = L.tileLayer('http://shangetu{s}.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46', {
                name: option.name, subdomains: subdomains, tms: true
            });
            break;
        case "img_z":
            layer = L.tileLayer('http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=' + (option.bigfont ? 'sh' : 'sl') + '&v=020', {
                name: option.name, subdomains: subdomains, tms: true
            });
            break;

        case "custom"://Custom 各种自定义样式
            //可选值：dark,midnight,grayscale,hardedge,light,redalert,googlelite,grassgreen,pink,darkgreen,bluish
            option.customid = option.customid || 'midnight';
            layer = L.tileLayer('http://api{s}.map.bdimg.com/customimage/tile?&x={x}&y={y}&z={z}&scale=1&customid=' + option.customid, {
                name: option.name, subdomains: "012", tms: true
            });
            break;

        case "time"://实时路况
            var time = new Date().getTime();
            layer = L.tileLayer('http://its.map.baidu.com:8002/traffic/TrafficTileService?x={x}&y={y}&level={z}&time=' + time + '&label=web2D&v=017', {
                name: option.name, subdomains: subdomains, tms: true
            });
            break;

            //合并：卫星影像(img_d) + 影像注记(img_z)
        case "img":
            layer = L.layerGroup([
				L.tileLayer.baidu({ name: "底图", layer: 'img_d', bigfont: option.bigfont }),
				L.tileLayer.baidu({ name: "注记", layer: 'img_z', bigfont: option.bigfont })
            ]);
            break;
    }
    return layer;
};
