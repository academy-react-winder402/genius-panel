import http from "../../interceptor";

export const adminCommentManagementAPI = async (
  pageNumber,
  rowsOfPage,
  sortingCol,
  sortType,
  query,
  accept,
  userId
) => {
  try {
    const response = await http.get("/Course/CommentManagmentTeacher", {
      params: {
        pageNumber,
        rowsOfPage,
        sortingCol,
        sortType,
        query,
        accept,
        userId,
      },
    });

    return response;
  } catch (error) {
    return false;
  }
};
