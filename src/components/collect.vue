<template>
  <div class="index">
    <page-header></page-header>
    <div class="admin">
      <div class="icon">
        <img src="./img/touxiang.png" />
        您好，{{username}}老师
        <p>账号：{{loginId}}</p>
      </div>
    </div>
    <div class="main">
      <div class="mine">
        <h1 @click="retry()" >我的收藏</h1>
        <el-input
          placeholder="在此搜索您收藏的内容"
          v-model="input3"
          class="input-with-select"
          @keyup.enter.native="search()"
        >
          <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
        </el-input>
      </div>
      <div v-if="videolist.length ===0" class="error">该选项下暂无视频</div>
      <div class="videolist" v-for="video in videolist" :key="video.id">
        <img :src="'http://'+video.site" @click="getDescribe(video.id)" />

        <p @click="getDescribe(video.vId)">{{video.name}}</p>
        <a @click="getDescribe(video.vId)">{{video.teacherId}}</a>
        <b @click="getDescribe(video.vId)">{{video.creationTime.split(" ")[0]}}</b>

        <br />
        <div class="c">
          <img src="./img/ci.png" />
        </div>
        <div class="d">
          <img src="./img/guang.png" />
        </div>
      </div>
    </div>
    <el-pagination
      hide-on-single-page
      class="page"
        layout="total, prev, pager, next"
      :page-size="12"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
      :total="parseInt(this.count)"
    ></el-pagination>
    <page-footer></page-footer>
  </div>
</template>
<script>
import axios from 'axios'
import pageHeader from './common/page-header'
import pageFooter from './common/page-footer'
export default {
  components: {
    pageHeader,
    pageFooter
  },
  data: function() {
    return {
      videolist: [],
      currentPage: 1, // 默认显示第几页
      count: '',
      tableData: [],
      input3: '',
      username: JSON.parse(sessionStorage.getItem('SESSION_USER')).name,
      loginId: JSON.parse(sessionStorage.getItem('SESSION_USER')).loginId
    }
  },

  methods: {
    retry() {
      this.input3 = ''
      this.getvideolist()
    },
    serchlist(vap) {
      // 改变页数
      this.currentPage = vap
      this.getvideolist()
    },
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val
      // 切换页码时，要获取每页显示的条数
      this.getvideolist(this.PageSize, val * this.pageSize)
    },
    search() {
      axios({
        headers: {
          'User-Info': JSON.parse(sessionStorage.getItem('SESSION_USER'))
            .loginId,
          'Authorization': JSON.parse(sessionStorage.getItem('SESSION_USER'))
            .sessionId
        },
        method: 'post',
        url: '/hlkt/api/v1/user/search/collect/videos.action',
        data: {
          pageSize: 12,
          pageNum: 1,
          uid: Number(JSON.parse(sessionStorage.getItem('SESSION_USER')).userId),
          sid: JSON.parse(sessionStorage.getItem('SESSION_USER')).sid,
          keywords: this.input3
        }
      }).then((res) => {
        if (res.data.resultCode == '200') {
          this.count = res.data.resultData.total
          this.videolist = res.data.resultData.list
        } else {
          this.videolist = []
        }
      })
    },

    getDescribe(id) {
      const routeUrl = this.$router.resolve({
        path: `/describe/${id}`
      })
      window.open(routeUrl.href, '_blank')
    },
    getvideolist() {
      axios({
        headers: {
          'User-Info': JSON.parse(sessionStorage.getItem('SESSION_USER'))
            .loginId,
          'Authorization': JSON.parse(sessionStorage.getItem('SESSION_USER'))
            .sessionId
        },
        method: 'post',
        url: '/hlkt/api/v1/user/videos.action',
        data: {
          pageSize: 12,
          pageNum: this.currentPage,
          uid: JSON.parse(sessionStorage.getItem('SESSION_USER')).userId
          // sid: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid
        }
      }).then((res) => {
        if (res.data.resultCode == '200') {
          this.count = res.data.resultData.total
          this.videolist = res.data.resultData.list
        } else {
          this.videolist = []
        }
      })
    }
  },
  mounted() {
    this.getvideolist()
  }
}
</script>
<style scoped lang="scss">
@import "src/plugins/px2vw";
h1{
	cursor: pointer;
}
.page {
  position: absolute;

  left: 70%;
}
.mine {
  background-color: #f5f5f5;
  display: flow-root;
  h1 {
    float: left;
    font-size: px2vw(36px);
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(72, 71, 71, 1);
  }
  .input-with-select {
    width: px2vw(343px);
    float: right;
    margin-top: px2vw(20px);
  }
}

.error {
  position: relative;
  text-align: center;
  top: 182px;
}
.videolist img {
  width: px2vw(232px);
  height: px2vw(132px);
  overflow: hidden;
}
.videolist {
  float: left;
  margin-left: px2vw(21px);
  margin-top: px2vw(21px);
  width: px2vw(233px);
  height: px2vw(243px);
  box-shadow: 0px 2px 10px 0px rgba(78, 78, 78, 0.21);
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  .corner {
    width: 45px;
    height: 30px;
    position: absolute;
    left: 243px;
    bottom: 102px;
  }
  p {
    margin: 0;
    padding: px2vw(9px);
    font-size: px2vw(20px);
    line-height: px2vw(19px);
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  a {
    white-space: nowrap;
    font-size: px2vw(16px);
    line-height: px2vw(16px);
    padding: 0 px2vw(9px);
    border-right: #666666 1px solid;
  }
  b {
    white-space: nowrap;
    font-size: px2vw(14px);
    font-weight: 400;
    padding-left: px2vw(13px);
  }
  .c {
    img {
      width: px2vw(20px);
      height: px2vw(20px);
    }
    font-size: px2vw(14px);
    color: #ff9154;

    margin: px2vw(9px);
    display: inline-block;
    // margin-left: px2vw(9px);
    padding: px2vw(4px);
  }
  .d {
    img {
      width: px2vw(20px);
      height: px2vw(20px);
    }
    font-size: px2vw(14px);
    color: #4ca4ef;

    margin: px2vw(9px);
    display: inline-block;

    padding: px2vw(4px);
  }
}
.main {
  background-color: #ffffff;
  width: px2vw(1050px);
  height: px2vw(966px);
  position: relative;
  left: px2vw(609px);
  top: px2vw(125px);
  margin-bottom: px2vw(90px);
}
.index {
  height: 100vh;
}
.bottom {
  width: px2vw(1920px);
  height: px2vw(166px);
  bottom: 0;
  position: fixed;
}
.my {
  height: px2vw(61px) !important;
  width: px2vw(260px) !important;
  background-image: url(./img/back1.png) !important;
  background-size: 100% 100% !important;
  color: #ffffff;
  text-align: left;
}
.quit {
  height: px2vw(61px) !important;
  width: px2vw(260px) !important;
  background-color: #ffffff;
  color: #209cff;
  text-align: left;
  margin-left: 0 !important;
}
.collo {
  height: px2vw(384px);
  background-color: #ffffff;
}
.admin {
  width: px2vw(260px);
  position: absolute;
  left: px2vw(333px);
  top: px2vw(125px);
  bottom: 0;
  text-align: center;
}
.icon {
  height: px2vw(966px);
  background-image: url(./img/admin.png);
  background-size: 100%;
  font-size: px2vw(20px);
  font-weight: 800;
  color: rgba(255, 255, 255, 1);
}
.icon img {
  width: px2vw(108px);
  height: px2vw(108px);
  padding: px2vw(70px) px2vw(70px) px2vw(35px) px2vw(70px);
}
.icon p {
  font-size: px2vw(15px);
}
</style>
