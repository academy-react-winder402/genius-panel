import { Home, Circle, Code } from "react-feather";

import CoursesPage from "../../pages/Courses";
import CreateCoursePage from "../../pages/CreateCourse";
import CourseReservedPage from "../../pages/CourseReserved";

export default [
  {
    id: "home",
    title: "داشبورد",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "courses",
    title: "مدیریت دوره ها",
    icon: <Code size={20} />,
    children: [
      {
        title: "لیست دوره ها",
        navLink: "/courses",
        element: <CoursesPage />,
        icon: <Circle />,
      },
      {
        title: "افزودن دوره",
        navLink: "/create-course",
        element: <CreateCoursePage />,
        icon: <Circle />,
      },
      {
        title: "دوره های رزرو شده",
        navLink: "/course-reserved",
        element: <CourseReservedPage />,
        icon: <Circle />,
      },
    ],
  },

  // {
  //   id: "smaplePage",
  //   title: "Sample Page",
  //   icon: <Airplay size={20} />,
  //   // navLink: "/sample",
  //   children: [
  //     {
  //       id: "invoiceList",
  //       title: "List",
  //       icon: <Circle size={12} />,
  //       navLink: "/apps/invoice/list",
  //     },
  //   ],
  // },
];
