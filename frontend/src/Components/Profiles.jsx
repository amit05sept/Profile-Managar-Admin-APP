import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
export default function Profiles() {
  // const profiles = [
  //   {
  //     id: 1,
  //     username: "Alice",
  //     description: "Software Engineer",
  //     interests: ["Coding", "Reading", "Hiking"],
  //     links: ["github.com/alice", "linkedin.com/alice"],
  //   },
  //   {
  //     id: 2,
  //     username: "Bob",
  //     description: "Graphic Designer",
  //     interests: ["Drawing", "Photography"],
  //     links: ["behance.net/bob", "instagram.com/bob"],
  //   },
  //   {
  //     id: 3,
  //     username: "Charlie",
  //     description: "Data Scientist",
  //     interests: ["Machine Learning", "Data Visualization", "Traveling"],
  //     links: ["linkedin.com/charlie", "twitter.com/charlie_ds"],
  //   },
  //   {
  //     id: 4,
  //     username: "Diana",
  //     description: "Teacher",
  //     interests: ["Education", "Reading", "Cooking"],
  //     links: ["twitter.com/diana_teacher", "facebook.com/diana"],
  //   },
  //   {
  //     id: 5,
  //     username: "Eve",
  //     description: "Entrepreneur",
  //     interests: ["Startups", "Marketing", "Fitness"],
  //     links: ["linkedin.com/eve", "instagram.com/eve"],
  //   },
  //   {
  //     id: 6,
  //     username: "Frank",
  //     description: "Architect",
  //     interests: ["Design", "Travel", "Music"],
  //     links: ["linkedin.com/frank", "twitter.com/frank_arch"],
  //   },
  //   {
  //     id: 7,
  //     username: "Grace",
  //     description: "Journalist",
  //     interests: ["Writing", "Photography", "Politics"],
  //     links: ["twitter.com/grace_journalist", "facebook.com/grace"],
  //   },
  //   {
  //     id: 8,
  //     username: "Henry",
  //     description: "Chef",
  //     interests: ["Cooking", "Food Critique", "Traveling"],
  //     links: ["instagram.com/henry_chef", "linkedin.com/henry"],
  //   },
  //   {
  //     id: 9,
  //     username: "Isabella",
  //     description: "Artist",
  //     interests: ["Painting", "Sculpting", "Nature"],
  //     links: ["instagram.com/isabella_artist", "facebook.com/isabella"],
  //   },
  //   {
  //     id: 10,
  //     username: "Jack",
  //     description: "Marketing Manager",
  //     interests: ["Digital Marketing", "Social Media", "Gaming"],
  //     links: ["linkedin.com/jack_marketing", "twitter.com/jack"],
  //   },
  //   {
  //     id: 11,
  //     username: "Katherine",
  //     description: "Psychologist",
  //     interests: ["Mental Health", "Research", "Yoga"],
  //     links: ["linkedin.com/katherine_psychologist", "twitter.com/katherine"],
  //   },
  // ];
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const getProfiles = async function () {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/users/getAllUsers`
      );
      // console.log(res.data);
      setProfiles(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getProfiles();
  }, [profiles]);
  return profiles?.length > 0 ? (
    <div className="profilePageContainer">
      <div className="profiles">
        <div className="stick">USERS</div>
        {profiles.map((profile) => {
          return (
            <div className="profile" key={profile._id}>
              <NavLink to={`/profiles/${profile._id}`}>
                {profile.username}
              </NavLink>
            </div>
          );
        })}
      </div>
      <div className="singleProfileContainer">
        <Outlet />
      </div>
    </div>
  ) : (
    <div className="emptyList">
      <div className="emptyListText">Add User Profile</div>
      <button
      className="linkButton"
        onClick={() => {
          navigate("/addProfile");
        }}>
        Add Profile
      </button>
    </div>
  );
}
