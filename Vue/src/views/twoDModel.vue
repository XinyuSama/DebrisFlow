<template>
  <div class="waveBox">
      <canvas id="myCanvas1"  width="1920" height="800"></canvas>
    <canvas id="myCanvas2" width="1920" height="800"></canvas>
    <canvas id="myCanvas3" width="1920" height="800"></canvas>
  </div>
</template>

<script>
import {getLatestOneData} from "@/utils/http/network";
import {error} from "@/utils/message";
import moment from "moment";
export default {
  name: "twoDModel",
  data(){
    return{
        waterLevel:0,   //水位
        TiltAngle:'',//倾斜角
        sendTime:'',  //时间
        timeDelay:'', // 数据延迟 毫秒
        canvasH:800
    }
  },
    mounted() {
      setInterval(async () =>{
         await this.reqLatestData()
        this.wave3()
      },1000)
      this.wave1()   //水位,
      this.wave2()  //刻度

    },
  methods:{
    //河流
    // 换算 刻度尺=实际水高 : canvas像素 =1:8
    // 刻度尺：canvas = 1:8
    wave1(){

      let waveWidth = 4000,
      offset = 0,
      waveHeight = 20,  //波浪高度
      waveCount = 10,  //波浪个数
      startX = -1000,
      startY = this.canvasH,   //canvas 高度
      // progress = 100,  //水位高度位置的高度
      d2 = waveWidth / waveCount,
      d = d2 / 2,
      hd = d / 2,
      c = document.getElementById("myCanvas1"),
      ctx = c.getContext("2d");

      // console.log(ctx)
      let that = this
      function tick() {
        offset -= 5;
        if (-1 * offset === d2) offset = 0;
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.fillStyle = '#95cef7';
        ctx.beginPath();
        // 河流随着水位 动态抬升高度
        let offsetY = startY - that.waterLevel*8;
        ctx.moveTo(startX - offset, offsetY);
        for (let i = 0; i < waveCount; i++) {
          let dx = i * d2;
          let offsetX = dx + startX - offset;
          ctx.quadraticCurveTo(offsetX + hd, offsetY + waveHeight, offsetX + d, offsetY);
          ctx.quadraticCurveTo(offsetX + hd + d, offsetY - waveHeight, offsetX + d2, offsetY);
        }

        ctx.lineTo(startX + waveWidth, 3000);
        ctx.lineTo(startX, 3000);
        ctx.fill();
        setTimeout(tick,1500 / 60);    //速度
        // requestAnimationFrame(tick);
      }
      tick();
},
    //刻度
    wave2() {
      const c = document.getElementById("myCanvas2")
      const ctx = c.getContext("2d");
      ctx.beginPath();
//设置笔触的颜色
      ctx.strokeStyle="#0000ff";
//设置开始坐标
      ctx.moveTo(0,0);
//设置结束坐标
      ctx.lineTo(0,this.canvasH);
      ctx.lineCap="round";
      ctx.lineJoin="miter";
      //设置线条宽度
      ctx.lineWidth=10;
//绘制线条
      ctx.stroke();
      // 绘制 刻度  换算canvas高800 刻度0-100 每十刻度就是80的canvas高度
      ctx.font = "19px Arial"
      for (let i = 100; i >=0 ; i--) {
        if (i%10==0||i==0){
          if (i==50){
            ctx.font = "23px Arial"
            ctx.beginPath();
            ctx.strokeStyle="#e34545";
            ctx.moveTo(7,i*8);
            ctx.lineTo(30,i*8);
            ctx.lineWidth=4;
            ctx.stroke();
            ctx.fillStyle='red',
            ctx.fillText(`${i}m    警戒线`,40,i*8)
            ctx.stroke()
          }else {
            ctx.fillStyle='black',
            ctx.beginPath();
            ctx.strokeStyle="#020213";
            ctx.moveTo(6,i*8);
            ctx.lineTo(17,i*8);
            ctx.lineWidth=2;
            ctx.fillText(`${100-i}m`,25,i*8)
            ctx.stroke();
          }
        }else {
          // 5，15，25，35.....
          if (i%5==0){
            ctx.font = "12px Arial"
            ctx.fillStyle='black';
            ctx.beginPath();
            ctx.strokeStyle="#020213";
            ctx.moveTo(6,i*8);
            ctx.lineTo(13,i*8);
            ctx.lineWidth=2;
            ctx.fillText(`${100-i}m`,22,i*8)
            ctx.stroke();
          }
          // 2,4,6,8....
          if (i%2==0){
            ctx.font = "19px Arial"
            ctx.fillStyle='black';
            ctx.beginPath();
            ctx.strokeStyle="#020213";
            ctx.moveTo(6,i*8);
            ctx.lineTo(10,i*8);
            ctx.lineWidth=2;
            // ctx.fillText(`${100-i}m`,25,i*8)
            ctx.stroke();
          }
        }
      }
      // 静态字体
      ctx.fillText('倾斜角：',100,40)
      ctx.fillText('水位：',100,70)
      ctx.fillText('接收时间：',100,100)
      ctx.fillText('当前时间：',100,130)
      ctx.fillText('数据延迟：',100,160)




    },
    // 动态数据
    wave3(){
      const c = document.getElementById("myCanvas3")
      const ctx = c.getContext("2d");
        // 由于canvas每当高度或宽度被重设时，画布内容就会被清空，因此可以用以下方法清空：
        c.height=c.height;
        //font 需要设置在 重设宽度后不然不会生效
        ctx.font = "19px Arial"
        ctx.fillText(this.TiltAngle,170,40)
        ctx.fillText(`${this.waterLevel}m`,150,70)
        ctx.fillText(this.sendTime,190,100)
        ctx.fillText(`${moment().format('YYYY-MM-DD HH:mm:ss')}`,190,130)
        ctx.fillText(this.timeDelay,190,160)

    },
    async reqLatestData(){
      try {
        let data = await getLatestOneData()
        if (data.code==1){
          this.waterLevel = parseInt(data.data.waterLevel)
          this.sendTime = moment(data.data.sendTime).format('YYYY-MM-DD HH:mm:ss')
          this.TiltAngle = data.data.TiltAngle+'°'
          this.timeDelay = moment(moment().valueOf()).diff(moment(data.data.sendTime), 'milliseconds')+'ms'
        }
      }catch (e) {
        error(e)
      }

    }
  }
}
</script>

<style scoped>
.waveBox{
  width: 100%;
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
  z-index: 4;
  /*position: absolute;*/
  /*top: -10%;*/

}
#myCanvas3{
  z-index: 999;
  /*position: absolute;*/
  /*top: -10%;*/

}
</style>
