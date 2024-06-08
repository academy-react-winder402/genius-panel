// ** React Imports
import { useState } from "react";

// ** Reactstrap Imports
import { Badge, Button } from "reactstrap";

// ** Custom Components
import CourseReplyCommentModal from "./CourseReplyCommentModal";

// ** Image Imports
import blankThumbnail from "../../../assets/images/common/blank-thumbnail.jpg";

export const COURSE_COMMENTS_COLUMNS = [
  {
    name: "عنوان نظر",
    reorder: true,
    minWidth: "160px",
    cell: (row) => (
      <div className="d-flex align-items-center">
        <img
          src={
            row?.pictureAddress !== "Not-set" && row?.pictureAddress !== null
              ? roe?.pictureAddress
              : blankThumbnail
          }
          className="student-course-reserve-picture"
        />
        <div className="text-truncate ms-1">
          <span>{row.title}</span>
        </div>
      </div>
    ),
  },
  {
    name: "نام کاربر",
    reorder: true,
    minWidth: "130px",
    cell: (row) => (
      <div className="text-truncate ms-1">
        <span>{row.author}</span>
      </div>
    ),
  },
  {
    name: "تعداد لایک",
    reorder: true,
    minWidth: "60px",
    cell: (row) => (
      <div className="text-truncate ms-1">
        <span>{row.likeCount}</span>
      </div>
    ),
  },
  {
    name: "تعداد ریپلای های تایید شده",
    reorder: true,
    minWidth: "120px",
    cell: (row) => (
      <div className="text-truncate ms-1">
        <Badge
          color={row.accept ? "light-success" : "light-danger"}
          className="course-column-badge"
        >
          {row.accept ? "تایید شده" : "تایید نشده"}
        </Badge>
      </div>
    ),
  },
  {
    name: "عملیات",
    minWidth: "160px",
    cell: (row) => {
      // ** States
      const [modal, setModal] = useState(null);

      const toggleModal = (id) => {
        if (modal !== id) {
          setModal(id);
        } else {
          setModal(null);
        }
      };

      const handleReplyClick = () => {
        toggleModal(row.courseId);
      };

      return (
        <div className="column-action d-flex align-items-center gap-1">
          <div>
            <Button color="primary" onClick={handleReplyClick}>
              ریپلای
            </Button>
            <CourseReplyCommentModal
              id={row.courseId}
              title={row.title}
              describe={row.describe}
              toggleModal={toggleModal}
              modal={modal}
              courseReserve={[]}
            />
          </div>
        </div>
      );
    },
  },
];
