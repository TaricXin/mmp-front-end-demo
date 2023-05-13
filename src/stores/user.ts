import { removeCookie, setCookie, sleep } from "@/utils";
import { defineStore } from "pinia";
import request from "@/utils/request";
import { ElMessage } from "element-plus";
import qs from "qs";
import { Stores } from "types/stores";

export const userStore = defineStore("user", {
  state: (): Stores.user => ({
    userName: "",
    nameSpell: "",
    remark: "",
    avatar: "",
    token: "",
    email: "",
    appUserType: 0,
    isPwd: false,
    appUserId: "",
    isInitialPwd: false,
  }),
  actions: {
    setUserName(name: string) {
      this.userName = name;
    },
    setNameSpell(name: string) {
      this.nameSpell = name;
    },
    setRemark(str: string) {
      this.remark = str;
    },
    setEmail(str: string) {
      this.email = str;
    },
    async login(username: string, password: string) {
      // 登录前删除就token
      return new Promise((resolve, reject) => {
        request
          .post(
            "/sac/cuc/user/login",
            qs.stringify({
              username,
              password,
            })
          )
          .then((res) => {
            const { data, msg } = res.data;
            if (data) {
              this.userName = data.userName;
              this.nameSpell = data?.nameSpell;
              this.age = data.age;
              this.sex = data.sex;
              this.avatar = data.avatar;
              this.email = data.email;
              this.isPwd = data.isPwd;
              this.appUserId = data.appUserId;
              this.token = `${data.token}`;
              setCookie("token", this.token);
              this.getUserDetail(this.token).then(({ data, msg }) => {
                if (data) {
                  resolve(true);
                } else {
                  reject(msg);
                }
              });
              // 返回登录成功
            } else {
              reject(msg);
            }
          });
      });
    },
    async logout(tip?: any) {
      return new Promise((resolve) => {
        request.post("/sac/cuc/user/logout").then((res) => {
          const { msg } = res.data;
          removeCookie("token");
          this.token = "";
          this.appUserType = 0;
          ElMessage.success(msg || tip);
          resolve(msg);
        });
      });
    },
    async getUserInfo(token: string): Promise<string> {
      return new Promise((resolve, reject) => {
        this.getUserDetail(token).then(({ data, msg }) => {
          if (data) {
            resolve(msg);
          } else {
            reject(msg);
          }
        });
      });
    },
    async getUserDetail(token: string): Promise<any> {
      return request
        .post("/sac/cuc/user/getUserDetail", {
          token: token,
        })
        .then((res) => {
          const { data, msg } = res.data;
          if (data) {
            this.userName = data.nickName;
            this.nameSpell = data?.nameSpell;
            this.remark = data.remark;
            this.sex = data.sex;
            this.email = data.email;
            this.avatar = data.avatar;
            this.appUserId = data.appUserId;
            // this.token = `${data.username}Token` 错误源头
            // 造成token缺失继而删除了token
            this.token = data.token;
            // setCookie('token', this.token)
            this.appUserType = data.appUserType;
            this.isInitialPwd = data.isInitialPwd;
          }

          return res;
        });
    },
  },
});
