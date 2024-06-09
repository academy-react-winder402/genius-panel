import http from "../../../interceptor";

export const deleteCourseComment = async (courseCommentId) => {
  try {
    const response = await http.delete(`/Course/DeleteCourseComment`, {
      params: {
        courseCommentId,
      },
    });

    return response;
  } catch (error) {
    return false;
  }
};
