import http from "../../interceptor";

export const createBlogAPI = async (data) => {
  try {
    const response = await http.post("/News/CreateNewsCategory", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    return false;
  }
};
