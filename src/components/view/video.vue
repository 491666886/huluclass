<template>
  <div>
    <div>
      <div class="head">视频列表</div>
      <el-button class="add" size="small" type="primary" @click="dialogFormVisible = true">+上传视频</el-button>
    </div>

    <div class="main">
      <a>筛选条件： 科目</a>
      <el-select class v-model="subjects" placeholder="请选择" @change="kemu">
        <el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.name"></el-option>
      </el-select>

      <a>教师</a>
      <el-select v-model="value" placeholder="请选择" @change="reget">
        <el-option v-for="item in teacherlist" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <a>录制日期</a>
      <el-date-picker
        v-model="value1"
        type="date"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        placeholder="选择日期"
        class="redata"
        @change="reget"
      ></el-date-picker>

      <div class="button">
        <el-button class="add" size="small" type="primary" @click="retry()">重置</el-button>
      </div>
    </div>
    <div class="table">
      <!-- <div v-if="tableData.length ===0" class="error">暂无视频</div> -->
      <el-table v-if="showTable" :data="tableData" border class="form" :height="tableHeight">
        <el-table-column :index="indexMethod" type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="teacherId" label="教师"></el-table-column>

        <el-table-column prop="curriculumId" label="科目"></el-table-column>
        <el-table-column prop="nj" label="年级"></el-table-column>
        <el-table-column label="录制日期">
          <template scope="scope">
            <p>{{ scope.row.recordTime.split(' ')[0] }}</p>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="管理" width="60">
          <template slot-scope="scope">
            <el-button @click="showedit(scope.row)" type="text" size="small">编辑</el-button>
            <!--          <el-button @click="dele(scope.row)" type="text" size="small">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          :hide-on-single-page="true"
          layout="total, prev, pager, next"
          :page-size="10"
          :current-page="currentPage"
          @current-change="handleCurrentChange"
          :total="parseInt(this.count)"
        ></el-pagination>
      </div>
    </div>
    <el-dialog title="新增视频" :visible.sync="dialogFormVisible2" :modal-append-to-body="false">
      <el-form :model="form">
        <img class="videoimg" :src="home_url" />

        <!-- <a class="left"> 科目</a> -->
        <el-form-item label="科目" :required="true">
          <el-select v-model="form.curriculumId" placeholder="请选择" class="windt" @change="getgrade">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="年级" :required="true" class="grade">
          <el-select v-model="form.nj" placeholder="请选择" style="width: 140px;" @change="getdanyuan">
            <el-option v-for="item in grade" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单元" :required="true" class="grade">
          <el-select
            v-model="form.dy"
            :required="true"
            placeholder="请选择"
            style="width: 140px;"
            @change="getxiaojie"
          >
            <el-option v-for="item in danyuan" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="小节" :required="true" class="grade">
          <el-select
            v-model="form.summary"
            :required="true"
            placeholder="请选择"
            style="width: 140px;"
          >
            <el-option v-for="item in xiaojie" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :required="true" label="课时名称" class="classname">
          <el-input v-model="form.name" class="input"></el-input>
        </el-form-item>

        <el-form-item label="教师" :required="true" class="grade">
          <el-select
            v-model="form.teacherId"
            :required="true"
            placeholder="请选择"
            style="width: 140px;"
          >
            <el-option v-for="item in teacherlist" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="录制时间" :required="true" class="time">
          <el-date-picker
            @change="typedd"
            v-model="form.recordTime"
            type="date"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
          ></el-date-picker>
          <!-- <el-date-picker v-model="form.recordTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialai">取消编辑</el-button>
        <el-button type="primary" @click="add()">保存修改</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑视频" :visible.sync="dialogFormVisible1" :modal-append-to-body="false">
      <el-form :model="form" ref="form">
        <img class="videoimg" :src="'http://' + form.site" />

        <!-- <a class="left"> 科目</a> -->
        <el-form-item label="科目" :required="true">
          <el-select v-model="form.curriculumId" placeholder="请选择" class="windt" @change="second">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="年级" :required="true" class="grade">
          <el-select v-model="form.nj" placeholder="请选择" style="width: 140px;" @change="third">
            <el-option v-for="item in grade" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单元" :required="true" class="grade">
          <el-select
            v-model="form.dy"
            :required="true"
            placeholder="请选择"
            style="width: 140px;"
            @change="forth"
          >
            <el-option v-for="item in danyuan" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="小节" :required="true" class="grade">
          <el-select
            v-model="form.summary"
            :required="true"
            placeholder="请选择"
            style="width: 140px;"
          >
            <el-option v-for="item in xiaojie" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :required="true" label="课时名称" class="classname">
          <el-input v-model="form.name" class="input"></el-input>
        </el-form-item>

        <el-form-item label="教师" :required="true" class="grade">
          <el-select
            v-model="form.teacherId"
            :required="true"
            placeholder="请选择"
            style="width: 140px;"
          >
            <el-option v-for="item in teacherlist" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="录制时间" :required="true" class="time">
          <el-date-picker
            v-model="form.recordTime"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取消编辑</el-button>
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
                :action="doUpload"
                :headers="myHeaders"
                :data="{ sid: this.sid }"
                name="videoFile"
                v-bind:on-progress="uploadVideoProcess"
                v-bind:on-success="handleVideoSuccess"
                v-bind:before-upload="beforeUploadVideo"
                v-bind:show-file-list="false"
              >
                <video
                  v-if="videoForm.showVideoPath != '' && !videoFlag"
                  v-bind:src="videoForm.showVideoPath"
                  class="avatar video-avatar"
                  controls="controls"
                >您的浏览器不支持视频播放</video>
                <i
                  v-else-if="videoForm.showVideoPath == '' && !videoFlag"
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
          <span>最多可以上传1个视频，建议大小500M，推荐格式mp4</span>
        </p>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="esc()">取消</el-button>
        <!-- <el-button type="primary" @click="add()">确 定</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
const url = window.location.href.split('dist')[0]
const sessionId = JSON.parse(sessionStorage.getItem('SESSION_USER')).sessionId
const UserInfo = JSON.parse(sessionStorage.getItem('SESSION_USER')).loginId
export default {
  name: 'videodetail',
  data() {
    return {
      url: '',
      showTable: true,
      home_url: '',
      tableHeight: '55vh',
      myHeaders: {
        Authorization: sessionId,
        'User-Info': UserInfo
      },
      vId: '',
      sid: JSON.parse(sessionStorage.getItem('SESSION_USER')).sid,
      videoFlag: false,
      // 是否显示进度条
      videoUploadPercent: '',
      // 进度条的进度，
      isShowUploadVideo: false,
      // 显示上传按钮
      videoForm: {
        showVideoPath: ''

      },
      doUpload: url + 'hlkt/admin/upload/video.action',
      formLabelWidth: '120px',
      form: {
        grade: '',
        summary: '',
        remark: '',
        loginId: '',
        password: '',
        job: '',
        name: '',
        roleId: '1'
      },
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,

      count: '',
      currentPage: 1, // 默认显示第几页
      value1: '',
      value: '', // 选择得老师
      options: [], // 科目
      danyuan: [],
      grade: [],
      xiaojie: [],
      teacherlist: [], // 老师
      datalist: [],

      subjects: '',
      tableData: []
    }
  },

  methods: {
    dialai() {
      // 取消上传回掉
      this.dialogFormVisible2 = false
      this.getvideo()
    },
    refreshTable() {
      // 取消按钮回掉
      this.showTable = false
      this.$nextTick(() => {
        this.showTable = true
      })
    },
    cancel(formName) {
      // this.$refs[formName].resetFields();
      this.dialogFormVisible1 = false
      this.getvideo()
      this.refreshTable()
    },
    esc() {
      this.$router.go(0)
    },
    reget() {
      this.currentPage = 1
      this.getvideo()
    },
    second() {
      this.form.nj = ''
      this.form.dy = ''
      this.form.summary = ''
      this.grade = ''
      this.getgrade()
    },
    third() {
      this.form.dy = ''
      this.form.summary = ''
      this.danyuan = ''
      this.getdanyuan()
    },
    forth() {
      this.form.summary = ''
      this.xiaojie = ''
      this.getxiaojie()
    },
    indexMethod(index) {
      return (this.currentPage - 1) * 10 + index + 1
    },
    typedd() {
      typeof this.form.recordTime
    },
    retry() {
      this.subjects = ''
      this.value = ''
      this.value1 = ''
      this.getvideo()
    },
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
    //        this.getvideo();
    //      } else {
    //        this.$message({
    //          type: "error",
    //          message: res.data.resultMsg
    //        });
    //      }
    //    });

    // },
    // 上传前回调
    beforeUploadVideo(file) {
      const fileSize = file.size / 1024 / 1024 < 500
      if (
        [
          'video/mp4',
          'video/ogg',
          'video/flv',
          'video/avi',
          'video/wmv',
          'video/rmvb',
          'video/mov'
        ].indexOf(file.type) == -1
      ) {
        this.$message({
          type: 'error',
          message: '请上传正确的视频格式'
        })
        return false
      }
      if (!fileSize) {
        this.$message({
          type: 'error',
          message: '不能大于500m'
        })
        return false
      }
      this.isShowUploadVideo = false
      // this.upload(file);
    },
    // 进度条
    uploadVideoProcess(event, file, fileList) {
      this.videoFlag = true
      this.videoUploadPercent = file.percentage.toFixed(0) * 1
    },
    // 上传成功回调
    handleVideoSuccess(res, file) {
      // this.isShowUploadVideo = true;
      this.videoFlag = false
      this.videoUploadPercent = 0

      // 前台上传地址
      // if (file.status == 'success' ) {
      //    this.videoForm.showVideoPath = file.url;
      // } else {
      //     layer.msg("上传失败，请重新上传");
      // }

      // 后台上传地址
      if (res.resultCode == 200) {
        // this.videoForm.showVideoPath = 'http://172.38.50.126:8080' + res.resultData.url;
        this.vId = res.resultData.id
        this.home_url = 'http://' + res.resultData.site
        this.form = {} // 表单置空
        // this.add();

        this.dialogFormVisible2 = true
        // this.add=true;
        this.dialogFormVisible = false
      } else {
        this.$message({
          type: 'error',
          message: res.resultMsg
        })
      }
    },

    kemu() {
      this.currentPage = 1
      this.getteacher()
      this.getvideo()
    },
    dele(row) {
      this.$confirm('确认删除用户数据？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.del(row)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },

    showedit(row) {
      this.dialogFormVisible1 = true
      this.form = row
      this.getgrade()
      this.getsubject()
      this.getxiaojie()
      this.getdanyuan()
      // this.teacherId = row.teacherId;
      // this.userid = row.baseUser.userId;
    },
    serchlist(vap) {
      // 改变页数
      this.currentPage = vap
      this.getvideo()
    },
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val
      // 切换页码时，要获取每页显示的条数
      this.getvideo(this.PageSize, val * this.pageSize)
    },
    del(row) {
      axios({
        headers: {
          'User-Info': JSON.parse(sessionStorage.getItem('SESSION_USER'))
            .loginId,
          Authorization: JSON.parse(sessionStorage.getItem('SESSION_USER'))
            .sessionId
        },
        method: 'post',
        url: '/hlkt/admin/camera/deleteCamera.action',
        data: {
          sid: JSON.parse(sessionStorage.getItem('SESSION_USER')).sid,
          cCamera: row.cCamera
        }
      }).then(res => {
        if (res.data.resultCode == '200') {
          this.getvideo()
        } else {
          this.$message({
            type: 'error',
            message: res.data.resultMsg
          })
        }
      })
    },
    edit(row) {
      this.vId = this.form.id
      axios({
        headers: {
          'User-Info': JSON.parse(sessionStorage.getItem('SESSION_USER'))
            .loginId,
          Authorization: JSON.parse(sessionStorage.getItem('SESSION_USER'))
            .sessionId
        },
        method: 'post',
        url: '/hlkt/admin/videoOpt/updateVideo.action',
        data: {
          sid: JSON.parse(sessionStorage.getItem('SESSION_USER')).sid,
          teacherId: this.form.teacherId,
          id: this.vId,
          curriculumId: this.form.curriculumId,
          nj: this.form.nj,
          dy: this.form.dy,
          summary: this.form.summary,
          name: this.form.name,
          recordTime: this.form.recordTime
        }
      }).then(res => {
        if (res.data.resultCode == '200') {
          this.dialogFormVisible1 = false
          this.getvideo()
        } else {
          this.$message({
            type: 'error',
            message: res.data.resultMsg
          })
        }
      })
    },

    add() {
      axios({
        headers: {
          'User-Info': JSON.parse(sessionStorage.getItem('SESSION_USER'))
            .loginId,
          Authorization: JSON.parse(sessionStorage.getItem('SESSION_USER'))
            .sessionId
        },
        method: 'post',
        url: '/hlkt/admin/videoOpt/updateVideo.action',
        data: {
          sid: JSON.parse(sessionStorage.getItem('SESSION_USER')).sid,
          teacherId: this.form.teacherId,
          id: this.vId,
          curriculumId: this.form.curriculumId,
          nj: this.form.nj,
          dy: this.form.dy,
          summary: this.form.summary,
          name: this.form.name,
          recordTime: this.form.recordTime
        }
      }).then(res => {
        if (res.data.resultCode == '200') {
          this.dialogFormVisible2 = false
          this.getvideo()
        } else {
          this.$message({
            type: 'error',
            message: res.data.resultMsg
          })
        }
      })
    },
    getsubject() {
      axios({
        headers: {
          'User-Info': JSON.parse(sessionStorage.getItem('SESSION_USER'))
            .loginId,
          Authorization: JSON.parse(sessionStorage.getItem('SESSION_USER'))
            .sessionId
        },
        method: 'post',
        url: '/hlkt/selective/subjects/list.action',
        data: {
          sid: JSON.parse(sessionStorage.getItem('SESSION_USER')).sid,
          schoolType: JSON.parse(sessionStorage.getItem('SESSION_USER')).sid
        }
      }).then(res => {
        if (res.data.resultCode == '200') {
          this.options = res.data.resultData
        } else {
          this.$message({
            type: 'error',
            message: res.data.resultMsg
          })
        }
      })
    },
    getgrade() {
      axios({
        headers: {
          'User-Info': JSON.parse(sessionStorage.getItem('SESSION_USER'))
            .loginId,
          Authorization: JSON.parse(sessionStorage.getItem('SESSION_USER'))
            .sessionId
        },
        method: 'post',
        url: '/hlkt/selective/subjects/twolist.action',
        data: {
          firstValue: this.form.curriculumId,
          // schoolType: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid,
          sid: JSON.parse(sessionStorage.getItem('SESSION_USER')).sid
        }
      }).then(res => {
        if (res.data.resultCode == '200') {
          this.grade = res.data.resultData
        } else {
          this.grade = ''
          this.$message({
            type: 'error',
            message: res.data.resultMsg
          })
        }
      })
    },
    getteacher() {
      axios({
        headers: {
          'User-Info': JSON.parse(sessionStorage.getItem('SESSION_USER'))
            .loginId,
          Authorization: JSON.parse(sessionStorage.getItem('SESSION_USER'))
            .sessionId
        },
        method: 'post',
        url: '/hlkt/selective/teacher/namelist.action',
        data: {
          sid: JSON.parse(sessionStorage.getItem('SESSION_USER')).sid,
          jobName: this.subjects
        }
      }).then(res => {
        if (res.data.resultCode == '200') {
          this.teacherlist = res.data.resultData
        } else {
          this.$message({
            type: 'error',
            message: res.data.resultMsg
          })
        }
      })
    },
    getdanyuan() {
      axios({
        headers: {
          'User-Info': JSON.parse(sessionStorage.getItem('SESSION_USER'))
            .loginId,
          Authorization: JSON.parse(sessionStorage.getItem('SESSION_USER'))
            .sessionId
        },
        method: 'post',
        url: '/hlkt/selective/subjects/threelist.action',
        data: {
          firstValue: this.form.curriculumId,
          secondValue: this.form.nj,
          // schoolType: JSON.parse(sessionStorage.getItem("SESSION_USER")).sid,
          sid: JSON.parse(sessionStorage.getItem('SESSION_USER')).sid
        }
      }).then(res => {
        if (res.data.resultCode == '200') {
          this.danyuan = res.data.resultData
        } else {
          this.danyuan = ''
          this.$message({
            type: 'error',
            message: res.data.resultMsg
          })
        }
      })
    },
    getxiaojie() {
      axios({
        headers: {
          'User-Info': JSON.parse(sessionStorage.getItem('SESSION_USER'))
            .loginId,
          Authorization: JSON.parse(sessionStorage.getItem('SESSION_USER'))
            .sessionId
        },
        method: 'post',
        url: '/hlkt/selective/subjects/fourlist.action',
        data: {
          firstValue: this.form.curriculumId,
          secondValue: this.form.nj,
          sid: JSON.parse(sessionStorage.getItem('SESSION_USER')).sid,
          thirdValue: this.form.dy
        }
      }).then(res => {
        if (res.data.resultCode == '200') {
          this.xiaojie = res.data.resultData
        } else {
          this.xiaojie = ''
          this.$message({
            type: 'error',
            message: res.data.resultMsg
          })
        }
      })
    },
    getvideo() {
      axios({
        headers: {
          'User-Info': JSON.parse(sessionStorage.getItem('SESSION_USER'))
            .loginId,
          Authorization: JSON.parse(sessionStorage.getItem('SESSION_USER'))
            .sessionId
        },
        method: 'post',
        url: '/hlkt/admin/video/list.action',
        data: {
          video: {
            sid: JSON.parse(sessionStorage.getItem('SESSION_USER')).sid,
            curriculumId: this.subjects,
            teacherId: this.value,
            recordTime: this.value1
          },

          pageSize: 10,
          pageNum: this.currentPage
        }
      }).then(res => {
        if (res.data.resultCode == '200') {
          this.tableData = res.data.resultData.list
          this.count = res.data.resultData.total
        } else {
          this.tableData = []
          this.$message({
            type: 'error',
            message: res.data.resultMsg
          })
        }
      })
    }
  },
  components: {},
  created() {
    this.url = window.location.href.split('dist')[0]
    this.getvideo()
    this.getsubject()
    this.getteacher()
  }
}
</script>
<style scoped lang="scss">
@import "src/plugins/px2vw";
.classname {
  float: left;
  width: px2vw(550px);
}
.time {
  float: left;
  width: px2vw(432px);
}
.windt {
  width: px2vw(372px);
}
.input {
  width: px2vw(372px);
  float: left;
}
.grade {
  width: px2vw(280px);
  float: left;
}
.redata {
  margin-top: px2vw(20px);
  margin-left: px2vw(15px);
}
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
  .form {
    height: px2vw(600px);
  }
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
