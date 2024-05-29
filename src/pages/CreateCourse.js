// ** React Imports
import { useRef, useState } from "react";

// ** Custom Components
import Wizard from "@components/wizard";
import BreadCrumbs from "@components/breadcrumbs";

// ** Steps
import GlobalData from "../@core/components/create-course/steps/GlobalData";
import UploadImage from "../@core/components/create-course/steps/UploadImage";
import AdvanceData from "../@core/components/create-course/steps/AdvanceData";
import CourseFeatures from "../@core/components/create-course/steps/CourseFeatures";

// ** Icons Imports
import { FileText, User, MapPin, Link } from "react-feather";
import { onFormData } from "../core/utils/form-data-helper.utils";
import { createCourseAPI } from "../core/services/api/course/create-course.api";
import toast from "react-hot-toast";

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

  const onSubmit = async () => {
    const courseData = {
      image: files[0],
      tumbImage: files[0],
      imageAddress: files[0],
      tumbImageAddress: files[0],
      title,
      cost,
      capacity,
      sessionNumber,
      miniDescribe,
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
      describe: miniDescribe,
    };

    try {
      const formData = onFormData(courseData);
      const createCourse = await createCourseAPI(formData);

      if (createCourse.success) toast.success("دوره با موفقیت ثبت شد !");
      else toast.error(createCourse.message)
    } catch (error) {
      toast.error("مشکلی در ارسال دوره به وجود آمد !");
    }
  };

  const steps = [
    {
      id: "upload-image",
      title: "آپلود عکس",
      subtitle: "آپلود عکس دوره",
      content: (
        <UploadImage stepper={stepper} files={files} setFiles={setFiles} />
      ),
    },
    {
      id: "global-data",
      title: "اطلاعات عمومی",
      subtitle: "اطلاعات عمومی دوره",
      content: (
        <GlobalData
          stepper={stepper}
          setTitle={setTitle}
          setCost={setCost}
          setCapacity={setCapacity}
          setSessionNumber={setSessionNumber}
          setMiniDescribe={setMiniDescribe}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
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
  ];

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
