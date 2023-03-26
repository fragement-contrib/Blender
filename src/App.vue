<template>
  <div class="main-view">
    <router-view></router-view>
  </div>
  <div class="dialog-view">
    <!-- 统一遮罩 -->
    <div class="mask"></div>
    <ui-dialogs
      v-for="(dialog, index) in dialogStore.fetchList"
      :id="dialog.id"
      :data="dialog.data"
      :key="index"
    ></ui-dialogs>
  </div>
</template>
<script setup lang="ts">
import { useDialogStore } from "./stores/index";
import uiDialogs from "./components/dialogs.vue";

let dialogStore = useDialogStore();
</script>
<style lang="scss" scoped>
.mask {
  background-color: rgba(230, 227, 227, 0.726);
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: none;
  &:not(:last-child) {
    display: block;
  }
}
</style>