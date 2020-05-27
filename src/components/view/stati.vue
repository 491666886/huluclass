<template>
  <div>
    <div>
      <div class="head">视频统计</div>

    </div>

    <div class="main"></div>
    <div class="table">
		<div>空间总量：{{totalStorage}}{{storageUnit}}</div>
		<div>已用内存：{{currentStorage}}{{storageUnit}}</div>
			<div>剩余容量：{{totalStorage-currentStorage}}{{storageUnit}}</div>
		</div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
export default {
  name: 'stati',
  data() {
    return {
      currentStorage: '',
      totalStorage: '',
      storageUnit: ''
    }
  },

  components: {},
  methods: {
    getstati() {
      axios({
        headers: {
          'User-Info': JSON.parse(sessionStorage.getItem('SESSION_USER'))
            .loginId,
          'Authorization': JSON.parse(sessionStorage.getItem('SESSION_USER'))
            .sessionId
        },
        method: 'get',
        url:
          '/hlkt/admin/videoOpt/getStorage/' +
          JSON.parse(sessionStorage.getItem('SESSION_USER')).sid +
          '.action'
      }).then((res) => {
        if (res.data.resultCode == '200') {
          this.currentStorage = res.data.resultData.currentStorage
          this.totalStorage = res.data.resultData.totalStorage
          this.storageUnit = res.data.resultData.storageUnit
        } else {
          // this.$message({
          //   type: "error",
          //   message: res.data.resultMsg
          // });
        }
      })
    }
  },
  created() {
    this.getstati()
  }
}
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

.adminer {
  width: px2vw(1050px);
  height: px2vw(778px);
  margin-left: px2vw(350px);
  position: absolute;
  top: 0px;
}
</style>
