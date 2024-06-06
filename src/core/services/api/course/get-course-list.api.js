import http from "../../interceptor";

export const getCourseListAPI = async (
  pageNumber,
  rowsOfPage,
  sortingCol,
  sortType,
  query,
  isTeacherCourse
) => {
  try {
    const response = await http.get(
      `${isTeacherCourse ? "/Course/TeacherCourseList" : "/Course/CourseList"}`,
      {
        params: {
          pageNumber,
          rowsOfPage,
          sortingCol,
          sortType,
          query,
        },
      }
    );

    return response;
  } catch (error) {
    return false;
  }
};
