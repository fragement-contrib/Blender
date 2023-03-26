<template>
  <h2>
    Blender：使用免费开源好用的
    <a href="https://www.blender.org/" target="_blank">Blender</a>
    制作的一些模型等3D相关内容
  </h2>
  <ul>
    <li>
      <a href="#/MachineRoom" target="_blank" class="MachineRoom">
        可视化机房
      </a>
    </li>
  </ul>
</template>
<script setup lang="ts">

</script>
<style lang="scss" scoped>
h2 {
  padding: 10px 40px;
  font-size: 20px;
  border-bottom: 1px solid rgb(209, 204, 204);
  margin-bottom: 10px;

  &>a {
    text-decoration: underline;
  }
}

ul {
  margin-left: 50px;

  &>li {
    list-style-type: disc;
    margin-bottom: 10px;
    text-decoration: underline;
    cursor: pointer;
    width: 400px;
    display: inline-block;
    margin: 10px;

    &>a {
      padding-top: 320px;
      display: inline-block;
      width: 100%;
      text-align: center;
      color: black;
      text-decoration: underline;
      font-weight: 800;
      background-repeat: no-repeat;
      background-position: center 10px;

      &.MachineRoom {
        background-image: url('./MachineRoom.jpeg');
      }
    }
  }
}
</style>