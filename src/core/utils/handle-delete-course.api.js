// ** React Imports
import toast from "react-hot-toast";

// ** Core Imports
import { deleteCourseAPI } from "../services/api/course/delete-course.api";

export const handleDeleteCourse = async (active, courseId, navigate) => {
  try {
    const deleteCourse = await deleteCourseAPI(active, courseId);
    if (deleteCourse.success) {
      toast.success("دوره با موفقیت حذف شد !");
      navigate("/courses");
    } else toast.error("مشکلی در حذف دوره به وجود آمد ...");
  } catch (error) {
    toast.error("مشکلی در حذف دوره به وجود آمد ...");
  }
};
