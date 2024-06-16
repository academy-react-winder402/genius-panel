import http from "../../../interceptor";

export const getCourseGroupsAPI = async (
  pageNumber,
  rowsOfPage,
  sortingCol,
  sortType,
  query
) => {
  try {
    const response = await http.get("/CourseGroup", {
      pageNumber,
      rowsOfPage,
      sortingCol,
      sortType,
      query,
    });

    return response;
  } catch (error) {
    return false;
  }
};
