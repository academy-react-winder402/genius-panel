import http from "../../../interceptor";

export const getCourseGroupDetailsAPI = async (id) => {
  try {
    const response = await http.get("/CourseGroup/Details", {
      params: {
        id,
      },
    });

    return response;
  } catch (error) {
    return false;
  }
};
