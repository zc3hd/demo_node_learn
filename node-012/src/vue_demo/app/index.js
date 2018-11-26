// console.log(a_obj.A);
// require.ensure([], function(require) {
//   var a = require('./a.js');
//   console.log(a);
// }, 'a');



import Test from './test_data.js';

// 模拟的行业数据
var hangye_data = Test.hangye_data;


// 接入统计
var cors_sum_data = Test.cors_sum_data;
var fuwu_gl_data = Test.fuwu_gl_data;
var fuwu_nh_data = Test.fuwu_nh_data;
var fuwu_hy_data = Test.fuwu_hy_data;
var fuwu_data = Test.fuwu_data;

var cors_fuwu_data = Test.cors_fuwu_data;

// zuo左边
const left_all_info = resolve => require([
  '../left_1_all_info/index.vue'
], resolve);

import left_cors_run_info from '../left_2_cors_run_info/index.vue';
import left_cors_data_info from '../left_3_cors_data_info/index.vue';

// mid
const mid_main_cpt = resolve => require([
  '../mid_main/index.vue'
], resolve);


// right
import right_suanfa_user_info from '../right_1_suanfa_user/index.vue';
import right_oneWeek_user from '../right_2_oneWeek_user/index.vue';
import right_server_state from '../right_3_server_state/index.vue';




export default {
  components: {
    left_all_info: left_all_info,
    left_cors_run_info: left_cors_run_info,
    left_cors_data_info: left_cors_data_info,

    mid_main_cpt:mid_main_cpt,

    right_suanfa_user_info: right_suanfa_user_info,
    right_oneWeek_user: right_oneWeek_user,
    right_server_state: right_server_state,
  },
  // name: 'main_app',
  data: function() {
    return {
      // 所有的配置项
      conf: {
      },
      // api
      api: {},


    }
  },
  mounted: function() {
    var me = this;


    me.cc_init();

    // 响应
    me._resize();
  },
  methods: {
    //
    cc_init: function() {},



    // 表格的自动适应
    _resize: function(argument) {
      var me = this;

      $(window).on('resize', function(argument) {


        echarts.init(document.getElementById('top_info_sn')).resize();
        echarts.init(document.getElementById('cors_status')).resize();


        echarts.init(document.getElementById('sn')).resize();
        echarts.init(document.getElementById('weekNum')).resize();
        // 服务器状态适应
        for (var box = 0; box < $('#server_box>.pie_box').length; box++) {
          echarts.init(document.getElementById('pie_' + box)).resize();
        }


        echarts.init(document.getElementById('earth')).resize();

      });
    },
  },
}
