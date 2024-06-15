import http from "../../interceptor";

export const updateNewsCategoryAPI = async (data) => {
  try {
    const response = await http.put("/News/UpdateNewsCategory", data);

    return response;
  } catch (error) {
    return false;
  }
};
