import http from "../../interceptor";

export const addCourseTechnologyAPI = async (courseId) => {
  try {
    const response = await http.post(
      `/Course/AddCourseTechnology?courseId=${courseId}`
    );

    return response;
  } catch (error) {
    return false;
  }
};
