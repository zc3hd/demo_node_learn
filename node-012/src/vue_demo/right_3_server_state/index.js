// 服务器空闲率
var server_kx_data = {
  key: ['info-1', 'info-2', 'info-3'],
  val: [
    //
    {
      name: "指标1",
      arr: [
        //
        {
          value: 1,
          name: "info-1",
          ac: 35,
          limit: [30, 50, 1],
        },
        //
        {
          value: 1,
          name: "info-2",
          ac: 60,
          limit: [30, 50, 1],
        },
        //
        {
          value: 1,
          name: "info-3",
          ac: 10,
          limit: [30, 50, 1],
        },
      ]
    },
    //
    {
      name: "指标2",
      arr: [
        //
        {
          value: 1,
          name: "info-1",
          ac: 10,
          limit: [30, 50, 1],
        },
        //
        {
          value: 1,
          name: "info-2",
          ac: 10,
          limit: [30, 50, 1],
        },
        //
        {
          value: 1,
          name: "info-3",
          ac: 10,
          limit: [30, 50, 1],
        },
      ]
    },
    //
    {
      name: "指标3",
      arr: [
        //
        {
          value: 1,
          name: "info-1",
          ac: 10,
          limit: [30, 50, 1],
        },
        //
        {
          value: 1,
          name: "info-2",
          ac: 10,
          limit: [30, 50, 1],
        },
        //
        {
          value: 1,
          name: "info-3",
          ac: 10,
          limit: [30, 50, 1],
        },
      ]
    },
    //
    {
      name: "指标4",
      arr: [
        //
        {
          value: 1,
          name: "info-1",
          ac: 10,
          limit: [30, 50, 1],
        },
        //
        {
          value: 1,
          name: "info-2",
          ac: 10,
          limit: [30, 50, 1],
        },
        //
        {
          value: 1,
          name: "info-3",
          ac: 10,
          limit: [30, 50, 1],
        },
      ]
    },
    //
    {
      name: "指标5",
      arr: [
        //
        {
          value: 1,
          name: "info-1",
          ac: 10,
          limit: [30, 50, 1],
        },
        //
        {
          value: 1,
          name: "info-2",
          ac: 10,
          limit: [30, 50, 1],
        },
        //
        {
          value: 1,
          name: "info-3",
          ac: 10,
          limit: [30, 50, 1],
        },
      ]
    },
  ],
};


export default {
  // name: 'main_app',
  data: function() {
    return {
      // 所有的配置项
      conf: {
        // 服务器状态
        server_time: 1000,
        // 3秒一个轮播
        server_inter_time: 3000,

        // 饼图的颜色
        server_pie_item_colors: [
          //
          {
            val: {
              backgroundColor:"#00DAAC",
            },
            key: '正常',
          },
          //
          {
            val: {backgroundColor:"rgb(255,168,0)"},
            key: '预警',
          },
          //
          {
            val: {backgroundColor:"red"},
            key: '报警',
          },
        ],
      },

      server_obj: {
        sum:0,
        color: ["rgb(127,159,222)", "rgb(249,205,90)", "rgb(34,219,179)"],
      },

    };
  },
  mounted: function() {
    var me = this;

    me.server_obj.ec_0 = echarts.init(document.getElementById('pie_0'));
    me.server_obj.ec_1 = echarts.init(document.getElementById('pie_1'));
    me.server_obj.ec_2 = echarts.init(document.getElementById('pie_2'));
    me.server_obj.ec_3 = echarts.init(document.getElementById('pie_3'));
    me.server_obj.ec_4 = echarts.init(document.getElementById('pie_4'));

    me.server_obj.borderColor = '#000080';
    me._server_ev();
    me._server_init();

  },
  methods: {
    // 服务器状态
    _server_init: function() {
      var me = this;

      server_kx_data = server_kx_data;

      // 总数
      me.server_obj.sum = server_kx_data.key.length;


      // 渲染每一个
      server_kx_data.val.forEach(function(ele, index) {
        me._server_one(me.server_obj['ec_'+index], ele);

        $('#pie_' + index).parent().children('.title').html(ele.name);
      });

      setTimeout(function() {

        // *******************************************模拟数据
        server_kx_data.val.forEach(function(zhibiao_ele, index) {
          // console.log(zhibiao_ele);
          // 每一项值
          zhibiao_ele.arr.forEach(function(ele, index) {
            ele.ac = Math.floor(Math.random() * 100);
          });
        });
        // *******************************************模拟数据

        me._server_init();
      }, me.conf.server_time);
    },
    // 每一个
    _server_one: function(ec, data) {
      var me = this;
      // console.log(data);
      ec.setOption({
        // color: me.server_obj.color,
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            // console.log(params);

            return `<div class="server_hot">
                          <div class="item name">${params.data.name}</div>
                          <div class="item info">data:${params.data.ac}%</div>

                        </div>`;
          }
        },
        series: [{
          type: 'pie',
          center: ['60%', '50%'],
          radius: ['60%', '85%'],
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
              // console.log(params.data);
              var arr = params.data.limit;
              var val = params.data.ac;

              var res = null;
              // red
              if (val <= arr[0]) {
                res = me.conf.server_pie_item_colors[2].val.backgroundColor;
              }
              // yellow
              else if ((arr[0] < val) && (val <= arr[1])) {
                res = me.conf.server_pie_item_colors[1].val.backgroundColor;
              }
              // 正常
              else if (val > arr[1]) {
                res = me.conf.server_pie_item_colors[0].val.backgroundColor;
              }
              return res;
            },
            borderWidth: 5,
            borderColor: me.server_obj.borderColor,
          },
          data: data.arr
        }]
      });

    },
    // 服务器的事件
    _server_ev: function() {
      var me = this;
      var index = 0;
      // 右侧按钮事件
      $('#btn_right')
        .on('click', function() {



          index++;

          if (index > 4) {
            index = 0;
          }

          // 全部隐藏
          $('#fu_wuqi .pie_box').hide();
          // 显示
          $(`#fu_wuqi #box_${index}`).show();
          echarts.init(document.getElementById('pie_' + index)).resize();
        });

      // 左侧按钮事件
      $('#btn_left')
        .on('click', function() {



          index--;
          if (index == -1) {
            index = 4;
          }

          // 全部隐藏
          $('#fu_wuqi .pie_box').hide();

          // 显示
          $(`#fu_wuqi #box_${index}`).show();
          echarts.init(document.getElementById('pie_' + index)).resize();
        });



      var inter_timer = null;
      // 开启循环
      inter_start();



      $('#server_box').on('mouseover', function() {
        clearInterval(inter_timer);
      });
      $('#server_box').on('mouseout', function() {
        // clearInterval(inter_timer);
        // 开启循环
        inter_start();
      });












      function inter_start() {
        // 轮播图
        inter_timer = setInterval(function(argument) {
          index++;

          if (index > 4) {
            index = 0;
          }

          // 全部隐藏
          $('#fu_wuqi .pie_box').hide();
          // 显示
          $(`#fu_wuqi #box_${index}`).show();
          echarts.init(document.getElementById('pie_' + index)).resize();
        }, me.conf.server_inter_time);
      };

    },
  },
  components: {},
}
