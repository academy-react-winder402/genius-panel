// ** React Imports
import { useState } from "react";

// ** Reactstrap Imports
import { Badge, Button, Tooltip } from "reactstrap";

// ** Custom Components
import CourseReplyCommentModal from "./CourseReplyCommentModal";

// ** Image Imports
import { CheckCircle, XCircle, XOctagon } from "react-feather";
import { useNavigate } from "react-router-dom";
import blankThumbnail from "../../../assets/images/common/blank-thumbnail.jpg";
import { acceptCourseCommentAPI } from "../../../core/services/api/course/course-comments/accept-course-comment.api";
import toast from "react-hot-toast";
import { rejectCourseCommentAPI } from "../../../core/services/api/course/course-comments/reject-course-comment.api";

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

      const handleRejectCourseComment = async () => {
        try {
          const rejectCourseComment = await rejectCourseCommentAPI(row.id);

          if (rejectCourseComment.success) {
            toast.success("نظر با موفقیت لغو شد !");

            navigate(`/courses/${row.courseId}`);
          } else {
            toast.error("مشکلی در لغو نظر از دید کاربران به وجود آمد !");
          }
        } catch (error) {
          toast.error("مشکلی در لغو نظر از دید کاربران به وجود آمد !");
        }
      };

      return (
        <div className="column-action d-flex align-items-center gap-1">
          <div className="d-flex align-items-center gap-1">
            {row.accept ? (
              <div
                className="reject-comment"
                onClick={handleRejectCourseComment}
              >
                <XCircle
                  id="rejectCourseComment"
                  cursor="pointer"
                  color="#000"
                  className="reject-comment-icon"
                />
                <span className="reject-comment-text">لغو نظر</span>
              </div>
            ) : (
              <div
                className="reject-comment"
                onClick={handleAcceptCourseComment}
              >
                <CheckCircle
                  id="acceptCourseComment"
                  cursor="pointer"
                  className="accept-comment-icon"
                />
                <span className="accept-comment-text"> تایید نظر</span>
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
