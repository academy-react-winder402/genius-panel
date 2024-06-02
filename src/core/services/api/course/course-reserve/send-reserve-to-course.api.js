import http from "../../../interceptor";

export const sendReserveToCourseAPI = async (
  courseId,
  courseGroupId,
  studentId
) => {
  try {
    const response = await http.post("/CourseReserve/SendReserveToCourse", {
      courseId,
      courseGroupId,
      studentId,
    });

    return response;
  } catch (error) {
    return false;
  }
};
