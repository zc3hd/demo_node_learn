<template>
  <div class="box">
    <!-- 顶部切换栏 -->
    <div class="top">
      <div class="top_box">
        <div class="item_box" :class='cors_status_obj.key=="yx"?"ac":""' @click='_cors_stutas_sel_ev("yx")'>
          <div class="item">nav-1</div>
        </div>
        <div class="item_box" :class='cors_status_obj.key=="ys"?"ac":""' @click='_cors_stutas_sel_ev("ys")'>
          <div class="item">nav-2</div>
        </div>
      </div>
    </div>
    <!-- ec -->
    <div class='ec'>
      <div class="ec_box" id="cors_status"></div>
      <!-- 图例 -->
      <div class="demo">
        <div class="demo_box">
          <div class="box">
            <div class="item" v-for='(ele,index) in cors_status_obj.colors'>
              <div class="p" :style="ele.val"></div>
              <div class="info" v-show='cors_status_obj.key=="yx"'>{{ele['key_yx']}}</div>
              <div class="info" v-show='cors_status_obj.key=="ys"'>{{ele['key_ys']}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import app from './index.js';
export default app;
</script>
<style lang="less" scoped>
@import './index.less';
</style>
