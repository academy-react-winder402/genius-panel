import http from "../../interceptor";

export const getAdminNewsCommentsAPI = async (newsId) => {
  try {
    const response = await http.get("/News/GetAdminNewsComments", {
      params: {
        newsId,
      },
    });

    return response;
  } catch (error) {
    return false;
  }
};
