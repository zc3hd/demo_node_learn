export default {
  // name: 'main_app',
  data: function() {
    return {
      // 所有的配置项
      conf: {
        dev_img_url: '/vue_demo/mid_main',
        build_img_url: ".",
      },
    };
  },
  mounted: function() {
    var me = this;
    console.log(conf);
    me._make();
  },
  methods: {
    _make: function() {
      var me = this;
      var myChart = echarts.init(document.getElementById('earth'));

      var img_url = '';
      if (conf.build) {
        img_url = me.conf.build_img_url;
      }
      else {
        img_url = me.conf.dev_img_url;
      }


      myChart.setOption({
        globe: {
          // 地球半径
          globeRadius: 70,
          globeOuterRadius: 60,
          // 环境贴图
          environment: img_url + '/img/map_wl.jpg',
          // 地球的纹理。支持图片路径字符串，图片或者 Canvas 的对象
          baseTexture: img_url + '/img/map.jpg',

          // 地球的高度纹理。高度纹理可以用于凹凸贴图表现地球表面的明暗细节
          heightTexture: img_url + "/img/map_wl.jpg",
          // 纹理的抬高倍数
          displacementScale: 0.1,
          // 地球顶点位移的质量。支持设置成 'low', 'medium', 'high', 'ultra' 。更高的质量能够表现更多的地表高度细节
          displacementQuality: 'medium',

          // 地球中三维图形的着色效果
          shading: 'realistic',
          // 真实感材质相关的配置项
          realisticMaterial: {
            // roughness属性用于表示材质的粗糙度，0为完全光滑，1完全粗糙
            roughness: 0.5,
            // 属性用于表示材质是金属还是非金属，0为非金属，1为金属
            metalness: 0,
            // 
            textureTiling: 1
          },
          // 更富有质感。
          postEffect: {
            enable: false
          },
          // 用于鼠标的旋转，缩放等视角控制。
          viewControl: {
            autoRotate: true
          },

          light: {
            // 光源
            main: {
              intensity: 1,
              shadow: true,
              shadowQuality: 'ultra',
            },
            ambientCubemap: {
              texture: img_url + '/img/pisa.hdr',
              exposure: 1,
              diffuseIntensity: 1,
              specularIntensity: 1
            }
          },
          layers: [{
            texture: img_url + '/img/map_wl.jpg',
          }]
        }
      });
    },
  },
  components: {},
}
