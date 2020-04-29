<template>
	<div>
		<div>
			<div class="head">教师列表</div>
			<el-button class="add" size="small" type="primary" @click="addtea()">添加教师</el-button>
		</div>

		<div class="main">
			<a>筛选条件： 学科</a>
			<el-select v-model="value" placeholder="请选择" @change="kemu">
				<el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.name"></el-option>
			</el-select>
			<div class="button">
				<el-button class="add" size="small" type="primary" @click='retry()'>重置</el-button>
			</div>
		</div>
		<el-dialog title="新增用户" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
			<el-form :model="form" :rules="rules" ref="form">
				<el-form-item class="input" prop="baseUser.name" label="姓名" :label-width="formLabelWidth">
					<el-input v-model="form.baseUser.name" autocomplete="off"></el-input>

				</el-form-item>
				<!--  <div class="class">
          <a>学科</a> -->
				<el-form-item class="input" prop="jobName" label="学科" :label-width="formLabelWidth">
					<el-select v-model="form.jobName" placeholder="请选择" @change="getuserlist">
						<el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.name"></el-option>
					</el-select>
				</el-form-item>
				<!-- </div> -->
				<el-form-item class="input"  prop="baseUser.loginId" label="账号" :label-width="formLabelWidth">
					<el-input v-model="form.baseUser.loginId" autocomplete="off"
					 onkeyup="this.value=this.value.replace(/[/u0391-/uFFE5]/gi,’’)"></el-input>
				</el-form-item>
				<el-form-item class="input" label="工号" :label-width="formLabelWidth">
					<el-input v-model="form.jobNumber" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item class="input"  prop="baseUser.password" label="密码" :label-width="formLabelWidth">
					<el-input v-model="form.baseUser.password" autocomplete="off"></el-input>
				</el-form-item>
				<div class="class">
					<a>入职时间</a>
					<el-date-picker v-model="form.hiredate" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" ></el-date-picker>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="esc()">取 消</el-button>
				<el-button type="primary" @click="submitForm('form')">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="编辑用户" :visible.sync="dialogFormVisible1" :modal-append-to-body="false">
			<el-form :model="form" :rules="rules" ref="form">
				<el-form-item class="input" :required="true" label="姓名" :label-width="formLabelWidth">
					<el-input v-model="form.baseUser.name" autocomplete="off"></el-input>
				</el-form-item>
				<div class="class">
					<a>学科</a>
					<el-select class v-model="form.jobName" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.name"></el-option>
					</el-select>
				</div>
				<el-form-item class="input" :required="true" label="账号" :label-width="formLabelWidth">
					<el-input v-model="form.baseUser.loginId" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item class="input" label="工号" :label-width="formLabelWidth">
					<el-input v-model="form.jobNumber" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item class="input" :required="true" label="密码" :label-width="formLabelWidth">
					<el-input v-model="form.baseUser.password" autocomplete="off"></el-input>
				</el-form-item>
				<div class="class">
					<a>入职时间</a>
					<el-date-picker v-model="form.hiredate" type="date" placeholder="选择日期" 
					value-format="yyyy-MM-dd"
					format="yyyy-MM-dd">
					</el-date-picker>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancel('form')">取 消</el-button>
				<el-button type="primary" @click="edit()">确 定</el-button>
			</div>
		</el-dialog>
		<div class="table">
			<el-table v-if="showTable" :data="tableData" border :height="tableHeight">
				<el-table-column :index="indexMethod" type="index" label="序号" width="60"></el-table-column>
				<el-table-column prop="baseUser.name" label="姓名"></el-table-column>
				<el-table-column prop="jobName" label="学科"></el-table-column>

				<el-table-column prop="baseUser.loginId" label="账号"></el-table-column>
				<el-table-column prop="jobNumber" label="工号"></el-table-column>
				<el-table-column prop="hiredate" label="入职时间"></el-table-column>
				<el-table-column fixed="right" label="管理" width="100">
					<template slot-scope="scope">
						<el-button @click="showedit(scope.row)" type="text" size="small">编辑</el-button>
						<el-button @click="dele(scope.row)" type="text" size="small">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="page">
				<el-pagination :hide-on-single-page="true" class="page" layout="total, prev, pager, next" :page-size="10"
				 :current-page="currentPage" @current-change="handleCurrentChange" :total="parseInt(this.count)"></el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	// @ is an alias to /src
	import axios from "axios";
	export default {
		name: "user",
		data() {
			return {
				showTable:true,
				rules: {
					'baseUser.loginId':[{type: "string", required: true, message: '请填写账号',trigger: 'blur'}], 
					'baseUser.name':[{type: "string", required: true, message: '请填写名字', trigger: 'blur'}], 
					'baseUser.password':[{type: "string", required: true, message: '请填写密码', trigger: 'blur'}], 
					jobName: [{
						required: true,
						message: '请选择学科',
						trigger: 'blur'
					}],
					
				},
				tableHeight: '55vh',
				value1: "", //入职时间
				formLabelWidth: "120px",
				form: {
					remark: "",
					loginId: "",
					password: "",
					job: "语文",
					teacherName: "",
					sid:JSON.parse(sessionStorage.getItem("SESSION_USER")).sid,
					jobNumber: "",
					jobName: "",
					baseUser: {
						name: "",
						roleId: 1,
						loginId: "",
						password: "",
						sid:JSON.parse(sessionStorage.getItem("SESSION_USER")).sid,
					},
				},
				dialogFormVisible: false,
				dialogFormVisible1: false,
				count: "",
				currentPage: 1, // 默认显示第几页
				options: [],
				value: "",
				userid: "",
				teacherId: "",
				tableData: []
			};
		},
		
		methods: {
			refreshTable () {//取消按钮回掉
			  this.showTable = false
			  this.$nextTick(() => {
			    this.showTable = true
			  })
			},
			cancel(formName){
				// this.$refs[formName].resetFields();
				this.dialogFormVisible1= false;
				this.getuserlist();
				this.refreshTable()
			},
			esc(){
				this.$router.go(0);
			},
			indexMethod(index) {
			
			        return 	(this.currentPage-1)*10+index+1;
			      },
			submitForm(formName) {
				this.$refs[formName].validate(valid => {
					if (valid) {
						this.add();
					} else {
						this.loading = false;
					}
				});
			},
			addtea() {
				this.form = {
					baseUser: {},
				};
				this.dialogFormVisible = true;

			},
			kemu() {
				this.currentPage=1;
				this.getuserlist();
			},
			getsubject() {
				axios({
					headers: {
						"User-Info": JSON.parse(sessionStorage.getItem("SESSION_USER"))
							.loginId,
						Authorization: JSON.parse(sessionStorage.getItem("SESSION_USER"))
							.sessionId
					},
					method: "post",
					url: "/hlkt/selective/subjects/list.action",
					data: {
						sid: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid,
						schoolType: 1,
					}
				}).then(res => {
					if (res.data.resultCode == "200") {
						this.options = res.data.resultData;

					} else {
						this.$message({
							type: "error",
							message: res.data.resultMsg
						});
					}
				});
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
				this.dialogFormVisible1 = true;
				this.form = row;
				this.teacherId = row.teacherId;

				this.userid = row.baseUser.userId;
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
					url: "/hlkt/admin/teacherOpt/deleteTeacher.action",
					data: {
						teacherId: row.teacherId,
						baseUser: {
							userId: row.baseUser.userId
						}
					}
				}).then(res => {
					if (res.data.resultCode == "200") {
						this.getuserlist();
					} else {
						this.$message({
							type: "error",
							message: res.data.resultMsg
						});
					}
				});
			},
			edit(row) {
				this.form.teacherName=this.form.baseUser.name;
				this.form.sid =JSON.parse(sessionStorage.getItem("SESSION_USER")).sid,
				this.form.baseUser.sid =JSON.parse(sessionStorage.getItem("SESSION_USER")).sid,
				this.form.baseUser.roleId =1,
				axios({
					headers: {
						"User-Info": JSON.parse(sessionStorage.getItem("SESSION_USER"))
							.loginId,
						Authorization: JSON.parse(sessionStorage.getItem("SESSION_USER"))
							.sessionId
					},
					method: "post",
					url: "/hlkt/admin/teacherOpt/updateTeacher.action",
					data: this.form
				}).then(res => {
					if (res.data.resultCode == "200") {
						this.dialogFormVisible1 = false;
						this.getuserlist();
					} else {
						this.$message({
							type: "error",
							message: res.data.resultMsg
						});
					}
				});
			},
			handleClick(row) {
				console.log(row);
			},
			add() {
					this.form.teacherName=this.form.baseUser.name;
					this.form.sid =JSON.parse(sessionStorage.getItem("SESSION_USER")).sid,
					this.form.baseUser.sid =JSON.parse(sessionStorage.getItem("SESSION_USER")).sid,
					this.form.baseUser.roleId =1,
					
				axios({
					headers: {
						"User-Info": JSON.parse(sessionStorage.getItem("SESSION_USER"))
							.loginId,
						Authorization: JSON.parse(sessionStorage.getItem("SESSION_USER"))
							.sessionId
					},
					method: "post",
					url: "/hlkt/admin/teacherOpt/addTeacher.action",
					data: this.form
				}).then(res => {
					if (res.data.resultCode == "200") {
						this.dialogFormVisible = false;
						this.getuserlist();
					} else {
						this.$message({
							type: "error",
							message: res.data.resultMsg
						});
					}
				});
			},
			retry() {

				this.value = '';

				this.getuserlist();
			},
			getuserlist() {
				axios({
					headers: {
						"User-Info": JSON.parse(sessionStorage.getItem("SESSION_USER"))
							.loginId,
						Authorization: JSON.parse(sessionStorage.getItem("SESSION_USER"))
							.sessionId
					},
					method: "post",
					url: "/hlkt/admin/teacherOpt/getTeacherList.action",
					data: {
						sid: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid,
						pageSize: 10,
						jobName: this.value,
						pageNo: this.currentPage
					}
				}).then(res => {
					if (res.data.resultCode == "200") {
						this.tableData = res.data.resultData.list;
						this.count = res.data.resultData.total;
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
			this.getuserlist();
			this.getsubject();
		}
	};
</script>
<style scoped lang="scss">
	@import "src/plugins/px2vw";

	.page {
		text-align: center;
	}

	.class {
		display: inline-block;
		margin-left: 83px;
		height: 65px;

		a {
			margin-right: 10px;
		}
	}

	.input {
		width: px2vw(400px);
		float: left;
	}

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

	.adminer {
		width: px2vw(1050px);
		height: px2vw(778px);
		margin-left: px2vw(350px);
		position: absolute;
		top: 0px;
	}

	.button {
		margin-top: px2vw(15px);
		margin-left: px2vw(12px);
		width: px2vw(63px);
		height: px2vw(35px);
	}
</style>
