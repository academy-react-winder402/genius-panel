// ** React Imports
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

// ** Reactstrap Imports
import {
  Badge,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

// ** Third Party Components
import { CheckCircle, Edit, Eye, MoreVertical, Trash, X } from "react-feather";

// ** Core Imports
import { getCourseReserveWithIdAPI } from "../../../core/services/api/course/course-reserve/get-course-reserve-with-id.api";
import { deleteCourseAPI } from "../../../core/services/api/course/delete-course.api";

// ** Util Imports
import { handleActiveInActiveCourse } from "../../../core/utils/handle-active-inactive-course.utils";
import { numberWithCommas } from "../../../core/utils/number-helper.utils";

// ** Custom Components
import CourseReservedModal from "./CourseReservedModal";

// ** Image Imports
import blankThumbnail from "../../../assets/images/common/blank-thumbnail.jpg";

// ** Handle delete course functionality
const handleDeleteCourse = async (courseId) => {
  try {
    const deleteCourse = await deleteCourseAPI(true, courseId);
    if (deleteCourse.success) toast.success("دوره با موفقیت حذف شد !");
    else toast.error("مشکلی در حذف دوره به وجود آمد ...");
  } catch (error) {
    toast.error("مشکلی در حذف دوره به وجود آمد ...");
  }
};

// ** Table columns
export const COURSE_COLUMNS = [
  {
    name: "نام دوره",
    sortable: true,
    minWidth: "180px",
    sortField: "title",
    // selector: (row) => row?.title,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center gap-1">
        <img
          src={
            !row.tumbImageAddress ||
            row.tumbImageAddress === "undefined" ||
            row.tumbImageAddress === "<string>"
              ? blankThumbnail
              : row.tumbImageAddress
          }
          className="course-column-image"
        />
        <div className="d-flex flex-column">
          <Link
            to={`/courses/${row.courseId}`}
            className="course-column-truncate text-body"
          >
            <span className="fw-bolder text-primary">{row.title}</span>
          </Link>
          <small className="text-truncate text-muted mb-0">
            {row.typeName}
          </small>
        </div>
      </div>
    ),
  },
  {
    name: "نام مدرس",
    sortable: true,
    minWidth: "150px",
    sortField: "fullName",
    // selector: (row) => row?.fullName,
    cell: (row) => (
      <div className="mr-5">
        <span className="text-sm">{row?.fullName}</span>
      </div>
    ),
  },
  {
    name: "قیمت",
    sortable: true,
    minWidth: "140px",
    sortField: "cost",
    cell: (row) => (
      <span className="course-column-truncate">
        {numberWithCommas(row.cost) || 0} تومان
      </span>
    ),
  },
  {
    name: "وضعیت برگزاری",
    sortable: true,
    minWidth: "140px",
    sortField: "statusName",
    cell: (row) => (
      <span className="course-column-truncate course-column-status">
        {row.statusName}
      </span>
    ),
  },
  {
    sortable: true,
    name: "وضعیت",
    minWidth: "120px",
    sortField: "active",
    // selector: row => row.active,
    cell: (row) => {
      // ** Hooks
      const navigate = useNavigate();

      return (
        <Badge
          color={
            row.isActive === true
              ? "light-success"
              : row.isActive === false
              ? "light-danger"
              : "light-warning"
          }
          className="course-column-badge cursor-pointer"
          onClick={() =>
            handleActiveInActiveCourse(row.isActive, row.courseId, navigate)
          }
        >
          {row.isActive ? "فعال" : "غیر فعال"}
        </Badge>
      );
    },
  },
  {
    sortable: true,
    name: "وضعیت حذف",
    minWidth: "130px",
    sortField: "isdelete",
    // selector: row => row.isdelete,
    cell: (row) => {
      return (
        <Badge
          color={
            row.isdelete === true
              ? "light-danger"
              : row.isdelete === false
              ? "light-success"
              : "light-warning"
          }
          className="course-column-is-delete"
        >
          {row.isdelete ? "حذف شده" : "حذف نشده"}
        </Badge>
      );
    },
  },
  {
    name: "عملیات",
    minWidth: "160px",
    cell: (row) => {
      // ** States
      const [modal, setModal] = useState(null);
      const [courseReserve, setCourseReserve] = useState();

      // ** Hooks
      const navigate = useNavigate();

      const toggleModal = (id) => {
        if (modal !== id) {
          setModal(id);
        } else {
          setModal(null);
        }
      };

      const fetchCourseReserve = async () => {
        try {
          const getCourseReserve = await getCourseReserveWithIdAPI(
            row.courseId
          );

          setCourseReserve(getCourseReserve);
        } catch (error) {
          toast.error("مشکلی در دریافت لیست رزرو دوره به وجود آمد ...");
        }
      };

      const handleCourseReserveClick = () => {
        fetchCourseReserve();
        toggleModal(row.courseId);
      };

      return (
        <div className="column-action d-flex align-items-center gap-1">
          <UncontrolledDropdown>
            <DropdownToggle tag="span">
              <MoreVertical size={17} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem
                tag={Link}
                to={`/courses/${row.courseId}`}
                className="w-100"
              >
                <Eye size={14} className="me-50" />
                <span className="align-middle">جزئیات</span>
              </DropdownItem>
              <DropdownItem
                tag={Link}
                to={`/courses/edit/${row.courseId}`}
                className="w-100"
              >
                <Edit size={14} className="me-50" />
                <span className="align-middle">ویرایش</span>
              </DropdownItem>
              <DropdownItem
                className="w-100"
                onClick={() => handleDeleteCourse(row.courseId)}
              >
                <Trash size={14} className="me-50" />
                <span className="align-middle">حذف</span>
              </DropdownItem>
              <DropdownItem
                className="w-100"
                onClick={() =>
                  handleActiveInActiveCourse(
                    row.isActive,
                    row.courseId,
                    navigate
                  )
                }
              >
                {row.isActive ? (
                  <X size={14} className="me-50" />
                ) : (
                  <CheckCircle size={14} className="me-50" />
                )}
                <span className="align-middle">
                  {row.isActive ? "غیر کردن دوره" : "فعال کردن دوره"}
                </span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <div>
            <Button color="primary" onClick={handleCourseReserveClick}>
              رزرو ها
            </Button>
            <CourseReservedModal
              id={row.courseId}
              title={row.title}
              toggleModal={toggleModal}
              modal={modal}
              courseReserve={courseReserve}
            />
          </div>
        </div>
      );
    },
  },
];
