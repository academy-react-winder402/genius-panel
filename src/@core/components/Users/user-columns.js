// ** React Imports
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Icons Imports
import {
  Slack,
  User,
  Settings,
  Database,
  Edit2,
  MoreVertical,
  FileText,
  Trash2,
  Archive,
} from "react-feather";

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";
import { convertDateToPersian } from "../../../core/utils/date-helper.utils";
import UserAddRole from "./UserAddRole";
import { useState } from "react";

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
    admin: {
      class: "text-danger",
      icon: Slack,
    },
  };

  const Icon = roleObj[row.userRoles] ? roleObj[row.userRoles].icon : Edit2;

  const renderRoleName = () => {
    if (row.userRoles?.includes("Administrator")) {
      return "مدیر";
    } else if (row.userRoles?.includes("Teacher")) {
      return "استاد";
    } else if (row.userRoles?.includes("Student")) {
      return "دانشجو";
    } else {
      return "کاربر نابغه";
    }
  };

  return (
    <span className="text-truncate text-capitalize align-middle">
      <Icon
        size={18}
        className={`${
          roleObj[row.userRoles] ? roleObj[row.userRoles].class : ""
        } me-50`}
      />
      {renderRoleName()}
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
            <span className="fw-bolder">{row.fname + " " + row.lname}</span>
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

      return (
        <div className="d-flex gap-1">
          <div className="column-action">
            <UncontrolledDropdown>
              <DropdownToggle tag="div" className="btn btn-sm">
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
                  to={`/users/${row.id}`}
                >
                  <Archive size={14} className="me-50" />
                  <span className="align-middle">ویرایش</span>
                </DropdownItem>
                <DropdownItem
                  tag="a"
                  href="/"
                  className="w-100"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
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
            userRoles={row.userRoles}
          />
        </div>
      );
    },
  },
];
