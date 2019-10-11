<template>
  <div class="page-container">
    <div class="fullpage-wp" v-fullpage="opts">
      <div class="page-1 page">
        <!-- <p class="part-1" v-animate="{ value: 'bounceInLeft' }">vue-fullpage</p> -->
      </div>
      <div class="page-2 page">
        <!-- <p class="part-2" v-animate="{ value: 'bounceInRight' }">
          vue-fullpage
        </p>-->
      </div>
      <div class="page-3 page">
        <!-- <p class="part-3" v-animate="{ value: 'bounceInLeft', delay: 0 }">
          vue-fullpage
        </p>
        <p class="part-3" v-animate="{ value: 'bounceInRight', delay: 600 }">
          vue-fullpage
        </p>
        <p class="part-3" v-animate="{ value: 'zoomInDown', delay: 1200 }">
          vue-fullpage
        </p>-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TouchEmulator from "@/views/directive//full-page/touch.js";
import VueFullpage from "@/views/directive/full-page/index.js";
import "@/views/directive/full-page/vue-fullpage.scss";
TouchEmulator();
Vue.use(VueFullpage);

export default class Home extends Vue {
  private opts: any = {
    start: 0,
    dir: "v",
    loop: false,
    needIndicator: true,
    duration: 500
  };
}
</script>

<style lang="scss">
.page-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  .page {
    background-color: aqua;
  }
  .page-2 {
    background-color: pink;
  }
}
</style>
