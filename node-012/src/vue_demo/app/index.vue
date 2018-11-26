<template>
  <div class="main_app">
    <!-- 左边区域 -->
    <div class="left">
      <!-- 所有信息 -->
      <div class="all_info">
        <left_all_info></left_all_info>
      </div>
      <!--  基站实时接入统计 -->
      <div class="item jie_ru_info_time">
        <left_cors_run_info></left_cors_run_info>
      </div>

      <!-- 基站信息统计 -->
      <div class="item cors_info">
        <left_cors_data_info></left_cors_data_info>
      </div>
    </div>


    <!-- 右边区域 -->
    <div class="right">
      <!-- 实时终端接入曲线 -->
      <div class="item shi_shi">
        <right_suanfa_user_info></right_suanfa_user_info>
      </div>
      <!--一周 终端接入 -->
      <div class="item yi_zhou">
        <right_oneWeek_user></right_oneWeek_user>
      </div>

      <!-- 服务器信息 -->
      <div class="fu_wuqi" id="fu_wuqi">
        <right_server_state></right_server_state>
      </div>

    </div>


    <!-- 中间区域 -->
    <div class="main">
      <mid_main_cpt></mid_main_cpt>
    </div>


  </div>
</template>
<script>
import app from './index.js';
export default app;
</script>
<style lang="less">
@import './index.less';
</style>
