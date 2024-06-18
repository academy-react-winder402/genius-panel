// ** React Imports
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// ** Custom Components
import Avatar from "@components/avatar";
import UserAddRole from "../UserAddRole";

// ** Icons Imports
import {
  Archive,
  Database,
  Edit2,
  FileText,
  MoreVertical,
  Settings,
  Trash2,
  User,
} from "react-feather";

// ** Reactstrap Imports
import {
  Badge,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

// ** Core Imports
import { deleteUserAPI } from "../../../core/services/api/user/delete-user.api";

// ** Utils
import { convertDateToPersian } from "../../../utility/date-helper.utils";
import { renderRoleName } from "../../../utility/render-role-name-helper.utils";

// ** Renders Client Columns
const renderClient = (row) => {
  if (row.pictureAddress) {
    return (
      <Avatar
        className="me-1"
        img={row.pictureAddress}
        width="32"
        height="32"
      />
    );
  } else {
    return (
      <Avatar
        initials
        className="me-1"
        color={"light-primary"}
        content={row.fname + " " + row.lname || "کاربر نابغه"}
      />
    );
  }
};

// ** Renders Role Columns
const renderRole = (row) => {
  const roleObj = {
    Administrator: {
      class: "text-success",
      icon: Database,
    },
    Teacher: {
      class: "text-info",
      icon: Edit2,
    },
    Student: {
      class: "text-primary",
      icon: User,
    },
    null: {
      class: "text-warning",
      icon: Settings,
    },
  };

  const Icon = roleObj[row.userRoles] ? roleObj[row.userRoles].icon : Edit2;

  return (
    <span className="text-truncate text-capitalize align-middle">
      <Icon
        size={18}
        className={`${
          roleObj[row.userRoles] ? roleObj[row.userRoles].class : ""
        } me-50`}
      />
      {renderRoleName(row.userRoles)}
    </span>
  );
};

const statusObj = {
  True: "light-success",
  False: "light-warning",
};

export const USER_COLUMNS = [
  {
    name: "کاربر",
    sortable: true,
    minWidth: "300px",
    sortField: "fname",
    selector: (row) => row.fullName,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        {renderClient(row)}
        <div className="d-flex flex-column">
          <Link
            to={`/users/${row.id}`}
            className="user_name text-truncate text-body"
          >
            <span className="fw-bolder">
              {row.fname && row.lname
                ? row.fname + " " + row.lname
                : "کاربر نابغه"}
            </span>
          </Link>
          <small className="text-truncate text-muted mb-0">{row.gmail}</small>
        </div>
      </div>
    ),
  },
  {
    name: "نقش",
    sortable: true,
    width: "155px",
    sortField: "role",
    selector: (row) => row.role,
    cell: (row) => renderRole(row),
  },
  {
    name: "شماره موبایل",
    width: "150px",
    sortable: true,
    sortField: "phoneNumber",
    cell: (row) => <span className="text-capitalize">{row.phoneNumber}</span>,
  },
  {
    name: "تاریخ",
    width: "130px",
    sortable: true,
    sortField: "billing",
    selector: (row) => row.billing,
    cell: (row) => {
      const formattedDate = convertDateToPersian(row.insertDate);

      return <span className="text-capitalize">{formattedDate}</span>;
    },
  },
  {
    name: "وضعیت",
    width: "120px",
    sortable: true,
    sortField: "active",
    selector: (row) => row.active,
    cell: (row) => (
      <Badge className="text-capitalize" color={statusObj[row.active]} pill>
        {row.active ? "فعال" : "غیرفعال"}
      </Badge>
    ),
  },
  {
    name: "عملیات",
    minWidth: "240px",
    cell: (row) => {
      // ** States
      const [modal, setModal] = useState(null);

      // ** Hook
      const navigate = useNavigate();

      // ** Toggle modal function
      const toggleModal = (id) => {
        if (modal !== id) {
          setModal(id);
        } else {
          setModal(null);
        }
      };

      const handleAddRoleClick = () => {
        toggleModal(row.id);
      };

      const MySwal = withReactContent(Swal);

      const handleSuspendedClick = async () => {
        MySwal.fire({
          title: "آیا از حذف کاربر مطمئن هستید؟",
          text: "در صورت مطمئن بودن، کاربر را حذف کنید.",
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
          confirmButtonText: "بله،کاربر را حذف میکنم",
          cancelButtonText: "انصراف",
          showLoaderOnConfirm: true,
          async preConfirm() {
            const deleteUser = await deleteUserAPI(row.id);

            if (deleteUser) {
              toast.success(`کاربر با موفقیت حذف شد !`);

              navigate("/users");
            } else toast.error("مشکلی در حذف کاربر به وجود آمد !");
          },
        });
      };

      return (
        <div className="d-flex gap-1 user-columns-dropdown">
          <div className="column-action">
            <UncontrolledDropdown direction="right">
              <DropdownToggle tag="div" className="btn btn-sm" caret>
                <MoreVertical size={14} className="cursor-pointer" />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  tag={Link}
                  className="w-100"
                  to={`/users/${row.id}`}
                >
                  <FileText size={14} className="me-50" />
                  <span className="align-middle">جزئیات</span>
                </DropdownItem>
                <DropdownItem
                  tag={Link}
                  className="w-100"
                  to={`/users/edit/${row.id}`}
                >
                  <Archive size={14} className="me-50" />
                  <span className="align-middle">ویرایش</span>
                </DropdownItem>
                <DropdownItem className="w-100" onClick={handleSuspendedClick}>
                  <Trash2 size={14} className="me-50" />
                  <span className="align-middle">حذف</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
          <Button color="primary" size="sm" onClick={handleAddRoleClick}>
            دسترسی
          </Button>
          <UserAddRole
            modal={modal}
            id={row.id}
            toggleModal={toggleModal}
            redirectUrl="/users"
          />
        </div>
      );
    },
  },
];
