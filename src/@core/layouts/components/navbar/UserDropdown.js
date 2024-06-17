// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

// ** Redux Imports
import { useDispatch } from "react-redux";
import { onUserChange } from "../../../../redux/user";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Third Party Components
import { Archive, Code, Power, Settings, User } from "react-feather";

// ** Reactstrap Imports
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

// ** Core Imports
import { getProfileInfoAPI } from "../../../../core/services/api/user-panel/get-profile-info.api";
import { removeItem } from "../../../../core/services/common/storage.services";

// ** Default Avatar Image
import defaultAvatar from "@src/assets/images/portrait/small/avatar-s-11.jpg";

const UserDropdown = () => {
  // ** State
  const [profileInfo, setProfileInfo] = useState({
    fName: "ادمین",
    lName: "",
    currentPictureAddress: defaultAvatar,
  });

  // ** Hooks
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // ** Function for handle logout
  const handleLogout = async () => {
    removeItem("token");
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const getProfileInfo = await getProfileInfoAPI();

        setProfileInfo(getProfileInfo);
        dispatch(onUserChange(getProfileInfo));
      } catch (error) {
        toast.error("مشکلی در دریافت اطلاعات شما به وجود آمد !");
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name fw-bold">
            {profileInfo?.fName + " " + profileInfo?.lName}
          </span>
          <span className="user-status">ادمین</span>
        </div>
        <Avatar
          img={
            profileInfo?.currentPictureAddress == "Not-set"
              ? defaultAvatar
              : profileInfo?.currentPictureAddress
          }
          imgHeight="40"
          imgWidth="40"
          status="online"
        />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag="a" href={`http://localhost:3000/${token}`}>
          <Archive size={14} className="me-75" />
          <span className="align-middle">سایت اصلی</span>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem tag={Link} to={`/users/${userId}`}>
          <User size={14} className="me-75" />
          <span className="align-middle">حساب کاربری من</span>
        </DropdownItem>
        <DropdownItem tag={Link} to={`/users/edit/${userId}`}>
          <Settings size={14} className="me-75" />
          <span className="align-middle">ویرایش پروفایل</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/my-courses">
          <Code size={14} className="me-75" />
          <span className="align-middle">دوره های من</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/login" onClick={handleLogout}>
          <Power size={14} className="me-75" />
          <span className="align-middle">خروح از سایت</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
