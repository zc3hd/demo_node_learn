<template>
  <div class="info_box" id="server_box">
    <div class="title">XX指标显示</div>

    <div class="pie_box" id="box_0">
      <div class="box">
        <span class="title"></span>
        <div class="ec" id="pie_0"></div>
      </div>
    </div>
    <div class="pie_box" id="box_1">
      <div class="box">
        <span class="title"></span>
        <div class="ec" id="pie_1"></div>
      </div>
    </div>
    <div class="pie_box" id="box_2">
      <div class="box">
        <span class="title"></span>
        <div class="ec" id="pie_2"></div>
      </div>
    </div>
    <div class="pie_box" id="box_3">
      <div class="box">
        <span class="title"></span>
        <div class="ec" id="pie_3"></div>
      </div>
    </div>
    <div class="pie_box" id="box_4">
      <div class="box">
        <span class="title"></span>
        <div class="ec" id="pie_4"></div>
      </div>
    </div>



    <!-- 图例 -->
    <div class="demo">
      <div class="demo_box">
        <div class="box">
          <div class="item" v-for='(ele,index) in conf.server_pie_item_colors'>
            <div class="p" :style="ele.val"></div>
            <div class="info">{{ele.key}}</div>
          </div>

        </div>
      </div>
    </div>

    <!-- 左耳钉 -->
    <div class="btn_box left">
      <div class="box">
        <div class="btn" id="btn_left"></div>
      </div>
    </div>
    <!-- 右耳钉 -->
    <div class="btn_box right">
      <div class="box">
        <div class="btn" id="btn_right"></div>
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
