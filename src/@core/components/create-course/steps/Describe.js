// ** React Imports
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import LinkTool from "@editorjs/link";
import RawTool from "@editorjs/raw";
import SimpleImage from "@editorjs/simple-image";
import { yupResolver } from "@hookform/resolvers/yup";
import { Fragment, useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";

// ** Utils
import { isObjEmpty } from "@utils";

// ** Icons Components
import { ArrowLeft, ArrowRight } from "react-feather";

// ** Reactstrap Imports
import { Button, Col, Form, FormFeedback, Label, Row } from "reactstrap";

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

const Describe = ({
  stepper,
  handleSubmitFn,
  createCourseOptions,
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
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(createCourseStepThreeFormSchema),
  });

  const animatedComponents = makeAnimated();

  const editorJsInstance = useRef(null);
  const editorRef = useRef(null);

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

  useEffect(() => {
    if (!editorRef.current) return;

    editorJsInstance.current = new EditorJS({
      holder: editorRef.current,
      data: listObj,
      autofocus: true,
      tools: {
        header: Header,
        linkTool: {
          class: LinkTool,
          config: {
            endpoint: "http://localhost:3000/fetchUrl", // Your backend endpoint for url data fetching
          },
          raw: RawTool,
          image: SimpleImage,
          image: {
            class: ImageTool,
            config: {
              endpoints: {
                byFile: "http://localhost:8008/uploadFile", // Your backend file uploader endpoint
                byUrl: "http://localhost:8008/fetchUrl", // Your endpoint that provides uploading by Url
              },
            },
          },
        },
      },
    });

    return () => {
      if (editorJsInstance.current) {
        editorJsInstance.current.destroy();
        editorJsInstance.current = null;
      }
    };
  }, []);

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">توضیحات دوره</h5>
        <small className="text-muted">
          در این بخش باید توضیحات دوره را وارد کنید.
        </small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="12" className="mb-1">
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
                  options={createCourseOptions?.courseTypeDtos}
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
        </Row>
        <div ref={editorRef}></div>
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

export default Describe;
