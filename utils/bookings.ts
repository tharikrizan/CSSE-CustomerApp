import { bookings } from './../database';
import axios from "axios";


const API =
  process.env.NODE_ENV !== "production"
    ? process.env.REACT_APP_LOCAL_BASE_SERVER_URL + "/api/"
    : "api/";

export const getBookingsNotScanned = async ()=>{

    try {
        const response =  await axios.get(`${API}bookings/unScanned`);
            if(response.data.success){
                return response.data.data
            }
            else{
                return null
            }
    } catch (error) {
        return null
    }
}
export const getBookingsScanned = async ()=>{
    try {
        const response =  await axios.get(`${API}bookings/scanned`);
            if(response.data.success){
                return response.data.data
            }
            else{
                return null
            }
    } catch (error) {
        return null
    }
}

export const getNumberOfBookings = ()=>{
    return bookings.length
}
export const addBooking = async (booking:any)=>{

    try {
        const response =  await axios.post(`${API}bookings/`, {
            ...booking
            });
            if(response.data.success){
                return response.data.data
            }
            else{
                return null
            }
    } catch (error) {
        return null
    }
   

    

}

export const deleteBooking =async(id:number)=>{
    const response = await axios.delete(`${API}bookings/${id}`);

    return response.data.success

}