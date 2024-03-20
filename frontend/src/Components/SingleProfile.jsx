import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CardWrapper from "./CardWrapper";
import trashcan from "../assets/trashcan.svg";
import DeletePopup from "./DeletePopup";
export default function SingleProfile() {
  const { profileId } = useParams();
  const [trigger, setTrigger] = useState(false);
  // api call for profile with id
  const [profile, setProfile] = useState({});
  const getProfile = async function () {
    // "http://localhost:3000/api/v1/users/getUser/:id";
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/users/getUser/${profileId}`
      );
      // console.log(res.data);
      const p = res.data;
      setProfile(p);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getProfile();
  }, [profileId]);
  return (
    <CardWrapper>
      <div className="profileContent">
        <button
          className="deleteBtn"
          onClick={() => {
            setTrigger(true);
          }}>
          <img className="deleteIcon" src={trashcan} />
        </button>
        {trigger && <DeletePopup trigger={trigger} setTrigger={setTrigger} profileId={profileId}/>}
        <div className="username">
          {profile?.username
            ? profile.username[0].toUpperCase() + profile.username.slice(1)
            : ""}
        </div>
        <div></div>
        <div className="description">{profile?.description}</div>
        <div className="interestsContainer">
          <div className="interestHeading">Interests</div>
          {profile?.interests?.map((interest, inx) => {
            return (
              <div className="interest" key={inx + 1}>
                {interest}
              </div>
            );
          })}
        </div>
        <div className="linksContainer">
          {profile?.links?.map((link, inx) => {
            return (
              <a
                className="linkButton"
                key={inx + 1}
                href={"https://" + link}
                rel="noopener"
                target="_blank">
                <div>Link {inx + 1}</div>
              </a>
            );
          })}
        </div>
      </div>
    </CardWrapper>
  );
}
