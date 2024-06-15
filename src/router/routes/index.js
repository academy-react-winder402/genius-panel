// ** React Imports
import { Fragment, lazy } from "react";
import { Navigate } from "react-router-dom";

// ** Layouts
import BlankLayout from "@layouts/BlankLayout";
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper";
import HorizontalLayout from "@src/layouts/HorizontalLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";

// ** Route Components
import PublicRoute from "@components/routes/PublicRoute";

// ** Utils
import { isObjEmpty } from "@utils";

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />,
};

// ** Document title
const TemplateTitle = "%s - Genius React Admin Template";

// ** Default Route
const DefaultRoute = "/home";

const Home = lazy(() => import("../../pages/Home"));
const Login = lazy(() => import("../../pages/Login"));
const Error = lazy(() => import("../../pages/Error"));
const Users = lazy(() => import("../../pages/Users"));
const UserDetails = lazy(() => import("../../pages/UserDetails"));
const CreateUser = lazy(() => import("../../pages/CreateUser"));
const EditUser = lazy(() => import("../../pages/EditUser"));
const Courses = lazy(() => import("../../pages/Courses"));
const MyCourses = lazy(() => import("../../pages/MyCourses"));
const CreateCourse = lazy(() => import("../../pages/CreateCourse"));
const EditCourse = lazy(() => import("../../pages/EditCourse"));
const CourseReserved = lazy(() => import("../../pages/CourseReserved"));
const CourseDetails = lazy(() => import("../../pages/CourseDetails"));
const News = lazy(() => import("../../pages/News"));
const NewsDetails = lazy(() => import("../../pages/NewsDetails"));
const CreateNews = lazy(() => import("../../pages/CreateNews"));
const EditNews = lazy(() => import("../../pages/EditNews"));
const Categories = lazy(() => import("../../pages/Categories"));
const CreateCategory = lazy(() => import("../../pages/CreateCategory"));

// ** Merge Routes
const Routes = [
  {
    path: "/",
    index: true,
    element: <Navigate replace to={DefaultRoute} />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/users/:id",
    element: <UserDetails />,
  },
  {
    path: "/create-user",
    element: <CreateUser />,
  },
  {
    path: "/users/edit/:id",
    element: <EditUser />,
  },
  {
    path: "/courses",
    element: <Courses />,
  },
  {
    path: "/my-courses",
    element: <MyCourses />,
  },
  {
    path: "/course-reserved",
    element: <CourseReserved />,
  },
  {
    path: "/courses/:id",
    element: <CourseDetails />,
  },
  {
    path: "/create-course",
    element: <CreateCourse />,
  },
  {
    path: "/courses/edit/:id",
    element: <EditCourse />,
  },
  {
    path: "/news",
    element: <News />,
  },
  {
    path: "/news/:id",
    element: <NewsDetails />,
  },
  {
    path: "/create-news",
    element: <CreateNews />,
  },
  {
    path: "/news/edit/:id",
    element: <EditNews />,
  },
  {
    path: "/categories",
    element: <Categories />,
  },
  {
    path: "/create-category",
    element: <CreateCategory />,
  },
  {
    path: "*",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
];

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    } else {
      return {};
    }
  }
};

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = [];

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false;
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute;

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false);
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment;

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          );
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical";
  const layouts = ["vertical", "horizontal", "blank"];

  const AllRoutes = [];

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    });
  });
  return AllRoutes;
};

export { DefaultRoute, getRoutes, Routes, TemplateTitle };
