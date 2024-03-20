import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function DeletePopup({ trigger, setTrigger, profileId }) {
  const popRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (!popRef.current.contains(e.target)) setTrigger(false);
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);
  const navigate = useNavigate();
  const handleDeleteApi = async function () {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/users/deleteUser/${profileId}`
      );
      navigate("/profiles");
    } catch (err) {
      console.log(err);
    }
  };
  return trigger ? (
    <div className="popupContainer">
      <div className="popup" ref={popRef}>
        <p>Are you sure you want to delete the record</p>
        <button onClick={handleDeleteApi}>delete</button>
        <button
          onClick={() => {
            setTrigger(false);
          }}>
          cancle
        </button>
      </div>
    </div>
  ) : (
    ""
  );
}
