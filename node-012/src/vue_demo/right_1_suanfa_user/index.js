export default {
  // name: 'main_app',
  data: function() {
    return {
      // 所有的配置项
      conf: {

        // 接入终端刷新的时间
        sn_time: 1000,
        // 数据的界限
        sn_arr_limit: 20,
      },

      sn_obj: {
        // 用于数据请求和标识
        key: 1,

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
      }

    };
  },
  mounted: function() {
    var me = this;
    //
    me.sn_obj.ec = echarts.init(document.getElementById('sn'));
    // 坐标的颜色
    me.sn_obj.line_color = 'yellow';
    // 数据的颜色
    me.sn_obj.data_color = '0,255,255';


    me._sn();
  },
  methods: {
    _sn_sel_ev: function(key) {
      var me = this;
      if (me.sn_obj.key == key) {
        return;
      }
      me.sn_obj.key = key;

      // 清除数据库容器
      me.sn_obj.arr.length = 0;
    },
    // 接入数的实时数据
    _sn: function() {
      var me = this;
      // 时间初始化
      me._sn_time_init();
      // *********************************************模拟数据数据初始化
      var new_sum = 5 + Math.floor(Math.random() * 5);
      me._sn_data_init({ sum: new_sum });
      // ***************************************************************


      // RT服务
      me._sn_init(me.sn_obj.ec, me.sn_obj.arr);

      // 减少
      if (me.sn_obj.arr.length >= me.conf.sn_arr_limit) {
        me.sn_obj.arr.shift();
      }

      setTimeout(function(argument) {
        me._sn();
      }, me.conf.sn_time);
    },
    // 每个点的时间初始化
    _sn_time_init: function() {
      var me = this;
      // 挂载时间
      me.sn_obj.date = new Date();
      me.sn_obj.h = me.sn_obj.date.getHours() + '';
      me.sn_obj.m = me.sn_obj.date.getMinutes() + '';
      me.sn_obj.s = me.sn_obj.date.getSeconds() + '';
      // 时间修正
      me._time_fix(me.sn_obj);
      // 时间字符串挂载
      me.sn_obj.date_str = `${me.sn_obj.date.getFullYear()}/${me.sn_obj.date.getMonth() + 1}/${me.sn_obj.date.getDate()} ${me.sn_obj.h}:${me.sn_obj.m}:${me.sn_obj.s}`;
      // 默认时间字符串
      me.sn_obj.date_string = me.sn_obj.date.toString();
    },
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
    // 数据初始化
    _sn_data_init: function(data) {
      var me = this;
      // RTD数据挂载
      me.sn_obj.arr.push({
        name: me.sn_obj.date_string,
        value: [
          // 对着X轴的信息
          me.sn_obj.date_str,
          // Y轴的信息
          data.sum
        ]
      });
    },
    // 具体的渲染
    _sn_init: function(ec, arr) {
      var me = this;
      ec.setOption({

        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            // params--值都在里面
            params = params[0];
            var date = new Date(params.name);

            return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ':' + params.value[1];
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
              color: me.sn_obj.line_color
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
              color: me.sn_obj.line_color
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
                color: 'rgb(' + me.sn_obj.data_color + ')'
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  //
                  {
                    offset: 0,
                    color: 'rgba(' + me.sn_obj.data_color + ',1)'
                  },
                  //
                  {
                    offset: 1,
                    color: 'rgba(' + me.sn_obj.data_color + ',0.5)'
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
