import http from "../../interceptor";

export const deleteCourseAPI = async (active, id) => {
  try {
    const response = await http.delete("/Course/DeleteCourse", {
      data: {
        active: !active,
        id,
      },
    });

    return response;
  } catch (error) {
    return false;
  }
};
