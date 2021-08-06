import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import SingleExtra from "./single-extra";
import { extrasList } from "./extras.data";
import { updateExtras } from "../../store/booking";
import useApi from "../../hooks/useApi";
import * as extraApi from "../../apis/extra";
import AppLoading from "../common/loading";

export default function ListExtras() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [extras, setExtras] = useState(extrasList);
  const [selectedExtras, setSelectedExtra] = useState([]);
  const {
    request,
    data: __extras,
    isLoading,
  } = useApi(extraApi.allExtras, {
    keyExtractor: "extras",
  });

  useEffect(() => {
    request();
  }, []);

  useEffect(() => {
    setExtras(__extras);
  }, [__extras]);

  const handleExtraQuantity = (actionName, extraId) => {
    setExtras((prevExtras) => {
      return prevExtras.map((extra) => {
        if (extra.id === extraId) {
          let quantity = extra.quantity ?? 1;
          quantity = actionName === "increment" ? ++quantity : --quantity;
          return { ...extra, quantity: quantity };
        }
        return extra;
      });
    });
  };

  const handleExtraSelected = (extra) => {
    console.log("extra: ", extra);
    const isSelectedExtraFound = selectedExtras.find(
      (_extra) => _extra.id === extra.id
    );

    if (!isSelectedExtraFound) {
      setSelectedExtra((prev) => [...prev, { ...extra }]);
    }
  };

  const handleNavigateToNext = () => {
    const extras = _makeAppropriateExtras();
    console.log("extras selected: ", extras);
    dispatch(updateExtras(extras));
    history.push("/taxi_booking_page_three");
  };

  const _makeAppropriateExtras = () => {
    const allExtras = {};
    extras.forEach((extra) => {
      allExtras[extra.id] = extra;
    });

    console.log("appro extras: ", selectedExtras);
    return selectedExtras.map((extra) => allExtras[extra.id]);
  };

  return (
    <div class="page_two_section_two">
      {isLoading && <AppLoading />}
      {!isLoading && extras && (
        <_ExtrasList
          extras={extras}
          onUpdateQty={handleExtraQuantity}
          onExtraSelected={handleExtraSelected}
        />
      )}
      <_BookingSummary />
      <_NavigateToPages onNavigateNext={handleNavigateToNext} />
    </div>
  );
}

function _ExtrasList({ extras, onUpdateQty, onExtraSelected }) {
  return (
    <form>
      {extras.map((extra, i) => {
        if (i < 2) {
          return (
            <SingleExtra
              key={extra.id}
              hasQuantity={true}
              extra={extra}
              onUpdateQty={onUpdateQty}
              onExtraSelected={onExtraSelected}
            />
          );
        } else {
          return (
            <SingleExtra
              key={extra.id}
              extra={extra}
              onUpdateQty={onUpdateQty}
              onExtraSelected={onExtraSelected}
            />
          );
        }
      })}
    </form>
  );
}

function _BookingSummary() {
  return (
    <div class="booking_page_one_price_detail" id="mobile_booking_summary">
      <h2>Booking Summary</h2>
      <div class="booking_page_one_total_price">
        <h3>Selected Vehicle</h3>
        <span>$100</span>
      </div>
      <div class="booking_page_one_total_price total_price_border">
        <h3>Selected Extra</h3>
        <span>$100</span>
      </div>
      <div class="booking_page_one_total_price">
        <h3>Total Price</h3>
        <span>$100</span>
      </div>
    </div>
  );
}

function _NavigateToPages({ onNavigateNext }) {
  return (
    <div class="continuous_btn">
      <div class="back">
        <Link to="/taxi_booking_page_one">Back</Link>
      </div>
      <div class="next">
        {/* <Link to="/taxi_booking_page_three">Next</Link> */}
        <Link to="#" onClick={onNavigateNext}>
          Next
        </Link>
      </div>
    </div>
  );
}
