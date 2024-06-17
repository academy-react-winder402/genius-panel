// ** React Imports
import { Link } from "react-router-dom";

// ** Core Imports

// ** Image Imports
import blankThumbnail from "../../../../assets/images/common/blank-thumbnail.jpg";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getUserWithIdAPI } from "../../../../core/services/api/user/get-user-with-id.api";
import { Badge } from "reactstrap";

export const COURSE_USER_LIST_COLUMNS = [
  {
    name: "نام دانش آموز",
    reorder: true,
    width: "240px",
    cell: (row) => {
      // ** States
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
              !user?.currentPictureAddress ||
              user?.currentPictureAddress === "undefined" ||
              user?.currentPictureAddress === "<string>" ||
              user?.currentPictureAddress === "Not-set"
                ? blankThumbnail
                : user?.currentPictureAddress
            }
            className="student-course-reserve-picture"
          />
          <div className="text-truncate ms-1">
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
    name: "وضعیت پرداخت",
    reorder: true,
    width: "180px",
    cell: (row) => (
      <Badge color={row.peymentDone ? "light-success" : "light-danger"}>
        {row.peymentDone ? "پرداخت شده" : "پرداخت نشده"}
      </Badge>
    ),
  },
  {
    name: "امتیار دوره",
    reorder: true,
    width: "120px",
    cell: (row) => <span>{row.courseGrade}</span>,
  },
  {
    name: "اطلاع رسانی",
    reorder: true,
    width: "170px",
    cell: (row) => (
      <Badge color={row.notification ? "light-success" : "light-danger"}>
        {row.notification ? "فعال" : "غیر فعال"}
      </Badge>
    ),
  },
];
