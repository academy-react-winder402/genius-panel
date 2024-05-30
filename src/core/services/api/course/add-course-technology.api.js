import http from "../../interceptor";

export const addCourseTechnologyAPI = async (courseId, technologies) => {
  try {
    const response = await http.post(
      `/Course/AddCourseTechnology?courseId=${courseId}`,
      technologies
    );

    return response;
  } catch (error) {
    return false;
  }
};
