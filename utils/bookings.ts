import { bookings } from './../database';


export const getBookingsNotScanned = async ()=>{

   
    let promise = Promise.resolve(bookings.filter(x=> !x.scanned))

    let result  = await promise
    
    return result
}
export const getBookingsScanned = ()=>{
    let scannedBookings = bookings.filter(x=> x.scanned);
    return scannedBookings
}

export const getNumberOfBookings = ()=>{
    return bookings.length
}
export const addBooking = (booking:any)=>{

    bookings.push(booking);

}

export const deleteBooking =(id:number)=>{
    let newBookings = bookings.filter(x => x.id !== id)

}