// ** React Imports
import { useRef, useState } from "react";

// ** Custom Components
import Wizard from "@components/wizard";
import BreadCrumbs from "../@core/components/breadcrumbs";

// ** Steps
import GlobalData from "../@core/components/create-course/steps/GlobalData";
import UploadImage from "../@core/components/create-course/steps/UploadImage";
import AdvanceData from "../@core/components/create-course/steps/AdvanceData";

// ** Icons Imports
import { FileText, User, MapPin, Link } from "react-feather";

const CreateCoursePage = () => {
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);

  const steps = [
    {
      id: "upload-image",
      title: "آپلود عکس",
      subtitle: "آپلود عکس دوره",
      content: <UploadImage stepper={stepper} />,
    },
    {
      id: "global-data",
      title: "اطلاعات عمومی",
      subtitle: "اطلاعات عمومی دوره",
      content: <GlobalData stepper={stepper} />,
    },
    {
      id: "advance-data",
      title: "اطلاعات پیشرفته",
      subtitle: "اطلاعات پیشرفته دوره",
      content: <AdvanceData stepper={stepper} />,
    },
    // {
    //   id: "step-address",
    //   title: "Address",
    //   subtitle: "Add Address",
    //   content: <Address stepper={stepper} />,
    // },
    // {
    //   id: "social-links",
    //   title: "Social Links",
    //   subtitle: "Add Social Links",
    //   content: <SocialLinks stepper={stepper} />,
    // },
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
