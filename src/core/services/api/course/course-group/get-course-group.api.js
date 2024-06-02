import http from "../../../interceptor";

export const getCourseGroupAPI = async (teacherId, courseId) => {
  try {
    const response = await http.get("/CourseGroup/GetCourseGroup", {
      params: {
        teacherId,
        courseId,
      },
    });

    return response;
  } catch (error) {
    return false;
  }
};
