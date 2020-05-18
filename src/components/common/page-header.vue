<template>
  <div class="header">
    <img class="logo" @click="home" src="../img/logo.png" />
    <div class="home" @click="home">
      <img src="../img/home.png" />首页
    </div>
    <div class="search">
      <el-input
        placeholder="课程名称/教师/学科/年级"
        v-model="input3"
        class="input-with-select"
        @keyup.enter.native="search()"
      >
        <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
      </el-input>
    </div>
    <div class="peo" @click="user">
      <img src="../img/peo.png" />个人中心
    </div>
    <a>|</a>

    <div v-if="this.admin" class="set" @click="goadmin">
      <i class="el-icon-s-custom"></i>  管理员系统
    </div>

    <a v-if="this.admin">|</a>
    <div class="set" @click="quitid()">
      <img src="../img/set.png" />注销
    </div>
  </div>
</template>
<script>
export default {
  name: 'page-header',
  props: ['message1'],
  data: function() {
    return {
      input3: '',
      admin: false,
	  login: false,
    };
  },

  methods: {
    goadmin() {
      const routeUrl = this.$router.resolve({
        path: '/admin/video',

      });
      window.open(routeUrl .href, '_blank');
    },
    search() {
      if (this.input3.length == 0) {
        this.$message({
			  type: 'error',
			  message: '请输入搜索内容',
        });
      } else {
        const routeUrl = this.$router.resolve({
			     path: `/search/${this.input3}`,

        });
        window.open(routeUrl .href, '_blank');
      }
    },
    quitid() {
      this.$confirm('此操作将退出系统, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
          .then(() => {
            sessionStorage.clear();
            localStorage.removeItem('Flag'); // 清除保存的登陆状态
            this.$router.push(`/`);
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消',
            });
          });
    },
    user() {
      if (this.$route.path== '/collect') {
        history.go(0);
      } else {
        const routeUrl = this.$router.resolve({
			     path: '/collect',

        });
        window.open(routeUrl .href, '_blank');
			 // this.$router.push("/collect");
      }
    },
    home() {
      this.$router.push('/login');
    },
  },
  created() {
	  if (JSON.parse(sessionStorage.getItem('SESSION_USER')).roleId == 0) {
		  this.admin =true;
	  }

    if (this.message1 != undefined) {
      this.input3 = this.message1;
    }
  },
};
</script>
<style lang="scss" scoped>
@import "src/plugins/px2vw";
a {
  float: left;
  padding-top: px2vw(40px);
}
.peo {
  cursor: pointer;
  float: left;
  padding: px2vw(41px);
  color: #8b8b8b;
  font-size: px2vw(18px);
  // margin-left: px2vw(28px);
}
.set {
  cursor: pointer;
  float: left;
  padding: px2vw(41px);
  color: #8b8b8b;
  font-size: px2vw(18px);
}
.search {
  float: left;
  width: px2vw(692px);
  height: px2vw(55px);
  margin-top: px2vw(25px);
  margin-left: px2vw(54px);
}
.home img,
.set img,
.peo img {
  width: px2vw(18px);
  height: px2vw(19px);
  margin-right: px2vw(9px);
}
.home {
  cursor: pointer;
  margin-left: px2vw(16px);
  float: left;
  padding: px2vw(41px);
  font-size: px2vw(18px);
  color: #209cff;
}
.logo {
  margin-left: px2vw(273px);
  margin-top: px2vw(31px);
  height: px2vw(37px);
  width: px2vw(172px);
  float: left;
   cursor: pointer;
}
.header {
  position: absolute;
  top: 0;
  width: 100%;
  height: px2vw(100px);
  background-color: #f8f8f8;
  box-shadow: 0px -1px 20px 0px rgba(78, 78, 78, 0.44);
}
</style>
