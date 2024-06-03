// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

// ** Reactstrap Import
import { Badge, Tooltip } from "reactstrap";

// ** Icon Imports
import { Check, X } from "react-feather";

// ** Core Imports
import { getCourseGroupAPI } from "../../../core/services/api/course/course-group/get-course-group.api";
import { sendReserveToCourseAPI } from "../../../core/services/api/course/course-reserve/send-reserve-to-course.api";
import { getCourseByIdAPI } from "../../../core/services/api/course/get-course-by-id.api";
import { getUserWithIdAPI } from "../../../core/services/api/user/get-user-with-id.api";
import { deleteCourseReserveAPI } from "../../../core/services/api/course/course-reserve/delete-course-reserve.api";

// ** Utils Imports
import { convertDateToPersian } from "../../../core/utils/date-helper.utils";

// ** Image Imports
import blankThumbnail from "../../../assets/images/common/blank-thumbnail.jpg";

export const COURSE_RESERVED_COLUMNS = [
  {
    name: "نام رزرو کننده",
    reorder: true,
    minWidth: "250px",
    cell: (row) => {
      const [user, setUser] = useState();

      useEffect(() => {
        const fetchUser = async () => {
          try {
            const getUser = await getUserWithIdAPI(row.studentId);

            setUser(getUser);
          } catch (error) {
            toast.error("مشکلی در دریافت کاربر به وجود آمد !");
          }
        };

        fetchUser();
      }, []);

      return (
        <Link
          to={`/users/${row.studentId}`}
          className="d-flex align-items-center"
        >
          <img
            src={
              user?.currentPictureAddress !== "Not-set"
                ? user?.currentPictureAddress
                : blankThumbnail
            }
            className="student-course-reserve-picture"
          />
          <div className="user-info text-truncate ms-1">
            <span
              to={`/users/${row.studentId}`}
              className="course-reserve-student-name"
            >
              {row.studentName}
            </span>
          </div>
        </Link>
      );
    },
  },
  {
    name: "زمان رزرو",
    reorder: true,
    minWidth: "170px",
    cell: (row) => <span>{convertDateToPersian(row.reserverDate)}</span>,
  },
  {
    name: "وضعیت رزرو",
    reorder: true,
    minWidth: "200px",
    cell: (row) => (
      <Badge color={row.accept ? "light-success" : "light-danger"}>
        {row.accept ? "تایید شده" : "تایید نشده"}
      </Badge>
    ),
  },
  {
    name: "تایید رزرو",
    reorder: true,
    minWidth: "100px",
    cell: (row) => {
      // ** State
      const [addReserveToCourse, setAddReserveToCourse] = useState(false);
      const [deleteCourseReserve, setDeleteCourseReserve] = useState(false);

      const navigate = useNavigate();

      // ** Function for handle change course reserve to student course
      const handleChangeCourseReserveToStudentCourse = async () => {
        try {
          const getCourseDetail = await getCourseByIdAPI(row.courseId);
          const getCourseGroup = await getCourseGroupAPI(
            getCourseDetail.teacherId,
            row.courseId
          );
          const sendReserveToCourse = await sendReserveToCourseAPI(
            row.courseId,
            getCourseGroup[0].groupId,
            row.studentId
          );

          if (sendReserveToCourse.success) {
            toast.success("رزرو با موفقیت تایید شد !");
            navigate("/courses");
          } else {
            toast.error(sendReserveToCourse.ErrorMessage);
          }
        } catch (error) {
          toast.error("مشکلی در تایید رزرو دوره به وجود آمد !");
        }
      };

      // ** Function for handle delete course reserve
      const handleDeleteCourseReserve = async () => {
        try {
          const deleteCourseReserve = await deleteCourseReserveAPI(
            row.reserveId
          );

          if (deleteCourseReserve.success) {
            toast.success("رزرو با موفقیت حذف شد !");
            navigate("/courses");
          } else {
            toast.error("مشکلی در حذف دوره به وجود آمد !");
            toast.error(deleteCourseReserveAPI.message);
          }
        } catch (error) {
          toast.error("مشکلی در حذف رزرو به وجود آمد !");
        }
      };

      return (
        !row.accept && (
          <div>
            <div className="d-flex gap-2">
              <div>
                <Check
                  className="cursor-pointer"
                  id="ChangeCourseReserveToStudentCourse"
                  onClick={handleChangeCourseReserveToStudentCourse}
                />
                <Tooltip
                  placement="top"
                  isOpen={addReserveToCourse}
                  target="ChangeCourseReserveToStudentCourse"
                  toggle={() => setAddReserveToCourse(!addReserveToCourse)}
                  innerClassName="table-tooltip"
                >
                  پذرفتن رزرو
                </Tooltip>
              </div>
              <div>
                <X
                  className="cursor-pointer"
                  id="DeleteCourseReserve"
                  onClick={handleDeleteCourseReserve}
                />
                <Tooltip
                  placement="top"
                  isOpen={deleteCourseReserve}
                  target="DeleteCourseReserve"
                  toggle={() => setDeleteCourseReserve(!deleteCourseReserve)}
                  innerClassName="table-tooltip"
                >
                  رد کردن رزرو
                </Tooltip>
              </div>
            </div>
          </div>
        )
      );
    },
  },
];
