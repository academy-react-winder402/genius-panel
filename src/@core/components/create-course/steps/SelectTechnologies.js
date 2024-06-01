// ** React Imports
import { Fragment } from "react";

// ** Third Party Components
import { ArrowLeft, ArrowRight } from "react-feather";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// ** Reactstrap Imports
import { Button, Col, Form, FormFeedback, Label, Row } from "reactstrap";

// ** Core Imports
import { addCourseTechnologyAPI } from "../../../../core/services/api/course/add-course-technology.api";

// ** Util Imports
import { selectThemeColors } from "../../../../utility/Utils";

const defaultValues = {
  technologies: undefined,
};

const SelectTechnologies = ({ stepper, createCourseOptions, courseId }) => {
  // ** Hooks
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const onSubmit = async (e) => {
    const convertTechnologies = e.technologies.map((technology) => ({
      techId: technology.id,
    }));

    try {
      const addTechnology = await addCourseTechnologyAPI(
        courseId,
        convertTechnologies
      );

      if (addTechnology.success) {
        toast.success("تکنولوژی های این دوره با موفقیت اضافه شد !");
        navigate("/courses");
      } else toast.error("مکشلی در افزودن تکنولوژی ها به وجود آمد !");
    } catch (error) {
      toast.error("مکشلی در افزودن تکنولوژی ها به وجود آمد !");
    }
  };

  const animatedComponents = makeAnimated();

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">تکنولوژی های دوره</h5>
        <small className="text-muted">
          در این بخش باید تکنولوژی های دوره را انتخاب کنید.
        </small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="technologies">
              تکنولوژی های دوره
            </Label>
            <Controller
              id="technologies"
              name="technologies"
              control={control}
              render={({ field }) => (
                <Select
                  theme={selectThemeColors}
                  className="react-select"
                  classNamePrefix="select"
                  name="technologies"
                  options={createCourseOptions?.technologyDtos}
                  getOptionValue={(technology) => technology.id}
                  getOptionLabel={(technology) => technology.techName}
                  onChange={(e) => console.log(e)}
                  isClearable
                  isMulti
                  components={animatedComponents}
                  {...field}
                />
              )}
            />
            {errors.technologies && (
              <FormFeedback>{errors.technologies.message}</FormFeedback>
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

export default SelectTechnologies;
