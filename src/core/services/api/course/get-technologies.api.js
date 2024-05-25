import http from "../../interceptor";

export const getTechnologiesAPI = async () => {
  try {
    const response = await http.get("/Home/GetTechnologies");

    return response;
  } catch (error) {
    return false;
  }
};
