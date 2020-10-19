import { bookings } from './../database';
import axios from "axios";


const API = process.env.REACT_APP_LOCAL_BASE_SERVER_URL + "/api/"
   

export const getBookingsNotScanned = async ()=>{

    try {
        const response =  await fetch(`${API}bookings/unScanned`);
        const result = await response.json()
            if(result.data.success){
                return result.data.data
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
        const response =  await fetch(`${API}bookings/scanned`);
        const result = await response.json()
            if(result.data.success){
                return result.data.data
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
        const response =  await fetch(`${API}bookings/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(booking)
          });
          const result = await response.json()
            if(result.data.success){
                return result.data.data
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