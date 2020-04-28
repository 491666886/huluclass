<template>
	<div>
		<div>
			<div class="head">课表信息</div>
			<el-button class="add" size="small" type="primary" @click="doupload">+上传</el-button>
			<a class="done" @click="downmoban()">模版下载</a>
		</div>
		<el-dialog title="课表上传" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
			<div class="album albumvideo">
				<div>
					<p class="type_title">
						<span>介绍</span>
					</p>
					<div class="pic_img">
						<div class="pic_img_box">
							<el-upload class="upload-demo" :action="doUpload" :headers="myHeaders" :on-success="handleAvatarSuccess" :data="{sid:this.sid}"
							 accept=".xls" ref="upload" :limit="1" :on-change="handleChange" :auto-upload="false" :file-list="fileList">
								<el-button size="small" type="primary">点击上传</el-button>
								<div slot="tip" class="el-upload__tip">只能上传Excel文件</div>
							</el-upload>
						</div>
						<el-form style="margin-top: 50px;" :rules="rules" :model="form" ref="form">
							<el-form-item prop="value" label="开始时间" :label-width="formLabelWidth">
								<el-select v-model="form.value" placeholder="请选择">
									<el-option v-for="item in years" :key="item.value" :label="item.label" :value="item.label">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item prop="value1" label="学期" :label-width="formLabelWidth">
								<el-select v-model="form.value1" placeholder="请选择">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label"></el-option>
								</el-select>
							</el-form-item>
						</el-form>
					</div>
				</div>
			</div>

			<div slot="footer" class="dialog-footer">
				<el-button @click="quxiao">取 消</el-button>
				<el-button type="primary" @click="submitForm('form')">确 定</el-button>
			</div>
		</el-dialog>
		<div class="main">
			<!-- 	<a>筛选条件： 年份</a>
			<el-select v-model="value" placeholder="请选择">
				<el-option v-for="item in years" :key="item.value" :label="item.label" :value="item.label"></el-option>
			</el-select>
			<a>学期</a>
			<el-select v-model="value1" placeholder="请选择">
				<el-option v-for="items in options" :key="items.value" :label="items.label" :value="items.label"></el-option>
			</el-select>
			<div class="button">
				<el-button class="add" size="small" type="primary">搜索</el-button>
			</div> -->
		</div>
		<div class="table">
			<el-table :data="tableData" border>
				<el-table-column type="index" label="序号" width="60"></el-table-column>
				<el-table-column prop="oldFileName" label="名称"></el-table-column>
				<el-table-column prop="year" label="年份"></el-table-column>
				<el-table-column prop="semester" label="学期"></el-table-column>
				<el-table-column prop="createTime" label="更新时间" width="180"></el-table-column>
				<el-table-column prop="address" label="视频管理">
					<template slot-scope="scope">
						<el-button @click="down(scope.row)" type="text" size="small">下载</el-button>
						<el-button v-if="scope.row.useType==0" @click="yingyong(scope.row)" type="text" size="small">应用</el-button>
						<el-button v-if="scope.row.useType==1" type="text" size="small">正在应用</el-button>
						<!-- 	<el-button type="text" size="small">应用</el-button> -->
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	// @ is an alias to /src
	import axios from "axios";
	const url = 'http://10.150.27.126:8080';
	var sessionId = JSON.parse(sessionStorage.getItem("SESSION_USER")).sessionId;
	var UserInfo = JSON.parse(sessionStorage.getItem("SESSION_USER")).loginId;
	var sid = JSON.parse(sessionStorage.getItem("SESSION_USER")).sid
	export default {
		name: "teach",
		data() {
			return {
				rules: {
					value: [{

						required: true,
						message: '请选择年份',
						trigger: 'blur'
					}],
					value1: [{
						required: true,
						message: '请选择学期',
						trigger: 'blur'
					}],
				},
				sid: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid,
				doUpload: url + '/hlkt/admin/course/upload.action',
				myHeaders: {
					Authorization: sessionId,
					"User-Info": UserInfo
				},
				formLabelWidth: '120px',
				count: "",
				form: {
					value1: '',
					value: "", //laoshi
				},
				courseFileId: "",
				fileList: [],

				currentPage: 1, // 默认显示第几页
				dialogFormVisible: false,
				options: [{
						value: '选项1',
						label: '上学期'
					},
					{
						value: '选项2',
						label: '下学期'
					},
				],
				years: [{
					value: '选项1',
					label: '2020'
				}, {
					value: '选项2',
					label: '2019'
				}, ],

				tableData: [

				]
			};
		},
		methods: {
			doupload() {
				this.dialogFormVisible = true;
				this.fileList = [];
				this.form ={
					value1: '',
					value: "", //laoshi
				}
			},
			submitForm(formName) {
				this.$refs[formName].validate(valid => {
					if (valid) {
						console.log(this.fileList.length)
						if (this.fileList.length == 0) {
							this.$message({
								type: "error",
								message: '请选择课表上传'
							});
						} else {
							this.submitUpload();
							
						}

					} else {
						this.loading = false;
					}
				});
			},
			quxiao() {
				this.dialogFormVisible = false;
				this.fileList = [];
			},
			submitUpload() {
				console.log(this.fileList)
				this.$refs.upload.submit();
			},
			downmoban() {
				axios({
					headers: {
						"User-Info": JSON.parse(sessionStorage.getItem("SESSION_USER"))
							.loginId,
						Authorization: JSON.parse(sessionStorage.getItem("SESSION_USER"))
							.sessionId
					},
					method: "get",
					url: "/hlkt/admin/courseFileModel/check/" + sid + '.action',

				}).then(res => {
					if (res.data.resultCode == "200") {
						window.open("http://10.150.27.126:8080/hlkt/admin/courseFileModel/download/" + sid + '.action', '_blank');
					} else {
						this.$message({
							type: "error",
							message: res.data.resultMsg
						});
					}
				});
			},
			handleAvatarSuccess(res, file) {
				console.log(res.resultData, file);
				this.courseFileId = res.resultData.courseFileId;
				this.add(res);
			},
			down(row) { //下载课表
				window.open("http://10.150.27.126:8080/hlkt/admin/courseFile/download/" + row.courseFileId + '.action', '_blank');

			},
			handleChange(file, fileList) {
				this.fileList = fileList.slice(-3);
			},
			yingyong(row) { //应用
				this.$confirm("确定应用?", {
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
			del(row) { //应用课程
				axios({
					headers: {
						"User-Info": JSON.parse(sessionStorage.getItem("SESSION_USER"))
							.loginId,
						Authorization: JSON.parse(sessionStorage.getItem("SESSION_USER"))
							.sessionId
					},
					method: "post",
					url: "/hlkt/admin/courseFile/apply.action",
					data: {
						sid: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid,
						courseFileId: row.courseFileId,
						courseFileUrl: row.courseFileUrl,
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
				console.log('2222')
				axios({
					headers: {
						"User-Info": JSON.parse(sessionStorage.getItem("SESSION_USER"))
							.loginId,
						Authorization: JSON.parse(sessionStorage.getItem("SESSION_USER"))
							.sessionId
					},
					method: "post",
					url: "/hlkt/admin/coursefile/update.action",
					data: {
						courseFileId: this.courseFileId,
						year: this.form.value,
						semester: this.form.value1
					}
				}).then(res => {
					if (res.data.resultCode == "200") {
						this.$message({
							type: 'success',
							message: res.data.resultMsg
						});
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

			add(res) {
				console.log('2222')
				axios({
					headers: {
						"User-Info": JSON.parse(sessionStorage.getItem("SESSION_USER"))
							.loginId,
						Authorization: JSON.parse(sessionStorage.getItem("SESSION_USER"))
							.sessionId
					},
					method: "post",
					url: "/hlkt/admin/dailySchedule/insert.action",
					url: "/hlkt/admin/coursefile/update.action",
					data: {
						courseFileId: res.resultData.courseFileId,
						year: this.form.value,
						semester: this.form.value1
					}
				}).then(res => {
					if (res.data.resultCode == "200") {
						this.$message({
							type: 'success',
							message: res.data.resultMsg
						});
						this.dialogFormVisible = false;
						this.getrest();
						this.fileList = [];
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
			getrest() { //获取课表
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
						// sid:3,
						pageNo: this.currentPage,
						pageSize: 10
					}
				}).then(res => {
					if (res.data.resultCode == "200") {
						this.tableData = res.data.resultData.list;
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
		cursor: pointer;
	}

	.adminer {
		width: px2vw(1050px);
		height: px2vw(778px);
		margin-left: px2vw(350px);
		position: absolute;
		top: 0px;
	}
</style>
