<template>
	<div>
		<div>
			<div class="head">校历</div>
			<el-button v-if="show" class="add" size="small" type="primary" @click="showq()">编辑</el-button>
			<el-button v-if="hide" class="add" size="small" type="primary" @click="hold()">返回</el-button>
		</div>

		<div class="table">
			<el-calendar v-if='show' v-model="value">
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
						<el-form-item :required="true" label="日期" :label-width="formLabelWidth">
							<el-date-picker v-model="form.newdate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
						</el-form-item>
						<el-form-item :required="true" label="是否上课" :label-width="formLabelWidth">
							<el-radio v-model="radio" label="1">是</el-radio>
							<el-radio v-model="radio" label="0">否</el-radio>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="dialogFormVisible1= false">取 消</el-button>
						<el-button type="primary" @click="edit()">确 定</el-button>
					</div>
				</el-dialog>
				<el-form :model="form">
					<el-form-item label='开学日期' :label-width="formLabelWidth">
						<!-- <div class="demonstration">值：{{ form.value1}}</div> -->
						<el-date-picker v-model="form.value1" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
					</el-form-item>
					<el-form-item label='第一天上课日期' :label-width="formLabelWidth">
						<el-date-picker v-model="form.value2" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
					</el-form-item>
					<el-form-item label='放假日期' :label-width="formLabelWidth">
						<el-date-picker v-model="form.value3" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
						<el-button style="margin-left: 50px;" type="primary" @click="add()">确 定</el-button>
					</el-form-item>
					<el-form-item   label="其他特殊日期" :label-width="formLabelWidth">
						<el-table :data="elseData" border>
							<el-table-column prop="date" label="开始时间" width="160"></el-table-column>
							<el-table-column prop="details" label="日期安排" width="280"></el-table-column>
							<!-- 	<el-table-column prop="endTime" label="结束时间" width="280"></el-table-column> -->
							<el-table-column fixed="right" label="管理">
								<template slot-scope="scope">
									<el-button @click="showedit(scope.row)" type="text" size="small">编辑</el-button>
									<el-button @click="dele(scope.row)" type="text" size="small">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
					</el-form-item>
	<el-pagination :hide-on-single-page="true" class="page"   layout="total, prev, pager, next" :page-size="5" :current-page="currentPage"
				 @current-change="handleCurrentChange" :total="parseInt(this.count)"></el-pagination>					
					<el-button type="primary" style="width: 160px;" :disabled="disabled" @click="readd()">继续添加特殊日期</el-button>
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
				currentPage: 1, // 默认显示第几页
				disabled:true,
				radio: "1",
				count: "",
				hide: false,
				show: true,
				tableData: [{
						date: "",
						details: "开学日期",
						sid: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid,
						status: 0

					},
					{
						date: "",
						details: "第一天上课日期",
						sid: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid,
						status: 1
					},
					{
						date: "",
						details: "放假日期",
						sid: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid,
						status: 0
					}
				],
				elseData: [

				],
				place1: '',
				dialogFormVisible1: false,
				form: {
					value1: "",
					value2: "",
					value3: "",
					newdate: "",
					id: "",
					input: ""
				},
				formLabelWidth: "120px",
				input: "",
				calendarData: [],
				value: new Date()
			};
		},
		methods: {
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
			readd() {
				this.form.newdate = '';
				this.form.input = '';
				this.dialogFormVisible1 = true;

			},

			hold() {
				this.hide = false;
				this.show = true;
				// this.add();
			},
			showq() {
				this.hide = true;
				this.show = false
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
				this.form.input = row.details;
				this.form.newdate = row.date;
				this.form.id = row.id;
				this.dialogFormVisible1 = true;

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
					url: "/hlkt/admin/kalendar/updateKalendar.action",
					data: {
						"date": row.date,
						"week": 0,
						"details": '',
						"status": this.radio,
						id: row.id,
						"sid": JSON.parse(sessionStorage.getItem("SESSION_USER")).sid,
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
					url: "/hlkt/admin/kalendar/updateKalendar.action",
					data: {
						id: this.form.id,
						"date": this.form.newdate,
						"week": 0,
						"details": this.form.input,
						"status": this.radio,
						"sid": JSON.parse(sessionStorage.getItem("SESSION_USER")).sid,
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
				this.tableData[0].date = this.form.value1;
				this.tableData[1].date = this.form.value2;
				this.tableData[2].date = this.form.value3;
				let kx = new Date(this.tableData[0].date).getTime();
				let sk = new Date(this.tableData[1].date).getTime();
				let fj = new Date(this.tableData[2].date).getTime();
				if (sk >= kx && fj > sk) {
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
							list:[ {
								date: this.form.value1,
								details: "开学日期",
								sid: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid,
								status: 0

							},
							{
								date: this.form.value2,
								details: "第一天上课日期",
								sid: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid,
								status: 1
							},
							{
								date: this.form.value3,
								details: "放假日期",
								sid: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid,
								status: 0
							}

						]}
					}).then(res => {
						if (res.data.resultCode == "200") {
							this.dialogFormVisible = false;
							this.getrest();
							// this.show = true;
							// this.hide = false;
							this.$message('保存成功');
						} else {
							this.$message({
								type: "error",
								message: res.data.resultMsg
							});
						}
					});
				} else  if(sk <kx){
					this.$message({
						type: "error",
						message: '第一天上课日期不应早于开学日期'
					});
				}else  if(kx >fj){
					this.$message({
						type: "error",
						message: '放假日期不应早于开学日期'
					});
				}

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
				this.getrest2();
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
						this.calendarData = res.data.resultData.slice(3);
						
						if (this.calendarData.length >= 3) {
							this.disabled=false;
							this.tableData = res.data.resultData.slice(0, 3); //前三那哥日历。
							this.form.value1 = this.tableData[0].date;
							this.form.value2 = this.tableData[1].date;
							this.form.value3 = this.tableData[2].date;
						}
						
					} else {
						this.$message({
							type: "error",
							message: res.data.resultMsg
						});
					}
				});
			},
			getrest2() {
				axios({
					headers: {
						"User-Info": JSON.parse(sessionStorage.getItem("SESSION_USER"))
							.loginId,
						Authorization: JSON.parse(sessionStorage.getItem("SESSION_USER"))
							.sessionId
					},
					method: "post",
					url: "/hlkt/admin/kalendar/specialKalendar.action",
					data: {
						sid: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid,
						pageSize: 5,
						pageNum: this.currentPage
					}
				}).then(res => {
					if (res.data.resultCode == "200") {
						this.elseData = res.data.resultData.list;
						this.count=res.data.resultData.total;
						console.log(res.data.resultData);
					} else {
						this.elseData = [];
					}
				});
			}
		},

		components: {},
		created() {
			// console.log(addfrom);
			this.getrest();
		}
	};
</script>
<style scoped lang="scss">
	@import "src/plugins/px2vw";
    .page{
		float: right;
	}
	.input {
		width: 200px;
	}

	.edit {
		padding-top: px2vw(40px);
	}

	// .calendar-day {
	// 	text-align: center;
	// 	color: #202535;
	// 	line-height: 30px;
	// 	font-size: 12px;
	// }

	.is-selected {
		color: #f8a535;
		font-size: 10px;
		margin-top: 5px;
	}

	#calendar .el-button-group>.el-button:not(:first-child):not(:last-child):after {
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
