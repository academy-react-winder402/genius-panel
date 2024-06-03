import http from "../../interceptor";

export const getCourseByIdAPI = async (id) => {
  try {
    const response = await http.get(`/Course/${id}`);

    return response;
  } catch (error) {
    return false;
  }
};
