<template>
  <div class="main_">
    <div class="block">
      <el-date-picker
          @change="pickerChange()"
          v-model="value2"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
      </el-date-picker>
    </div>
    <el-table
        :data="tableData"
        :row-class-name="tableRowClassName"
        style="width: 100%">
      <el-table-column
          label="id"
          prop="id">
      </el-table-column>
      <el-table-column
          label="日期"
          prop="sendTime">
      </el-table-column>
      <el-table-column
          label="水位"
          prop="waterLevel"
      >
      </el-table-column>
      <el-table-column
          label="倾斜角"
          prop="TiltAngle"
      >
      </el-table-column>
      <el-table-column
          label="预警"
          prop="police"
      >
        <template slot-scope="scope">
          <div :class="[Boolean(scope.row.police)? 'red_circle':'green_circle']">
          </div>
        </template>
      </el-table-column>
    </el-table>


    <div class="pagination_">
      <el-pagination
           v-if="pickerShow"
          :current-page="currentPage1"
          :page-size="15"
          :page-sizes="Array.from({ length: (100 - 10) / 10 + 1}, (_, i) => 10 + (i * 10))"
          :total="AllData.length"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
      </el-pagination>

      <div style="margin-left: 30px">
        <el-button type="primary" @click="ImportExcel(tableData)" v-if="pickerShow">此页导出excel</el-button>
        <el-button type="primary" @click="ExportAllData()">全部导出excel</el-button>
      </div>

    </div>
  </div>
</template>
<script>
import {error, message, success} from "@/utils/message";
import moment from "moment"
import ExportJsonExcel from "js-export-excel"
import {getAllData, getPageData,getDataByTime} from "@/utils/http/network";

export default {
  name: "tableData",
  data() {
    return{
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
       value2: '',
      tableData: [],
      currentPage1: 1,
      AllData: [],
      page:1,
      pagesMessageNum:10,
      pickerShow:true
    }
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    // 全部导出为excel
    ExportAllData() {
      this.AllData.forEach((i) => {
        i.sendTime = moment(parseInt(i.sendTime)).format('YYYY-MM-DD HH:mm:ss');
      })
      console.log(this.AllData)
      this.ImportExcel(this.AllData)
    },
    // 导出为excel
    ImportExcel(tableData) {
      let option = {};    //代表excel文件
      let dataTbale = []   //excel文件中的数据内容
      if (tableData) {
        for (let i in tableData) {
          let obj = {
            id: tableData[i].id,    //id
            水位: tableData[i].waterLevel,
            倾斜角度: tableData[i].TiltAngle,
            时间: tableData[i].sendTime,
            预警: tableData[i].police

          }
          dataTbale.push(obj)
        }

      }
      option.filename = "水位数据表"    //excel文件名
      option.datas = [
        {
          sheetData: dataTbale,     //excel文件的数据源
          sheetName: "sheet",      //excel文件sheet的表名
          sheetHeader: ["id", "水位", "倾斜角度", "时间", '预警'], //excel文件sheet的表头名
          sheetFilter: ["id", "水位", "倾斜角度", "时间", '预警']    //文件列名
        }
      ]
      let toExcel = new ExportJsonExcel(option)
      toExcel.saveExcel()
    },
    //设置每页多少条数据
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagesMessageNum = val
      this.getPageData_(this.page,val)
    },
    // 请求每页数据
     handleCurrentChange(page) {
      this.page = page
      this.getPageData_(page,this.pagesMessageNum)
    },
    // 请求
    async getPageData_(page,pagesMessageNum) {
      try {
        let startId = (page - 1 < 0 ? 0 : page - 1) * pagesMessageNum
        console.log(startId,pagesMessageNum)
        let pageData = await getPageData(startId,pagesMessageNum)
        if (pageData.code == 1) {
          // success("请求成功！")
          pageData.data.res.forEach((i) => {
            i.sendTime = moment(parseInt(i.sendTime)).format('YYYY-MM-DD HH:mm:ss');
          })
          this.tableData = pageData.data.res
          this.pickerShow = true
        } else {
          error("请求错误！")
        }
        let AllData = await getAllData()
        this.AllData = AllData.data.res
        this.$store.state.AllData = AllData.data.res
      }catch (e) {
        error(e)
      }

    },
    //日期查询
    async pickerChange(){
      let times =[]
      for (let time of this.value2) {
       times.push(moment(time).valueOf())
      }
      try {
        let res = await getDataByTime(times[0],times[1])
        if (res.code==1){

          this.AllData = res.data.res
          this.tableData = res.data.res
          this.pickerShow =!this.pickerShow

        }
      }catch (e) {
        error(e)
      }

    }
  },
  mounted() {
    this.getPageData_(this.page,this.pagesMessageNum)
  },
}
</script>

<style scoped>
.main_ {
  height: 100%;
  width: 100%;
}

.pagination_ {
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.red_circle {
  height: 35px;
  width: 35px;
  border-radius: 50%;
  background: #e34545;
}

.green_circle {
  height: 35px;
  width: 35px;
  border-radius: 50%;
  background: #46e146;
}
.block{
  display: flex;
  justify-content: center;
  margin: 20px 0px 20px 0px;
}
</style>


