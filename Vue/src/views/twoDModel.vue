<template>
  <div class="waveBox">
    <canvas id="myCanvas1"  width="1200" height="300">Your browser does not support the HTML5 canvas tag.</canvas>
    <canvas id="myCanvas2" height="300" width="200">dddd</canvas>
  </div>
</template>

<script>
import {axios} from "@/utils/http/network"
export default {
  name: "twoDModel",
  data(){
    return{
        waterLevel:"",   //水位
        TiltAngle:"",//倾斜角
        time:''  //时间
    }
  },
    mounted() {
      setInterval(() =>{this.reqLatestData()},3000)
      this.wave1()   //水位,
      this.wave2()   //杆子+牌牌

    },
  methods:{
    wave1(){
      let waveWidth = 3300,
      offset = 0,
      waveHeight = 20,  //波浪高度
      waveCount = 10,  //波浪个数
      startX = -1000,
      startY = 200,   //canvas 高度
      progress = 70,  //水位高度位置的高度
      d2 = waveWidth / waveCount,
      d = d2 / 2,
      hd = d / 2,
      c = document.getElementById("myCanvas1"),
      ctx = c.getContext("2d");

  function tick() {
    offset -= 5;
    if (-1 * offset === d2) offset = 0;
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = '#95cef7';
    ctx.beginPath();
    let offsetY = startY - progress;
    ctx.moveTo(startX - offset, offsetY);
    for (let i = 0; i < waveCount; i++) {
      let dx = i * d2;
      let offsetX = dx + startX - offset;
      ctx.quadraticCurveTo(offsetX + hd, offsetY + waveHeight, offsetX + d, offsetY);
      ctx.quadraticCurveTo(offsetX + hd + d, offsetY - waveHeight, offsetX + d2, offsetY);
    }

    // ctx.lineTo(startX + waveWidth, 3000);
    ctx.lineTo(startX, 3000);
    ctx.fill();
    setTimeout(tick,1500 / 60);    //速度
    // requestAnimationFrame(tick);
  }
  tick();
},

    wave2() {
      let waterLevel = "niaho"
      const c = document.getElementById("myCanvas2")
      const ctx = c.getContext("2d");
      ctx.beginPath();
      ctx.lineWidth = 3
      ctx.moveTo(50, 10)  //将点移动到（50，10）位置
      ctx.lineTo(50, 400)
      ctx.moveTo(50,10)
      // ctx.fillStyle("#fff")
      ctx.strokeRect(50,10,150,100)
      ctx.font = "15px Arial"
      ctx.fillText(`倾斜角：${this.waterLevel}`,60,30)
      ctx.fillText(`水位：`,60,60)
      ctx.fillText(`当前时间：`,60,90)
      ctx.stroke()
    },
    async reqLatestData(){
        axios("/getLatestData","get").then(
            res =>{
              console.log(res.data.res[0].waterLevel);
              this.waterLevel= res.data.res[0].waterLevel
            }
        )
        console.log(this.waterLevel);
    }
  }
}
</script>

<style scoped>
.waveBox{
  width: 100%;
  height: 200px;
  position: relative;
  /*overflow: hidden;*/
}
.waveBox canvas{
  position: absolute;
  top: 0;
  left: 0;
}
#myCanvas1{
  z-index: 1;
  /*border: 1px solid*/
}
#myCanvas2{
  z-index: 4

}
</style>