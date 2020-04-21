<template>
  <el-container>
   <admin-header></admin-header>
    <el-container>
      <el-aside class="aside">
        <el-row class="tac">
          <el-col :span="12">
            <h5 class="h5" @click="regetvideolist()">功能列表</h5>
            <el-menu
              :default-active="$route.path"
               router
              class="el-menu-vertical-demo"
              
              style="float:left；z-index：1000"
            >
              <el-menu-item index="/admin/video">视频管理</el-menu-item>
			   <!-- <el-menu-item index="/admin/home">仪表盘</el-menu-item> -->
              <el-menu-item index="/admin/teach">
                <span slot="title">课表管理</span>
              </el-menu-item>
              <el-menu-item index="/admin/user">
                <span slot="title">用户管理</span>
              </el-menu-item>
              <el-menu-item index="/admin/device">
                <span slot="title">设备管理</span>
              </el-menu-item>
                  <el-submenu index="1">
        <template slot="title">
          <span>校历及作息</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/admin/scal">校历管理</el-menu-item>
          <el-menu-item index="/admin/rest">作息管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
              <el-menu-item index="/admin/stati">
                <span slot="title">视频统计</span>
              </el-menu-item>
               
            </el-menu>
             <router-view class="adminer" ></router-view>
          </el-col>
        </el-row>
      </el-aside>

      <!-- <div class="main">
        <li><router-link  to="/admin/home" >商品</router-link></li>
         <router-view   name="admin" style="margin-left:250px"></router-view>
      </div> -->
    </el-container>
           
  </el-container>
  
</template>
<script>
import axios from "axios";
import adminHeader from "./common/admin-header";
import NavMenu from "./common/NavMenu";
export default {
  components: {
    adminHeader,
    NavMenu: NavMenu
  },
  data: function() {
    return {

     
      currentPage: 1, // 默认显示第几页
     
      activeIndex: "",
      
      pageNum: "1",
    
    };
  },

  methods: {
   
  },
  mounted(){
    // this.$router.push()
    let start = window.location.href.lastIndexOf('/');
    let path = window.location.href.slice(start+1);
    this.activeIndex = 'admin/'+path;
  }
};
</script>
<style scoped lang="scss">
@import "src/plugins/px2vw";
.blue {
  display: inline;
  
  position: relative;
  top: px2vw(130px);
  background-color: #39aeee;
  font-size: px2vw(14px);
}
.error {
  position: relative;
  text-align: center;
  top: 182px;
}
.main {
  background-color: #ffffff;
  width: px2vw(1050px);
  height: px2vw(850px);
  position: relative;

  top: px2vw(125px);
  margin-bottom: px2vw(90px);
}
.page {
   float: right;
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
.h5 {
	font-size: 20px;
  cursor: pointer;
  background: linear-gradient(
    -30deg,
    rgba(79, 172, 254, 1) 0%,
    rgba(0, 242, 254, 1) 100%
  );
  border-radius: 10px;
  margin: 0;
  height: px2vw(78px);
  line-height: px2vw(78px);
  text-align: center;
  color: white;
}
.aside {
  width: px2vw(614px) !important;
}
.tac {
  width: px2vw(321px);
  position: absolute;
  left: px2vw(273px);
  bottom: 0;
  top: px2vw(134px);
  z-index: 1;
  // overflow-y: scroll;
  // overflow-x: hidden;
  ul {
    overflow-y: auto;
        min-height: px2vw(700px);
  }
}
.el-col-12 {
  width: 100% !important;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>>