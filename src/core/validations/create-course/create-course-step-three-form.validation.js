import * as yup from "yup";

export const createCourseStepThreeFormSchema = yup.object().shape({
  courseType: yup
    .object()
    .shape({
      value: yup.string().required("این فیلد الزامی می باشد"),
      label: yup.string().required("این فیلد الزامی می باشد"),
    })
    .required("این فیلد الزامی می باشد"),
  courseLevel: yup
    .object()
    .shape({
      value: yup.string().required("این فیلد الزامی می باشد"),
      label: yup.string().required("این فیلد الزامی می باشد"),
    })
    .required("این فیلد الزامی می باشد"),
  teacherId: yup
    .object()
    .shape({
      value: yup.string().required("این فیلد الزامی می باشد"),
      label: yup.string().required("این فیلد الزامی می باشد"),
    })
    .required("این فیلد الزامی می باشد"),
});
