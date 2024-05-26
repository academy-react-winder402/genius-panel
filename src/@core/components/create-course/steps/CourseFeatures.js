// ** React Imports
import { Fragment, useEffect, useState } from "react";
// Package Imports
import DatePicker from "react-multi-date-picker";

// ** Utils
import { isObjEmpty } from "@utils";

// ** Third Party Components
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import toast from "react-hot-toast";

// ** Reactstrap Imports
import { Form, Label, Input, Row, Col, Button, FormFeedback } from "reactstrap";

// ** API Imports
import { getCourseTypesAPI } from "../../../../core/services/api/course/get-course-types.api";
import { getAllCourseLevelAPI } from "../../../../core/services/api/course/get-all-course-level.api";

// ** Validation Import
import { createCourseStepThreeFormSchema } from "../../../../core/validations/create-course/create-course-step-three-form.validation";

// ** Util Imports
import { selectThemeColors } from "../../../../utility/Utils";
import { getTeachersAPI } from "../../../../core/services/api/teacher/get-teachers.api";

const defaultValues = {
  courseType: "",
  courseLevel: "",
  courseTeacherId: "",
};

const CourseFeatures = ({
  stepper,
  handleSubmitFn,
  courseLevelState,
  courseTypeState,
  courseTeacherIdState,
  setCourseLevelState,
  setCourseTypeState,
  setCourseTeacherIdState,
}) => {
  // ** Hooks
  const [courseTypes, setCourseTypes] = useState();
  const [courseLevels, setCourseLevels] = useState();
  const [teachers, setTeachers] = useState();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(createCourseStepThreeFormSchema),
  });

  const onSubmit = (e) => {
    if (isObjEmpty(errors)) {
      setCourseTypeState(e.courseType.value);
      setCourseLevelState(e.courseLevel.value);
      setCourseTeacherIdState(e.teacherId.value);

      if (
        courseLevelState !== undefined &&
        courseTypeState !== undefined &&
        courseTeacherIdState !== undefined
      ) {
        handleSubmitFn();
      }
    }
  };

  const animatedComponents = makeAnimated();

  useEffect(() => {
    const fetchCourseTypes = async () => {
      try {
        const getCourseTypes = await getCourseTypesAPI();

        const convertCourseTypesToObj = getCourseTypes.map((type) => ({
          value: type.id,
          label: type.typeName,
        }));

        setCourseTypes(convertCourseTypesToObj);
      } catch (error) {
        toast.error("مشکلی در دریافت تایپ دوره ها به وجود آمد !");
      }
    };
    const fetchCourseLevels = async () => {
      try {
        const getCourseLevels = await getAllCourseLevelAPI();

        const convertCourseLevelsToObj = getCourseLevels.map((type) => ({
          value: type.id,
          label: type.levelName,
        }));

        setCourseLevels(convertCourseLevelsToObj);
      } catch (error) {
        toast.error("مشکلی در دریافت سطح دوره ها به وجود آمد !");
      }
    };
    const fetchTeachers = async () => {
      try {
        const getTeachers = await getTeachersAPI();

        const convertTeachersToObj = getTeachers.map((type) => ({
          value: type.teacherId,
          label: type.fullName,
        }));

        setTeachers(convertTeachersToObj);
      } catch (error) {
        toast.error("مشکلی در دریافت اساتید به وجود آمد !");
      }
    };

    fetchCourseTypes();
    fetchCourseLevels();
    fetchTeachers();
  }, []);

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">ویژگی های دوره</h5>
        <small className="text-muted">
          در این بخش باید ویژگی های دوره را وارد کنید.
        </small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="courseType">
              نوع دوره
            </Label>
            <Controller
              id="courseType"
              name="courseType"
              control={control}
              render={({ field }) => (
                <Select
                  theme={selectThemeColors}
                  className="react-select"
                  classNamePrefix="select"
                  name="courseType"
                  options={courseTypes}
                  isClearable
                  components={animatedComponents}
                  {...field}
                />
              )}
            />
            {errors.courseType && (
              <FormFeedback>{errors.courseType.message}</FormFeedback>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="courseLevel">
              سطح دوره
            </Label>
            <Controller
              control={control}
              id="courseLevel"
              name="courseLevel"
              render={({ field }) => (
                <Select
                  theme={selectThemeColors}
                  className="react-select"
                  classNamePrefix="select"
                  name="courseLevel"
                  options={courseLevels}
                  isClearable
                  components={animatedComponents}
                  {...field}
                />
              )}
            />
            {errors.courseLevel && (
              <FormFeedback>{errors.courseLevel.message}</FormFeedback>
            )}
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="teacherId">
              استاد دوره
            </Label>
            <Controller
              id="teacherId"
              name="teacherId"
              control={control}
              render={({ field }) => (
                <Select
                  theme={selectThemeColors}
                  className="react-select"
                  classNamePrefix="select"
                  name="teacherId"
                  options={teachers}
                  isClearable
                  components={animatedComponents}
                  {...field}
                />
              )}
            />
            {errors.teacherId && (
              <FormFeedback>{errors.teacherId.message}</FormFeedback>
            )}
          </Col>
        </Row>
        <div className="d-flex justify-content-between">
          <Button
            type="button"
            color="primary"
            className="btn-prev"
            onClick={() => stepper.previous()}
          >
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">قبلی</span>
          </Button>
          <Button type="submit" color="primary" className="btn-next">
            <span className="align-middle d-sm-inline-block d-none">بعدی</span>
            <ArrowRight
              size={14}
              className="align-middle ms-sm-25 ms-0"
            ></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default CourseFeatures;
