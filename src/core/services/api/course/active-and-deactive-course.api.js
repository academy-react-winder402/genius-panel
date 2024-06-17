import http from "../../interceptor";

export const activeAndInactiveCourseAPI = async (active, id) => {
  try {
    const response = await http.put("/Course/ActiveAndDeactiveCourse", {
      active,
      id,
    });

    return response;
  } catch (error) {
    return false;
  }
};
