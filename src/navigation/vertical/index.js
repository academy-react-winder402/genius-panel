import { Circle, Code, Home, Users } from "react-feather";

import CourseReservedPage from "../../pages/CourseReserved";
import CoursesPage from "../../pages/Courses";
import CreateCoursePage from "../../pages/CreateCourse";
import CreateNewsPage from "../../pages/CreateNews";
import CreateUserPage from "../../pages/CreateUser";
import UsersPage from "../../pages/Users";

export default [
  {
    id: "home",
    title: "داشبورد",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "users",
    title: "مدیریت کاربران",
    icon: <Users size={20} />,
    children: [
      {
        title: "لیست کاربران",
        navLink: "/users",
        element: <UsersPage />,
        icon: <Circle />,
      },
      {
        title: "افزودن کاربر",
        navLink: "/create-user",
        element: <CreateUserPage />,
        icon: <Circle />,
      },
    ],
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
        title: "دوره های من",
        navLink: "/my-courses",
        element: <CoursesPage />,
        icon: <Circle />,
      },
      {
        title: "دوره های رزرو شده",
        navLink: "/course-reserved",
        element: <CourseReservedPage />,
        icon: <Circle />,
      },
      {
        title: "افزودن دوره",
        navLink: "/create-course",
        element: <CreateCoursePage />,
        icon: <Circle />,
      },
    ],
  },
  {
    id: "news",
    title: "مدیریت اخبار",
    icon: <Code size={20} />,
    children: [
      {
        title: "افزودن خبر",
        navLink: "/create-news",
        element: <CreateNewsPage />,
        icon: <Circle />,
      },
    ],
  },
];
