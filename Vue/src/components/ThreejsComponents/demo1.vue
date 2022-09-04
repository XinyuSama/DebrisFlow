<template>
  <div>
    <div id="container"></div>
    <div class="controls-box">
      <section>
        <el-row>
          <div v-for="(item,key) in properties" :key="key">
            <div>
              <el-col :span="8">
                <span class="vertice-span">{{item.name}}</span>
              </el-col>
              <el-col :span="13">
                <el-slider v-model="item.value" :min="item.min" :max="item.max" :step="item.step" :format-tooltip="formatTooltip"></el-slider>
              </el-col>
              <el-col :span="3">
                <span class="vertice-span">{{item.value}}</span>
              </el-col>
            </div>
          </div>
        </el-row>
      </section>
    </div>
  </div>
</template>

<script>
import * as Three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { SceneUtils } from 'three/examples/jsm/utils/SceneUtils.js'
export default {
  name: 'ThreeTest',
  data() {
    return {
      properties: {
        width: {
          name: 'width',
          value: 0.5,
          min: 0,
          max: 1,
          step: 0.01
        },
        height: {
          name: 'height',
          value: 0.5,
          min: 0,
          max: 1,
          step: 0.01
        },
        depth: {
          name: 'depth',
          value: 0.5,
          min: 0,
          max: 1,
          step: 0.01
        },
        widthSegments: {
          name: 'widthments',
          value: 8,
          min: 0,
          max: 40,
          step: 1
        },
        heightSegments: {
          name: 'heightments',
          value: 8,
          min: 0,
          max: 40,
          step: 1
        },
        depthSegments: {
          name: 'depthments',
          value: 8,
          min: 0,
          max: 40,
          step: 1
        }
      },
      camera: null,
      scene: null,
      renderer: null,
      mesh: null
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    formatTooltip(val) {
      return val
    },
    init() {
      this.createScene() // 创建场景
      this.createMesh() // 创建网格模型
      this.createLight() // 创建光源
      this.createCamera() // 创建相机
      this.createRender() // 创建渲染器
      this.createControls() // 创建控件对象
      this.render() // 渲染
    },
    // 创建场景
    createScene() {
      this.scene = new THREE.Scene()
    },
    // 创建网格模型
    createMesh() {
      //创建图形
      let geometry = new Three.BoxGeometry(
          this.properties.width.value,
          this.properties.height.value,
          this.properties.depth.value,
          Math.round(this.properties.widthSegments.value),
          Math.round(this.properties.heightSegments.value),
          Math.round(this.properties.depthSegments.value)
      );
      // 创建材质
      const meshMaterial = new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
      })
      const wireFrameMat = new THREE.MeshBasicMaterial({ wireframe: true })

      // 添加组合材质
      this.mesh = SceneUtils.createMultiMaterialObject(geometry, [
        meshMaterial,
        wireFrameMat
      ])
      this.scene.add(this.mesh);
    },
    // 创建光源
    createLight() {

    },
    // 创建相机
    createCamera() {
      let container = document.getElementById('container');
      this.camera = new Three.PerspectiveCamera(70, container.clientWidth/container.clientHeight, 0.01, 10);
      this.camera.position.z = 1;
    },
    // 创建渲染器
    createRender() {
      let container = document.getElementById('container');
      this.renderer = new Three.WebGLRenderer({antialias: true});
      //setSize 设置大小
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);
    },
    // 更新属性
    updateFun() {
      const tempRotationY = this.mesh.rotation.y
      this.scene.remove(this.mesh)
      this.createMesh()
      this.mesh.rotation.y += tempRotationY + 0.01
    },
    render() {
      this.updateFun()
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.render)
    },
    // 创建控件对象
    createControls() {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    }
  }
}
</script>
<style scoped>
#container {
  height: 400px;
}
.controls-box {
  position: absolute;
  left: 5px;
  top: 45%;
  width: 300px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #c3c3c3;
}
.vertice-span {
  line-height: 38px;
  padding: 0 2px 0 10px;
}
</style>
