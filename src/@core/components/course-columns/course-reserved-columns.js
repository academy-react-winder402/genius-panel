// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

// Column Imports
import { COURSE_RESERVED_COMMON_COLUMNS } from "./course-reserved-common-columns";

// ** Core Imports
import { getUserWithIdAPI } from "../../../core/services/api/user/get-user-with-id.api";

// ** Image Imports
import blankThumbnail from "../../../assets/images/common/blank-thumbnail.jpg";

export const COURSE_RESERVED_COLUMNS = (redirectUrl) => [
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
  ...COURSE_RESERVED_COMMON_COLUMNS(redirectUrl),
];
