// ** React Imports
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import LinkTool from "@editorjs/link";
import RawTool from "@editorjs/raw";
import SimpleImage from "@editorjs/simple-image";
import Checklist from "@editorjs/checklist";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";
import Quote from "@editorjs/quote";
import Table from "editorjs-table";
import Warning from "@editorjs/warning";
import Delimiter from "@editorjs/delimiter";

import { yupResolver } from "@hookform/resolvers/yup";
import { Fragment, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

// ** Utils
import { isObjEmpty } from "@utils";

// ** Icons Components
import { ArrowLeft, ArrowRight } from "react-feather";

// ** Reactstrap Imports
import { Button, Col, Form, Row } from "reactstrap";

// ** Validation Import
import { createCourseStepThreeFormSchema } from "../../../../core/validations/create-course/create-course-step-three-form.validation";
import Headline from "../../../../core/utils/headline-class-helper.utils";

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
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(createCourseStepThreeFormSchema),
  });

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
      autofocus: true,
      tools: {
        header: Header,
        linkTool: {
          class: LinkTool,
          config: {
            endpoint: "http://localhost:3000/fetchUrl", // Your backend endpoint for url data fetching
          },
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
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        embed: {
          class: Embed,
          config: {
            services: {
              youtube: true,
              coub: true,
            },
          },
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+O",
          config: {
            quotePlaceholder: "Enter a quote",
            captionPlaceholder: "Quote's author",
          },
        },
        delimiter: Delimiter,
        warning: {
          class: Warning,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+W",
          config: {
            titlePlaceholder: "Title",
            messagePlaceholder: "Message",
          },
        },
        table: {
          class: Table,
        },
        headline: {
          class: Headline,
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
          <Col md="12" className="mb-1"></Col>
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
