import request from "@/utils/request";
import qs from "qs";

// 获取教师成绩分页列表
export function getGradeList(data) {
  return request({
    url: "/edu/eac/eduGrade/page",
    method: "post",
    data,
  });
}
