import http from "../../interceptor";

export const getCourseWithPaginationAPI = async (
  pageNumber,
  rowsOfPage,
  sortingCol,
  sortType,
  query,
  costDown,
  costUp,
  techCount,
  listTech,
  courseLevelId,
  courseTypeId,
  startDate,
  endDate,
  teacherId
) => {
  try {
    const response = http.get("/Home/GetCoursesWithPagination", {
      params: {
        pageNumber,
        rowsOfPage,
        sortingCol,
        sortType,
        query,
        costDown,
        costUp,
        techCount,
        listTech,
        courseLevelId,
        courseTypeId,
        startDate,
        endDate,
        teacherId,
      },
    });

    return response;
  } catch (error) {
    return false;
  }
};
