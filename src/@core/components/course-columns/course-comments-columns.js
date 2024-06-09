// ** React Imports
import { useState } from "react";

// ** Reactstrap Imports
import { Badge, Button, Tooltip } from "reactstrap";

// ** Custom Components
import CourseReplyCommentModal from "./CourseReplyCommentModal";

// ** Image Imports
import { CheckCircle } from "react-feather";
import { useNavigate } from "react-router-dom";
import blankThumbnail from "../../../assets/images/common/blank-thumbnail.jpg";
import { acceptCourseCommentAPI } from "../../../core/services/api/course/course-comments/accept-course-comment.api";
import toast from "react-hot-toast";

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
              ? row?.pictureAddress
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
    minWidth: "300px",
    cell: (row) => {
      // ** States
      const [modal, setModal] = useState(null);
      const [acceptCourseCommentText, setAcceptCourseCommentText] = useState();

      // ** Hooks
      const navigate = useNavigate();

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

      const handleAcceptCourseComment = async () => {
        try {
          const acceptCourseComment = await acceptCourseCommentAPI(row.id);

          if (acceptCourseComment.success) {
            toast.success("نظر با موفقیت تایید شد !");

            navigate(`/courses/${row.courseId}`);
          } else {
            toast.error("مشکلی در تایید نظر به وجود آمد !");
          }
        } catch (error) {
          toast.error("مشکلی در تایید نظر به وجود آمد !");
        }
      };

      return (
        <div className="column-action d-flex align-items-center gap-1">
          <div className="d-flex align-items-center gap-1">
            {!row.accept && (
              <div>
                <CheckCircle
                  className="cursor-pointer"
                  id="acceptCourseComment"
                  onClick={handleAcceptCourseComment}
                />
                <Tooltip
                  placement="top"
                  isOpen={acceptCourseCommentText}
                  target="acceptCourseComment"
                  toggle={() =>
                    setAcceptCourseCommentText(!acceptCourseCommentText)
                  }
                  innerClassName="table-tooltip"
                >
                  تایید نظر
                </Tooltip>
              </div>
            )}
            <Button color="primary" onClick={handleReplyClick}>
              ریپلای
            </Button>
            <CourseReplyCommentModal
              commentId={row.id}
              courseId={row.courseId}
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
