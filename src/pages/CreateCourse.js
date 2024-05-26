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
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [courseLevelValue, setCourseLevelValue] = useState();
  const [courseTypeValue, setCourseTypeValue] = useState();
  const [courseTeacherIdValue, setCourseTeacherIdValue] = useState();

  const onSubmit = () => {
    const courseData = {
      image: files[0],
      tumbImage: files[0],
      title,
      cost,
      capacity,
      sessionNumber,
      miniDescribe,
      startDate,
      endDate,
      courseLevelValue,
      courseTypeValue,
      courseTeacherIdValue,
    };

    console.log(courseData);
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
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      ),
    },
    {
      id: "advance-data",
      title: "اطلاعات پیشرفته",
      subtitle: "اطلاعات پیشرفته دوره",
      content: <AdvanceData stepper={stepper} />,
    },
    {
      id: "course-features",
      title: "ویژگی",
      subtitle: "ویژگی های دوره",
      content: (
        <CourseFeatures
          stepper={stepper}
          handleSubmitFn={onSubmit}
          courseLevelState={courseLevelValue}
          courseTypeState={courseTypeValue}
          courseTeacherIdState={courseTeacherIdValue}
          setCourseLevelState={setCourseLevelValue}
          setCourseTypeState={setCourseTypeValue}
          setCourseTeacherIdState={setCourseTeacherIdValue}
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
