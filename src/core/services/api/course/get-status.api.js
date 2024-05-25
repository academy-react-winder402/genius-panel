import http from "../../interceptor";

export const getStatusAPI = async () => {
  try {
    const response = await http.get("/Status");

    return response;
  } catch (error) {
    return false;
  }
};
