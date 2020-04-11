<template>
	<div>
		<div>
			<div class="head">课表信息</div>
			<el-button class="add" size="small" type="primary">+上传</el-button>
			<a class="done">模版下载</a>
		</div>

		<div class="main">
			<a>筛选条件： 年份 </a>
			<el-select v-model="value" placeholder="请选择">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<a>学期</a>
			<el-select v-model="value" placeholder="请选择">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<div class="button">
				<el-button class="add" size="small" type="primary">搜索</el-button>
			</div>
		</div>
		<div class="table">
			<el-table :data="tableData" border>
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

	export default {
		name: "teach",
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

		components: {},
		created() {

		},
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
		color: #66B1FF;
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
