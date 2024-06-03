// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// ** Core Imports
import { getCourseListAPI } from "../core/services/api/course/get-course-list.api";

// ** Reactstrap Imports
import { Card, Col, Row } from "reactstrap";

// ** Icon Imports
import { Book, BookOpen, CheckCircle, Trash2 } from "react-feather";

// ** Custom Components
import BreadCrumbs from "../@core/components/breadcrumbs";
import StatsHorizontal from "../@core/components/StatsHorizontal";
import TableServerSide from "../@core/components/TableServerSide";

// ** Styles
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

const CoursesPage = () => {
  // ** States
  const [allCourses, setAllCourses] = useState();
  const [sort, setSort] = useState("desc");
  const [sortColumn, setSortColumn] = useState("id");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [searchText, setSearchText] = useState();
  const [activeCourses, setActiveCourses] = useState();
  const [deletedCourses, setDeletedCourses] = useState();
  const [openCourses, setOpenCourses] = useState();
  const [isAllCourses, setIsAllCourses] = useState(true);
  const [isActiveCourses, setIsActiveCourses] = useState(false);
  const [isDeletedCourses, setIsDeletedCourses] = useState(false);
  const [isOpenCourses, setIsOpenCourses] = useState(false);

  const dataToRender = () => {
    if (isAllCourses) {
      return allCourses;
    } else if (isActiveCourses) {
      return activeCourses;
    } else if (isDeletedCourses) {
      return deletedCourses;
    } else if (isOpenCourses) {
      return openCourses;
    }
  };

  const renderTitle = () => {
    if (isAllCourses) {
      return "همه دوره ها";
    } else if (isActiveCourses) {
      return "دوره های فعال";
    } else if (isDeletedCourses) {
      return "دوره های حذف شده";
    } else if (isOpenCourses) {
      return "دوره های در حال برگزاری";
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const getCourses = await getCourseListAPI(1, 1000);
        const getActiveCourses = getCourses.courseDtos.filter((course) => {
          return course.isActive === true;
        });
        const getDeletedCourses = getCourses.courseDtos.filter((course) => {
          return course.isdelete === true;
        });
        const getOpenCourses = getCourses.courseDtos.filter((course) => {
          return course.statusName == "در حال برگذاری";
        });

        setAllCourses(getCourses.courseDtos);
        setActiveCourses(getActiveCourses);
        setDeletedCourses(getDeletedCourses);
        setOpenCourses(getOpenCourses);
      } catch (error) {
        toast.error("مشکلی در دریافت دوره ها به وجود آمد !");
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const getCourses = await getCourseListAPI(
          undefined,
          1000,
          sort ? sort : undefined,
          sortColumn ? sortColumn : undefined,
          searchText ? searchText : undefined
        );
        const getActiveCourses = getCourses.courseDtos.filter((course) => {
          return course.isActive === true;
        });
        const getDeletedCourses = getCourses.courseDtos.filter((course) => {
          return course.isdelete === true;
        });
        const getOpenCourses = getCourses.courseDtos.filter((course) => {
          return course.statusName == "در حال برگذاری";
        });

        setAllCourses(getCourses.courseDtos);
        setActiveCourses(getActiveCourses);
        setDeletedCourses(getDeletedCourses);
        setOpenCourses(getOpenCourses);
      } catch (error) {
        toast.error("مشکلی در دریافت دوره ها به وجود آمد !");
      }
    };

    fetchCourses();
  }, [searchText, sort, sortColumn]);

  return (
    <div className="invoice-list-wrapper">
      <BreadCrumbs
        title="لیست دوره ها"
        data={[
          { title: "مدیریت دوره ها", link: "/courses" },
          { title: "لیست دوره ها" },
        ]}
      />
      <div className="app-user-list w-100">
        <Row>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="primary"
              statTitle="همه دوره ها"
              icon={<Book />}
              renderStats={
                <h3 className="fw-bolder mb-75">{allCourses?.length || 0}</h3>
              }
              onClick={() => {
                setIsAllCourses(true);
                setIsActiveCourses(false);
                setIsDeletedCourses(false);
                setIsOpenCourses(false);
              }}
              className="cursor-pointer"
              backgroundColor={isAllCourses && "rgb(0 0 0 / 23%)"}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="success"
              statTitle="دوره های فعال"
              icon={<CheckCircle />}
              renderStats={
                <h3 className="fw-bolder mb-75">
                  {activeCourses?.length || 0}
                </h3>
              }
              onClick={() => {
                setIsAllCourses(false);
                setIsActiveCourses(true);
                setIsDeletedCourses(false);
                setIsOpenCourses(false);
              }}
              className="cursor-pointer"
              backgroundColor={isActiveCourses && "rgb(0 0 0 / 23%)"}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="danger"
              statTitle="دوره های حذف شده"
              icon={<Trash2 size={20} />}
              renderStats={
                <h3 className="fw-bolder mb-75">
                  {deletedCourses?.length || 0}
                </h3>
              }
              onClick={() => {
                setIsAllCourses(false);
                setIsActiveCourses(false);
                setIsDeletedCourses(true);
                setIsOpenCourses(false);
              }}
              className="cursor-pointer"
              backgroundColor={isDeletedCourses && "rgb(0 0 0 / 23%)"}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="warning"
              statTitle="دوره های در حال برگزاری"
              icon={<BookOpen size={20} />}
              renderStats={
                <h3 className="fw-bolder mb-75">{openCourses?.length || 0}</h3>
              }
              onClick={() => {
                setIsAllCourses(false);
                setIsActiveCourses(false);
                setIsDeletedCourses(false);
                setIsOpenCourses(true);
              }}
              className="cursor-pointer"
              backgroundColor={isOpenCourses && "rgb(0 0 0 / 23%)"}
            />
          </Col>
        </Row>
      </div>
      <Card className="rounded">
        <TableServerSide
          data={dataToRender()}
          renderTitle={renderTitle()}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          setCurrentPage={setCurrentPage}
          setRowsPerPage={setRowsPerPage}
          setSearchValue={setSearchText}
          setSort={setSort}
          setSortColumn={setSortColumn}
        />
      </Card>
    </div>
  );
};

export default CoursesPage;
