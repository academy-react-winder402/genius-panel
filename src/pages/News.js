// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// ** Reactstrap Imports
import { Card, Col, Row } from "reactstrap";

// ** Icon Imports
import { Book, BookOpen, CheckCircle, Trash2 } from "react-feather";

// ** Core Imports
import { adminNewsFilterListAPI } from "../core/services/api/news/admin-news-filter-list.api";

// ** Columns
import { COURSE_COLUMNS } from "../@core/components/course-columns";

// ** Utils
import { handleDeleteCourse } from "../core/utils/delete-course.utils";

// ** Custom Components
import BreadCrumbs from "../@core/components/breadcrumbs";
import StatsHorizontal from "../@core/components/StatsHorizontal";
import TableServerSide from "../@core/components/TableServerSide";

// ** Styles
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

const NewsPage = () => {
  // ** States
  const [allNews, setAllNews] = useState();
  const [sort, setSort] = useState("desc");
  const [sortColumn, setSortColumn] = useState("id");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [searchText, setSearchText] = useState();
  const [selectedRows, setSelectedRows] = useState();
  const [activeNews, setActiveNews] = useState();
  const [deletedNews, setDeletedNews] = useState();
  const [active, setActive] = useState(undefined);

  // ** Hooks
  const navigate = useNavigate();

  const renderTitle = () => {
    if (active === undefined) {
      return "همه اخبار";
    } else if (active === true) {
      return "اخبار فعال";
    } else if (active === false) {
      return "اخبار حذف شده";
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const getCourses = await adminNewsFilterListAPI(
          currentPage,
          rowsPerPage
        );

        const getActiveNews = await adminNewsFilterListAPI(
          1,
          10000,
          undefined,
          undefined,
          undefined,
          true
        );

        const getDeletedCourses = await adminNewsFilterListAPI(
          1,
          10000,
          undefined,
          undefined,
          undefined,
          false
        );

        setAllNews(getCourses.news);
        setActiveNews(getActiveNews);
        setDeletedNews(getDeletedCourses);
      } catch (error) {
        toast.error("مشکلی در دریافت اخبار به وجود آمد !");
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const getCourses = await adminNewsFilterListAPI(
          currentPage,
          rowsPerPage,
          sortColumn,
          sort,
          searchText,
          active
        );

        setAllNews(getCourses.news);
      } catch (error) {
        console.log(error);
        toast.error("مشکلی در دریافت اخبار به وجود آمد !");
      }
    };

    fetchCourses();
  }, [searchText, sort, sortColumn, active]);

  return (
    <div className="invoice-list-wrapper">
      <BreadCrumbs
        title="لیست اخبار"
        data={[
          { title: "مدیریت اخبار", link: "/news" },
          { title: "لیست اخبار" },
        ]}
      />
      <div className="app-user-list w-100">
        <Row>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="primary"
              statTitle="همه اخبار"
              icon={<Book />}
              renderStats={
                <h3 className="fw-bolder mb-75">{allNews?.length || 0}</h3>
              }
              onClick={() => setActive(undefined)}
              className="cursor-pointer"
              backgroundColor={active === undefined && "rgb(0 0 0 / 23%)"}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="success"
              statTitle="اخبار فعال"
              icon={<CheckCircle />}
              renderStats={
                <h3 className="fw-bolder mb-75">
                  {activeNews?.totalCount || 0}
                </h3>
              }
              onClick={() => setActive(true)}
              className="cursor-pointer"
              backgroundColor={active === true && "rgb(0 0 0 / 23%)"}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="danger"
              statTitle="اخبار غیر فعال"
              icon={<Trash2 size={20} />}
              renderStats={
                <h3 className="fw-bolder mb-75">
                  {deletedNews?.totalCount || 0}
                </h3>
              }
              onClick={() => setActive(false)}
              className="cursor-pointer"
              backgroundColor={active === false && "rgb(0 0 0 / 23%)"}
            />
          </Col>
        </Row>
      </div>
      <Card className="rounded">
        <TableServerSide
          data={allNews}
          columns={COURSE_COLUMNS()}
          renderTitle={renderTitle()}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          setCurrentPage={setCurrentPage}
          setRowsPerPage={setRowsPerPage}
          setSearchValue={setSearchText}
          setSort={setSort}
          setSortColumn={setSortColumn}
          setSelectedRows={setSelectedRows}
          selectableRows
          handleDeleteData={() =>
            handleDeleteCourse(selectedRows, navigate, "/news")
          }
          isCourseCreateButtonShow
          notFoundText="خبری پیدا نشد !"
          deleteSelectedRowsText="حذف یا بازگرادنی"
        />
      </Card>
    </div>
  );
};

export default NewsPage;
