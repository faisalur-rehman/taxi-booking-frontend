import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { selectVehicle } from "../../store/booking";
import { BASE_URL } from "../../utils/constants";

export default function SingleVehicle({ vehicle }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSelectVehicle = () => {
    console.log("select vehicle");
    dispatch(selectVehicle(vehicle));
    history.push("/taxi_booking_page_two");
  };

  return (
    <div class="booking_page_one_car_selection">
      <div class="booking_page_one_car_detail">
        <div class="booking_page_one_single_car_detail">
          <figure>
            <img style={{ width: "180px", height: "100%"}} src={BASE_URL + "/" + vehicle.image} />
          </figure>
          <div class="page_one_single_car_detail">
            <h1>{vehicle.name}</h1>
            <span>
              <i class="fas fa-user"></i>
              <small>{vehicle.passengerCapacity} Paks</small>
            </span>
            <span>
              <i class="fas fa-suitcase-rolling"></i>{" "}
              <small>{vehicle.luggageCapacity} Bags</small>
            </span>
            <span>
              <i id="single_car_more" class="fas fa-chevron-down"></i>
              <small>More Info</small>
            </span>
          </div>
        </div>
      </div>
      <div class="booking_page_one_car_detail">
        <div class="booking_page_one_car_price_detail">
          <strong>Total One-Way Price</strong>
          <strong>${vehicle.pricePerKM}</strong>
          <small>Free Cancelation</small>
          <small>No Hidden Charges</small>
          {/* <Link to="/taxi_booking_page_two">Select This Vehicle</Link> */}
          <Link to="#" onClick={handleSelectVehicle}>
            Select This Vehicle
          </Link>
        </div>
      </div>
    </div>
  );
}
