import http from "../../interceptor";

export const getCourseTypesAPI = async () => {
  try {
    const response = await http.get("/CourseType/GetCourseTypes");

    return response;
  } catch (error) {
    return false;
  }
};
