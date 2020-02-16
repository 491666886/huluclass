<template>
  <div class="search">
    <page-header :message1="input"></page-header>

    <div class="main">
      <div class="dan">
        <el-radio-group v-model="radio1" class="line" @change="getValue">
          <div class="grate">学科:</div>
          <el-radio-button label>不限</el-radio-button>
          <el-radio-button label="数学"></el-radio-button>
          <el-radio-button label="语文"></el-radio-button>
          <el-radio-button label="英语"></el-radio-button>
          <el-radio-button label="物理"></el-radio-button>
          <el-radio-button label="化学"></el-radio-button>
          <el-radio-button label="生物"></el-radio-button>
          <el-radio-button label="政治"></el-radio-button>
          <el-radio-button label="历史"></el-radio-button>
          <el-radio-button label="地理"></el-radio-button>
          <el-radio-button label="信息技术"></el-radio-button>
          <el-radio-button label="通用技术"></el-radio-button>
          <el-radio-button label="音体美劳"></el-radio-button>
          <el-radio-button label="综合实践活动"></el-radio-button>
        </el-radio-group>
      </div>
      <div class="dan">
        <el-radio-group v-model="radio2" class="line" @change="getValue">
          <div class="grate1">年级:</div>
          <el-radio-button label border>不限</el-radio-button>
<el-radio-button label="高一上"></el-radio-button>
<el-radio-button label="高一下"></el-radio-button>
<el-radio-button label="高二上"></el-radio-button>
<el-radio-button label="高二下"></el-radio-button>
<el-radio-button label="高三上"></el-radio-button>
<el-radio-button label="高三下"></el-radio-button>

          <!-- <el-radio-button label="一年级上"></el-radio-button>
          <el-radio-button label="一年级下"></el-radio-button>
          <el-radio-button label="二年级上"></el-radio-button>
          <el-radio-button label="二年级下"></el-radio-button>
          <el-radio-button label="三年级上"></el-radio-button>
          <el-radio-button label="三年级下"></el-radio-button>
          <el-radio-button label="四年级上"></el-radio-button>
          <el-radio-button label="四年级下"></el-radio-button>
          <el-radio-button label="五年级上"></el-radio-button>
          <el-radio-button label="五年级下"></el-radio-button>
          <el-radio-button label="六年级上"></el-radio-button>
          <el-radio-button label="六年级下"></el-radio-button> -->
        </el-radio-group>
      </div>
      <div class="dan">
        <el-radio-group v-model="radio2" class="line">
          筛选条件：
          <el-select v-model="value" placeholder="选择教师" @change="getValue">
            <el-option
              v-for="item in options"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
          <el-date-picker v-model="year" type="year" placeholder="选择年"></el-date-picker>
        </el-radio-group>
      </div>
      <div v-if="videolist.length ===0" class="error">暂无关于 {{this.$route.params.id}} 的视频</div>
      <div
        class="videolist"
        v-for="video in videolist"
        :key="video.cId"
        @click="getDescribe(video.id)"
      >
        <img :src="'http://'+video.vSite" />
         <p>{{video.vName}}</p>
          <a>{{video.teacher}}</a>
          <b>{{video.cTime.split(" ")[0]}}</b>
          <br />
          <c>磁平台</c>
          <d>光平台</d>
        
      </div>
      <el-pagination
        class="page"
        layout="prev, pager, next"
        :page-size="12"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
        :total="parseInt(this.count)"
      ></el-pagination>
    </div>
    <page-footer></page-footer>
  </div>
</template>
<script>
import axios from "axios";
import searchHeader from "./common/search-header";
import pageHeader from "./common/page-header";
import pageFooter from "./common/page-footer";
export default {
  components: {
    pageHeader,
    searchHeader,
    pageFooter
  },
  data: function() {
    return {
      year: "",
      input: this.$route.params.id,
      value: "",
      radio1: "",
      radio2: "",
      count: "",
      options: [],
      currentPage: 1, // 默认显示第几页
      videolist: [],
      tableData: [],
      disabled: false,
      username: JSON.parse(sessionStorage.getItem("SESSION_USER")).name,
      loginId: JSON.parse(sessionStorage.getItem("SESSION_USER")).loginId
    };
  },
  methods: {
    getDescribe(id) {
      this.$router.push({
        path: `/describe/${id}`
      });
    },
    getValue() {
      this.getteacher();
      axios({
        headers: {
          "User-Info": JSON.parse(sessionStorage.getItem("SESSION_USER"))
            .loginId,
          Authorization: JSON.parse(sessionStorage.getItem("SESSION_USER"))
            .sessionId
        },
        method: "post",
        url: "/hlkt/resource/findSearchVideo..action",
        data: {
          pageNum: 1,
          pageSize: 15,
          search: this.$route.params.id,
          teacher: this.value,
          subjects: this.radio1,
          grade: this.radio2
        }
      }).then(res => {
        if (res.data.resultCode == "200") {
          this.count = res.data.resultLineNum;
          this.videolist = res.data.resultData;
          this.radio1 = res.data.cName;
          this.getteacher();
        } else {
          this.$message({
            type: "error",
            message: res.data.resultMsg
          });
        }
      });
    },

    getteacher() {
      axios({
        headers: {
          "User-Info": JSON.parse(sessionStorage.getItem("SESSION_USER"))
            .loginId,
          Authorization: JSON.parse(sessionStorage.getItem("SESSION_USER"))
            .sessionId
        },
        method: "post",
        url: "/hlkt/resource/findTeacher.action",
        data: {
          job: this.radio1
        }
      }).then(res => {
        if (res.data.resultCode == "200") {
          this.count = res.data.resultLineNum;
          this.options = res.data.resultData;
          console.log(this.options);
        } else {
          // this.$message({
          //   type: "error",
          //   message: res.data.resultMsg
          // });
        }
      });
    },
    search() {
      //高级搜索进入页面执行和点击搜索按键
      console.log(this.$route.params.id);
      axios({
        headers: {
          "User-Info": JSON.parse(sessionStorage.getItem("SESSION_USER"))
            .loginId,
          Authorization: JSON.parse(sessionStorage.getItem("SESSION_USER"))
            .sessionId
        },
        method: "post",
        url: "/hlkt/resource/findSearchVideo..action",
        data: {
          pageNum: 1,
          pageSize: 15,
          search: this.$route.params.id
          //    teacher: this.value,
          // subjects: this.radio1,
          // grade: this.radio2
        }
      }).then(res => {
        if (res.data.resultCode == "200") {
          this.count = res.data.resultLineNum;
          this.videolist = res.data.resultData;
          this.radio1 = res.data.cName;
          this.getteacher();
        } else {
          this.videolist = [];
        }
      });
    },
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val;
      // 切换页码时，要获取每页显示的条数
      this.getuserlist(this.PageSize, val * this.pageSize);
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        this.radio1 = "";
        this.radio2 = "";
        this.search();
      },
      // 深度观察监听
      deep: true
    }
  },
  created() {
    this.getteacher();
    this.search();
  }
};
</script>
<style scoped lang="scss">
@import "src/plugins/px2vw";
.error {
  position: relative;
  text-align: center;
  top: 182px;
}
.grate {
  height: px2vw(80px);

  line-height: px2vw(80px);
  float: left;
}
.grate1 {
  line-height: px2vw(40px);
  float: left;
}

.el-radio-button {
  margin: 0 px2vw(24px);
}

.line {
  font-size: px2vw(20px);
}
.dan {
  border-bottom: 1px solid #e5e5e5;
  padding: px2vw(10px) 0;
}
.page {
  float: right;
  margin-right: 10%;
  position: relative;
  top: px2vw(770px);
}
.det {
  width: px2vw(1296px);
  padding: px2vw(143px) px2vw(300px);
  p {
    color: #999999;
    font-size: px2vw(14px);

    font-weight: 400;
  }
  b {
    color: #666666;
    font-size: px2vw(24px);
    font-weight: bold;
  }
  dd {
    color: #999999;
    font-size: px2vw(14px);
    margin-left: 30px;
    font-weight: 400;
    display: inline;
  }
}
.videolist {
  float: left;
  margin-left: px2vw(21px);
  margin-top: px2vw(21px);
  width: px2vw(233px);
  height: px2vw(233px);
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
  c {
    font-size: px2vw(14px);
    color: #ff9154;
    border: 1px solid rgba(255, 145, 84, 1);
    border-radius: 4px;
    margin: px2vw(9px) ;
    display: inline-block;
    // margin-left: px2vw(9px);
    padding: px2vw(4px);
  }
  d{
     font-size: px2vw(14px);
    color: #4CA4EF;
    border: 1px solid #4CA4EF;
    border-radius: 4px;
    margin: px2vw(9px) ;
    display: inline-block;
    
    padding: px2vw(4px);
  }
}
.videolist img {
  width: px2vw(232px);
  height: px2vw(132px);
  overflow: hidden;
}
.main {
  background-color: #ffffff;
  width: px2vw(1296px);
  height: px2vw(1100px);
  position: relative;
  left: px2vw(300px);
  top: px2vw(125px);
  margin-bottom: px2vw(90px);
}
.search {
  background-color: white;
  height: 150vh;
}
</style>
<style lang="less" scoped>
/deep/ .el-radio-button__inner {
  border: none !important;
}
</style>