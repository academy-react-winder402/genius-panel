import { useRef, useState } from "react";
import toast from "react-hot-toast";

import BreadCrumbs from "@components/breadcrumbs";
import Wizard from "@components/wizard";

import Global from "../../../@core/components/create-blog/GlobalData";

import { createBlogAPI } from "../../../core/services/api/blog/create-Blog.api";
import { onFormData } from "../../../core/utils/form-data-helper.utils";

import Describe from "../../../@core/components/create-blog/Describe";
import CheckBox from "../../../@core/components/create-blog/CheckBox";

const CreateBlogPage = () => {
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
  const [data, setDataId] = useState();
  const [createBlogOptions] = useState();

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
        toast.success("اخبار با موفقیت ثبت شد !");
        setDataId(createBlog.id);
        stepper.next();
      } else toast.error(createBlog.message);
    } catch (error) {
      toast.error("مشکلی در ارسال اخبار به وجود آمد !");
    }
  };

  const steps = [
    {
      id: "global-data",
      title: "اطلاعات کلی ",
      subtitle: "اطلاعات کلی اخبار",
      content: (
        <Global
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
        />
      ),
    },
    {
      id: "check-box",
      title: "اطلاعات نهایی اخبار",
      subtitle: "اطلاعات اخبار",
      content: (
        <CheckBox
          stepper={stepper}
          handleSubmitFn={onSubmit}
          data={data}
          createBlogOptions={createBlogOptions}
        />
      ),
    },
  ];
  return (
    <div className="horizontal-wizard">
      <BreadCrumbs
        title="افزودن اخبار"
        data={[{ title: "مدیریت اخبار" }, { title: "افزودن اخبار" }]}
      />
      <Wizard instance={(el) => setStepper(el)} ref={ref} steps={steps} />
    </div>
  );
};

export default CreateBlogPage;
