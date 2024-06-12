// ** React Imports
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// ** Reactstrap Imports
import { Col, Row } from "reactstrap";

// ** User View Components
import UserTabs from "../@core/components/UserDetails/Tabs";
import UserInfoCard from "../@core/components/UserDetails/UserInfoCard";

// ** Core Imports
import { getUserWithIdAPI } from "../core/services/api/user/get-user-with-id.api";

// ** Styles
import "@styles/react/apps/app-users.scss";

const UserDetailsPage = () => {
  // ** States
  const [user, setUser] = useState();

  // ** Hooks
  const { id } = useParams();

  // ** Get suer on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const getUser = await getUserWithIdAPI(id);

        setUser(getUser);
      } catch (error) {
        toast.error("مشکلی در دریافت اطلاعات کاربر به وجود آمد !");
      }
    };

    fetchUser();
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
          <UserInfoCard user={user} />
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <UserTabs active={active} toggleTab={toggleTab} user={user} />
        </Col>
      </Row>
    </div>
  );
};

export default UserDetailsPage;
