// ** React Imports
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// Toast Import
import toast from "react-hot-toast";

// ** Table Columns
import { columns } from "../@core/components/course-columns";

import { courseReserveAPI } from "../core/services/api/course/course-reserve.api";

// ** Third Party Components
import ReactPaginate from "react-paginate";
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";
import BreadCrumbs from "../@core/components/breadcrumbs";

// Hooks import
import { useTimeOut } from "../utility/hooks/useTimeOut";

// ** Reactstrap Imports
import { Button, Input, Row, Col, Card } from "reactstrap";

// ** Styles
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

const CustomHeader = ({ handlePerPage }) => {
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
        </Col>
        <Col
          lg="6"
          className="actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0"
        >
          <Button tag={Link} to="/create-course" color="primary">
            رزرو
          </Button>
        </Col>
      </Row>
    </div>
  );
};

const CourseReservedPage = () => {
  // ** States
  const [reservedCourses, setReserveCourses] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const textTimeOut = useTimeOut();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const getData = await courseReserveAPI();

        setReserveCourses(getData);
      } catch (error) {
        toast.error("مکشلی در دریافت دوره های رزرو شده به وجود آدمد ...");
      }
    };

    fetchCourses();
  }, []);

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
    const count = Number((reservedCourses.length / rowsPerPage).toFixed(0));

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
    if (reservedCourses?.length > 0) {
      return reservedCourses.length;
    } else if (reservedCourses?.length === 0) {
      return [];
    } else {
      return reservedCourses?.slice(0, rowsPerPage);
    }
  };

  return (
    <div className="invoice-list-wrapper">
      <BreadCrumbs
        title="لیست دوره های رزرو شده"
        data={[
          { title: "مدیریت دوره ها", link: "/courses" },
          { title: "لیست  دوره های رزرو شده" },
        ]}
      />
      <Card className="rounded">
        <div className="invoice-list-dataTable react-dataTable">
          <DataTable
            noHeader
            pagination
            paginationServer
            subHeader={true}
            columns={columns}
            responsive={true}
            data={dataToRender()}
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

export default CourseReservedPage;
