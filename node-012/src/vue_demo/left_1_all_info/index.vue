<template>
  <div class="box">
      <div class="main_box">
        <!-- 1 -->
        <div class="item_one">
          <div class="info">XX 统计总数1</div>
          <div class="sum">{{top_info_sn_obj.totalTerminalNum}}</div>
          <div class="ge">个</div>
        </div>
        <!-- 2 -->
        <div class="item_two">
          <div class="top">
            <div class="info">XX 统计1</div>
            <div class="sum">{{top_info_sn_obj.onlineTerminalNum}}</div>
            <div class="ge">个</div>
          </div>
          <div class="down">
            <!-- 进度条 -->
            <div class="style_line zhong_duan">
              <!-- 尺子 -->
              <span class="chi" :style='top_info_sn_obj.zhongd_chi_json'></span>
              <!-- 灰色 -->
              <span class="hui" :style='top_info_sn_obj.zhongd_hui_json'></span>
            </div>
            <!-- 分界线 -->
            <div class="line"></div>
          </div>
        </div>
        <!-- 1 -->
        <div class="item_one">
          <div class="info">XX 统计总数2</div>
          <div class="sum">{{top_info_sn_obj.stationNum}}</div>
          <div class="ge">个</div>
        </div>
        <!-- 2 -->
        <div class="item_two">
          <div class="top">
            <div class="info">XX 统计2</div>
            <div class="sum">{{top_info_sn_obj.totalRunstationNum}}</div>
            <div class="ge">个</div>
          </div>
          <div class="down">
            <!-- 进度条 -->
            <div class="style_line cors">
              <!-- 尺子 -->
              <span class="chi" :style='top_info_sn_obj.cors_chi_json'></span>
              <!-- 灰色 -->
              <span class="hui" :style='top_info_sn_obj.cors_hui_json'></span>
            </div>
            <!-- 分界线 -->
            <div class="line"></div>
          </div>
        </div>
        <!-- 2 -->
        <div class="item_two item_two_last">
          <div class="top">
            <div class="info">AA统计数</div>
            <div class="sum">{{top_info_sn_obj.platformNum}}</div>
            <div class="ge">个</div>
          </div>
          <div class="down">
            <!-- 进度条 -->
            <div class="style_line pingtai">
              <!-- 尺子 -->
              <span class="chi" :style='top_info_sn_obj.platformNum_chi_json'></span>
              <!-- 灰色 -->
              <span class="hui" :style='top_info_sn_obj.platformNum_hui_json'></span>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import js from './index.js';
export default js;
</script>
<style lang="less" scoped>
@import './index.less';
</style>
