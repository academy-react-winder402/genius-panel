// ** React Imports
import { useRef, useState } from "react";
import toast from "react-hot-toast";

import BreadCrumbs from "@components/breadcrumbs";
import Wizard from "@components/wizard";

import Global from "../../../@core/components/create-blog/GlobalData";

// ** Core Imports
import { createBlogAPI } from "../../../core/services/api/blog/create-Blog.api";
import { onFormData } from "../../../core/utils/form-data-helper.utils";

// ** Custom Components
import Describe from "../../../@core/components/create-blog/Describe";

const AddBlog = () => {
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState();
  const [miniDescribe, setMiniDescribe] = useState();
  const [describe, setDescribe] = useState();
  const [data, setDataId] = useState();

  const onSubmit = async () => {
    const blogData = {
      image: files[0],
      tumbImage: files[0],
      imageAddress: files[0],
      title,
      miniDescribe,
      describe,
      data,
    };

    try {
      const formData = onFormData(blogData);
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
      title: "اطلاعات عمومی",
      subtitle: "اطلاعات عمومی دوره",
      content: (
        <Global
          stepper={stepper}
          title={title}
          handleSubmitFn={onSubmit}
          miniDescribe={miniDescribe}
          setTitle={setTitle}
          setMiniDescribe={setMiniDescribe}
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

export default AddBlog;
