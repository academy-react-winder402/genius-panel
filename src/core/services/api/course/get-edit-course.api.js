import http from "../../interceptor";

export const getEditCourseAPI = async (courseId) => {
  try {
    const response = await http.get("/Course/GetEditCourse", {
      params: {
        courseId,
      },
    });

    return response;
  } catch (error) {
    return false;
  }
};
