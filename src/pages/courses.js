// ** React Imports
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// Toast Import
import toast from "react-hot-toast";

// ** Table Columns
import { columns } from "../@core/components/course-columns";

import { getCourseWithPaginationAPI } from "../core/services/api/course/get-course-with-pagination.api";

// ** Third Party Components
import ReactPaginate from "react-paginate";
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";

// Hooks import
import { useTimeOut } from "../utility/hooks/useTimeOut";

// ** Reactstrap Imports
import { Button, Input, Row, Col, Card } from "reactstrap";

// ** Styles
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import BreadCrumbs from "../@core/components/breadcrumbs";

const CustomHeader = ({ handleFilter, handlePerPage }) => {
  return (
    <div className="invoice-list-table-header w-100 py-2">
      <Row>
        <Col lg="6" className="d-flex align-items-center px-0 px-lg-1">
          <div className="d-flex align-items-center me-2">
            <label htmlFor="rows-per-page">نمایش</label>
            <Input
              type="select"
              id="rows-per-page"
              onChange={handlePerPage}
              className="form-control ms-50 pe-3 coursesRowsPerPageSelectBox"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </Input>
          </div>
          <Button tag={Link} to="/apps/invoice/add" color="primary">
            افزودن دوره
          </Button>
        </Col>
        <Col
          lg="6"
          className="actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0"
        >
          <div className="d-flex align-items-center">
            <Input
              id="search-invoice"
              className="ms-50 me-2 w-200"
              type="text"
              onChange={(e) => handleFilter(e.target.value)}
              placeholder="جستجوی دوره ها"
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

const CoursesPage = () => {
  // ** Store vars
  // ** States
  const [courses, setCourses] = useState();
  const [sort, setSort] = useState("desc");
  const [sortColumn, setSortColumn] = useState("id");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState();

  const textTimeOut = useTimeOut();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const getData = await getCourseWithPaginationAPI(
          currentPage,
          rowsPerPage
        );

        setCourses(getData);
      } catch (error) {
        toast.error("e");
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const getCourses = await getCourseWithPaginationAPI(
          currentPage ? currentPage : undefined,
          rowsPerPage ? rowsPerPage : undefined,
          sortColumn ? sortColumn : undefined,
          sort ? sort : undefined,
          searchText ? searchText : undefined
        );

        setCourses(getCourses);
      } catch (error) {
        toast.error("ارور");
      }
    };

    fetchCourses();
  }, [searchText, sort, currentPage, rowsPerPage]);

  const handleFilter = (val) => {
    textTimeOut(() => {
      setSearchText(val);
    }, 800);
  };

  const handlePerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value));
  };

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const CustomPagination = () => {
    const count = Number((courses.totalCount / rowsPerPage).toFixed(0));

    return (
      <ReactPaginate
        nextLabel=""
        breakLabel="..."
        previousLabel=""
        pageCount={count || 1}
        activeClassName="active"
        breakClassName="page-item"
        pageClassName={"page-item"}
        breakLinkClassName="page-link"
        nextLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousLinkClassName={"page-link"}
        previousClassName={"page-item prev"}
        onPageChange={(page) => handlePagination(page)}
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        containerClassName={"pagination react-paginate justify-content-end p-1"}
      />
    );
  };

  const dataToRender = () => {
    if (courses?.courseFilterDtos?.length > 0) {
      return courses.courseFilterDtos;
    } else if (courses?.totalCount === 0) {
      return [];
    } else {
      return courses?.courseFilterDtos?.slice(0, rowsPerPage);
    }
  };

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
  };

  return (
    <div className="invoice-list-wrapper">
      <BreadCrumbs
        title="لیست دوره ها"
        data={[{ title: "دوره ها" }, { title: "لیست دوره ها" }]}
      />
      <Card className="rounded">
        <div className="invoice-list-dataTable react-dataTable">
          <DataTable
            noHeader
            pagination
            sortServer
            paginationServer
            subHeader={true}
            columns={columns}
            responsive={true}
            onSort={handleSort}
            data={dataToRender()}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            defaultSortField="invoiceId"
            paginationDefaultPage={currentPage}
            paginationComponent={CustomPagination}
            subHeaderComponent={
              <CustomHeader
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
              />
            }
          />
        </div>
      </Card>
    </div>
  );
};

export default CoursesPage;
