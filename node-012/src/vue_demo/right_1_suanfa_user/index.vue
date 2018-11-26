<template>
  <div class="box">
    <!-- 顶部切换栏 -->
    <div class="top">
      <div class="top_box">
        <div class="item_box" :class='sn_obj.key==1?"ac":""' @click='_sn_sel_ev(1)'>
          <div class="item">item-1</div>
        </div>
        <div class="item_box" :class='sn_obj.key==2?"ac":""' @click='_sn_sel_ev(2)'>
          <div class="item">item-2</div>
        </div>
        <div class="item_box" :class='sn_obj.key==3?"ac":""' @click='_sn_sel_ev(3)'>
          <div class="item">item-3</div>
        </div>
      </div>
    </div>
    <!-- ec -->
    <div class='ec' id="sn"></div>
  </div>
</template>
<script>
import js from './index.js';
export default js;
</script>
<style lang="less" scoped>
@import './index.less';
</style>
