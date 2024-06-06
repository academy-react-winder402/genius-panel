// ** React Imports
import { Fragment } from "react";
import { Link } from "react-router-dom";

// ** Reactstrap Imports
import { Badge, Button, Card, CardBody } from "reactstrap";

// ** Third Party Components
import { Briefcase, Check } from "react-feather";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { numberWithCommas } from "../../../core/utils/number-helper.utils";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";

const roleColors = {
  editor: "light-info",
  admin: "light-danger",
  author: "light-warning",
  maintainer: "light-success",
  subscriber: "light-primary",
};

const levelColors = {
  "فوق پیشرفته": "light-success",
  پیشرفته: "light-secondary",
  مبتدی: "light-warning",
};

const statusColors = {
  "شروع ثبت نام": "light-success",
  "در حال برگزاری": "light-secondary",
  "منقضی شده": "light-warning",
};

const MySwal = withReactContent(Swal);

const CourseInfoCard = ({ course }) => {
  // ** render course img
  const renderCourseImg = () => {
    if (course?.imageAddress !== "undefined") {
      return (
        <img
          height="110"
          width="110"
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

  const handleSuspendedClick = () => {
    return MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Suspend user!",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.value) {
        MySwal.fire({
          icon: "success",
          title: "Suspended!",
          text: "User has been suspended.",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: "Cancelled",
          text: "Cancelled Suspension :)",
          icon: "error",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  };

  const formattedCoursePrice = () => numberWithCommas(course?.cost);

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">
              {renderCourseImg()}
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info">
                  <h4>
                    {course !== null ? course?.fullName : "Eleanor Aguilar"}
                  </h4>
                  {course !== null ? (
                    <Badge
                      color={roleColors[course?.role]}
                      className="text-capitalize"
                    >
                      {course?.role}
                    </Badge>
                  ) : null}
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
                <h4 className="mb-0">568</h4>
                <small>Projects Done</small>
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
              </ul>
            ) : null}
          </div>
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
              حذف کاربر
            </Button>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default CourseInfoCard;
