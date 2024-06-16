// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";

// ** Third Party Components
import { Controller, useForm } from "react-hook-form";

// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";

// ** Core Imports
import { addCourseGroupAPI } from "../../../core/services/api/course/course-group/add-course-group.api";

// ** Utils
import { onFormData } from "../../../core/utils/form-data-helper.utils";
import { selectThemeColors } from "../../../utility/Utils";

// ** Reactstrap Imports
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
} from "reactstrap";

// ** Styles
import "@styles/base/pages/page-blog.scss";
import "@styles/base/plugins/forms/form-quill-editor.scss";
import "@styles/react/libs/editor/editor.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import { getCourseListAPI } from "../../../core/services/api/course/get-course-list.api";
import { convertOptions } from "../../../core/utils/convert-options-helper.utils";

const CourseGroupForm = ({ group }) => {
  // ** States
  const [courses, setCourses] = useState();

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      groupName: "",
      groupCapacity: "",
      courseId: "",
    },
  });
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const { groupName, groupCapacity, courseId } = values;

      const data = onFormData({
        groupName,
        groupCapacity,
        courseId: courseId.value,
      });

      const sendCourseGroup = group
        ? await addCourseGroupAPI(data)
        : await addCourseGroupAPI(data);

      if (sendCourseGroup.success) {
        toast.success(`گروه با موفقیت ${group ? "ویرایش" : "ایجاد"} شد !`);

        navigate("/course-groups");
      } else {
        toast.error(
          `مشکلی در ${group ? "ویرایش" : "ایجاد"} گروه به وجود آمد !`
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(`مشکلی در ${group ? "ویرایش" : "ایجاد"} گروه به وجود آمد !`);
    }
  };

  const animatedComponents = makeAnimated();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const getCourses = await getCourseListAPI(1, 100000);

        const convertCourses = convertOptions(getCourses.courseDtos);

        setCourses(convertCourses);
      } catch (error) {
        toast.error("مشکلی در دریافت دوره ها به وجود آمد !");
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    if (group) {
      setValue("categoryName", group.categoryName);
      setValue("iconName", group.iconName);
      setValue("googleTitle", group.googleTitle);
      setValue("googleDescribe", group.googleDescribe);
    }
  }, [group]);

  return (
    <div className="blog-edit-wrapper">
      <Breadcrumbs
        title="ایجاد گروه"
        data={[
          { title: "مدیریت دوره ها", link: "/courses" },
          { title: "گروه ها", link: "/course-groups" },
          { title: "ایجاد گروه" },
        ]}
      />
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <div>
                <h2 className="mb-25">ایجاد گروه</h2>
              </div>
              <Form
                className="mt-2"
                onSubmit={handleSubmit((values) => onSubmit(values))}
              >
                <Row>
                  <Col md="6" className="mb-2">
                    <Label className="form-label" for="groupName">
                      عنوان گروه
                    </Label>
                    <Controller
                      name="groupName"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="groupName"
                          invalid={errors.groupName && true}
                          {...field}
                        />
                      )}
                    />
                    {errors.groupName && (
                      <FormFeedback>{errors.groupName.message}</FormFeedback>
                    )}
                  </Col>
                  <Col md="6" className="mb-2">
                    <Label className="form-label" for="groupCapacity">
                      ظرفیت گروه
                    </Label>
                    <Controller
                      name="groupCapacity"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="groupCapacity"
                          invalid={errors.groupCapacity && true}
                          {...field}
                        />
                      )}
                    />
                    {errors.groupCapacity && (
                      <FormFeedback>
                        {errors.groupCapacity.message}
                      </FormFeedback>
                    )}
                  </Col>
                  <Col md="6" className="mb-2">
                    <Label className="form-label" for="courseId">
                      دوره
                    </Label>
                    <Controller
                      control={control}
                      id="courseId"
                      name="courseId"
                      render={({ field }) => (
                        <Select
                          theme={selectThemeColors}
                          className="react-select"
                          classNamePrefix="select"
                          name="courseId"
                          options={courses}
                          isClearable
                          components={animatedComponents}
                          {...field}
                        />
                      )}
                    />
                    {errors.courseId && (
                      <FormFeedback>{errors.courseId.message}</FormFeedback>
                    )}
                  </Col>
                  <Col md="12" className="mt-50">
                    <Button type="submit" color="primary" className="me-1">
                      {group ? "ویرایش" : "ایجاد"} گروه
                    </Button>
                    <Button
                      tag={Link}
                      to="/course-groups"
                      color="secondary"
                      outline
                    >
                      انصراف
                    </Button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CourseGroupForm;
