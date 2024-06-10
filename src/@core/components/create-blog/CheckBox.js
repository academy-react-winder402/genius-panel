// ** React Imports
import { Fragment } from "react";

import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

// ** Third Party Components
import { ArrowLeft, ArrowRight } from "react-feather";
import { useForm } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// ** Reactstrap Imports
import { Button, Col, Form, FormFeedback, Label, Row } from "reactstrap";

// ** Core Imports
import { createBlogAPI } from "../../../core/services/api/blog/create-Blog.api";

// ** Util Imports
import { selectThemeColors } from "../../../utility/Utils";

const defaultValues = {
  blog: undefined,
};

const CheckBox = ({ stepper, createBlogOptions, data }) => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const onSubmit = async (e) => {
    const convertBlog = e.blog.map((blog) => ({
      blogId: blog.id,
    }));

    try {
      const addBlog = await createBlogAPI(data, convertBlog);

      if (addBlog.success) {
        toast.success("اطلاعات با موفقیت ثبت شد !");
        navigate("/add-blog");
      } else toast.error("مشکلی در ثبت اطلاعات به وجود آمد !");
    } catch (error) {
      toast.error("مشکلی در ثبت اطلاعات به وجود آمد !");
    }
  };

  const animatedComponents = makeAnimated();

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">اطلاعات نهایی اخبار</h5>
        <small className="text-muted">
          در این بخش باید بگین خبر در اسلایدر صفحه اخبار باشد یا نه.
        </small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup row>
          <Col md="6" className="mb-1">
            <FormControlLabel
              id="blog"
              name="blog"
              control={<Checkbox />}
              label="نمایش در اسلایدر"
              labelPlacement="end"
              render={({ field }) => (
                <Select
                  theme={selectThemeColors}
                  className="react-select"
                  classNamePrefix="Checkbox"
                  name="blog"
                  options={createBlogOptions?.blogDtos}
                  getOptionValue={(blog) => blog.id}
                  getOptionLabel={(blog) => blog.blogName}
                  onChange={(e) => console.log(e)}
                  isClearable
                  isMulti
                  components={animatedComponents}
                  {...field}
                />
              )}
            />
            {errors.blog && <FormFeedback>{errors.blog.message}</FormFeedback>}
          </Col>
        </FormGroup>
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
            <span className="align-middle d-sm-inline-block d-none">ثبت</span>
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

export default CheckBox;
