// 顶部信息
var top_data = {
  totalTerminalNum: 50,
  onlineTerminalNum: 0,


  stationNum: 100,
  totalRunstationNum: 0,

  platformNum: 0,
};


export default {
  // name: 'main_app',
  data: function() {
    return {
      // 所有的配置项
      conf: {

        // ===========================================left
        // =============================
        // 顶部刷新的时间
        top_time: 1000,

        // 全部基站接入统计限制
        top_sn_arr_limit: 60,
      },


      // 顶部信息
      top_info_sn_obj: {
        // 用于数据请求
        key: null,

        ec: null,
        // 时间
        date: null,
        // 时分秒
        h: null,
        m: null,
        s: null,
        // 按照格式拼接的字符串
        date_str: '',
        // 时间的默认字符串
        date_string: '',

        // 数据容器
        arr: [],



        // 总数视图数据
        totalTerminalNum: 0,
        //
        onlineTerminalNum: 0,
        // 尺子样式
        zhongd_chi_json: null,
        // 灰色的样式
        zhongd_hui_json: null,


        // 累计入网基站数
        stationNum: 0,
        // 在线基站
        totalRunstationNum: 0,

        // 尺子样式
        cors_chi_json: null,
        // 灰色的样式
        cors_hui_json: null,

        // 累计接入平台数
        platformNum: 0,

        platformNum_chi_json: null,
        platformNum_hui_json: null,
      },

    }
  },
  mounted: function() {
    var me = this;



    // 顶部数据
    me.top_info_sn_obj.ec = echarts.init(document.getElementById('top_info_sn'));

    // 坐标的颜色
    me.top_info_sn_obj.line_color = 'yellow';
    // 数据的颜色
    me.top_info_sn_obj.data_color = '173,255,47';
    //
    me._top_info();
  },
  methods: {
    // 时间位数修正
    _time_fix: function(obj) {
      var me = this;
      if (obj.h.length == 1) {
        obj.h = '0' + obj.h;
      } else {
        obj.h = obj.h + '';
      }
      if (obj.m.length == 1) {
        obj.m = '0' + obj.m;
      } else {
        obj.m = obj.m + '';
      }
      if (obj.s.length == 1) {
        obj.s = '0' + obj.s;
      } else {
        obj.s = obj.s + '';
      }
    },
    // ==============================================
    // 顶部信息
    _top_info: function() {
      var me = this;
      // console.log(me)
      // =================================模拟数据
      // 基站总数
      top_data.totalRunstationNum = Math.floor(Math.random() * top_data.stationNum);
      // =================================模拟数据
      // ec
      me._top_info_sn(top_data.totalRunstationNum);

      setTimeout(function() {
        me._top_info();
      }, me.conf.top_time);

    },
    // =======================================================
    // 基站接入的总数的实时数据
    _top_info_sn: function(sum) {
      var me = this;

      // 时间初始化
      me._top_info_sn_time_init();
      // *********************************************模拟数据数据初始化
      // var new_sum = 5 + Math.floor(Math.random() * 5);
      // me._top_info_sn_data_init({ sum: new_sum });
      // ***************************************************************


      me._top_info_sn_data_init({ sum: sum });

      // RT服务
      me._top_info_sn_init('', me.top_info_sn_obj.ec, me.top_info_sn_obj.arr);

      // 减少
      if (me.top_info_sn_obj.arr.length >= me.conf.top_sn_arr_limit) {
        me.top_info_sn_obj.arr.shift();
      }
    },
    // 时间初始化
    _top_info_sn_time_init: function() {
      var me = this;
      // 挂载时间
      me.top_info_sn_obj.date = new Date();
      me.top_info_sn_obj.h = me.top_info_sn_obj.date.getHours() + '';
      me.top_info_sn_obj.m = me.top_info_sn_obj.date.getMinutes() + '';
      me.top_info_sn_obj.s = me.top_info_sn_obj.date.getSeconds() + '';
      // 时间修正
      me._time_fix(me.top_info_sn_obj);
      // 时间字符串挂载
      me.top_info_sn_obj.date_str = `${me.top_info_sn_obj.date.getFullYear()}/${me.top_info_sn_obj.date.getMonth() + 1}/${me.top_info_sn_obj.date.getDate()} ${me.top_info_sn_obj.h}:${me.top_info_sn_obj.m}:${me.top_info_sn_obj.s}`;
      // 默认时间字符串
      me.top_info_sn_obj.date_string = me.top_info_sn_obj.date.toString();
    },
    // 数据初始化
    _top_info_sn_data_init: function(data) {
      var me = this;
      // RTD数据挂载
      me.top_info_sn_obj.arr.push({
        name: me.top_info_sn_obj.date_string,
        value: [
          // 对着X轴的信息
          me.top_info_sn_obj.date_str,
          // Y轴的信息
          data.sum
        ]
      });
    },
    // 具体的渲染
    _top_info_sn_init: function(title, ec, arr) {
      var me = this;
      ec.setOption({

        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            // params--值都在里面
            params = params[0];
            var date = new Date(params.name);

            // return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ':' + params.value[1];
            return '接入基站数：' + params.value[1];
          },
        },
        grid: {
          left: '2px',
          right: '5px',
          top: '10px',
          bottom: "8px",
          containLabel: true
        },
        xAxis: {
          type: 'time',
          // 要显示几个刻度
          // splitNumber: 10,

          // 刻度线
          splitLine: {
            show: true
          },

          axisLine: {
            lineStyle: {
              color: me.top_info_sn_obj.line_color
            }
          },
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
              color: me.top_info_sn_obj.line_color
            }
          },
        },
        series: [
          // 每一组数据
          {
            data: arr,
            name: '接入终端数',
            type: 'line',
            smooth: true,
            symbol: 'emptyCircle',
            itemStyle: {
              normal: {
                color: 'rgb(' + me.top_info_sn_obj.data_color + ')'
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  //
                  {
                    offset: 0,
                    color: 'rgba(' + me.top_info_sn_obj.data_color + ',1)'
                  },
                  //
                  {
                    offset: 1,
                    color: 'rgba(' + me.top_info_sn_obj.data_color + ',0.5)'
                  }
                ])
              }
            },
          }
        ]
      });
    },

  },
  components: {},
}
