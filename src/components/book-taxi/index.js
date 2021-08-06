import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import BookTaxiForm from "./book-form";
import { orderTaxi } from "../../store/booking";

export default function BookTaxi() {
  const [booking, setBooking] = useState(bookTaxiInitialValue);
  const history = useHistory();
  const dispatch = useDispatch();
  const bookingState = useSelector((state) => state.booking);
  console.log("inside order taxi component", bookingState);

  const handleInputChage = (input) => {
    console.log("input: ", input);
    const { name, value, ...rest } = input;

    setBooking((prev) => {
      return { ...prev, [name]: value.toString(), ...rest };
    });
  };

  const handleSwapLocation = () => {
    const { dropoffLocation, pickupLocation } = booking;

    setBooking((prev) => {
      return {
        ...prev,
        dropoffLocation: pickupLocation,
        pickupLocation: dropoffLocation,
      };
    });
  };

  const handleOrderTaxi = () => {
    console.log("order taxi");

    dispatch(orderTaxi(booking));
    history.push("taxi_booking_page_one");
  };

  return (
    <BookTaxiForm
      onSubmit={handleOrderTaxi}
      onSwapLocation={handleSwapLocation}
      onInputChange={handleInputChage}
      inputValues={booking}
    />
  );
}

const bookTaxiInitialValue = {
  dropoffLocation: "",
  pickupLocation: "",
  pickupDate: "",
  pickupTime: "",
  returnDate: "",
  returnTime: "",
};
