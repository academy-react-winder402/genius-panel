import http from "../../interceptor";

export const getCourseListAPI = async (
  pageNumber,
  rowsOfPage,
  sortingCol,
  sortType,
  query
) => {
  try {
    const response = await http.get("/Course/CourseList", {
      params: {
        pageNumber,
        rowsOfPage,
        sortingCol,
        sortType,
        query,
      },
    });

    return response;
  } catch (error) {
    return false;
  }
};
