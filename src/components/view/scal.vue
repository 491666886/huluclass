<template>
  <div>
    <div>
      <div class="head">校历</div>
      <el-button v-if="show" class="add" size="small" type="primary" @click="showedit()">编辑</el-button>
      <el-button v-if="hide" class="add" size="small" type="primary" @click="hold()">确定</el-button>
    </div>

    <div class="table">
      <el-calendar v-if="show" v-model="value" id="calendar">
        <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
        <template slot="dateCell" slot-scope="{date, data}">
          <!--自定义内容-->
          <div>
            <div class="calendar-day">{{ data.day.split('-').slice(2).join('-') }}</div>
            <div v-for="item in calendarData">
              <div v-if="(item.date).indexOf(data.day.split('-').slice(0).join('-'))!=-1">
                <!-- <div v-if="(item.days).indexOf(data.day.split('-').slice(2).join('-'))!=-1"> -->
                <el-tooltip class="item" effect="dark" :content="item.things" placement="right">
                  <div class="is-selected">{{item.details}}</div>
                </el-tooltip>
                <!-- </div> -->
                <!-- <div v-else></div> -->
              </div>
              <!-- <div v-else></div> -->
            </div>
          </div>
        </template>
      </el-calendar>
      <div v-if="hide" class="edit">
        <el-dialog title="编辑日程" :visible.sync="dialogFormVisible1" :modal-append-to-body="false">
          <el-form :model="form">
            <el-form-item :required="true" label="事件名称" :label-width="formLabelWidth">
              <el-input class="input" v-model="form.input" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item :required="true" label="开始时间" :label-width="formLabelWidth">
              <el-time-picker
                v-model="form.value1"
                :picker-options="{
						      selectableRange: '06:00:00 - 23:30:00'
						    }"
                value-format="HH:mm"
                format="HH:mm"
                placeholder="任意时间点"
              ></el-time-picker>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible1= false">取 消</el-button>
            <el-button type="primary" @click="reedit()">确 定</el-button>
          </div>
        </el-dialog>
        <el-form :model="form">
          <el-form-item label="开学日期" :label-width="formLabelWidth">
            <!-- <div class="demonstration">值：{{ form.value1}}</div> -->
            <el-date-picker
              v-model="form.value1"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择开学日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="放假日期" :label-width="formLabelWidth">
            <el-date-picker
              v-model="form.value2"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择放假日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="第一天上课日期" :label-width="formLabelWidth">
            <el-date-picker
              v-model="form.value3"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择第一天上课日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="其他特殊日期" :label-width="formLabelWidth">
            <el-table :data="tableData" border>
              <el-table-column prop="date" label="日期安排" width="160"></el-table-column>
              <el-table-column prop="name" label="开始时间" width="280"></el-table-column>
              <!-- 	<el-table-column prop="endTime" label="结束时间" width="280"></el-table-column> -->
              <el-table-column fixed="right" label="管理">
                <template slot-scope="scope">
                  <el-button @click="showedit(scope.row)" type="text" size="small">编辑</el-button>
                  <el-button @click="dele(scope.row)" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-button type="primary" style="width: 160px;" @click="dialogFormVisible1=true">继续添加特殊日期</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
export default {
  name: "scal",
  data() {
    return {
      hide: false,
      show: true,
      tableData: [
        {
          date: "1",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: 2,
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "3",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "4",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      dialogFormVisible1: false,
      form: {
        value1: "",
        value2: "",
        value3: "",
        input: ""
      },
      formLabelWidth: "120px",
      input: "",

      calendarData: [
        { date: "2020-04-12", things: "去公园野炊" },
        { date: "2019-11-15", things: "看电影" }
      ],
      value: new Date()
    };
  },
  methods: {

    hold() {
      console.log(this.form);
      this.add();
    },

    dele(row) {
      this.$confirm("确认删除用户数据？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.del(row);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },

    showedit(row) {
      this.show = false;
      this.hide = true;

      //   this.dialogFormVisible1 = true;
      //   this.scheduleId = row.scheduleId;
    },
    serchlist(vap) {
      //改变页数
      this.currentPage = vap;
      this.getuserlist();
    },
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val;
      // 切换页码时，要获取每页显示的条数
      this.getuserlist(this.PageSize, val * this.pageSize);
    },
    del(row) {
      axios({
        headers: {
          "User-Info": JSON.parse(sessionStorage.getItem("SESSION_USER"))
            .loginId,
          Authorization: JSON.parse(sessionStorage.getItem("SESSION_USER"))
            .sessionId
        },
        method: "post",
        url: "/hlkt/admin/dailySchedule/delete.action",
        data: {
          sid: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid,
          scheduleId: row.scheduleId
        }
      }).then(res => {
        if (res.data.resultCode == "200") {
          this.getrest();
        } else {
          this.$message({
            type: "error",
            message: res.data.resultMsg
          });
        }
      });
    },
    edit(row) {
		
      axios({
        headers: {
          "User-Info": JSON.parse(sessionStorage.getItem("SESSION_USER"))
            .loginId,
          Authorization: JSON.parse(sessionStorage.getItem("SESSION_USER"))
            .sessionId
        },
        method: "post",
        url: "/hlkt/admin/dailySchedule/update.action",
        data: {
          sid: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid,
          scheduleId: this.scheduleId,
          courseNum: this.form.input,
          startTime: this.value1 + ":00",
          endTime: this.value2 + ":00"
        }
      }).then(res => {
        if (res.data.resultCode == "200") {
          this.$message({
            type: "success",
            message: res.data.resultMsg
          });
          this.dialogFormVisible1 = false;
          this.getrest();
        } else {
          this.$message({
            type: "error",
            message: res.data.resultMsg
          });
        }
      });
    },

    add() {
      var addfrom = [
        {
          date: this.form.value1,
          week: 0,
          status: "开学日期",
          sid: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid
        },
        {
          date: this.form.value2,
          week: 0,
          status: "放假日期",
          sid: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid
        },
        {
          date: this.form.value3,
          week: 0,
          status: "第一天上课日期",
          sid: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid
        }
      ];
      console.log(addfrom);
      axios({
        headers: {
          "User-Info": JSON.parse(sessionStorage.getItem("SESSION_USER"))
            .loginId,
          Authorization: JSON.parse(sessionStorage.getItem("SESSION_USER"))
            .sessionId
        },
        method: "post",
        url: "/hlkt/admin/kalendar/addKalendar.action",
        data: {
          list: addfrom
        }
      }).then(res => {
        if (res.data.resultCode == "200") {
          this.dialogFormVisible = false;
          this.getrest();
        } else {
          this.$message({
            type: "error",
            message: res.data.resultMsg
          });
        }
      });
    },
    serchlist(vap) {
      //改变页数
      this.currentPage = vap;
      this.getdevice();
    },
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val;
      // 切换页码时，要获取每页显示的条数
      this.getdevice(this.PageSize, val * this.pageSize);
    },
    getrest() {
      axios({
        headers: {
          "User-Info": JSON.parse(sessionStorage.getItem("SESSION_USER"))
            .loginId,
          Authorization: JSON.parse(sessionStorage.getItem("SESSION_USER"))
            .sessionId
        },
        method: "post",
        url: "/hlkt/admin/kalendar/getKalendarList.action",
        data: {
          sid: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid
        }
      }).then(res => {
        if (res.data.resultCode == "200") {
          this.tableData = res.data.resultData.list.slice(3);
          this.calendarData = res.data.resultData.list;
          console.log(this.tableData);
        } else {
          this.$message({
            type: "error",
            message: res.data.resultMsg
          });
        }
      });
    }
  },

  components: {},
  created() {
    console.log();
    this.getrest();
  }
};
</script>
<style scoped lang="scss">
@import "src/plugins/px2vw";

.input {
  width: 200px;
}

.edit {
  padding-top: px2vw(40px);
}

.calendar-day {
  text-align: center;
  color: #202535;
  line-height: 30px;
  font-size: 12px;
}

.is-selected {
  color: #f8a535;
  font-size: 10px;
  margin-top: 5px;
}

#calendar
  .el-button-group
  > .el-button:not(:first-child):not(:last-child):after {
  content: "当月";
}

.table {
  width: px2vw(1010px);
  height: px2vw(728px);
  background-color: white;
  padding: 0 px2vw(20px);
  margin-top: px2vw(10px);
}

.main {
  width: px2vw(1050px);
  height: px2vw(78px);
  background-color: white;
  display: flex;

  // margin-top: px2vw(8px);
  a {
    float: left;
    margin-left: px2vw(20px);
    line-height: px2vw(90px);
  }

  .el-select {
    width: px2vw(115px);
    height: px2vw(35px);
    margin-top: px2vw(21px);
    margin-left: px2vw(12px);
  }

  .button {
    margin-top: px2vw(15px);
    margin-left: px2vw(12px);
    width: px2vw(63px);
    height: px2vw(35px);
  }
}

.add {
  margin-left: px2vw(20px);
  margin-top: px2vw(8px);
}

.head {
  width: px2vw(124px);
  height: px2vw(50px);
  background-color: white;
  font-size: px2vw(16px);
  color: #303133;
  line-height: px2vw(50px);
  text-align: center;
  float: left;
}

.adminer {
  width: px2vw(1050px);
  height: px2vw(778px);
  margin-left: px2vw(350px);
  position: absolute;
  top: 0px;
}
</style>
