import http from "../../../interceptor";

export const deleteCourseGroupAPI = async (data) => {
  try {
    const response = await http.delete("/CourseGroup", {
      data,
    });

    return response;
  } catch (error) {
    return false;
  }
};
