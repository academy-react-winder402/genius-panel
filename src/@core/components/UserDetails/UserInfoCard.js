// ** React Imports
import { Fragment } from "react";
import { Link, useParams } from "react-router-dom";

// ** Reactstrap Imports
import { Badge, Button, Card, CardBody } from "reactstrap";

// ** Third Party Components
import { Briefcase, Check } from "react-feather";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";

const statusColors = {
  true: "light-success",
  false: "light-warning",
};

const MySwal = withReactContent(Swal);

const UserInfoCard = ({ user }) => {
  // ** Hooks
  const { id } = useParams();

  // ** render user img
  const renderUserImg = () => {
    if (user !== null && user?.currentPictureAddress !== "Not-set") {
      return (
        <img
          height="110"
          width="110"
          alt="user-avatar"
          src={user?.currentPictureAddress}
          className="img-fluid rounded mt-3 mb-2"
        />
      );
    } else {
      return (
        <Avatar
          initials
          color="light-primary"
          className="rounded mt-3 mb-2"
          content={`${user?.fName || "کاربر"} ${user?.lName || "نابغه"}`}
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
    return MySwal.fire({
      title: "آیا از حذف کاربر مورد نظر مطمئن هستید؟",
      text: "در صورت مطمئن بودن از حذف کاربر مورد نظر این کار را انجام دهید.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله، کاربر را حذف میکنم!",
      cancelButtonText: "انصراف",
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

  const renderRoleName = (roleName) => {
    if (roleName === "Administrator") {
      return "مدیر";
    } else if (roleName === "Teacher") {
      return "استاد";
    } else if (roleName === "Student") {
      return "دانشجو";
    } else if (roleName === "Employee.Admin") {
      return "کارمند.ادمین";
    }
  };

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">
              {renderUserImg()}
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info">
                  <h4>
                    {`${user?.fName || "کاربر"} ${user?.lName || "نابغه"}`}
                  </h4>
                  <div className="d-flex flex-wrap justify-content-center gap-1 mt-1">
                    {user?.roles.map((role) => (
                      <Badge
                        key={role.id}
                        color="light-secondary"
                        className="text-capitalize"
                      >
                        {renderRoleName(role.roleName)}
                      </Badge>
                    ))}
                  </div>
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
                <h4 className="mb-0">{user?.courses.length}</h4>
                <small>دوره خریداری شده</small>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <Badge color="light-primary" className="rounded p-75">
                <Briefcase className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">
                  {user?.profileCompletionPercentage} درصد
                </h4>
                <small>تکمیل پروفایل</small>
              </div>
            </div>
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1">جزئیات</h4>
          <div className="info-container">
            {user !== null ? (
              <ul className="list-unstyled">
                <li className="mb-75">
                  <span className="fw-bolder me-25">نام کاربر:</span>
                  <span>{`${user?.fName || "کاربر"} ${
                    user?.lName || "نابغه"
                  }`}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">ایمیل:</span>
                  <span>{user?.gmail}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">وضعیت:</span>
                  <Badge
                    className="text-capitalize"
                    color={statusColors[user?.active]}
                  >
                    {user?.active ? "فعال" : "غیر فعال"}
                  </Badge>
                </li>
                <li className="mb-75 d-flex">
                  <span className="fw-bolder me-25">نقش:</span>
                  <div className="d-flex flex-wrap user-details-roles-wrapper">
                    {user?.roles.map((role) => (
                      <Badge
                        key={role.id}
                        color="light-secondary"
                        className="text-capitalize"
                      >
                        {renderRoleName(role.roleName)}
                      </Badge>
                    ))}
                  </div>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">جنسیت:</span>
                  <span>{user?.gender ? "مذکر" : "مونث"}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">شماره تلفن:</span>
                  <span>{user?.phoneNumber}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">تایید دو مرحله ای:</span>
                  <span>{user?.twoStepAuth ? "فعال" : "غیر فعال"}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">کد ملی:</span>
                  <span>{user?.nationalCode}</span>
                </li>
              </ul>
            ) : null}
          </div>
          <div className="d-flex justify-content-center pt-2">
            <Button tag={Link} to={`/users/edit/${id}`} color="primary">
              ویرایش
            </Button>
            <Button
              className="ms-1"
              color="danger"
              outline
              onClick={handleSuspendedClick}
            >
              حذف
            </Button>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default UserInfoCard;
