import createEnrollment from "./createEnrollment";

const createBooking = async() => {
  const enrollment = await createEnrollment();

  return {
    enrollment,
  };
};

export default createBooking;
