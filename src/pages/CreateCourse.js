// ** React Imports
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

// ** Custom Components
import BreadCrumbs from "@components/breadcrumbs";
import Wizard from "@components/wizard";
import SelectTechnologies from "../@core/components/create-course/steps/selectTechnologies";

// ** Steps
import AdvanceData from "../@core/components/create-course/steps/AdvanceData";
import CourseFeatures from "../@core/components/create-course/steps/CourseFeatures";
import GlobalData from "../@core/components/create-course/steps/GlobalData";

// ** Core Imports
import { createCourseAPI } from "../core/services/api/course/create-course.api";
import { getCreateCourseAPI } from "../core/services/api/course/get-create-course.api";
import { onFormData } from "../core/utils/form-data-helper.utils";

// ** Custom Components
import Describe from "../@core/components/create-course/steps/Describe";

const CreateCoursePage = () => {
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState();
  const [cost, setCost] = useState();
  const [capacity, setCapacity] = useState();
  const [sessionNumber, setSessionNumber] = useState();
  const [miniDescribe, setMiniDescribe] = useState();
  const [describe, setDescribe] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [courseLvlId, setCourseLvlId] = useState();
  const [courseTypeIdState, setCourseTypeIdState] = useState();
  const [teacherIdState, setTeacherIdState] = useState();
  const [classIdState, setClassIdState] = useState();
  const [termIdState, setTermIdState] = useState();
  const [googleTitle, setGoogleTitle] = useState();
  const [googleSchema, setGoogleSchema] = useState();
  const [uniqueUrlString, setUniqueUrlString] = useState();
  const [shortLink, setShortLink] = useState();
  const [courseId, setCourseId] = useState();
  const [createCourseOptions, setCreateCourseOptions] = useState();

  const onSubmit = async () => {
    const courseData = {
      image: files[0],
      tumbImage: files[0],
      imageAddress: files[0],
      title,
      cost,
      capacity,
      sessionNumber,
      miniDescribe,
      describe,
      startTime,
      endTime,
      courseLvlId,
      courseTypeId: courseTypeIdState,
      classId: classIdState,
      tremId: termIdState,
      teacherId: teacherIdState,
      googleTitle,
      googleSchema,
      uniqeUrlString: uniqueUrlString,
      shortLink,
    };

    try {
      const formData = onFormData(courseData);
      const createCourse = await createCourseAPI(formData);

      if (createCourse.success) {
        toast.success("دوره با موفقیت ثبت شد !");
        setCourseId(createCourse.id);
        stepper.next();
      } else toast.error(createCourse.message);
    } catch (error) {
      toast.error("مشکلی در ارسال دوره به وجود آمد !");
    }
  };

  const steps = [
    {
      id: "global-data",
      title: "اطلاعات عمومی",
      subtitle: "اطلاعات عمومی دوره",
      content: (
        <GlobalData
          stepper={stepper}
          title={title}
          cost={cost}
          capacity={capacity}
          sessionNumber={sessionNumber}
          miniDescribe={miniDescribe}
          startTime={startTime}
          endTime={endTime}
          setTitle={setTitle}
          setCost={setCost}
          setCapacity={setCapacity}
          setSessionNumber={setSessionNumber}
          setMiniDescribe={setMiniDescribe}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
          files={files}
          setFiles={setFiles}
        />
      ),
    },
    {
      id: "describe",
      title: "توضیحات",
      subtitle: "توضیحات دوره",
      content: (
        <Describe
          stepper={stepper}
          setDescribe={setDescribe}
          describe={describe}
        />
      ),
    },
    {
      id: "advance-data",
      title: "اطلاعات پیشرفته",
      subtitle: "اطلاعات پیشرفته دوره",
      content: (
        <AdvanceData
          stepper={stepper}
          setGoogleTitle={setGoogleTitle}
          setGoogleSchema={setGoogleSchema}
          setUniqueUrlString={setUniqueUrlString}
          setShortLink={setShortLink}
        />
      ),
    },
    {
      id: "course-features",
      title: "ویژگی",
      subtitle: "ویژگی های دوره",
      content: (
        <CourseFeatures
          stepper={stepper}
          handleSubmitFn={onSubmit}
          createCourseOptions={createCourseOptions}
          courseLvlId={courseLvlId}
          courseTypeIdState={courseTypeIdState}
          teacherIdState={teacherIdState}
          classIdState={classIdState}
          termIdState={termIdState}
          setCourseLvlId={setCourseLvlId}
          setCourseTypeIdState={setCourseTypeIdState}
          setTeacherIdState={setTeacherIdState}
          setClassIdState={setClassIdState}
          setTermIdState={setTermIdState}
        />
      ),
    },
    {
      id: "select-technologies",
      title: "انحخاب تکنولوژی ها",
      subtitle: "تکنولوژی های دوره",
      content: (
        <SelectTechnologies
          stepper={stepper}
          handleSubmitFn={onSubmit}
          courseId={courseId}
          createCourseOptions={createCourseOptions}
        />
      ),
    },
  ];

  useEffect(() => {
    const getCreateCourse = async () => {
      try {
        const response = await getCreateCourseAPI();

        setCreateCourseOptions(response);
      } catch (error) {
        toast.error("مکشلی در دریافت داده ها به وجود آمد !");
      }
    };

    getCreateCourse();
  }, []);

  return (
    <div className="horizontal-wizard">
      <BreadCrumbs
        title="افزودن دوره"
        data={[{ title: "مدیریت دوره ها" }, { title: "افزودن دوره" }]}
      />
      <Wizard instance={(el) => setStepper(el)} ref={ref} steps={steps} />
    </div>
  );
};

export default CreateCoursePage;
