import React, { useReducer } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Booking from "./Booking";
import ConfirmedBooking from "./ConfirmedBooking";
import Header from "./Header";
import food1 from "../images/food1.avif";

const Main = () => {
  const seededRandom = function (seed) {
    var m = 2 ** 35 - 31;
    var a = 185852;
    var s = seed % m;
    return function () {
      return (s = (s * a) % m) / m;
    };
  };

  const fetchAPI = function (date) {
    let result = [];
    let random = seededRandom(date.getDate());

    for (let i = 17; i <= 23; i++) {
      if (random() < 0.5) {
        result.push(i + ":00");
      }
      if (random() < 0.5) {
        result.push(i + ":30");
      }
    }
    return result;
  };

  const submitAPI = function (formData) {
    return true;
  };

  const initialState = { availableTimes: fetchAPI(new Date()) };
  const [state, dispatch] = useReducer(updateTimes, initialState);

  function updateTimes(state, date) {
    return { availableTimes: fetchAPI(new Date(date)) };
  }

  const navigate = useNavigate();
  function submitForm(formData) {
    if (submitAPI(formData)) {
      navigate("/confirmed");
    }
  }

  return (
    <main>
      {/* Existing Routes */}
      <Routes>
        <Route path="/" element={<Header />} />
        <Route
          path="/booking"
          element={
            <Booking
              availableTimes={state}
              dispatch={dispatch}
              submitForm={submitForm}
            />
          }
        />
        <Route path="/confirmed" element={<ConfirmedBooking />} />
      </Routes>

    
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
          padding: "2rem",
          maxWidth: "1200px",
          margin: "2rem auto",
        }}
      >
        {[
          {
            title: "Greek Salad",
            desc: "Fresh veggies, feta & olives",
            price: "$12.99",
            img: food1,
          },
          {
            title: "Bruschetta",
            desc: "Toasted bread with garlic & tomatoes",
            price: "$6.99",
            img: food1,
          },
          {
            title: "Lemon Dessert",
            desc: "Refreshing lemon cake",
            price: "$5.99",
            img: food1
          },
          {
            title: "Pasta Special",
            desc: "Authentic Italian pasta",
            price: "$14.99",
            img: food1,
          },
        ].map((item, idx) => (
          <div
            key={idx}
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "1rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <img
              src={item.img}
              alt={item.title}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "1rem",
              }}
            />
            <h3 style={{ margin: "0 0 0.5rem 0", color: "#333" }}>{item.title}</h3>
            <p style={{ margin: "0 0 1rem 0", color: "#555" }}>{item.desc}</p>
            <p style={{ fontWeight: "bold", marginBottom: "1rem" }}>{item.price}</p>
            <button
              onClick={() => navigate("/booking")}
              style={{
                padding: "0.75rem",
                background: "#F4CE14",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "background 0.3s ease",
              }}
            >
              Reserve
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Main;
