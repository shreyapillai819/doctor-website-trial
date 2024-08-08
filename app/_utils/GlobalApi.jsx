const { default: axios } = require("axios");

const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;
console.log(API_KEY);
const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

const getCategory = () => axiosClient.get("/categories?populate=*");
const getDoctorList = () => axiosClient.get("/products?populate=*");
const getDoctorByCategory = (category) =>
  axiosClient.get(
    "/products?filters[category][Name][$in]=" + category + "&populate=*"
  );
const getDoctorById = (id) =>
  axiosClient.get("/products/" + id + "?populate=*");
const bookAppointment = (data) => axiosClient.post("/appointments", data);
const getUserBookingList =(userEmail)=>axiosClient.get("/appointments?filters[Email][$eq]="+userEmail+"&populate[doctor][image][populate][0]=url&populate=*");
const deleteBooking=(id)=>axiosClient.delete('/appointments/'+id);

const sendEmail =(data)=>axios.post('/api/sendEmail',data);
export default {
  getCategory,
  getDoctorList,
  getDoctorByCategory,
  getDoctorById,
  bookAppointment,
  sendEmail,
  getUserBookingList,
  deleteBooking
};
