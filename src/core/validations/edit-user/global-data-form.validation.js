import * as yup from "yup";

export const globalDataFromSchema = yup.object().shape({
  fName: yup.string(),
  lName: yup.string(),
  userAbout: yup.string(),
  gmail: yup.string(),
  nationalCode: yup.string(),
  gender: yup.boolean(),
  homeAdderess: yup.string(),
  birthDay: yup.string(),
});
