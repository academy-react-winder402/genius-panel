// ** React Imports
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

// ** Reactstrap Imports
import { Badge, Button, Card, CardBody } from "reactstrap";

// ** Third Party Components
import { Briefcase, Check } from "react-feather";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Core Imports
import { getCourseGroupAPI } from "../../../core/services/api/course/course-group/get-course-group.api";
import { activeAndInactiveCourseAPI } from "../../../core/services/api/course/active-and-deactive-course.api";
import { deleteCourseAPI } from "../../../core/services/api/course/delete-course.api";

// ** Utils
import { numberWithCommas } from "../../../core/utils/number-helper.utils";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";

const levelColors = {
  "فوق پیشرفته": "light-success",
  پیشرقته: "light-secondary",
  مبتدی: "light-warning",
};

const statusColors = {
  "شروع ثبت نام": "light-success",
  "درحال برگزاری": "light-secondary",
  "منقضی شده": "light-warning",
};

const MySwal = withReactContent(Swal);

const CourseInfoCard = ({ course }) => {
  // ** States
  const [courseGroup, setCourseGroup] = useState();
  const [isDeleted, setIsDeleted] = useState(false);

  // ** Hooks
  const navigate = useNavigate();

  // ** Render course img
  const renderCourseImg = () => {
    if (course?.imageAddress !== "undefined" && course?.imageAddress !== null) {
      return (
        <img
          height="110"
          width="200"
          alt="course-image"
          src={course?.imageAddress}
          className="img-fluid rounded mt-3 mb-2"
        />
      );
    } else {
      return (
        <Avatar
          initials
          color={course?.imageAddress || "light-primary"}
          className="rounded mt-3 mb-2"
          content={course?.title}
          contentStyles={{
            borderRadius: 0,
            fontSize: "calc(48px)",
            width: "100%",
            height: "100%",
          }}
          style={{
            height: "110px",
            width: "110px",
          }}
        />
      );
    }
  };

  const handleSuspendedClick = async () => {
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
        const deleteCourse = await deleteCourseAPI(isDeleted, course?.courseId);

        if (deleteCourse) {
          setIsDeleted((prev) => !prev);
          toast.success(
            `دوره با موفقیت ${isDeleted ? "بازگردانی" : "حذف"} شد !`
          );
        } else toast.error("مشکلی در حذف یا بازگردانی دوره به وجود آمد !");
      },
    });
  };

  const handleActiveInactiveCourse = async () => {
    MySwal.fire({
      title: course?.isActive
        ? "آیا از غیر فعال دوره مطمئن هستید؟"
        : "آیا از فعال دوره مطمئن هستید ؟",
      text: `آیا از ${
        course?.isActive ? "غیر فعال" : "فعال"
      } کردن دوره اطمینان کامل دارید ؟`,
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
      confirmButtonText: course?.isActive ? "غیر فعال کردن" : "فعال کردن",
      cancelButtonText: "انصراف",
      showLoaderOnConfirm: true,
      async preConfirm() {
        const deleteCourse = await activeAndInactiveCourseAPI(
          !course?.isActive,
          course?.courseId
        );

        if (deleteCourse) {
          setIsDeleted((prev) => !prev);

          toast.success(
            `دوره با موفقیت ${isDeleted ? "فعال" : "غیر فعال"} شد !`
          );
          navigate(`/courses/${course?.courseId}`);
        } else
          toast.error(
            `مشکلی در ${
              course?.isActive ? "غیر فعال کردن" : "فعال کردن"
            } دوره به وجود آمد !`
          );
      },
    });
  };

  const formattedCoursePrice = () => numberWithCommas(course?.cost);

  useEffect(() => {
    if (course) {
      const fetchCourseGroup = async () => {
        try {
          const getCourseGroup = await getCourseGroupAPI(
            course?.teacherId,
            course?.courseId
          );

          setCourseGroup(getCourseGroup[0]);
        } catch (error) {
          toast.error("مشکلی در دریافت گروه دوره به وجود آمد.");
        }
      };

      fetchCourseGroup();
    }
  }, [course]);

  return (
    <Fragment>
      <Card className="course-info-card">
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">
              {renderCourseImg()}
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info">
                  <h4>{course?.title}</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-around my-2 pt-75">
            <div className="d-flex align-items-start me-2">
              <Badge color="light-primary" className="rounded p-75">
                <Check className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{formattedCoursePrice()} تومان</h4>
                <small>قیمت دوره</small>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <Badge color="light-primary" className="rounded p-75">
                <Briefcase className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{courseGroup?.groupName}</h4>
                <small>نام گروه</small>
              </div>
            </div>
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1">اطلاعات دوره</h4>
          <div className="info-container">
            {course !== null ? (
              <ul className="list-unstyled">
                <li className="mb-75">
                  <span className="fw-bolder me-25">عنوان دوره:</span>
                  <span>{course?.title}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">استاد دوره:</span>
                  <span>{course?.teacherName}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">سطح دوره:</span>
                  <Badge
                    className="text-capitalize"
                    color={levelColors[course?.courseLevelName]}
                  >
                    {course?.courseLevelName}
                  </Badge>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">نوع دوره:</span>
                  <span>{course?.courseTypeName}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">وضعیت دوره:</span>
                  <Badge
                    className="text-capitalize"
                    color={statusColors[course?.courseStatusName]}
                  >
                    {course?.courseStatusName}
                  </Badge>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">نام کلاس:</span>
                  <span>{course?.courseClassRoomName}</span>
                </li>
                {course && course.courseTeches.length > 0 && (
                  <li className="mb-75">
                    <span className="fw-bolder me-25">تکنولوژی های دوره :</span>
                    {course &&
                      course?.courseTeches.map((tech) => (
                        <Badge key={course.courseId} color="light-primary">
                          {tech}
                        </Badge>
                      ))}
                  </li>
                )}
              </ul>
            ) : null}
          </div>
          <div className="d-flex flex-column justify-content-center">
            <div className="d-flex justify-content-center pt-2">
              <Button
                color="primary"
                tag={Link}
                to={`/courses/edit/${course?.courseId}`}
              >
                ویرایش
              </Button>
              <Button
                className="ms-1"
                color="danger"
                outline
                onClick={handleSuspendedClick}
              >
                {isDeleted ? "بازگردانی دوره" : "حذف دوره"}
              </Button>
            </div>
            <div className="course-details-active-inactive-button">
              <Button
                className="ms-1"
                color="success"
                outline
                onClick={handleActiveInactiveCourse}
              >
                {course?.isActive ? "غیر فعال کردن دوره" : "فعال کردن دوره"}
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default CourseInfoCard;
