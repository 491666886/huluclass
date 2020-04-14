<template>
  <div>
    <div>
      <div class="head">课表信息</div>
      <el-button class="add" size="small" type="primary" @click="dialogFormVisible = true">+上传</el-button>
      <a class="done">模版下载</a>
    </div>
    <el-dialog title="课表上传" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
      <div class="album albumvideo">
        <div>
          <p class="type_title">
            <span>视频介绍</span>
          </p>
          <div class="pic_img">
            <div class="pic_img_box">
              <el-upload
			  
                class="upload-demo"
                action="/hlkt/admin/course/upload.action"
				 :headers="myHeaders"
                :on-change="handleChange"
                :file-list="fileList"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传Excel文件</div>
              </el-upload>
            </div>
            <el-form style="margin-top: 50px;">
              <el-form-item :required="true" label="开始时间" :label-width="formLabelWidth">
                <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
              <el-form-item :required="true" label="学期" :label-width="formLabelWidth">
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add()">确 定</el-button>
      </div>
    </el-dialog>
    <div class="main">
      <a>筛选条件： 年份</a>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <a>学期</a>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <div class="button">
        <el-button class="add" size="small" type="primary">搜索</el-button>
      </div>
    </div>
    <div class="table">
      <el-table :data="tableData" border>
        <el-table-column prop="date" label="序号" width="60"></el-table-column>
        <el-table-column prop="name" label="教师" width="180"></el-table-column>
        <el-table-column prop="name" label="科目" width="180"></el-table-column>
        <el-table-column prop="name" label="班级" width="180"></el-table-column>
        <el-table-column prop="name" label="录制日期" width="180"></el-table-column>
        <el-table-column prop="address" label="视频管理"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
export default {
  name: "teach",
  data() {
    return {
		  myHeaders: { Authorization: sessionId, "User-Info": UserInfo },
		 count: "",
      currentPage: 1, // 默认显示第几页
      dialogFormVisible: false,
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
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
      ]
    };
  },
	methods: {
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
				this.dialogFormVisible1 = true;
				this.scheduleId = row.scheduleId;
				
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
						scheduleId: row.scheduleId,
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
						"courseNum": this.form.input,
						"startTime": this.value1 +':00',
						"endTime": this.value2+':00',
					}
				}).then(res => {
					if (res.data.resultCode == "200") {
						this.$message({
							type: 'success',
							message: res.data.resultMsg
						});
						this.dialogFormVisible1 =false;
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
				axios({
					headers: {
						"User-Info": JSON.parse(sessionStorage.getItem("SESSION_USER"))
							.loginId,
						Authorization: JSON.parse(sessionStorage.getItem("SESSION_USER"))
							.sessionId
					},
					method: "post",
					url: "/hlkt/admin/dailySchedule/insert.action",
					data: {
						sid: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid,
						"courseNum": this.form.input,
						"startTime": this.value1 +':00',
						"endTime": this.value2+':00',
					}
				}).then(res => {
					if (res.data.resultCode == "200") {
					   this.dialogFormVisible=false;
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
			getrest() {//获取课表
				axios({
					headers: {
						"User-Info": JSON.parse(sessionStorage.getItem("SESSION_USER"))
							.loginId,
						Authorization: JSON.parse(sessionStorage.getItem("SESSION_USER"))
							.sessionId
					},
					method: "post",
					url: "/hlkt/admin/courseFile/list.action",
					data: {
						sid: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid,
						pageNo: this.currentPage,
						pageSize:10
					}
				}).then(res => {
					if (res.data.resultCode == "200") {
						this.tableData = res.data.resultData;
						this.count = res.data.resultLineNum;
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
	 this.getrest();
  }
};
</script>
<style scoped lang="scss">
@import "src/plugins/px2vw";

.table {
  width: px2vw(1010px);
  height: px2vw(650px);
  background-color: white;
  padding: 0 px2vw(20px);
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

.done {
  color: #66b1ff;
  margin-left: px2vw(30px);
}

.adminer {
  width: px2vw(1050px);
  height: px2vw(778px);
  margin-left: px2vw(350px);
  position: absolute;
  top: 0px;
}
</style>
