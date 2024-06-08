import { useRef, useState } from "react";
import toast from "react-hot-toast";

import BreadCrumbs from "@components/breadcrumbs";
import Wizard from "@components/wizard";

import Global from "../../../@core/components/create-blog/GlobalData";

import { createBlogAPI } from "../../../core/services/api/blog/create-Blog.api";
import { onFormData } from "../../../core/utils/form-data-helper.utils";

import Describe from "../../../@core/components/create-blog/Describe";

const CreateBlogPage = () => {
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState();

  const [miniDescribe, setMiniDescribe] = useState();
  const [describe, setDescribe] = useState();

  const [blogId, setBlogId] = useState();

  const onSubmit = async () => {
    const Data = {
      image: files[0],
      tumbImage: files[0],
      imageAddress: files[0],
      title,
      miniDescribe,
      describe,
    };

    try {
      const formData = onFormData(Data);
      const createBlog = await createBlogAPI(formData);

      if (createBlog.success) {
        toast.success("اخبار با موفقیت ثبت شد !");
        setBlogId(createBlog.id);
        stepper.next();
      } else toast.error(createCourse.message);
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
          handleSubmitFn={onSubmit}
          blogId={blogId}
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

export default CreateBlogPage;
