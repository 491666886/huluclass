<template>
  <div class="header">
    <img class="logo" src="../img/logo.png" />
    <div class="home" @click="home">
      <img src="../img/home.png" />首页
    </div>
    <div class="search">
      <el-input
        placeholder="知识点/教师/学科/年级 例:公顷"
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
    <div class="set" @click="quitid()">
      <img src="../img/set.png" />注销
    </div>
  </div>
</template>
<script>
export default {
  name: "page-header",
  props: ["message1"],
  data: function() {
    return {
      input3: ""
    };
  },
  methods: {
    search() {
      this.$router.push({
        path: `/search/${this.input3}`
      });
    },
    quitid() {
      sessionStorage.clear();
      localStorage.removeItem("Flag"); //清除保存的登陆状态
      this.$router.push(`/`);
    },
    user() {
      this.$router.push("/admin");
    },
    home() {
      this.$router.push("/login");
    }
  },
  created() {
    if (this.message1 != undefined) {
      this.input3 = this.message1;
    }
  }
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
  float: left;
  padding: px2vw(41px);
  color: #8b8b8b;
  font-size: px2vw(18px);
}
.search {
  float: left;
  width: px2vw(692px);
  height: px2vw(55px);
  margin-top: px2vw(22px);
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