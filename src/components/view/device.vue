<template>
	<div>
		<div>
			<div class="head">班级管理</div>
			<el-button class="add" size="small" type="primary" @click="adddevice()">新增班级</el-button>
			<el-button style="float: right;" @click='all()'>全部</el-button>
			<div style="float: right;">
				<el-input placeholder="请输入教室号" v-model="input2" @keyup.enter.native="reget()">
					<el-button slot="append" @click="reget()">搜索</el-button>
				</el-input>
			</div>
			<el-dialog title="新增班级" :visible.sync="dialogFormVisible" :modal-append-to-body='false'>
				<el-form :model="form" :rules="rules" ref="form">
					<el-form-item prop="devRoom" label="教室" :label-width="formLabelWidth">
						<!-- <el-input class="input" v-model="form.cameraNumber" autocomplete="off"></el-input> -->
						<el-select v-model="form.devRoom" placeholder="请选择">
							<el-option v-for="item in options" :key="item.id" :label="item.devRoom" :value="item.devRoom"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="gradeNo" label="班级" :label-width="formLabelWidth">
						<el-input class="input" v-model="form.gradeNo" autocomplete="off" placeholder="请输入数字" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
						 maxlength="2"></el-input>年<el-input class="input" placeholder="请输入数字" v-model="form.classNo" prop="classNo"
						 autocomplete="off" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');" maxlength="2"></el-input>班
					</el-form-item>
					<!-- <el-form-item required=“true” label="摄像头ID" :label-width="formLabelWidth">
						<el-input class="input" v-model="form.cCamera" autocomplete="off"></el-input>
					</el-form-item> -->
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="submitForm('form')">确 定</el-button>
				</div>
			</el-dialog>
			<el-dialog title="编辑班级" :visible.sync="dialogFormVisible1" :modal-append-to-body='false'>
				<el-form :model="form">
					<el-form-item prop="devRoom" label="教室" :label-width="formLabelWidth">
						<!-- <el-input class="input" v-model="form.cameraNumber" autocomplete="off"></el-input> -->
						<el-select v-model="form.tbCameraDevice.devRoom" placeholder="请选择">
							<el-option v-for="item in options" :key="item.id" :label="item.devRoom" :value="item.devRoom"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="gradeNo" label="班级" :label-width="formLabelWidth">
						<el-input class="input" v-model="form.gradeNo" autocomplete="off" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
						 maxlength="2"></el-input>年<el-input class="input" placeholder="请输入数字" v-model="form.classNo" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
						 maxlength="2"></el-input>班
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
		</div>

		<div class="main">
		</div>
		<div class="table">
			<el-table :data="tableData" border :height="tableHeight">
				<el-table-column :index="indexMethod" type="index" label="序号" width="60">
				</el-table-column>
				<el-table-column prop="tbCameraDevice.devRoom" label="教室">
				</el-table-column>
				<el-table-column prop="className" label="班级">
					<!-- <template slot-scope="scope"> {{scope.row.projectName}}({{scope.row.projectCode}}) </template> -->
				</el-table-column>
				<el-table-column prop="tbCameraDevice.devCode" label="摄像头id">
				</el-table-column>
				<el-table-column fixed="right" label="管理" width="120">
					<template slot-scope="scope">
						<el-button @click="showedit(scope.row)" type="text" size="small">编辑</el-button>
						<el-button @click="deleteCamera(scope.row)" type="text" size="small">删除</el-button>
					</template>
				</el-table-column>

			</el-table>
			<div class="page">
				<el-pagination :hide-on-single-page='true' class="page" layout="total, prev, pager, next" :page-size="10"
				 :current-page="currentPage" @current-change="handleCurrentChange" :total="parseInt(count)"></el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	export default {
		name: "dev",
		data() {
			return {
				rules: {
					devRoom: [{
							required: true,
							message: '请输入教室名称',
							trigger: 'blur'
						},

					],
					gradeNo: [{

						required: true,
						message: '请输入数字',
						trigger: 'blur'
					}],
					classNo: [{
						required: true,
						message: '请输入数字',
						trigger: 'blur'
					}],
				},
				tableHeight: '60vh',
				dialogFormVisible: false,
				dialogFormVisible1: false,
				form: {
					sName: "",
					cNumber: "",
					cGrade: '',
					devRoom: '',
					tbCameraDevice:{},
				},
				formLabelWidth: '120px',

				count: "",
				currentPage: 1, // 默认显示第几页
				options: [],
				value: '',
				tableData: [],
				input2: '',
			}
		},
		methods: {
			reget() {
				this.currentPage = 1;
				this.getdevice();
			},
			indexMethod(index) {

				return (this.currentPage - 1) * 10 + index + 1;
			},
			all() {
				this.input2 = '';
				this.getdevice()
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
			adddevice() {
				this.form = {
					tbCameraDevice:{
						devRoom:''
					},
				};
				this.dialogFormVisible = true;

			},
			deleteCamera(row) {
				this.$confirm("确认删除摄像头数据？", {
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
				this.form = row;
				// this.form.devRoom = row.tbCameraDevice.devRoom;
				// this.form.gradeNo =row.gradeNo;
				// this.form.classNo =row.classNo;
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
					url: "/hlkt/admin/camera/deleteCamera.action",
					data: row
				}).then(res => {
					if (res.data.resultCode == "200") {

						this.getdevice();
					} else {
						this.$message({
							type: "error",
							message: res.data.resultMsg
						});
					}
				});
			},
			edit(row) {
				console.log(this.form)
				axios({
					headers: {
						"User-Info": JSON.parse(sessionStorage.getItem("SESSION_USER"))
							.loginId,
						Authorization: JSON.parse(sessionStorage.getItem("SESSION_USER"))
							.sessionId
					},
					method: "post",
					url: "/hlkt/admin/camera/updateCamera.action",
					data: this.form
					// {
					// 	id: row.id,
					// 	classNo: this.form.classNo,
					// 	gradeNo: this.form.gradeNo,
					// 	sid: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid,
					// 	tbCameraDevice: {
					// 		id: row.tbCameraDevice.id,
					// 		devRoom: this.form.devRoom,
					// 		dev_code: row.tbCameraDevice.dev_code,
					// 	},
					// }
				}).then(res => {
					if (res.data.resultCode == "200") {
						this.dialogFormVisible1 = false;
						this.getdevice();
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
					url: "/hlkt/admin/camera/addCamera.action",
					data: {
						// cCamera: this.form.cCamera,
						// cameraNumber: this.form.cameraNumber,
						classNo: this.form.classNo,
						gradeNo: this.form.gradeNo,
						sid: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid,
						tbCameraDevice: {
							devRoom: this.form.devRoom
						},

					}
				}).then(res => {
					if (res.data.resultCode == "200") {
						this.dialogFormVisible = false;
						this.getdevice();

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
			getbanji() {
				axios({
					headers: {
						"User-Info": JSON.parse(sessionStorage.getItem("SESSION_USER"))
							.loginId,
						Authorization: JSON.parse(sessionStorage.getItem("SESSION_USER"))
							.sessionId
					},
					method: "post",
					url: "/hlkt/selective/devroom/list.action",
					data: {
						sid: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid,
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
			getdevice() {
				axios({
					headers: {
						"User-Info": JSON.parse(sessionStorage.getItem("SESSION_USER"))
							.loginId,
						Authorization: JSON.parse(sessionStorage.getItem("SESSION_USER"))
							.sessionId
					},
					method: "post",
					url: "/hlkt/admin/camera/getCameraList.action",
					data: {
						sid: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid,
						pageNo: this.currentPage,
						search: this.input2,

					}
				}).then(res => {
					if (res.data.resultCode == "200") {
						this.tableData = res.data.resultData.list;
						this.count = res.data.resultData.total;
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
			this.getdevice();
			this.getbanji();

		},
	};
</script>
<style scoped lang="scss">
	@import "src/plugins/px2vw";

	.input {
		width: 140px;
	}

	.page {
		text-align: center;

	}

	.table {
		width: px2vw(1010px);
		height: px2vw(728px);
		background-color: white;
		padding: 0 px2vw(20px);
		padding-top: px2vw(20px);
	}

	.main {

		width: px2vw(1050px);
		height: px2vw(0px);
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
