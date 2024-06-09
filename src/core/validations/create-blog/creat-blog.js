import * as yup from "yup";

export const createCourseStepOneFormSchema = yup.object().shape({
  title: yup.string().required("این فیلد الزامی می باشد"),
  miniDescribe: yup.string().required("این فیلد الزامی می باشد"),
  googleTitle: yup.string().required("این فیلد الزامی می باشد"),
  googleDescribe: yup.string().required("این فیلد الزامی می باشد"),
});
