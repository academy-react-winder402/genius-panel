// ** React Imports
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// ** Reactstrap Imports
import { Col, Row } from "reactstrap";

// ** User View Components
import CourseTabs from "../@core/components/CourseDetails/Tabs";

// ** Styles
import "@styles/react/apps/app-users.scss";
import CourseInfoCard from "../@core/components/CourseDetails/CourseInfoCard";
import toast from "react-hot-toast";
import { getCourseByIdAPI } from "../core/services/api/course/get-course-by-id.api";

const CourseDetailsPage = () => {
  // ** States
  const [course, setCourse] = useState();

  // ** Hooks
  const { id } = useParams();

  // // ** Get Course
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const getCourse = await getCourseByIdAPI(id);

        setCourse(getCourse);
      } catch (error) {
        toast.error("مشکلی در دریافت دوره به وجود آمد !");
      }
    };

    fetchCourse();
  }, []);

  const [active, setActive] = useState("1");

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <CourseInfoCard course={course} />
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <CourseTabs active={active} toggleTab={toggleTab} />
        </Col>
      </Row>
    </div>
  );
  // :(
  //     <Alert color="danger">
  //       <h4 className="alert-heading">User not found</h4>
  //       <div className="alert-body">
  //         User with id: {id} doesn't exist. Check list of all Users:{" "}
  //         <Link to="/apps/user/list">Users List</Link>
  //       </div>
  //     </Alert>
  //   );
};

export default CourseDetailsPage;
