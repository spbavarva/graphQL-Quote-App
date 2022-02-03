import { useQuery } from "@apollo/client";
import React from "react";
import { GET_MY_PROFILE } from "../gqlQuery/queries";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_MY_PROFILE);

  if (!localStorage.getItem("token")) {
    navigate("/login");
    <h2>Unauthorized</h2>;
  }

  if (loading) return <h1>Profile Loading</h1>;

  return (
    <div className="container my-container">
      <div className="center-align">
        <img
          className="circle"
          style={{ border: "2px solid", marginTop: "10px" }}
          src={`https://robohash.org/${data.user.firstName}.png?size=200x200`}
          alt="pic"
        />
        <h5>
          {data.user.firstName} {data.user.lastName}
        </h5>
        <h6>Email - {data.user.email}</h6>
      </div>
      <h3 className="center-align">Your quotes</h3>
      <br />
      {data.user.quotes.map((quote) => {
        return (
          <blockquote>
            <h6>{quote.name}</h6>
            <h6 className="right-align">~{data.user.firstName}</h6>
          </blockquote>
        );
      })}
    </div>
  );
};

export default Profile;
