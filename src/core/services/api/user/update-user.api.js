import http from "../../interceptor";

export const updateUserAPI = async (
  id,
  fName,
  lName,
  userName,
  gmail,
  phoneNumber,
  active,
  isDelete,
  isTeacher,
  isStudent,
  recoveryEmail,
  twoStepAuth,
  userAbout,
  currentPictureAddress,
  linkdinProfile,
  telegramLink,
  receiveMessageEvent,
  homeAdderess,
  nationalCode,
  gender,
  latitude,
  longitude,
  insertDate,
  birthDay,
  roles,
  courses,
  coursesReseves,
  userProfileId
) => {
  try {
    const response = await http.put("/User/UpdateUser", {
      id,
      fName,
      lName,
      userName,
      gmail,
      phoneNumber,
      active,
      isDelete,
      isTeacher,
      isStudent,
      recoveryEmail,
      twoStepAuth,
      userAbout,
      currentPictureAddress,
      linkdinProfile,
      telegramLink,
      receiveMessageEvent,
      homeAdderess,
      nationalCode,
      gender,
      latitude,
      longitude,
      insertDate,
      birthDay,
      roles,
      courses,
      coursesReseves,
      userProfileId,
    });

    return response;
  } catch (error) {
    return false;
  }
};
