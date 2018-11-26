// 基站的有效率
var cors_youxiaolv_data = {
  key: ['1', '2', '3'],
  val: [{
    value: 1,
    name: '1',
    stationName: 'cors',
    ac: 40,
  }, {
    value: 1,
    name: '2',
    stationName: 'cors',
    ac: 40,
  }, {
    value: 1,
    name: '3',
    stationName: 'cors',
    ac: 40,
  }, ]
};

cors_youxiaolv_data.key.length = 0;
cors_youxiaolv_data.val.length = 0;
for (var i = 0; i < 10; i++) {
  cors_youxiaolv_data.key.push(i);
  cors_youxiaolv_data.val.push({
    value: 1,
    name: i,
    stationName: 'nav_1_data_' + i,
    ac: Math.floor(Math.random() * 100),
  });
}

// 接入延时
var cors_yanshi_data = {
  key: ['1', '2', '3'],
  val: [{
    value: 1,
    name: '1',
    stationName: 'cors',
    ac: 40,
  }, {
    value: 1,
    name: '2',
    stationName: 'cors',
    ac: 40,
  }, {
    value: 1,
    name: '3',
    stationName: 'cors',
    ac: 40,
  }, ]
};
cors_yanshi_data.key.length = 0;
cors_yanshi_data.val.length = 0;
for (var i = 0; i < 15; i++) {
  cors_yanshi_data.key.push(i);
  cors_yanshi_data.val.push({
    value: 1,
    name: i,
    stationName: 'nav_2_data_' + i,
    ac: Math.floor(Math.random() * 6),
  });
}


export default {
  // name: 'main_app',
  data: function() {
    return {
      // 所有的配置项
      conf: {

        // 基站状态饼图
        cors_status_time: 1000,


        // 有效率的界限
        cors_nav_1_limit: [75, 85, 95],
        // 延时的界限
        cors_nav_2_limit: [1, 3, 5],
      },


      cors_status_obj: {
        ec: null,
        // 被记录的ID
        key: "yx",
        // 有效率和接入延时的颜色
        colors: [
          //
          {
            val: {
              backgroundColor: '#006400',
            },
            key_yx: "95%~100%",
            key_ys: "0s~1s",
          },
          //
          {
            val: {
              backgroundColor: '#008000',
            },
            key_yx: "85%~95%",
            key_ys: "1s~3s",
          },
          //
          {
            val: {
              backgroundColor: '#00FF00',
            },
            key_yx: "75%~85%",
            key_ys: "3s~5s",
          },
          //
          {
            val: {
              backgroundColor: '#ADFF2F',
            },
            key_yx: "0%~75%",
            key_ys: ">5s",
          },
        ],
      },

    }
  },
  mounted: function() {
    var me = this;

    me.cors_status_obj.ec = echarts.init(document.getElementById('cors_status'));
    me._cors_stutas_sel();

  },
  methods: {
    // 基站信息统计
    _cors_stutas_sel: function(key) {
      var me = this;
      // 选择事件
      var key = null;
      $('#cors_status_sel')
        .on('click', '.item_box', function(e) {
          key = $(e.currentTarget).hasClass('ac');
          if (key) {
            return;
          }
          $('#cors_status_sel>.item_box').removeClass('ac');
          $(e.currentTarget).addClass('ac');

          // 找到ID
          me.cors_status_obj.key = $('#cors_status_sel>.ac').attr("val");



          // 只进行一次及时渲染
          var title = null;
          var url = null;

          // 有效率
          if (me.cors_status_obj.key == 'yx') {
            title = 'yx';
            url = me.api.allLossData;
          }
          // 延时
          else if (me.cors_status_obj.key == 'ys') {
            title = 'ys';
            url = me.api.allDelay;
          }

          //
          FN.ajax(url)
            .done(function(data) {
              if (data.ret == 0) {
                me._cors_stutas_one(title, data.data);
              }
            });

        });



      // 记录ID--进行第一次选择
      // me.cors_status_obj.key = $('#cors_status_sel>.ac').attr("val");

      // 数据初始化
      me._cors_stutas_init();

      // 图例
      // me._cors_stutas_demo(me.cors_status_obj.key);
    },
    _cors_stutas_sel_ev: function(key) {
      var me = this;

      if (me.cors_status_obj.key == key) {
        return;
      }

      // 找到ID
      me.cors_status_obj.key = key;

      // 执行一次
      me._cors_stutas_one(me.cors_status_obj.key, {});
    },

    // 基站信息统计初始化
    _cors_stutas_init: function() {
      var me = this;
      // 循环执行
      me._cors_stutas_one(me.cors_status_obj.key, {});

      // 开启实时
      setTimeout(function() {

        me._cors_stutas_init();

      }, me.conf.cors_status_time);
    },
    // 一次
    _cors_stutas_one: function(key, data) {
      var me = this;
      // console.log(key);
      // ******************************************数据模拟
      if (key == 'yx') {
        cors_youxiaolv_data.val.forEach(function(ele, index) {
          ele.ac = Math.floor(Math.random() * 100);
        });
        data = cors_youxiaolv_data;
      }
      // 延时
      else {
        cors_yanshi_data.val.forEach(function(ele, index) {
          ele.ac = Math.floor(Math.random() * 6);
        });
        data = cors_yanshi_data;
      }

      // console.log("cors_status");
      // ******************************************数据模拟


      me.cors_status_obj.ec.setOption({
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            // console.log(params);

            return `<div class="cors_status_hot">
                          <div class="item name">${params.data.stationName}</div>
                          <div class="item info">${params.data.ac}${(key=="yx"?"%":"s")}</div>
                        </div>`;
          }
        },
        // legend: {
        //   orient: 'vertical',
        //   x: '5px',
        //   y: 'middle',
        //   textStyle: {
        //     color: '#000',
        //     fontSize: 8
        //   },
        //   data: data.key,
        //   padding: 0,
        //   itemHeight: 5,
        //   itemWidth: 5,
        // },
        series: [{
          type: 'pie',
          center: ['60%', '50%'],
          radius: ['60%', '80%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          itemStyle: {
            color: function(params) {
              // 当前值
              var val = params.data.ac;

              // 判断标准
              var arr = null;
              if (key == 'yx') {
                arr = me.conf.cors_nav_1_limit;

              } else {
                arr = me.conf.cors_nav_2_limit;
              }



              var res = null;
              // 延时
              if (key == 'yx') {
                // 1
                if (val <= arr[0]) {
                  res = me.cors_status_obj.colors[3].val.backgroundColor;
                }
                // 2
                else if (val <= arr[1]) {
                  res = me.cors_status_obj.colors[2].val.backgroundColor;
                }
                // 3
                else if (val <= arr[2]) {
                  res = me.cors_status_obj.colors[1].val.backgroundColor;
                }
                // 4
                else {
                  res = me.cors_status_obj.colors[0].val.backgroundColor;
                }
              }
              // 有效率
              else {
                // 1
                if (val <= arr[0]) {
                  res = me.cors_status_obj.colors[0].val.backgroundColor;
                }
                // 2
                else if (val <= arr[1]) {
                  res = me.cors_status_obj.colors[1].val.backgroundColor;
                }
                // 3
                else if (val <= arr[2]) {
                  res = me.cors_status_obj.colors[2].val.backgroundColor;
                }
                // 4
                else {
                  res = me.cors_status_obj.colors[3].val.backgroundColor;
                }
              }

              return res;
            },
            borderWidth: 2,
            borderColor: '#00008B',
          },
          data: data.val
        }]
      });
    },
  },
  components: {},
}
