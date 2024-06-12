// ** React Imports
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// ** Custom Components
import BreadCrumbs from "@components/breadcrumbs";
import Wizard from "@components/wizard";

// ** Steps
import Describe from "../@core/components/CreateNews/steps/Describe";
import GlobalData from "../@core/components/CreateNews/steps/GlobalData";

// ** Core Imports
import { createBlogAPI } from "../core/services/api/blog/create-Blog.api";
import { onFormData } from "../core/utils/form-data-helper.utils";

const CreateNewsPage = () => {
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState();
  const [miniDescribe, setMiniDescribe] = useState();
  const [describe, setDescribe] = useState();
  const [googleTitle, setGoogleTitle] = useState();
  const [googleDescribe, setGoogleDescribe] = useState();

  // ** Hooks
  const navigate = useNavigate();

  const onSubmit = async () => {
    const Data = {
      image: files[0],
      tumbImage: files[0],
      imageAddress: files[0],
      title,
      googleTitle,
      googleDescribe,
      miniDescribe,
      describe,
    };

    try {
      const formData = onFormData(Data);
      const createBlog = await createBlogAPI(formData);

      if (createBlog.success) {
        toast.success("خبر با موفقیت ثبت شد !");

        navigate("/blogs");
      } else toast.error(createBlog.message);
    } catch (error) {
      toast.error("مشکلی در ارسال خیر به وجود آمد !");
    }
  };

  const steps = [
    {
      id: "global-data",
      title: "اطلاعات عمومی",
      subtitle: "اطلاعات عمومی خبر",
      content: (
        <GlobalData
          stepper={stepper}
          title={title}
          miniDescribe={miniDescribe}
          setTitle={setTitle}
          setGoogleTitle={setGoogleTitle}
          setGoogleDescribe={setGoogleDescribe}
          setMiniDescribe={setMiniDescribe}
          files={files}
          setFiles={setFiles}
        />
      ),
    },
    {
      id: "describe",
      title: "توضیحات",
      subtitle: "توضیحات اخبار",
      content: (
        <Describe
          stepper={stepper}
          setDescribe={setDescribe}
          describe={describe}
          onSubmit={onSubmit}
        />
      ),
    },
  ];
  return (
    <div className="horizontal-wizard">
      <BreadCrumbs
        title="افزودن خبر"
        data={[
          { title: "مدیریت اخبار", links: "/news" },
          { title: "افزودن خبر" },
        ]}
      />
      <Wizard instance={(el) => setStepper(el)} ref={ref} steps={steps} />
    </div>
  );
};

export default CreateNewsPage;