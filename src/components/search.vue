<template>
  <div class="search">
    <search-header :message1="input"  v-if="update"></search-header>

    <div class="main">
      <div class="dan">
        <el-radio-group v-model="radio1" class="line" @change="getValue">
          <div class="grate">学科:</div>
          <el-radio-button label='' >不限</el-radio-button>
          <el-radio-button :label="item.subjects"  :key="item.subjects"  v-for="item in subjects"></el-radio-button>
        </el-radio-group>
      </div>

      <div class="dan">
        <el-radio-group v-model="radio2" class="line" @change="getValue">
          <div class="grate1">年级:</div>
          <el-radio-button label border>不限</el-radio-button>
          <el-radio-button :label="items.subjects" :key="items.subjects" v-for="items in grades"></el-radio-button>
        </el-radio-group>
      </div>
      
      <div class="dan">
        <el-radio-group v-model="radio2" class="line">
          筛选条件：
          <el-select v-model="value" placeholder="选择教师" @change="getValue">
            <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
          <el-select v-model="year" placeholder="选择年份" @change="getValue">
            <el-option
              v-for="item in years"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-radio-group>
		<div class="button">
			<el-button class="add" size="small" type="primary" @click='retry()'>重置</el-button>
		</div>
      </div>
      <div v-if="videolist.length ===0" class="error">该选项下暂无视频</div>
      <div
        class="videolist"
        v-for="video in videolist"
        :key="video.d"
       
      >
        <img :src="'http://'+video.site"  @click="getDescribe(video.id)" />

          <p  @click="getDescribe(video.id)" >{{video.name}}</p>
          <a  @click="getDescribe(video.id)" >{{video.teacherId}}</a>
          <b  @click="getDescribe(video.id)" >{{video.creationTime.split(" ")[0]}}</b>
        <br />
        <div class="c">
          <img src="./img/ci.png" />
        </div>
        <div class="d">
          <img src="./img/guang.png" />
        </div>
      </div>
      <el-pagination
      hide-on-single-pagemessage1
        class="page"
          layout="total, prev, pager, next"
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
      years: [
        {
          value: "2019",
          label: "2019"
        },
        {
          value: "2020",
          label: "2020"
        }
      ],
    
      year: '',
      input: this.$route.params.id,
      update: true,//搜索组件刷新
      value: "",
      radio1: "",
      subjects: [],
      radio2: "",
      grades: [],
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
	  retry() {
          this.radio1='';
		  this.radio2='';
		  this.search();
        },
      reload() {
            // 移除组件
            this.update = false
            // 在组件移除后，重新渲染组件
            // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
            this.$nextTick(() => {
                this.update = true
            })
        },
    getsubgect() {
      axios({
        headers: {
          "User-Info": JSON.parse(sessionStorage.getItem("SESSION_USER"))
            .loginId,
          Authorization: JSON.parse(sessionStorage.getItem("SESSION_USER"))
            .sessionId
        },
        method: "post",
        url: "/hlkt/resource/findStairNavigation.action",
        data: {
          sid: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid
        }
      }).then(res => {
        if (res.data.resultCode == "200") {
          (this.subjects = res.data.resultData), console.log(this.subjects);
        } else {
        }
      });
      axios({
        headers: {
          "User-Info": JSON.parse(sessionStorage.getItem("SESSION_USER"))
            .loginId,
          Authorization: JSON.parse(sessionStorage.getItem("SESSION_USER"))
            .sessionId
        },
        method: "post",
        url: "/hlkt/resource/findSecondNavigation.action",
        data: {
          sid: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid,
          subjects: this.radio1
        }
      }).then(res => {
        if (res.data.resultCode == "200") {
          this.grades = res.data.resultData;
        } else {
        }
      });
    },
    getDescribe(id) {
      this.$router.push({
        path: `/describe/${id}`
      });
    },
    getValue() {
      this.getteacher();
      // if(this.$route.params.id=)
      axios({
        headers: {
          "User-Info": JSON.parse(sessionStorage.getItem("SESSION_USER"))
            .loginId,
          Authorization: JSON.parse(sessionStorage.getItem("SESSION_USER"))
            .sessionId
        },
        method: "post",
        url: "/hlkt/api/v1/user/search/videos.action",
        data: {
          year: Number(this.year) ,
          pageNum: 1,
          pageSize: 15,
          keywords: this.$route.params.id,
          teacher: this.value,
          curriculum: this.radio1,
          sid: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid,
          nj: this.radio2
        }
      }).then(res => {
        if (res.data.resultCode == "200") {
          this.count = res.data.resultData.total;

          this.videolist = res.data.resultData.list;
          this.getteacher();
        } else {
          this.videolist = [];
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
          job: this.radio1,
          sid: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid
        }
      }).then(res => {
        if (res.data.resultCode == "200") {
         
          this.options = res.data.resultData;
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
        url: "/hlkt/api/v1/user/search/videos.action",
        data: {
         year: Number(this.year),
          pageNum: 1,
          pageSize: 15,
          keywords: this.$route.params.id,  
          sid: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid
          //    teacher: this.value,
          // subjects: this.radio1,
          // grade: this.radio2
        }
      }).then(res => {
        if (res.data.resultCode == "200") {
        this.count = res.data.resultData.total;
        
        this.videolist = res.data.resultData.list;
          this.getteacher();
          // if (res.data.cName != "") {
          //   //判断搜索结果是否返回学科  true是
           
            // this.radio1 = res.data.cName;
            // this.$route.params.id = "";
            // this.input ='';
            this.reload();
          // }
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
    this.getsubgect();
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
.button {
			margin-top: px2vw(5px);
			margin-left: px2vw(12px);
			width: px2vw(63px);
			height: px2vw(35px);
			    float: right;
			margin-right: px2vw(400px);	
		}
</style>
<style lang="less" scoped>
/deep/ .el-radio-button__inner {
  border: none !important;
}
</style>