import * as yup from "yup";

export const createCourseStepOneFormSchema = yup.object().shape({
  title: yup.string(),
  cost: yup.string(),
  capacity: yup.string(),
  sessionNumber: yup.string(),
  miniDescribe: yup.string(),
});
