import http from "../../interceptor";

export const getAllCourseLevelAPI = async () => {
  try {
    const response = await http.get("/CourseLevel/GetAllCourseLevel");

    return response;
  } catch (error) {
    return false;
  }
};
