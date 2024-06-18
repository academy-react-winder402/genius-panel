// ** React Imports
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// ** Core Imports
import { deleteCourseAPI } from "../core/services/api/course/delete-course.api";

const MySwal = withReactContent(Swal);

export const handleDeleteCourse = async (isDeleted, courseId, setIsDeleted) => {
  MySwal.fire({
    title: isDeleted
      ? "آیا از بازگردانی دوره مطمئن هستید؟"
      : "آیا از حذف دوره مطمئن هستید ؟",
    text: isDeleted
      ? "در صورت بازگردانی دوره،دوره برای کاربران قابل رویت بود ."
      : "در صورت حذف دوره، دوره دیگر برای کاربران قابل رویت نخواهد بود.",
    icon: "warning",
    customClass: {
      confirmButton: "btn btn-primary",
      cancelButton: "btn btn-danger ms-1",
    },
    buttonsStyling: false,
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: isDeleted ? "بازگردانی" : "حذف",
    cancelButtonText: "انصراف",
    showLoaderOnConfirm: true,
    async preConfirm() {
      const deleteCourse = await deleteCourseAPI(isDeleted, courseId);

      if (deleteCourse) {
        if (setIsDeleted) setIsDeleted((prev) => !prev);
        toast.success(`دوره با موفقیت ${isDeleted ? "بازگردانی" : "حذف"} شد !`);
      } else toast.error("مشکلی در حذف یا بازگردانی دوره به وجود آمد !");
    },
  });
};
