import http from "../../../interceptor";

export const deleteCourseCommentAPI = async (courseCommentId) => {
  try {
    const response = await http.delete(`/Course/DeleteCourseComment`, {
      params: {
        courseCommandId: courseCommentId,
      },
    });

    return response;
  } catch (error) {
    return false;
  }
};
