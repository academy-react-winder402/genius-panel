// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

// ** Reactstrap Imports
import { Card } from "reactstrap";

// ** Core Imports
import { getCourseCommentsAPI } from "../../../../core/services/api/course/course-comments/get-course-comments.api";

// ** Columns
import { COURSE_COMMENTS_COLUMNS } from "../../course-columns/course-comments-columns";

// ** Custom Components
import TableServerSide from "../../TableServerSide";

// ** Styles
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

const CourseComments = () => {
  // ** States
  const [courseComments, setCourseComments] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [searchText, setSearchText] = useState();
  const [selectedRows, setSelectedRows] = useState();

  // ** Hooks
  const { id } = useParams();

  useEffect(() => {
    const fetchCourseComments = async () => {
      try {
        const getCourseComments = await getCourseCommentsAPI(id);

        setCourseComments(getCourseComments);
      } catch (error) {
        toast.error("مشکلی در دریافت نظرات دوره به وجود آمد !");
      }
    };
    fetchCourseComments();
  }, []);

  return (
    <div className="invoice-list-wrapper">
      <Card className="rounded">
        <TableServerSide
          data={courseComments}
          columns={COURSE_COMMENTS_COLUMNS}
          renderTitle="نظرات کاربران"
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          setCurrentPage={setCurrentPage}
          setRowsPerPage={setRowsPerPage}
          setSearchValue={setSearchText}
          setSelectedRows={setSelectedRows}
          handleDeleteData={() => {}}
        />
      </Card>
    </div>
  );
};

export default CourseComments;
