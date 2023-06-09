import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import CircularBar from "../CircularProgressBar/CircularBar";
import Accord from "../Accord/Accord";
import axios from "axios";
import jwt_decode from "jwt-decode";

function Dashboard() {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    requiredCalories: 0,
    consumedCalories: 0,
    consumedProtien: 0,
    requiredProtien: 0,
    consumedFat: 0,
    requiredFat: 0,
    consumedCarbs: 0,
    requiredCarbs: 0,
    breakFastStats: {},
    lunchStats: {},
    dinnerStats: {},
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("Token");
        const userId = jwt_decode(token).user_id;
        const response = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/api/users/${userId}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        const userData = response.data;
        setUserDetails({
          firstName: userData.first_name,
          lastName: userData.last_name,
          requiredCalories: userData.required_calories,
          requiredCarbs: userData.required_carbs,
          requiredProtien: userData.required_protien,
          requiredFat: userData.required_fat,
          consumedCalories: userData.consumed_calories,
          consumedProtien: userData.consumed_protien,
          consumedFat: userData.consumed_fat,
          consumedCarbs: userData.consumed_carbs,
          breakFastStats: userData.breakfast_stats,
          lunchStats: userData.lunch_stats,
          dinnerStats: userData.dinner_stats,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <div className="DashboardContainer">
        <h2 className="pb-3 fw-bold" style={{ color: "white" }}>
          Hello {`${userDetails.firstName} ${userDetails.lastName}`}
        </h2>
        <CircularBar userDetails={userDetails} />
        <br />
        <Accord userDetails={userDetails} />
      </div>
    </>
  );
}

export default Dashboard;
