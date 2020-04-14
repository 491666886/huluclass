<template>
  <div>
    <div>
      <div class="head">视频列表</div>
      <el-button class="add" size="small" type="primary" @click="dialogFormVisible = true">+上传视频</el-button>
    </div>

    <div class="main">
      <a>筛选条件： 科目</a>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <a>年级</a>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <a>教师</a>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <a>录制日期</a>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <div class="button">
        <el-button class="add" size="small" type="primary">搜索</el-button>
      </div>
    </div>
    <div class="table">
      <el-table :data="tableData" border height="600">
        <el-table-column type="index" label="序号" width="60" h></el-table-column>
        <el-table-column prop="vName" label="名称" width="230"></el-table-column>
        <el-table-column prop="teacher" label="教师" width="130"></el-table-column>

        <el-table-column prop="subjects" label="科目" width="130"></el-table-column>
        <el-table-column prop="grade" label="班级" width="130"></el-table-column>
        <el-table-column label="录制日期">
          <template scope="scope">
            <p>{{ scope.row.cTime.split(" ")[0]}}</p>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="管理" width="120">
          <template slot-scope="scope">
            <el-button @click="showedit(scope.row)" type="text" size="small">编辑</el-button>
            <!--          <el-button @click="dele(scope.row)" type="text" size="small">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
        <div class="page">
      <el-pagination
        :hide-on-single-page="true"
        class="page"
        layout="prev, pager, next"
        :page-size="10"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
        :total="parseInt(this.count)"
      ></el-pagination>
    </div>
    </div>
  
    <el-dialog title="编辑视频" :visible.sync="dialogFormVisible1" :modal-append-to-body="false">
      <el-form :model="form">
        <img class="videoimg" src="../img/back1.png" />
        <div style="margin-bottom: 17px;">
          <!-- <a class="left"> 科目</a> -->
          <el-form-item label="科目" prop="region" :required="true">
            <el-select v-model="value" placeholder="请选择" style="width: 372px;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>

        <div style="float: left;margin-left: 50px;width: 230px;">
          <el-form-item label="年级" prop="region" :required="true">
            <el-select v-model="value" :required="true" placeholder="请选择" style="width: 140px;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div style="float: left;margin-left: 50px;width: 230px;">
          <el-form-item label="单元" prop="region" :required="true">
            <el-select v-model="value" :required="true" placeholder="请选择" style="width: 140px;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div style="float: left;margin-left: 50px;width: 230px;">
          <el-form-item label="小节" prop="region" :required="true">
            <el-select v-model="value" :required="true" placeholder="请选择" style="width: 140px;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>

        <el-form-item class="input" :required="true" label="课时名称" :label-width="formLabelWidth">
          <el-input style="width: 400px;" v-model="form.loginId" autocomplete="off"></el-input>
        </el-form-item>
        <div style="float: left;margin-left: 90px;width: 310px;">
          <el-form-item label="教师" prop="region" :required="true">
            <el-select v-model="value" :required="true" placeholder="请选择" style="width: 140px;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>

        <div class="class">
          <el-form-item label="录制时间" prop="region" :required="true">
            <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1= false">取消编辑</el-button>
        <el-button type="primary" @click="edit()">保存修改</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增视频" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
      <div class="album albumvideo">
        <div>
          <p class="type_title">
            <span>视频介绍</span>
          </p>
          <div class="pic_img">
            <div class="pic_img_box">
              <el-upload
                class="avatar-uploader"
                action="/hlkt/admin/upload/video.action"
                :headers="myHeaders"
                v-bind:data="{FoldPath:'上传目录',SecretKey:'安全验证'}"
                v-bind:on-progress="uploadVideoProcess"
                v-bind:on-success="handleVideoSuccess"
                v-bind:before-upload="beforeUploadVideo"
                v-bind:show-file-list="false"
              >
                <video
                  v-if="videoForm.showVideoPath !='' && !videoFlag"
                  v-bind:src="videoForm.showVideoPath"
                  class="avatar video-avatar"
                  controls="controls"
                >您的浏览器不支持视频播放</video>
                <i
                  v-else-if="videoForm.showVideoPath =='' && !videoFlag"
                  class="el-icon-plus avatar-uploader-icon"
                ></i>
                <el-progress
                  v-if="videoFlag == true"
                  type="circle"
                  v-bind:percentage="videoUploadPercent"
                  style="margin-top:7px;"
                ></el-progress>
              </el-upload>
            </div>
          </div>
        </div>
        <p class="Upload_pictures">
          <span></span>
          <span>最多可以上传1个视频，建议大小50M，推荐格式mp4</span>
        </p>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
var sessionId = JSON.parse(sessionStorage.getItem("SESSION_USER")).sessionId;
var UserInfo = JSON.parse(sessionStorage.getItem("SESSION_USER")).loginId;
export default {
  name: "videodetail",
  data() {
    return {
      myHeaders: { Authorization: sessionId, "User-Info": UserInfo },
      videoFlag: false,
      //是否显示进度条
      videoUploadPercent: "",
      //进度条的进度，
      isShowUploadVideo: false,
      //显示上传按钮
      videoForm: {
        showVideoPath: ""
      },
      formLabelWidth: "120px",
      form: {
        remark: "",
        loginId: "",
        password: "",
        job: "语文",
        name: "",
        roleId: "1"
      },
      dialogFormVisible: false,
      dialogFormVisible1: false,
      count: "",
      currentPage: 1, // 默认显示第几页
      value1: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      tableData: []
    };
  },

  methods: {
    // upload(file){
    //   let fd = new Formdata();
    //      fd.append('key', file, 'fileName');
    //    axios({
    //      headers: {
    //        "User-Info": JSON.parse(sessionStorage.getItem("SESSION_USER"))
    //          .loginId,
    //        Authorization: JSON.parse(sessionStorage.getItem("SESSION_USER"))
    //          .sessionId
    //      },
    //      method: "post",
    //      url: "/hlkt/admin/upload/video.action",
    //   fd

    //    }).then(res => {
    //      if (res.data.resultCode == "200") {
    //        this.getdevice();
    //      } else {
    //        this.$message({
    //          type: "error",
    //          message: res.data.resultMsg
    //        });
    //      }
    //    });

    // },
    //上传前回调
    beforeUploadVideo(file) {
      var fileSize = file.size / 1024 / 1024 < 500;
      if (
        [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb",
          "video/mov"
        ].indexOf(file.type) == -1
      ) {
        this.$message({
          type: "error",
          message: "请上传正确的视频格式"
        });
        return false;
      }
      if (!fileSize) {
        this.$message({
          type: "error",
          message: "不能大于500m"
        });
        return false;
      }
      this.isShowUploadVideo = false;
      // this.upload(file);
    },
    //进度条
    uploadVideoProcess(event, file, fileList) {
      this.videoFlag = true;
      this.videoUploadPercent = file.percentage.toFixed(0) * 1;
    },
    //上传成功回调
    handleVideoSuccess(res, file) {
      this.isShowUploadVideo = true;
      this.videoFlag = false;
      this.videoUploadPercent = 0;

      //前台上传地址
      //if (file.status == 'success' ) {
      //    this.videoForm.showVideoPath = file.url;
      //} else {
      //     layer.msg("上传失败，请重新上传");
      //}

      //后台上传地址
      if (res.Code == 0) {
        this.videoForm.showVideoPath = res.Data;
      } else {
        this.$message({
          type: "error",
          message: "msg"
        });
      }
    },
    dele(row) {
      this.$confirm("确认删除用户数据？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.del(row);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },

    showedit(row) {
      this.dialogFormVisible1 = true;
      this.teacherId = row.teacherId;
      this.userid = row.baseUser.userId;
    },
    serchlist(vap) {
      //改变页数
      this.currentPage = vap;
      this.getuserlist();
    },
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val;
      // 切换页码时，要获取每页显示的条数
      this.getuserlist(this.PageSize, val * this.pageSize);
    },
    del(row) {
      axios({
        headers: {
          "User-Info": JSON.parse(sessionStorage.getItem("SESSION_USER"))
            .loginId,
          Authorization: JSON.parse(sessionStorage.getItem("SESSION_USER"))
            .sessionId
        },
        method: "post",
        url: "/hlkt/admin/camera/deleteCamera.action",
        data: {
          sid: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid,
          cCamera: row.cCamera
        }
      }).then(res => {
        if (res.data.resultCode == "200") {
          this.getdevice();
        } else {
          this.$message({
            type: "error",
            message: res.data.resultMsg
          });
        }
      });
    },
    edit(row) {
      axios({
        headers: {
          "User-Info": JSON.parse(sessionStorage.getItem("SESSION_USER"))
            .loginId,
          Authorization: JSON.parse(sessionStorage.getItem("SESSION_USER"))
            .sessionId
        },
        method: "post",
        url: "/hlkt/admin/camera/updateCamera.action",
        data: {
          sid: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid,
          sName: "小学",
          cNumber: "101000",
          cGrade: "",
          cCamera: row.cCamera
        }
      }).then(res => {
        if (res.data.resultCode == "200") {
          console.log(this.tableData);
        } else {
          this.$message({
            type: "error",
            message: res.data.resultMsg
          });
        }
      });
    },

    add() {
      axios({
        headers: {
          "User-Info": JSON.parse(sessionStorage.getItem("SESSION_USER"))
            .loginId,
          Authorization: JSON.parse(sessionStorage.getItem("SESSION_USER"))
            .sessionId
        },
        method: "post",
        url: "/hlkt/admin/camera/addCamera.action",
        data: {
          sName: "小学",
          cNumber: "1010",
          cGrade: "一年级（10）班",

          sid: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid
        }
      }).then(res => {
        if (res.data.resultCode == "200") {
          console.log(this.tableData);
        } else {
          this.$message({
            type: "error",
            message: res.data.resultMsg
          });
        }
      });
    },
    serchlist(vap) {
      //改变页数
      this.currentPage = vap;
      this.getdevice();
    },
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val;
      // 切换页码时，要获取每页显示的条数
      this.getdevice(this.PageSize, val * this.pageSize);
    },
    getvideo() {
      axios({
        headers: {
          "User-Info": JSON.parse(sessionStorage.getItem("SESSION_USER"))
            .loginId,
          Authorization: JSON.parse(sessionStorage.getItem("SESSION_USER"))
            .sessionId
        },
        method: "post",
        url: "/hlkt/admin/video/list.action",
        data: {
          sid: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid,
          pageSize: 10,
          pageNum: this.currentPage
        }
      }).then(res => {
        if (res.data.resultCode == "200") {
          this.tableData = res.data.resultData.list;
          this.count = res.data.resultData.total;
          console.log(this.tableData);
        } else {
          this.$message({
            type: "error",
            message: res.data.resultMsg
          });
        }
      });
    }
  },
  components: {
    axios
  },
  created() {
    this.getvideo();
  }
};
</script>
<style scoped lang="scss">
@import "src/plugins/px2vw";
.page {
  text-align: center;
}
.input {
  float: left;
}
.left {
  margin-left: 50px;
  margin-right: px2vw(14px);
}

.videoimg {
  width: px2vw(145px);
  height: px2vw(86px);
  margin-left: px2vw(115px);
  margin-bottom: 15px;
}

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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
