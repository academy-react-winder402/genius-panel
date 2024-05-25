// ** React Imports
import { useRef, useState } from "react";

// ** Custom Components
import Wizard from "@components/wizard";

// ** Steps
import GlobalData from "../@core/components/create-course/steps/GlobalData";

// ** Icons Imports
import { FileText, User, MapPin, Link } from "react-feather";
import BreadCrumbs from "../@core/components/breadcrumbs";

const CreateCoursePage = () => {
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);

  const steps = [
    {
      id: "globalData",
      title: "اطلاعات عمومی",
      subtitle: "در این بخش باید اطلاعات عمومی دوره را وارد کنید.",
      content: <GlobalData stepper={stepper} />,
    },
    // {
    //   id: "personal-info",
    //   title: "Personal Info",
    //   subtitle: "Add Personal Info",
    //   content: <PersonalInfo stepper={stepper} />,
    // },
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
