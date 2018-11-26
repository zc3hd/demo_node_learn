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
    };
  },
  mounted: function() {
    var me = this;
    //
    me._top_info();
  },
  methods: {
    // 顶部信息
    _top_info: function() {
      var me = this;
      // console.log(me)
      // =================================模拟数据
      top_data.totalTerminalNum = top_data.totalTerminalNum + 1;
      top_data.onlineTerminalNum = Math.floor(Math.random() * top_data.totalTerminalNum);

      // 基站总数
      top_data.totalRunstationNum = Math.floor(Math.random() * top_data.stationNum);


      top_data.platformNum = Math.floor(Math.random() * top_data.totalTerminalNum);
      // =================================模拟数据




      // 累计接入终端数
      me.top_info_sn_obj.totalTerminalNum = top_data.totalTerminalNum;
      // 在线终端数
      me.top_info_sn_obj.onlineTerminalNum = top_data.onlineTerminalNum;

      // 在末端
      if (top_data.onlineTerminalNum == top_data.totalTerminalNum) {
        // $('#onlineTerminalNum_chi').css('right', '-2px');
        me.top_info_sn_obj.zhongd_chi_json = { right: '-2px' };
        me.top_info_sn_obj.zhongd_hui_json = { width: 0 };

      }
      // 在中间
      else {
        me.top_info_sn_obj.zhongd_chi_json = { right: (top_data.totalTerminalNum - top_data.onlineTerminalNum) / top_data.totalTerminalNum * 100 - 1 + "%" };
        me.top_info_sn_obj.zhongd_hui_json = { width: (top_data.totalTerminalNum - top_data.onlineTerminalNum) / top_data.totalTerminalNum * 100 + "%" };
      }


      // 累计入网基站数
      me.top_info_sn_obj.stationNum = top_data.stationNum;
      me.top_info_sn_obj.totalRunstationNum = top_data.totalRunstationNum;
      // 在末端
      if (top_data.totalRunstationNum == top_data.stationNum) {
        me.top_info_sn_obj.cors_chi_json = { right: '-2px' };
        me.top_info_sn_obj.cors_hui_json = { width: 0 };
      }
      // 在中间
      else {
        me.top_info_sn_obj.cors_chi_json = { right: (top_data.stationNum - top_data.totalRunstationNum) / top_data.stationNum * 100 - 1 + "%" };
        me.top_info_sn_obj.cors_hui_json = { width: (top_data.stationNum - top_data.totalRunstationNum) / top_data.stationNum * 100 + "%" };
      }


      // 累计接入平台数
      me.top_info_sn_obj.platformNum = top_data.platformNum;

      // 在末端
      if (top_data.platformNum == 0) {
        me.top_info_sn_obj.platformNum_chi_json = { right: '99%' };
        me.top_info_sn_obj.platformNum_hui_json = { width: '100%' };
      }
      // 在中间
      else {
        me.top_info_sn_obj.platformNum_chi_json = { right: '-2px' };
        me.top_info_sn_obj.platformNum_hui_json = { width: 0 };
      }

      setTimeout(function() {
        me._top_info();
      }, me.conf.top_time);

    },
  },
  components: {},
}
