import React, { useState } from "react";
import "../hook/useFetch.jsx";
import "./trip.css";
import useFetch from "../hook/useFetch.jsx";

export default function Trips() {
  // let [trips, setTrips] = useState([]);
  let [url, setUrl] = useState("http://localhost:3001/trips");
  let { data: trips, loading, error } = useFetch(url);

  //   fetch("http://localhost:3001/trips")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setTrips(data);
  //     });
  //   console.log(trips);

  // useEffect(() => {
  //   fetch(url)
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setTrips(data);
  //     });
  // }, [url]); // if url is update by setUrl the useEffect Hook function will run again

  return (
    <div className="container">
      {error && <p>error.message</p>}
      {!error && (
        <div className="flex-container">
          <h1>Hello World</h1>
          {loading && <p>loading</p>}
          <div>
            <button onClick={() => setUrl("http://localhost:3001/trips")}>
              All trip
            </button>
            <button
              onClick={() =>
                setUrl("http://localhost:3001/trips?location=Myanmar")
              }
            >
              Trip in Myanmar
            </button>
            <button
              onClick={() =>
                setUrl("http://localhost:3001/trips?location=Thailand")
              }
            >
              Trip in Thailand
            </button>
          </div>
          <ul className="trips-list">
            {trips &&
              trips.map((trip) => (
                <li key={trip.id} className="trip">
                  <h3>{trip.name}</h3>
                  <p>Price : {trip.price} MMK</p>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
