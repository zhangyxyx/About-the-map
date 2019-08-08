var colors = ["#c6dbef", "#9ecae1", "#6baed6", "#3182bd", "#08519c"];

    var map = new AMap.Map('container', {
        mapStyle: 'amap://styles/midnight',
        features: ['bg', 'road'],
        center: [121.308586,31.196198],
        zoom: 12,
        pitch: 40,
        viewMode: '3D'
    });
    map.setMapStyle('amap://styles/44eb7c82d72fb88510f2863226f671dc');
    var layer = new Loca.PolygonLayer({
        map: map,
        fitView: false
    });
    
    layer.setData(area, {
        lnglat: 'lnglat'
    });

    layer.setOptions({
        style: {
            opacity: 0.5,
            color: function (res) {
                var index = res.index;
                return colors[index % colors.length];
            },
            height: function () {
                return Math.random() * 500 + 100;
            }
        }
    });

    layer.render();