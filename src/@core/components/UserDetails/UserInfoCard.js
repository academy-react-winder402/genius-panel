// ** React Imports
import { useState, Fragment } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

// ** Reactstrap Imports
import { Badge, Button, Card, CardBody } from "reactstrap";

// ** Third Party Components
import { Briefcase, Check } from "react-feather";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// ** Custom Components
import Avatar from "@components/avatar";
import UserAddRole from "../UserAddRole";

// ** Core Imports
import { deleteUserAPI } from "../../../core/services/api/user/delete-user.api";

// ** Utils
import { convertDateToPersian } from "../../../core/utils/date-helper.utils";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";

const statusColors = {
  true: "light-success",
  false: "light-warning",
};

const MySwal = withReactContent(Swal);

const UserInfoCard = ({ user }) => {
  // ** States
  const [modal, setModal] = useState(null);

  // ** Hooks
  const { id } = useParams();
  const navigate = useNavigate();

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
    MySwal.fire({
      title: "آیا از حذف کاربر مورد نظر مطمئن هستید؟",
      text: "در صورت مطمئن بودن از حذف کاربر مورد نظر این کار را انجام دهید.",
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
      confirmButtonText: "بله، کاربر را حذف میکنم!",
      cancelButtonText: "انصراف",
      showLoaderOnConfirm: true,
      async preConfirm() {
        try {
          const deleteUser = await deleteUserAPI(id);

          if (deleteUser.success) {
            toast.success("کاربر با موفقیت حذف شد !");

            navigate("/users");
          } else {
            toast.error("مشکلی در حذف کاربر به وجود آمد !");
          }
        } catch (error) {
          toast.error("مشکلی در حذف کاربر به وجود آمد !");
        }
      },
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

  // ** Toggle modal function
  const toggleModal = (id) => {
    if (modal !== id) {
      setModal(id);
    } else {
      setModal(null);
    }
  };

  const handleAddRoleClick = () => {
    toggleModal(id);
  };

  const convertBirthday = convertDateToPersian(user?.birthDay);

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
                  <span className="fw-bolder me-25">نام کاربری:</span>
                  <span>{user?.userName}</span>
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
                  <span className="fw-bolder me-25">تاریخ تولد:</span>
                  <span>{convertBirthday}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">تایید دو مرحله ای:</span>
                  <span>{user?.twoStepAuth ? "فعال" : "غیر فعال"}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">کد ملی:</span>
                  <span>{user?.nationalCode}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">آدرس تلگرام:</span>
                  <span>{user?.telegramLink}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">پروفایل لینکدین:</span>
                  <span>{user?.linkdinProfile}</span>
                </li>
              </ul>
            ) : null}
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center gap-1 pt-2">
            <div>
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
            <Button color="success" outline onClick={handleAddRoleClick}>
              افزودن نقش
            </Button>
            <UserAddRole
              modal={modal}
              id={id}
              toggleModal={toggleModal}
              redirectUrl={`/users/${id}`}
            />
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default UserInfoCard;
