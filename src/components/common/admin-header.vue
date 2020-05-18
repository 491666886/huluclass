<template>
  <div class="header">
    <img class="logo" @click="home" src="../img/logo.png" />
    <div class="home" >
      管理员系统
    </div>
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
      admin: true,
    };
  },
  methods: {
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
      const routeUrl = this.$router.resolve({
        path: '/collect',

      });
      window.open(routeUrl .href, '_blank');
      // this.$router.push("/collect");
    },
    home() {
      this.$router.push('/login');
    },
  },
  created() {
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
  margin-left: px2vw(28px);
}
.set {
  cursor: pointer;
  float: right;
  margin-right: 70px;
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

  margin-left: px2vw(16px);
  float: left;
  padding: px2vw(41px);
  font-size: px2vw(18px);
  color: #666666;
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
