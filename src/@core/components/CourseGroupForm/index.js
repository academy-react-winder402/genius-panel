// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";

// ** Third Party Components
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";

// ** Core Imports
import { addCourseGroupAPI } from "../../../core/services/api/course/course-group/add-course-group.api";
import { getCourseListAPI } from "../../../core/services/api/course/get-course-list.api";
import { courseGroupFormSchema } from "../../../core/validations/course-group-form.validation";

// ** Utils
import { convertOptions } from "../../../core/utils/convert-options-helper.utils";
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
import { findDefaultOption } from "../../../core/utils/default-option-helper.utils";
import { updateCourseGroupAPI } from "../../../core/services/api/course/course-group/update-course-group.api";

const CourseGroupForm = ({ group }) => {
  // ** States
  const [courses, setCourses] = useState([]);
  const [defaultCourse, setDefaultCourse] = useState();

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
    resolver: yupResolver(courseGroupFormSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const { groupName, groupCapacity, courseId } = values;

      const data = onFormData({
        id: group ? group.groupId : undefined,
        groupName,
        groupCapacity,
        courseId: courseId.value,
      });

      const sendCourseGroup = group
        ? await updateCourseGroupAPI(data)
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
      if (courses.length > 0) {
        const findCourseId = findDefaultOption(courses, group.courseId);

        setValue("courseId", findCourseId);

        setDefaultCourse(findCourseId);
      }

      setValue("groupName", group.groupName);
      setValue("groupCapacity", group.groupCapacity);
    }
  }, [group, courses]);

  return (
    <div className="blog-edit-wrapper">
      <Breadcrumbs
        title={`${group ? "ویرایش" : "ایجاد"} گروه`}
        data={[
          { title: "مدیریت دوره ها", link: "/courses" },
          { title: "گروه ها", link: "/course-groups" },
          { title: `${group ? "ویرایش" : "ایجاد"} گروه` },
        ]}
      />
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <div>
                <h2 className="mb-25">{group ? "ویرایش" : "ایجاد"} گروه</h2>
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
                          defaultInputValue={group && defaultCourse?.label}
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
