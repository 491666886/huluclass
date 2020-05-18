<template>
  <div class="page-footer">
    <span
      class="page-footer-text"
    >津ICP备19006765号-1 | Copyright © 2019. All Rights Reserved. 易华录 版权所有</span>
  </div>
</template>
<style scoped lang="scss">
@import "src/plugins/px2vw";
.page-footer {
  height: px2vw(80px);
  line-height: px2vw(80px);
  color: rgba(0, 0, 0, 0.5);
  font-size: px2vw(14px);
  text-align: center;
  background: #fff;

    position: fixed;
    bottom: 0;
    width: 100%;

}
</style>
<script>
export default {
  name: 'page-footer',
};
</script>
