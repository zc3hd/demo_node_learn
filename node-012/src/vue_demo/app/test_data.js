// 行业数据
var hangye_data = [
  //
  {
    id: 1,
    name: '行业1',
  },
  //
  {
    id: 2,
    name: '行业2',
  },
  //
  {
    id: 3,
    name: '行业3',
  },
  //
  {
    id: 4,
    name: '行业4',
  },
];


// 顶部数据
var top_data = {
  totalTerminalNum:50,
  onlineTerminalNum:0,


  stationNum:100,
  totalRunstationNum:0,

  platformNum:0,
};



// 服务器空闲率
var server_kx_data = {
  key: ['10.10.10.1', '10.10.10.2', '10.10.10.3'],
  val: [
    //
    {
      name: "CPU",
      arr: [
        //
        {
          value: 1,
          name: "10.10.10.1",
          ac: 35,
          limit: [30, 50, 1],
        },
        //
        {
          value: 1,
          name: "10.10.10.2",
          ac: 60,
          limit: [30, 50, 1],
        },
        //
        {
          value: 1,
          name: "10.10.10.3",
          ac: 10,
          limit: [30, 50, 1],
        },
      ]
    },
    //
    {
      name: "内存",
      arr: [
        //
        {
          value: 1,
          name: "10.10.10.1",
          ac: 10,
          limit: [30, 50, 1],
        },
        //
        {
          value: 1,
          name: "10.10.10.2",
          ac: 10,
          limit: [30, 50, 1],
        },
        //
        {
          value: 1,
          name: "10.10.10.3",
          ac: 10,
          limit: [30, 50, 1],
        },
      ]
    },
    //
    {
      name: "文件系统",
      arr: [
        //
        {
          value: 1,
          name: "10.10.10.1",
          ac: 10,
          limit: [30, 50, 1],
        },
        //
        {
          value: 1,
          name: "10.10.10.2",
          ac: 10,
          limit: [30, 50, 1],
        },
        //
        {
          value: 1,
          name: "10.10.10.3",
          ac: 10,
          limit: [30, 50, 1],
        },
      ]
    },
    //
    {
      name: "SWAP空间",
      arr: [
        //
        {
          value: 1,
          name: "10.10.10.1",
          ac: 10,
          limit: [30, 50, 1],
        },
        //
        {
          value: 1,
          name: "10.10.10.2",
          ac: 10,
          limit: [30, 50, 1],
        },
        //
        {
          value: 1,
          name: "10.10.10.3",
          ac: 10,
          limit: [30, 50, 1],
        },
      ]
    },
    //
    {
      name: "硬盘空间",
      arr: [
        //
        {
          value: 1,
          name: "10.10.10.1",
          ac: 10,
          limit: [30, 50, 1],
        },
        //
        {
          value: 1,
          name: "10.10.10.2",
          ac: 10,
          limit: [30, 50, 1],
        },
        //
        {
          value: 1,
          name: "10.10.10.3",
          ac: 10,
          limit: [30, 50, 1],
        },
      ]
    },
    //
    {
      name: "inodes",
      arr: [
        //
        {
          value: 1,
          name: "10.10.10.1",
          ac: 10,
          limit: [30, 50, 1],
        },
        //
        {
          value: 1,
          name: "10.10.10.2",
          ac: 10,
          limit: [30, 50, 1],
        },
        //
        {
          value: 1,
          name: "10.10.10.3",
          ac: 10,
          limit: [30, 50, 1],
        },
      ]
    },
  ],
};



// ==============================================右侧






// 基站接入统计
var cors_sum_data = {
  key: ['中国位置', '中国兵器', '婺源高速'],
  val: [3, 160, 2],
};









// ==============================================左边

// 接入终端曲线
// 接入终端你就给我值就行了
// 我给你ID



// 一周数据终端数统计
var one_week_data = {
  key: ["2018-08-25", "2018-08-26", "2018-08-27", ],
  val: [
    [0, 5, 6, 4, 5, 6, 7],
    [4, 3, 2, 4, 4, 4, 4],
    [1, 4, 3, 4, 4, 4, 4],
  ],
};









// 行业的服务实时质量
var fuwu_gl_data = {
  name: 'G1高速',
  info: '服务延迟',
  num: 6,
  level: 'C',
  level_num: 1,
  level_info: '服务报警',
};
var fuwu_nh_data = {
  name: '内河A段',
  info: '数据有效率',
  num: 6,
  level: 'C',
  level_num: 1,
  level_info: '服务报警',
};
var fuwu_hy_data = {
  name: 'AD-海域',
  info: '服务延迟',
  num: 6,
  level: 'C',
  level_num: 1,
  level_info: '服务报警',
};




// 数据源的服务状态
var fuwu_data = {
  name: 'aaa',
  fuwu: 'sss',
  limit: 90,
  fenshu: 23,
};



// 基站的服务状态
var cors_fuwu_data = {
  stationName: 'aaa',
  info: '离线',
  status: "OFF",
  time: 15210996063
};


export default {
  hangye_data,

  // 服务器空闲率
  server_kx_data,
  // 接入统计
  cors_sum_data,
  // 一周终端
  one_week_data,

  fuwu_gl_data,
  fuwu_nh_data,
  fuwu_hy_data,
  fuwu_data,
  cors_fuwu_data,

};
