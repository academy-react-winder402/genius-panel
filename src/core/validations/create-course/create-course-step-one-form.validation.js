import * as yup from "yup";

export const createCourseStepOneFormSchema = yup.object().shape({
  title: yup.string().required("این فیلد الزامی می باشد"),
  cost: yup.string().required("این فیلد الزامی می باشد"),
  capacity: yup.string().required("این فیلد الزامی می باشد"),
  sessionNumber: yup.string().required("این فیلد الزامی می باشد"),
  miniDescribe: yup.string().required("این فیلد الزامی می باشد"),
});
