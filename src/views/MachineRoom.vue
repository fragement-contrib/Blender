<template>
  <canvas id="myCanvas"></canvas>
  <div id="myTooltip" class="myTooltip"></div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";

import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  PointLight,
  AmbientLight,
  Vector3,
  GridHelper,
  ArrowHelper,
  TextureLoader,
  MeshLambertMaterial,
  Raycaster,
  Vector2,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

onMounted(() => {
  let scene = new Scene();
  let myCanvas = document.getElementById("myCanvas") as Element;
  let myTooltip = document.getElementById("myTooltip") as HTMLElement;

  let camera = new PerspectiveCamera(
    18,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(30, 30, -50);
  camera.lookAt(0, 0, 0);

  let renderer = new WebGLRenderer({
    canvas: myCanvas,
    antialias: true
  });

  renderer.setClearColor("white", 1);

  // 网格

  let gridHelper = new GridHelper(50, 20);
  scene.add(gridHelper);

  // 箭头

  const arrowXHelper = new ArrowHelper(
    new Vector3(1, 0, 0).normalize(),
    new Vector3(0, 0, 0),
    20,
    "red"
  );
  scene.add(arrowXHelper);

  const arrowYHelper = new ArrowHelper(
    new Vector3(0, 1, 0).normalize(),
    new Vector3(0, 0, 0),
    10,
    "green"
  );
  scene.add(arrowYHelper);

  const arrowZHelper = new ArrowHelper(
    new Vector3(0, 0, 1).normalize(),
    new Vector3(0, 0, 0),
    20,
    "blue"
  );
  scene.add(arrowZHelper);

  // 光源设置

  //点光源
  let point = new PointLight("#fff");
  point.position.set(400, 200, -300); //点光源位置
  scene.add(point); //点光源添加到场景中

  //环境光
  let ambient = new AmbientLight("#555");
  scene.add(ambient);

  new OrbitControls(camera, renderer.domElement);

  // 记录纹理
  let textures: any = {};
  let crtTexture = function (imgName: string) {
    let curTexture = textures[imgName];
    if (!curTexture) {
      curTexture = new TextureLoader().load(
        "./MachineRoom/" + imgName + ".jpg"
      );
      curTexture.flipY = false;
      curTexture.wrapS = 1000;
      curTexture.wrapT = 1000;
      textures[imgName] = curTexture;
    }
    return curTexture;
  };

  // 物体集合
  let allBoxs: any = [];

  // 使用GLTF 模型加载器加载
  let gltfLoader = new GLTFLoader();
  gltfLoader.load("./MachineRoom/index.gltf", function (data) {
    data.scene.children.forEach(function (obj: any) {
      if (obj.material.map) {
        obj.material = new MeshLambertMaterial({
          map: crtTexture(obj.material.map.name),
        });
      } else {
        obj.material = new MeshLambertMaterial({
          color: obj.material.color,
        });
      }

      // 把所有物体记录起来
      allBoxs.push(obj);
    });

    // 其实就是把模型数据的模型对象（例如mesh）添加到场景中去
    scene.add(...data.scene.children);
  });

  crtTexture("cabinet-hover");

  // 渲染
  (function display() {
    const { width, height, clientWidth, clientHeight } = renderer.domElement;
    const needResize = width !== clientWidth || height !== clientHeight;

    // 每次渲染的时候，如果css尺寸和元素尺寸不一致
    if (needResize) {
      renderer.setSize(clientWidth, clientHeight, false);

      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    requestAnimationFrame(function () {
      display();
    });
  })();

  let raycaster = new Raycaster();
  let pointer = new Vector2();

  let preIntersect: any = null;
  document.body.addEventListener("mousemove", function (event) {
    let x = event.clientX,
      y = event.clientY;

    // 鼠标的canvas坐标转裁剪坐标
    // 其实就是把鼠标位置转成webgl坐标
    pointer.set(
      (x / window.innerWidth) * 2 - 1,
      -(y / window.innerHeight) * 2 + 1
    );

    // 基于鼠标点的裁剪坐标位和相机设置射线投射器
    raycaster.setFromCamera(pointer, camera);

    // 选择
    let intersect = raycaster.intersectObjects(allBoxs)[0];

    if (preIntersect) {
      preIntersect.object.material.setValues({
        map: textures["cabinet"],
      });
      preIntersect = null;
    }

    if (intersect && intersect.object.name.includes("机柜")) {
      // 显示悬浮框
      myTooltip.style.display = "";

      (intersect.object as any).material.setValues({
        map: textures["cabinet-hover"],
      });

      preIntersect = intersect;

      // 修改悬浮框内容
      myTooltip.innerHTML =
        "<div style='border-color:gray'><h6>当前悬浮</h6>" +
        "<i style='background-color:red'></i>" +
        "<span>名称</span>" +
        "<span>" +
        intersect.object.name +
        "</span></div>";

      // 修改悬浮框位置
      myTooltip.style.left = event.offsetX + 20 + "px";
      myTooltip.style.top = event.offsetY + 20 + "px";
    } else {
      // 隐藏悬浮框
      myTooltip.style.display = "none";
    }
  });
});
</script>
<style lang="scss">
canvas {
  width: 100vw;
  height: 100vh;
}
div {
  &.myTooltip {
    position: absolute;
    transition-duration: 300ms;
    transition-timing-function: linear;
    transition-property: left top;
    pointer-events: none;

    & > div {
      box-shadow: rgb(0 0 0 / 20%) 1px 2px 10px;
      border-style: solid;
      background-color: rgb(255, 255, 255);
      border-width: 1px;
      border-radius: 4px;
      color: rgb(102, 102, 102);
      font: 14px / 21px sans-serif;
      padding: 10px;
      text-align: left;

      & > h6 {
        font-size: 14px;
        color: #666;
        font-weight: 400;
        line-height: 1;
      }

      & > i {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        vertical-align: middle;
        margin: 0 5px;
      }

      & > span {
        font-size: 14px;
        color: #666;
        font-weight: 400;

        &:last-child {
          padding-left: 30px;
          font-weight: 900;
        }
      }
    }
  }
}
</style>