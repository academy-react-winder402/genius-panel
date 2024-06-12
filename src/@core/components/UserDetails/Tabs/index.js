// ** React Imports
import { Fragment } from "react";

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// ** Icons Imports
import { Bookmark, Heart } from "react-feather";

// ** User Components
import UserCourseReserve from "./UserCourseReserves";
import UserFavoriteCourses from "./UserFavoriteCourses";

const UserTabs = ({ active, toggleTab, user }) => {
  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
            <Bookmark className="font-medium-3 me-50" />
            <span className="fw-bold">دوره های رزرو شده</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "2"} onClick={() => toggleTab("2")}>
            <Heart className="font-medium-3 me-50" />
            <span className="fw-bold">دوره های مورد علاقه</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <UserCourseReserve courseReserve={user?.coursesReseves} />
        </TabPane>
        <TabPane tabId="2">
          <UserFavoriteCourses favoriteCourses={user?.courses} />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default UserTabs;
