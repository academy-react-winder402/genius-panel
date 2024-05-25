import { Fragment } from "react";
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Reactstrap Imports
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledTooltip,
  UncontrolledDropdown,
} from "reactstrap";

// ** Third Party Components
import {
  Eye,
  Send,
  Edit,
  Copy,
  Save,
  Info,
  Trash,
  PieChart,
  Download,
  TrendingUp,
  CheckCircle,
  MoreVertical,
  ArrowDownCircle,
} from "react-feather";
import { convertDateToPersian } from "../../../core/utils/date-helper.utils";
import { numberWithCommas } from "../../../core/utils/number-helper.utils";

// ** Vars
const invoiceStatusObj = {
  Sent: { color: "light-secondary", icon: Send },
  Paid: { color: "light-success", icon: CheckCircle },
  Draft: { color: "light-primary", icon: Save },
  Downloaded: { color: "light-info", icon: ArrowDownCircle },
  "Past Due": { color: "light-danger", icon: Info },
  "Partial Payment": { color: "light-warning", icon: PieChart },
};

// ** Table columns
export const columns = [
  {
    sortable: true,
    minWidth: "102px",
    sortField: "lastUpdate",
    name: <TrendingUp size={14} />,
    // selector: row => row.invoiceStatus,
    cell: (row) => {
      const color = invoiceStatusObj[row.invoiceStatus]
          ? invoiceStatusObj[row.invoiceStatus].color
          : "primary",
        Icon = invoiceStatusObj[row.invoiceStatus]
          ? invoiceStatusObj[row.invoiceStatus].icon
          : Edit;
      return (
        <Fragment>
          <Avatar
            color={color}
            icon={<Icon size={14} />}
            id={`av-tooltip-${row.id}`}
          />
          <UncontrolledTooltip placement="top" target={`av-tooltip-${row.id}`}>
            {convertDateToPersian(row.lastUpdate)}
          </UncontrolledTooltip>
        </Fragment>
      );
    },
  },
  {
    name: "نام دوره",
    sortable: true,
    minWidth: "300px",
    sortField: "250px",
    // selector: (row) => row?.title,
    cell: (row) => (
      <div>
        <span className="text-sm text-primary">{row?.title}</span>
      </div>
    ),
  },
  {
    name: "قیمت",
    sortable: true,
    minWidth: "150px",
    sortField: "cost",
    cell: (row) => <span>{numberWithCommas(row.cost) || 0} تومان</span>,
  },
  {
    sortable: true,
    name: "سطح دوره",
    minWidth: "164px",
    sortField: "levelName",
    // selector: row => row.levelName,
    cell: (row) => {
      return (
        <Badge
          color={
            row.levelName === "فوق پیشرفته"
              ? "light-success"
              : row.levelName === "پیشرقته"
              ? "light-primary"
              : "light-warning"
          }
          pill
        >
          {row.levelName}
        </Badge>
      );
    },
  },
  {
    sortable: true,
    name: "مدرس",
    sortable: true,
    minWidth: "150px",
    sortField: "teacherName",
    sortName: "teacherName",
    cell: (row) => <span>{row.teacherName}</span>,
  },
  {
    name: "موارد دیگر",
    minWidth: "110px",
    cell: (row) => (
      <div className="column-action d-flex align-items-center">
        {/* <UncontrolledTooltip placement="top" target={`pw-tooltip-${row?.courseId}`}>
          نمایش دوره
        </UncontrolledTooltip> */}
        <UncontrolledDropdown>
          <DropdownToggle tag="span">
            <MoreVertical size={17} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem
              tag={Link}
              to={`/courses/${row.courseId}`}
              className="w-100"
            >
              <Edit size={14} className="me-50" />
              <span className="align-middle">ویرایش</span>
            </DropdownItem>
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => e.preventDefault()}
            >
              <Trash size={14} className="me-50" />
              <span className="align-middle">حذف</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    ),
  },
];
