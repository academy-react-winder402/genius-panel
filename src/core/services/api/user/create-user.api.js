import http from "../../interceptor";

export const createUserAPI = async (
  lastName,
  firstName,
  gmail,
  password,
  phoneNumber,
  isStudent,
  isTeacher
) => {
  try {
    const response = await http.post("/User/CreateUser", {
      lastName,
      firstName,
      gmail,
      password,
      phoneNumber,
      isStudent,
      isTeacher,
    });

    return response;
  } catch (error) {
    return false;
  }
};
