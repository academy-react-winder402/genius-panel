// ** React Imports
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// ** Reactstrap Import
import { Badge } from "reactstrap";

// ** Icon Imports
import { Check, X } from "react-feather";

// ** Core Imports
import { getUserWithIdAPI } from "../../../core/services/api/user/get-user-with-id.api";

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
    cell: (row) =>
      !row.accept && (
        <div className="d-flex gap-2">
          <Check className="cursor-pointer" />
          <X className="cursor-pointer" />
        </div>
      ),
  },
];
