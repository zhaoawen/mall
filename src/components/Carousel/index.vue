<template>
  <!-- 轮播图 -->
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(carousel, index) in list"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ["list"],
  watch: {
    list: {
      // 如果数据没有发生变化就监听不到
      // 但是可以使用立即监听
      immediate: true,
      handler() {
           // 现在咱们通过watch监听bannerList属性值的变化
                // 如果执行handler方法，代表组件实例身上这个属性已经有了【数组：四个元素】
                // 当前这个函数执行：只能保证bannerList数据已经有了，但是你没办法保证v-for已经执行结束了
                // v-for执行完毕，才有结构【在watch中无法保证的】
        // 只能监听到数据已经有了，但是v-for动态渲染结构数据我们还是没有办法确定，因此还是要用到nextTick
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.cur, {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              // 点击小球的时候也切换图片
              clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>