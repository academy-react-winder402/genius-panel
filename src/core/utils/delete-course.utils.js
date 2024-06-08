// ** React Imports
import toast from "react-hot-toast";

// ** Core Imports
import { deleteCourseAPI } from "../services/api/course/delete-course.api";

export const handleDeleteCourse = async (selectedRows, redirectUrl) => {
  try {
    selectedRows.map(async (course) => {
      const deleteCourse = await deleteCourseAPI(
        course.isdelete,
        course.courseId
      );

      if (deleteCourse.success) {
        toastt.success(
          `دوره با موفقیت ${course.isdelete ? "بازگردانی" : "حذف"} شد !`
        );
        navigate(redirectUrl);
      } else
        toast.error(
          `مشکلی در ${
            course.isdelete ? "بازگردانی" : "حذف"
          } دوره به وجود آمد ...`
        );
    });
  } catch (error) {
    toast.error("مشکلی در حذف یا بازگردانی دوره به وجود آمد ...");
  }
};
