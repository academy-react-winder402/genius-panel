// ** React Imports
import { Fragment } from "react";

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// ** Icons Imports
import { Bell, Bookmark, User } from "react-feather";

// ** Course Components
import CourseReserve from "./CourseReserve";

const CourseTabs = ({ active, toggleTab }) => {
  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
            <Bell className="font-medium-3 me-50" />
            <span className="fw-bold">اطلاعات دوره</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "2"} onClick={() => toggleTab("2")}>
            <Bookmark className="font-medium-3 me-50" />
            <span className="fw-bold">رزور کنندگان</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "3"} onClick={() => toggleTab("3")}>
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">نظرات</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <CourseReserve />
        </TabPane>
        <TabPane tabId="2">
          <CourseReserve />
        </TabPane>
        <TabPane tabId="3">
          <CourseReserve />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default CourseTabs;
