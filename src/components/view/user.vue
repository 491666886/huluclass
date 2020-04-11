<template>
	<div>
		<div>
			<div class="head">教师列表</div>
			<el-button class="add" size="small" type="primary" @click="dialogFormVisible = true">添加教师</el-button>
		</div>

		<div class="main">
			<a>筛选条件： 学科 </a>
			<el-select v-model="value" placeholder="请选择">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<a>年级</a>
			<el-select v-model="value" placeholder="请选择">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<a>教师</a>
			<el-select v-model="value" placeholder="请选择">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>

			<div class="button">
				<el-button class="add" size="small" type="primary">搜索</el-button>
			</div>
		</div>
		<el-dialog title="新增用户" :visible.sync="dialogFormVisible" :modal-append-to-body='false'>
			<el-form :model="form">
				<el-form-item class="input" :required=true label="姓名" :label-width="formLabelWidth">
					<el-input  v-model="form.tName" autocomplete="off"></el-input>
				</el-form-item>
				<a >学科 </a>
				<el-select class="" v-model="value" placeholder="请选择">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-form-item  class="input":required=true label="账号" :label-width="formLabelWidth">
					<el-input  v-model="form.loginId" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item class="input" :required=true label="密码" :label-width="formLabelWidth">
					<el-input  v-model="form.password" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="add()">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="编辑设备" :visible.sync="dialogFormVisible1" :modal-append-to-body='false'>
			<el-form :model="form">
				<el-form-item :required=true label="姓名" :label-width="formLabelWidth">
					<el-input class="input" v-model="form.tName" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item :required=true label="班级" :label-width="formLabelWidth">
					<el-input class="input" v-model="form.cGrade" autocomplete="off"></el-input>
				</el-form-item>
				<!-- <el-form-item required=“true” label="摄像头ID" :label-width="formLabelWidth">
					<el-input class="input" v-model="form.cCamera" autocomplete="off"></el-input>
				</el-form-item> -->
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible1= false">取 消</el-button>
				<el-button type="primary" @click="edit()">确 定</el-button>
			</div>
		</el-dialog>
		<div class="table">
			<el-table :data="tableData" border>
				<el-table-column type="index" label="序号" width="60">
				</el-table-column>
				<el-table-column prop="tName" label="姓名" width="120">
				</el-table-column>
				<el-table-column prop="job" label="学科" width="130">
				</el-table-column>

				<el-table-column prop="baseUser.loginId" label="账号" width="130">
				</el-table-column>
				<el-table-column prop="baseUser.loginId" label="工号" width="130">
				</el-table-column>
				<el-table-column prop="address" label="入职时间">
				</el-table-column>
				<el-table-column fixed="right" label="管理" width="100">
					<template slot-scope="scope">
						<el-button @click="showedit(scope.row)" type="text" size="small">编辑</el-button>
						<el-button @click="dele(scope.row)" type="text" size="small">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="page">
				<el-pagination :hide-on-single-page='true' class="page" layout="prev, pager, next" :page-size="10" :current-page="currentPage"
				 @current-change="handleCurrentChange" :total="parseInt(this.count)"></el-pagination>
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
				formLabelWidth: '120px',
				form: {
					sName: "",
					cNumber: "",
					cGrade: '',
				},
				dialogFormVisible: false,
				dialogFormVisible1: false,
				count: "",
				currentPage: 1, // 默认显示第几页
				options: [{
					value: '选项1',
					label: '黄金糕'
				}, {
					value: '选项2',
					label: '双皮奶'
				}, {
					value: '选项3',
					label: '蚵仔煎'
				}, {
					value: '选项4',
					label: '龙须面'
				}, {
					value: '选项5',
					label: '北京烤鸭'
				}],
				value: '',
				userid: '',
				teacherId: '',
				tableData: [],
			}
		},
		methods: {
			dele(row) {
				this.$confirm("确认删除用户数据？", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						this.del(row)
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
							userId: row.baseUser.userId,

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
				axios({
					headers: {
						"User-Info": JSON.parse(sessionStorage.getItem("SESSION_USER"))
							.loginId,
						Authorization: JSON.parse(sessionStorage.getItem("SESSION_USER"))
							.sessionId
					},
					method: "post",
					url: "/hlkt/admin/teacherOpt/updateTeacher.action",
					data: {
						teacherId: row.teacherId,
						tName: '黄俊宇',
						sid: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid,
						job: '123',

						baseUser: {
							userId: row.baseUser.userId,
							remark: '011111',
							loginId: '011111',
							password: '011111',
							name: '黄俊宇',
							roleId: '1',
							sid: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid
						}
					}
				}).then(res => {
					if (res.data.resultCode == "200") {

						console.log(this.tableData)
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
				axios({
					headers: {
						"User-Info": JSON.parse(sessionStorage.getItem("SESSION_USER"))
							.loginId,
						Authorization: JSON.parse(sessionStorage.getItem("SESSION_USER"))
							.sessionId
					},
					method: "post",
					url: "/hlkt/admin/teacherOpt/addTeacher.action",
					data: {
						tName: '黄俊宇',
						sid: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid,
						job: '',

						baseUser: {
							remark: '011111',
							loginId: '011111',
							password: '011111',
							name: '黄俊宇',
							roleId: '1',
							sid: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid
						}
					}
				}).then(res => {
					if (res.data.resultCode == "200") {

						console.log(this.tableData)
					} else {
						this.$message({
							type: "error",
							message: res.data.resultMsg
						});
					}
				});

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
						pageNo: this.currentPage,
					}
				}).then(res => {
					if (res.data.resultCode == "200") {
						this.tableData = res.data.resultData;
						this.count = res.data.resultLineNum;
						console.log(this.tableData)
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
			this.getuserlist()
		},
	};
</script>
<style scoped lang="scss">
	@import "src/plugins/px2vw";
    
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
</style>
