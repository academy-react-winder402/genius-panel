import http from "../../interceptor";

export const createCourseAPI = async (data) => {
  try {
    const response = await http.post("/Course", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    return false;
  }
};
