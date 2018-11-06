<template>
    <div class="login">
         <div class="contents">
             <h1 class="title">随访系统</h1>
                <form action="">
                    <div class="content">
                        <div class="longin-boder">
                            <div class="image"><img src="images/user.png"></div>
                            <input class="input user" type="text" placeholder="输入用户名"/>
                        </div> 
                        <div class="longin-boder">
                            <div class="image"><img src="images/pwd.png"></div>
                            <input class="input pwd" type="password" placeholder="输入验证码"/>
                             <div id="v_container"  style="width: 100px;height: 42px;  display:inline-block" ></div>
                        </div>
                        <div id="msg_id"></div>
                        <div class="button" v-on:click="submitLogin">登录</div>
                    </div>  
                </form>    
         </div>
    </div>
</template>
<script>
import yzm from "@/assets/yz.js";
export default {
  name: "login",

  data() {
    var checkUserName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        callback();
      }
    };
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        userName: "",
        checkPass: "",
        age: "",
        userInfo:{
          username:"zlz"
        }
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }],
        userName: [{ validator: checkUserName, trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.gv();
  },
  methods: {
    //登录验证
    validMsg() {
      var oinput = document.getElementsByClassName("input"),
        msgId = document.getElementById("msg_id"),
        yzmt = this.verifyCode.validate(oinput[1].value);
      if (oinput[0] && !oinput[0].value) {
        msgId.innerHTML = "手机号不能为空";
        return false;
      } else if (oinput[1] && !oinput[1].value) {
        msgId.innerHTML = "验证码不能为空";
        return false;
      } else if (!yzmt) {
        msgId.innerHTML = "验证码错误";
        return true;
      }
      return {username:oinput[0].value}

    },
    submitLogin() {
      var valid = this.validMsg();
      if (valid) {
        //验证成功
        console.log(this.userInfo)
         this.$store
            .dispatch("Login", valid).then(res=>{
              debugger;
                this.$router.push({ path: "/layout" });
            }).catch(error => {
              debugger;
              console.log("error")
              // this.loginLoading = false;
              console.error(error);
            });
        
      }
    },
    gv(){
				this.verifyCode= new GVerify("v_container");
		 },
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/style/common.less";
html,
body {
  margin: margin0;
  padding: padding0;
}
.login {
  width: 100%;
  height: 100%;
  position: relative;
}
.login .contents {
  position: absolute;
  right: 20px;
  top: 30px;
  width: 400px;
  height: 450px;
  border: 1px solid #ccc;
  padding: 20px;
}
.login .contents .title {
  line-height: 20px;
  height: 20px;
  text-align: center;
  font-size: 18px;
}
/* html,

body{
    background:url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1533405241708&di=c246d523df5aa886b322f8fe110816b8&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201510%2F25%2F20151025233833_CiuL3.thumb.700_0.jpeg');
    background-size: 100%;
    overflow: hidden;
} */

// body
// {
// 	background:url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1533405241708&di=c246d523df5aa886b322f8fe110816b8&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201510%2F25%2F20151025233833_CiuL3.thumb.700_0.jpeg');
//     background-size: 100%;
// 	/* overflow: hidden; */

// }
.content {
  // width: 100%;
  margin-top: 100px;
  text-align: center;
  // position: fixed;
  // top:-100px;
  // left: 0;
}
.longin-boder {
  width: 80%;
  height: 40px;
  margin-top: 20px;
  margin-left: 10%;
  line-height: 40px;
  text-align: center;
  border: 1px solid #dddddd;
  border-radius: 20px;
  background-color: #efefef;
}
.rememberBox {
  width: 80%;
  margin-left: 10%;
}
.image {
  width: 10%;
  margin-top: 5px;
  float: left;
  text-align: right;
}
.image img {
  width: 100%;
}
.input {
  width: 80%;
  outline: none;
  float: left;
  margin-left: 5%;
  height: 37px;
  line-height: 37px;
  border: 0px;
  color: #333333;
  padding-left: 5px;
  font-size: 16px;
  background-color: #efefef;
}
.longin-boder .pwd {
  width: 30%;
}

.button {
  height: 40px;
  width: 80%;
  margin-top: 20px;
  margin-left: 10%;
  font-size: 16px;
  font-family: "微软雅黑";
  font-weight: bold;
  line-height: 38px;
  border-radius: 20px;
  cursor: pointer;
  color: #ffffff;
  background-color: #37b4ca;
}

.button:active {
  background-color: #37a3b9;
}
.ruleForm {
  margin-top: 60px;
}
#msg_id {
  color: red;
  padding-top: 5px;
  height: 20px;
  font-size: 12px;
  // text-align:right;
}
</style>


