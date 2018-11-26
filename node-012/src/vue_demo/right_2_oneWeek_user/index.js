// 一周数据终端数统计
var one_week_data = {
  key: [
    "2018-08-25",
    "2018-08-26",
    "2018-08-27",
    "2018-08-28",
    "2018-08-29",
    "2018-08-30",
    "2018-08-31",
  ],
  val: [
    [0, 5, 6, 4, 5, 6, 7],
    [4, 3, 2, 4, 4, 4, 4],
    [1, 4, 3, 4, 4, 4, 4],
  ],
};

export default {
  // name: 'main_app',
  data: function() {
    return {
      // 所有的配置项
      conf: {

      },

      hangye_sn_obj: {
        ec: null,
        key: null,
        // 颜色
        color: ['#FF00FF', '#FFFF00', '#FFFFFF'],
        legend: ["item-1", "item-2", "item-3"],
      }

    };
  },
  mounted: function() {
    var me = this;
    //
    me.hangye_sn_obj.ec = echarts.init(document.getElementById('weekNum'));
    // 坐标的颜色
    me.hangye_sn_obj.line_color = 'yellow';


    me._hangye_sn_init();
  },
  methods: {
    _hangye_sn_init: function() {
      var me = this;

      // console.log(data);
      one_week_data = one_week_data;

      // 数据处理
      var series = [];
      one_week_data.val.forEach(function(ele, index) {
        series.push({
          name: me.hangye_sn_obj.legend[index],
          type: 'line',
          // 文字
          label: {
            show: true,
            position: 'top',
            color: me.hangye_sn_obj.line_color
          },
          data: ele,
          lineStyle: {
            width: 3,
          },
        });
      });


      me.hangye_sn_obj.ec.setOption({
        color: me.hangye_sn_obj.color,
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '2px',
          right: '5px',
          top: '15px',
          bottom: "8px",
          containLabel: true
        },
        xAxis: {
          type: 'category',
          splitLine: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: me.hangye_sn_obj.line_color
            }
          },
          data: one_week_data.key,
        },
        yAxis: {
          type: 'value',
          minInterval: 1,
          boundaryGap: [0, 0.01],
          splitLine: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color:me.hangye_sn_obj.line_color
            }
          }
        },
        legend: {
          type: 'plain',
          data: me.hangye_sn_obj.legend,
          textStyle: {
            color: me.hangye_sn_obj.line_color,
            fontSize: 10
          },
          orient: 'horizontal',
          top: 5,
          right: 10,
          padding: 0,
          itemHeight: 5,
        },
        dataZoom: [{
          type: 'inside'
        }],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },

        series: series
      });


    },
  },
  components: {},
}
