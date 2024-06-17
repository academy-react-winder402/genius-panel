import http from "../../interceptor";

export const getUserListsAPI = async (
  pageNumber,
  rowsOfPage,
  sortingCol,
  sortType,
  query,
  isActiveUser,
  isDeletedUser,
  roleId
) => {
  try {
    const response = await http.get("/User/UserMannage", {
      params: {
        pageNumber,
        rowsOfPage,
        sortingCol,
        sortType,
        query,
        isActiveUser,
        isDeletedUser,
        roleId,
      },
    });

    return response;
  } catch (error) {
    return false;
  }
};
