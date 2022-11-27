* 使用vue-baidu-map
```JavaScript 
app.js
import BaiduMap from 'vue-baidu-map-v3'
Vue.use(BaiduMap, {
  ak: '',  //这个地方是官方提供的ak密钥
})
app.vue
import {BaiduMap,BmControl,BmView,BmlHeatmap} from "vue-baidu-map-v3"; 
<baidu-map class="map"  :scroll-wheel-zoom="scroll" :center="{lng: 116.404, lat: 39.915}" :zoom="11" @ready="handler">
  <bm-marker :position="{lng: 116.417, lat: 39.909}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" @click="showTopo"></bm-marker>
  <bm-marker :position="{lng: 87.614089, lat: 43.831387}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" @click="showTopo"></bm-marker>
  <bm-marker :position="{lng: 101.53063, lat: 25.059549}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" @click="showTopo"></bm-marker>
  <bm-label content="1" :position="{lng:  116.119721, lat: 39.779104}" :labelStyle="{color: 'red', fontSize : '14px'}" title="Hover me"/>
  <bm-label content="2" :position="{lng:  115.950484, lat:39.956895}" :labelStyle="{color: 'red', fontSize : '14px'}" title="Hover me"/>

  <bm-polyline :path="polylinePath" stroke-color="blue" :stroke-opacity="1" :stroke-weight="4" ></bm-polyline>
  <bml-heatmap :data="mapList" :max="100" :radius="20"></bml-heatmap>
</baidu-map>

handler({ BMap, map }) { 
  let that = this;
  map.setMapStyleV2({styleId:'6197b9587254a57a31f90a8974211f9c'});
},
```
 
