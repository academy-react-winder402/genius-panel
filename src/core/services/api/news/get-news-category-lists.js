import http from "../../interceptor";

export const getNewsCategoryListsAPI = async () => {
  try {
    const response = await http.get("/News/GetListNewsCategory");

    return response;
  } catch (error) {
    return false;
  }
};
