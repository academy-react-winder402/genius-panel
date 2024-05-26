// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Utils
import { isObjEmpty } from "@utils";

// ** Third Party Components
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft, ArrowRight } from "react-feather";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Select from "react-select";
import makeAnimated from "react-select/animated";

// ** Reactstrap Imports
import { Button, Col, Form, FormFeedback, Label, Row } from "reactstrap";

// ** API Imports
import { getCreateCourseAPI } from "../../../../core/services/api/course/get-create-course.api";

// ** Validation Import
import { createCourseStepThreeFormSchema } from "../../../../core/validations/create-course/create-course-step-three-form.validation";

// ** Util Imports
import { selectThemeColors } from "../../../../utility/Utils";

const defaultValues = {
  courseType: undefined,
  courseLevel: undefined,
  courseLvlId: undefined,
  courseTypeIdState: undefined,
  teacherIdState: undefined,
  classIdState: undefined,
  termIdState: undefined,
};

const CourseFeatures = ({
  stepper,
  handleSubmitFn,
  courseLvlId,
  courseTypeIdState,
  teacherIdState,
  classIdState,
  termIdState,
  setCourseLvlId,
  setCourseTypeIdState,
  setTeacherIdState,
  setClassIdState,
  setTermIdState,
}) => {
  // ** Hooks
  const [courseTypes, setCourseTypes] = useState();
  const [courseLevels, setCourseLevels] = useState();
  const [classRoom, setClassRoom] = useState();
  const [term, setTerm] = useState();
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
      setCourseTypeIdState(e.courseType.id);
      setCourseLvlId(e.courseLevel?.id);
      setTeacherIdState(e.teacherId?.teacherId);
      setClassIdState(e.classId?.id);
      setTermIdState(+e.termId?.id);
      if (
        courseLvlId !== undefined &&
        courseTypeIdState !== undefined &&
        teacherIdState !== undefined &&
        classIdState !== undefined &&
        termIdState !== undefined
      ) {
        handleSubmitFn();
      }
    }
  };

  const animatedComponents = makeAnimated();

  useEffect(() => {
    const getCreateCourse = async () => {
      try {
        const response = await getCreateCourseAPI();

        setCourseTypes(response.courseTypeDtos);
        setCourseLevels(response.courseLevelDtos);
        setTeachers(response.teachers);
        setClassRoom(response.classRoomDtos);
        setTerm(response.termDtos);
      } catch (error) {
        toast.error("مکشلی در دریافت داده ها به وجود آمد !");
      }
    };

    getCreateCourse();
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
                  getOptionValue={(type) => type.id}
                  getOptionLabel={(type) => type.typeName}
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
                  getOptionValue={(level) => level.id}
                  getOptionLabel={(level) => level.levelName}
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
                  getOptionValue={(teacher) => teacher.teacherId}
                  getOptionLabel={(teacher) => teacher.fullName}
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
          <Col md="6" className="mb-1">
            <Label className="form-label" for="classId">
              انتخاب کلاس
            </Label>
            <Controller
              id="classId"
              name="classId"
              control={control}
              render={({ field }) => (
                <Select
                  theme={selectThemeColors}
                  className="react-select"
                  classNamePrefix="select"
                  name="classId"
                  options={classRoom}
                  getOptionValue={(classRoom) => classRoom.id}
                  getOptionLabel={(classRoom) => classRoom.classRoomName}
                  isClearable
                  components={animatedComponents}
                  {...field}
                />
              )}
            />
            {errors.classId && (
              <FormFeedback>{errors.classId.message}</FormFeedback>
            )}
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="termId">
              وضعیت دوره
            </Label>
            <Controller
              id="termId"
              name="termId"
              control={control}
              render={({ field }) => (
                <Select
                  theme={selectThemeColors}
                  className="react-select"
                  classNamePrefix="select"
                  name="termId"
                  options={term}
                  getOptionValue={(term) => term.id}
                  getOptionLabel={(term) => term.termName}
                  isClearable
                  components={animatedComponents}
                  {...field}
                />
              )}
            />
            {errors.termId && (
              <FormFeedback>{errors.termId.message}</FormFeedback>
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
