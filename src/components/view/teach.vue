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
							<el-upload class="upload-demo" action="http://10.150.27.124:8081/hlkt/admin/course/upload.action" :headers="myHeaders"
							 :data="{sid:2}" :on-change="handleChange" :file-list="fileList">
								<el-button size="small" type="primary">点击上传</el-button>
								<div slot="tip" class="el-upload__tip">只能上传Excel文件</div>
							</el-upload>
						</div>
						<el-form style="margin-top: 50px;">
							<el-form-item :required="true" label="开始时间" :label-width="formLabelWidth">
								<el-select v-model="value" placeholder="请选择">
									<el-option v-for="item in years" :key="item.value" :label="item.label" :value="item.label">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item :required="true" label="学期" :label-width="formLabelWidth">
								<el-select v-model="value1" placeholder="请选择">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label"></el-option>
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
				<el-table-column prop="oldFileName" label="名称" width="180"></el-table-column>
				<el-table-column prop="name" label="年份" width="180"></el-table-column>
				<el-table-column prop="name" label="学期" width="180"></el-table-column>
				<el-table-column prop="createTime" label="更新时间" width="180"></el-table-column>
				<el-table-column prop="address" label="视频管理">
					<template slot-scope="scope">
						<el-button @click="down(scope.row)" type="text" size="small">下载</el-button>
						<el-button @click="dele(scope.row)" type="text" size="small">删除</el-button>
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
	var sessionId = JSON.parse(sessionStorage.getItem("SESSION_USER")).sessionId;
	var UserInfo = JSON.parse(sessionStorage.getItem("SESSION_USER")).loginId;
	export default {
		name: "teach",
		data() {
			return {
				myHeaders: {
					Authorization: sessionId,
					"User-Info": UserInfo
				},
				formLabelWidth: '120px',
				count: "",
				value1: "",
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
				},{
					value: '选项2',
					label: '2019'
				},
				],
				value: "", //laoshi
				tableData: [

				]
			};
		},
		methods: {
			down(row) {
				axios({
					headers: {
						"User-Info": JSON.parse(sessionStorage.getItem("SESSION_USER"))
							.loginId,
						Authorization: JSON.parse(sessionStorage.getItem("SESSION_USER"))
							.sessionId
					},
					method: "get",
					url: "/hlkt/admin/courseFile/download/" + row.courseFileId + '.action',

				}).then(res => {
					if (res.data.resultCode == "200") {

					} else {
						this.$message({
							type: "error",
							message: res.data.resultMsg
						});
					}
				});
			},
			handleChange(file, fileList) {
				this.fileList = fileList.slice(-3);
			},
			dele(row) {
				this.$confirm("不支持删除课表？", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						// this.del(row);
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
						"startTime": this.value1 + ':00',
						"endTime": this.value2 + ':00',
					}
				}).then(res => {
					if (res.data.resultCode == "200") {
						this.$message({
							type: 'success',
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
						"startTime": this.value1 + ':00',
						"endTime": this.value2 + ':00',
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
	}

	.adminer {
		width: px2vw(1050px);
		height: px2vw(778px);
		margin-left: px2vw(350px);
		position: absolute;
		top: 0px;
	}
</style>
