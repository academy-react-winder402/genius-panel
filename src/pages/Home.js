// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Col, Row } from "reactstrap";

// ** Redux Imports
import { useDispatch } from "react-redux";
import { onDashboardReportChange } from "../redux/dashboardReport";

// ** Core Imports
import CardMedal from "../@core/components/CardMedal";
import ChartJS from "../@core/components/ChartjsDoughnutChart";
import StatsCard from "../@core/components/StatsCard";
import { dashboardReportAPI } from "../core/services/api/dashboard/dashboard-report.api";

const Home = () => {
  // ** States
  const [dashboardReport, setDashboardReport] = useState();

  // ** Hooks
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDashboardReport = async () => {
      try {
        const getDashboardReport = await dashboardReportAPI();

        dispatch(onDashboardReportChange(getDashboardReport));
        setDashboardReport(getDashboardReport);
      } catch (error) {
        toast.error("مشکلی در دریافت اطلاعات داشبورد به وجود آمد !");
      }
    };

    fetchDashboardReport();
  }, []);

  return (
    <div id="dashboard-ecommerce">
      <Row className="match-height">
        <Col xl="4" md="6" xs="12">
          <CardMedal dashboardData={dashboardReport} />
        </Col>
        <Col xl="8" md="6" xs="12">
          <StatsCard
            cols={{ xl: "3", sm: "6" }}
            dashboardData={dashboardReport}
          />
        </Col>
      </Row>
      <Row>
        <ChartJS />
      </Row>
    </div>
  );
};

export default Home;
