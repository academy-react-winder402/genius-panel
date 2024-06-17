import http from "../../interceptor";

export const updateUserAPI = async (user) => {
  try {
    const response = await http.put("/User/UpdateUser", user);

    return response;
  } catch (error) {
    return false;
  }
};
