// ** React Imports

// ** Reactstrap Imports
import { Card, CardBody, Col, Row } from "reactstrap";

// ** Context

// ** Custom Components
import StatsVertical from "@components/widgets/stats/StatsVertical";

// ** Icons Imports
import {
  Award,
  Eye,
  Heart,
  MessageSquare,
  ShoppingBag,
  Truck,
} from "react-feather";

const CourseData = ({
  courseUserTotal,
  courseCommentTotal,
  paymentDoneTotal,
  courseLikeTotal,
  describe,
}) => {
  return (
    <>
      <Row>
        <Col xl="3" md="4" sm="6">
          <StatsVertical
            icon={<Eye size={21} />}
            color="info"
            stats={courseUserTotal}
            statTitle="دانشجو"
          />
        </Col>
        <Col xl="3" md="4" sm="6">
          <StatsVertical
            icon={<MessageSquare size={21} />}
            color="warning"
            stats={courseCommentTotal}
            statTitle="نظر"
          />
        </Col>
        <Col xl="3" md="4" sm="6">
          <StatsVertical
            icon={<ShoppingBag size={21} />}
            color="danger"
            stats={paymentDoneTotal}
            statTitle="سفارش"
          />
        </Col>
        <Col xl="3" md="4" sm="6">
          <StatsVertical
            icon={<Heart size={21} />}
            color="primary"
            stats={courseLikeTotal}
            statTitle="لایک"
          />
        </Col>
      </Row>
      <Card>
        <CardBody>
          <h4>توضیحات دوره</h4>
          <p>{describe}</p>
        </CardBody>
      </Card>
    </>
  );
};

export default CourseData;
