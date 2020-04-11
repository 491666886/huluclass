<template>
	<div>
		<div>
			<div class="head">视频列表</div>
			<el-button class="add" size="small" type="primary">+上传视频</el-button>
		</div>

		<div class="main">
			<a>筛选条件： 科目 </a>
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
			<a>录制日期</a>
			<el-select v-model="value" placeholder="请选择">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<div class="button">
				<el-button class="add" size="small" type="primary">搜索</el-button>
			</div>
			</div>
			<div class="table">
			<el-table :data="tableData" border >
				<el-table-column prop="date" label="序号" width="60">
				</el-table-column>
				<el-table-column prop="name" label="教师" width="180">
				</el-table-column>
				<el-table-column prop="name" label="科目" width="180">
				</el-table-column>
				<el-table-column prop="name" label="班级" width="180">
				</el-table-column>
				<el-table-column prop="name" label="录制日期" width="180">
				</el-table-column>
				<el-table-column prop="address" label="视频管理">
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	// @ is an alias to /src
import axios from "axios";
	export default {
		name: "videodetail",
		data() {
			return {
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
				tableData: [{
					date: '1',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: 2,
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '3',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '4',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}]
			}
		},

		methods: {
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
					data: {
						sid: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid,
						cCamera: row.cCamera
					}
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
				axios({
					headers: {
						"User-Info": JSON.parse(sessionStorage.getItem("SESSION_USER"))
							.loginId,
						Authorization: JSON.parse(sessionStorage.getItem("SESSION_USER"))
							.sessionId
					},
					method: "post",
					url: "/hlkt/admin/camera/updateCamera.action",
					data: {
		
						sid: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid,
						sName: "小学",
						cNumber: "101000",
						cGrade: "",
						cCamera: row.cCamera
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
						sName: "小学",
						cNumber: "1010",
						cGrade: "一年级（10）班",
		
						sid: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid,
		
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
			getvideo() {
				axios({
					headers: {
						"User-Info": JSON.parse(sessionStorage.getItem("SESSION_USER"))
							.loginId,
						Authorization: JSON.parse(sessionStorage.getItem("SESSION_USER"))
							.sessionId
					},
					method: "post",
					url: "/hlkt/resource/findSearchVideo.action",
					data: {
						sid: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid,
						pageNo: this.currentPage,
					}
				}).then(res => {
					if (res.data.resultCode == "200") {
						this.tableData = res.data.resultData.list;
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
		components: {
			axios,
		},
		created() {
        this.getvideo();
		},
	};
</script>
<style scoped lang="scss">
	@import "src/plugins/px2vw";
	.table{
		width: px2vw(1010px);
		height: px2vw(650px);
		background-color: white;
		padding:  0 px2vw(20px);
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
