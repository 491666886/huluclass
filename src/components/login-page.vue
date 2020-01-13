<template>
  <el-container>
    <page-header></page-header>
    <el-container>
      <el-aside class="aside">
        <el-row class="tac">
          <el-col :span="12">
            <h5 class="h5">教学视频资源</h5>
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              @select="handleselect"
              style="min-height:70vh;float:left;width: 100%;"
            >
              <NavMenu :navMenus="menuData"></NavMenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>

      <el-main>
        <div class="videolist" v-for="video in videolist" :key="video.cId">
          <img src="./img/admin.png" />
          <p>{{video.vName}}</p>
          <a>{{video.teacher}} I</a>
          <b>{{video.endTime}}</b>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import axios from "axios";
import pageHeader from "./common/page-header";
import NavMenu from "./common/NavMenu";
export default {
  components: {
    pageHeader,
    NavMenu: NavMenu
  },
  data: function() {
    return {
      tableData: [],
      activeIndex: "aa",
      videolist:[],
      subjects:'',
      grade:'',
      menuData: [
        {
          //一级
          entity: {
            id: 0,
            name: "数学",
            icon: "el-icon-message",
            alias: "一级菜单"
          }
        },
        {
          //一级
          entity: {
            id: 1,
            name: "语文",
            icon: "el-icon-message",
            alias: "语文"
          },
          //二级
          childs: [
            {
              entity: {
                id: 3,
                name: "2年级",
                icon: "el-icon-loading",
                alias: "2222"
              }
            },
            {
              entity: {
                id: 4,
                name: "1年级",
                icon: "el-icon-bell",
                alias: "语文1年级"
              }
            },
            {
              entity: {
                id: 2,
                name: "menuManage",
                icon: "el-icon-edit",
                alias: "菜单管理",
                value: "/system/menu"
              }
            },
            {
              entity: {
                id: 5,
                name: "groupManage",
                icon: "el-icon-mobile-phone\r\n",
                alias: "分组管理",
                value: "/system/group"
              }
            }
          ]
        },
        {
          //一级
          entity: {
            id: 6,
            name: "userManage",
            icon: "el-icon-news",
            alias: "三级菜单"
          },
          //二级
          childs: [
            {
              entity: {
                id: 7,
                name: "accountManage",
                icon: "el-icon-phone-outline\r\n",
                alias: "帐号管理",
                value: ""
              },
              //三级
              childs: [
                {
                  entity: {
                    id: 14,
                    name: "emailManage",
                    icon: "el-icon-sold-out\r\n",
                    alias: "邮箱管理",
                    value: "/content/email"
                  }
                },
                {
                  entity: {
                    id: 13,
                    name: "passManage",
                    icon: "el-icon-service\r\n",
                    alias: "密码管理",
                    value: "/content/pass"
                  }
                }
              ]
            },
            {
              entity: {
                id: 8,
                name: "integralManage",
                icon: "el-icon-picture",
                alias: "积分管理",

                value: "/user/integral"
              }
            }
          ]
        },
        {
          //一级
          entity: {
            id: 40,

            name: "contentManage",
            icon: "el-icon-rank",
            alias: "四级菜单"
          },
          //er级
          childs: [
            {
              entity: {
                id: 41,
                name: "classifyManage2",
                icon: "el-icon-printer",
                alias: "分类管理"
              },
              //三级
              childs: [
                {
                  entity: {
                    id: 42,
                    name: "classifyManage3",
                    icon: "el-icon-printer",
                    alias: "分类管理"
                  },
                  //四级
                  childs: [
                    {
                      entity: {
                        id: 43,
                        name: "classifyManage4",
                        icon: "el-icon-printer",
                        alias: "分类管理",
                        value: "/content/classify"
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };
  },

  methods: {
    getItem(){
      axios({
        headers: {
        
        },
        method: "get",
        url:
          "/hlkt/resource/findMenusTree.action",
          data: {

}
      }).then(res => {
        if (res.data.resultCode == "200") {
          this.videolist = res.data.resultData;
              console.log(this.videolist)
        }else{
          this.$message({
            type: "error",
            message: res.data.resultMsg
          });
        }
      });
    
    },
    handleOpen(key, keyPath) {
       console.log(keyPath[0]);
       this.subjects =keyPath[0];
       this.getvideolist()
    },
    handleClose(key, keyPath) {},
    handleselect(key, keyPath) {
      console.log(keyPath[0]);
      this.grade =keyPath[1];
      this.getvideolist()
    },
    getvideolist(){
  axios({
        headers: {
          "User-Info":  JSON.parse(sessionStorage.getItem("SESSION_USER")).loginId,
          "Authorization":JSON.parse(sessionStorage.getItem("SESSION_USER")).sessionId,
        },
        method: "post",
        url:
          "/hlkt/resource/findSearchVideo.action",
          data: {
      
      subjects:this.subjects,
       grade:this.grade,
}
      }).then(res => {
        if (res.data.resultCode == "200") {
          this.videolist = res.data.resultData;
              console.log(this.videolist)
        }else{
          this.$message({
            type: "error",
            message: res.data.resultMsg
          });
        }
      });
    },
  },
  mounted(){
    this.getvideolist();
    this.getItem();
  }
};
</script>
<style scoped lang="scss">
@import "src/plugins/px2vw";

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
  height: px2vw(233px);
  box-shadow: 0px 2px 10px 0px rgba(78, 78, 78, 0.21);
  border-radius: 6px;
  p {
    margin: 0;
    padding: px2vw(19px);
    font-size: px2vw(18px);
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    overflow: hidden;
  }
  a {
    font-size: px2vw(13px);
    padding-left: px2vw(19px);
  }
  b {
    font-size: px2vw(10px);
    font-weight: 400;
  }
}
.h5 {
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
  overflow-x: hidden;
}
.el-col-12 {
  width: 100% !important;
}
.el-main {
  background-color: #ffffff;
  color: #333;
  position: relative;
  top: px2vw(134px);
  padding: 0;
  min-height: 100px;
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