// ** React Imports
import { Fragment, useEffect } from "react";

// ** Third Party Components
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Reactstrap Imports
import { Form, Label, Input, Row, Col, Button, FormFeedback } from "reactstrap";

// ** Core Import
import { createCourseStepOneFormSchema } from "../../../core/validations/create-course/create-course-step-one-form.validation";

// ** Custom Components
import FileUploaderSingle from "../FileUploaderSingle";
import { createBlogAPI } from "../../../core/services/api/blog/create-Blog.api";

const defaultValues = {
  title: "",
  miniDescribe: "",
};

const Global = ({ title, miniDescribe, data, files, setFiles }) => {
  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(createCourseStepOneFormSchema),
  });

  const onSubmit = async (e) => {
    const convertBlog = e.blogs.map((blog) => ({
      data: blog.id,
    }));

    try {
      const addBlog = await createBlogAPI(data, convertBlog);

      if (addBlog.success) {
        toast.success("اطلاعات اخبار با موفقیت اضافه شد !");
        navigate("/add-blog");
      } else toast.error("مکشلی در افزودن اخبار به وجود آمد !");
    } catch (error) {
      toast.error("مکشلی در افزودن اخبار به وجود آمد !");
    }
  };

  useEffect(() => {
    if (title && miniDescribe) {
    }
  }, [title, miniDescribe]);

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
                  placeholder="موضوع اخبار"
                  invalid={errors.title && true}
                  {...field}
                />
              )}
            />
            {errors.title && (
              <FormFeedback>{errors.title.message}</FormFeedback>
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
