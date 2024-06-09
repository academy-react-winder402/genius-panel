import { Fragment, useEffect } from "react";

import { isObjEmpty } from "@utils";

import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";
import { yupResolver } from "@hookform/resolvers/yup";

import { Form, Label, Input, Row, Col, Button, FormFeedback } from "reactstrap";

import { createCourseStepOneFormSchema } from "../../../core/validations/create-course/create-course-step-one-form.validation";

import FileUploaderSingle from "../FileUploaderSingle";

const defaultValues = {
  title: "",
  miniDescribe: "",
  googleTitle: "",
  googleDescribe: "",
};

const Global = ({
  stepper,
  title,
  googleTitle,
  setGoogleTitle,
  googleDescribe,
  setGoogleDescribe,
  miniDescribe,
  setTitle,
  setMiniDescribe,
  files,
  setFiles,
}) => {
  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(createCourseStepOneFormSchema),
  });

  const onSubmit = (e) => {
    if (isObjEmpty(errors)) {
      const { title, miniDescribe, googleTitle, googleDescribe } = e;

      setTitle(title);
      setMiniDescribe(miniDescribe);
      setGoogleTitle(googleTitle);
      setGoogleDescribe(googleDescribe);

      if (title && miniDescribe) {
        stepper.next();
      }
    }
  };

  useEffect(() => {
    if (title && miniDescribe && googleTitle && googleDescribe) {
      stepper.next();
    }
  }, [title, miniDescribe, googleTitle, googleDescribe]);

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">اطلاعات کلی اخبار</h5>
        <small className="text-muted">
          در این بخش باید اطلاعات اخبار را وارد کنید.
        </small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="title">
              عنوان
            </Label>
            <Controller
              id="title"
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  id="title"
                  placeholder="عنوان اخبار"
                  invalid={errors.title && true}
                  {...field}
                />
              )}
            />
            {errors.title && (
              <FormFeedback>{errors.title.message}</FormFeedback>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="googleTitle">
              عنوان گوگل
            </Label>
            <Controller
              id="googleTitle"
              name="googleTitle"
              control={control}
              render={({ field }) => (
                <Input
                  id="googleTitle"
                  placeholder="عنوان گوگل اخبار"
                  invalid={errors.googleTitle && true}
                  {...field}
                />
              )}
            />
            {errors.googleTitle && (
              <FormFeedback>{errors.googleTitle.message}</FormFeedback>
            )}
          </Col>
        </Row>
        <Row className="mb-1">
          <Col md="6">
            <Label className="form-label" for="miniDescribe">
              توضیح کوتاه
            </Label>
            <Controller
              control={control}
              id="miniDescribe"
              name="miniDescribe"
              render={({ field }) => (
                <Input
                  type="textarea"
                  id="miniDescribe"
                  placeholder="توضیح کوتاه"
                  invalid={errors.title && true}
                  {...field}
                />
              )}
            />
            {errors.miniDescribe && (
              <FormFeedback>{errors.miniDescribe.message}</FormFeedback>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="googleDescribe">
              توضیحات گوگل
            </Label>
            <Controller
              id="googleDescribe"
              name="googleDescribe"
              control={control}
              render={({ field }) => (
                <Input
                  type="textarea"
                  id="googleDescribe"
                  placeholder="توضیحات گوگل اخبار"
                  invalid={errors.googleDescribe && true}
                  {...field}
                />
              )}
            />
            {errors.googleDescribe && (
              <FormFeedback>{errors.googleDescribe.message}</FormFeedback>
            )}
          </Col>
        </Row>
        <div className="mt-4">
          <h5>آپلود عکس اخبار</h5>
          <FileUploaderSingle files={files} setFiles={setFiles} />
        </div>
        <div className="d-flex justify-content-between">
          <Button type="button" color="primary" className="btn-prev" disabled>
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

export default Global;
