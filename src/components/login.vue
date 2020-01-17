<template>
  <div class="body-bg">
    <div class="main">
      <div class="title">葫芦课堂</div>
      <div class="remark">校本资源助力教师成长</div>
      <div class="tit">工号</div>
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        label-width="0px"
        class="login-form"
      >
        <el-form-item prop="username">
          <el-input
            size="large"
            type="text"
            v-model="loginForm.username"
            class="login-form-line-input"
            @input="replaceSpace('username')"
          ></el-input>
        </el-form-item>
        <div class="tit">密码</div>
        <el-form-item prop="password">
          <el-input
            size="large"
            type="password"
            v-model="loginForm.password"
            @keyup.enter.native="submitForm('loginForm')"
            class="login-form-line-input"
            @input="replaceSpace('password')"
          ></el-input>
        </el-form-item>
        <div id="login-error" class="login-error" v-if="showerror">
          <div class="login-error-msg">{{loginerror}}</div>
        </div>
        <div class="login-btn">
          <el-button
            size="large"
            :loading="loading"
            type="primary"
            @click="submitForm('loginForm')"
          >登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "login",

  data: function() {
    return {
      showerror: false,
      loading: false,
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入工号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    replaceSpace(key) {
      this.loginForm[key] = this.loginForm[key].replace(/\s/g, "");
    },
    submitForm(formName) {
      this.showerror = false;
      this.loading = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login();
        } else {
          this.loading = false;
        }
      });
    },
    login() {
      axios({
        headers: {
          "Content-Type": "application/json",
          "User-Info": encodeURI(this.loginForm.username)
        },
        method: "post",
        url: "/hlkt/user/login.action",
        data: {
          loginId: this.loginForm.username,
          password: this.loginForm.password
        }
      })
        .then(res => {
          if (res.data.resultCode == "200") {
            this.loading = false;
            sessionStorage.setItem(
              "SESSION_USER",
              JSON.stringify(res.data.resultData)
            );
            sessionStorage.setItem("isLogin", true);
            this.$store.dispatch("userLogin", true);
            localStorage.setItem("Flag", "isLogin"); //储存登陆信息
            this.$router.push("/login");
          } else {
            this.loginerror = res.data.resultMsg;
            this.showerror = true;
            this.loading = false;
          }
        })
        .catch(err => {
          this.loading = false;
          this.$message({
            type: "error",
            message: err
          });
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "src/plugins/px2vw";
.login-error-msg {
  color: red;
}
.tit {
  color: #767cf6;
  font-size: px2vw(16px);
}
.login-form {
  // position: relative;
  width: px2vw(395px);
  //    margin: auto;
  .login-form-line-input::v-deep input {
    border-radius: 0;
    border: none;
    border-bottom: solid #979797 1px;
    padding: px2vw(8px) 0;
    height: px2vw(56px);
    line-height: px2vw(56px);
    &:focus {
      border-bottom: solid #2d66fa 1px;
      box-shadow: 0 px2vw(1px) 0 #2d66fa;
    }
  }
  .ccap-img {
    overflow: hidden;
    height: px2vw(82px);
    & > img {
      display: block;
      margin-top: px2vw(20.5px);
      width: px2vw(103px);
      height: px2vw(41px);
      float: left;
      cursor: pointer;
    }
    & > div {
      margin-top: px2vw(30px);
      text-align: right;
      user-select: none;
      float: right;
      width: px2vw(180px);
      height: px2vw(22px);
      font-size: px2vw(16px);
      font-weight: 400;
      color: rgba(160, 160, 160, 1);
      line-height: px2vw(22px);
      & > span {
        color: #2d66fa;
        cursor: pointer;
      }
    }
  }
  .login-btn {
    button {
      // position: absolute;
      // bottom: px2vw(92px);
      margin-top: px2vw(20px);
      width: px2vw(194.4px);
      padding: px2vw(12px) px2vw(20px);
      font-size: px2vw(16px);
      height: px2vw(41px);
      background: linear-gradient(
        0deg,
        rgba(131, 169, 255, 1),
        rgba(138, 131, 255, 1)
      );
      box-shadow: 0px 10px 10px 0px rgba(150, 166, 204, 0.53),
        0px 2px 0px 0px rgba(212, 217, 255, 0.66);
      border-radius: 5px;
    }
  }
}
.remark {
  color: #8f94ff;
  font-size: px2vw(18px);
  margin-bottom: px2vw(50px);
}
.title {
  color: #767cf6;
  font-size: px2vw(43px);
  font-weight: bold;
  margin-bottom: px2vw(13px);
}
.body-bg {
  width: 100%;
  height: px2vw(1080px);
  background-image: url(./img/backg.png);
  background-size: 100%;
  overflow-x: hidden;
}
.main {
  position: relative;
  left: px2vw(1128px);
  top: px2vw(336px);
  width: px2vw(400px);
}
</style>