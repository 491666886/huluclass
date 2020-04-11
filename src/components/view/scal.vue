<template>
	<div>
		<div>
			<div class="head">校历</div>
			<el-button class="add" size="small" type="primary">编辑</el-button>
		</div>

		<div class="table">

			<el-calendar v-model="value" id="calendar">
				<!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
				<template slot="dateCell" slot-scope="{date, data}">
					<!--自定义内容-->
					<div>
						<div class="calendar-day">{{ data.day.split('-').slice(2).join('-') }}</div>
						<div v-for="item in calendarData">
							<div v-if="(item.months).indexOf(data.day.split('-').slice(1)[0])!=-1">
								<div v-if="(item.days).indexOf(data.day.split('-').slice(2).join('-'))!=-1">
									<el-tooltip class="item" effect="dark" :content="item.things" placement="right">
										<div class="is-selected">{{item.things}}</div>
									</el-tooltip>
								</div>
								<div v-else></div>
							</div>
							<div v-else></div>
						</div>
					</div>
				</template>
			</el-calendar>

		</div>
	</div>
</template>

<script>
	// @ is an alias to /src

	export default {
		name: "scal",
		data() {
			return {
				calendarData: [{
						months: ['04', '11'],
						days: ['15'],
						things: '看电影'
					},
					{
						months: ['10', '11'],
						days: ['02'],
						things: '去公园野炊'
					},
					{
						months: ['11'],
						days: ['02'],
						things: '看星星'
					},
					{
						months: ['11'],
						days: ['02'],
						things: '看月亮'
					}
				],
				value: new Date(),
			}
		},

		components: {},
		created() {

		},
	};
</script>
<style scoped lang="scss">
	@import "src/plugins/px2vw";

	.calendar-day {
		text-align: center;
		color: #202535;
		line-height: 30px;
		font-size: 12px;
	}

	.is-selected {
		color: #F8A535;
		font-size: 10px;
		margin-top: 5px;
	}

	#calendar .el-button-group>.el-button:not(:first-child):not(:last-child):after {
		content: '当月';
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
