export namespace Stores {
  interface user {
    userName?: string;
    nameSpell?: string;
    remark?: string;
    name?: string;
    appUserId?: string; //id
    avatar?: string; //头像
    email?: string; //邮箱
    isPwd?: boolean;
    userId?: string;
    nickName?: string;
    token?: string;
    appUserType?: 0 | 1 | 2;
    isInitialPwd?: boolean;
  }
}
