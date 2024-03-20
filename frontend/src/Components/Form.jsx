import { useNavigate } from "react-router-dom";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
const profileSchema = z.object({
  username: z.string().min(4, "username must be 4 characters long"),
  description: z.string().min(4, "description must be 4 characters long"),
  links: z.array(z.string().min(4, "atleast 1 link req")),
  interests: z.array(z.string().min(4, "atleast 1 insterest req")),
});

export default function Form() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = async function (data) {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/users/addUser",
        data
      );
      console.log(res.data);

      console.log(data);

      reset();
      // history.push("/profiles");
      navigate("/profiles");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="formContainer">
      <div className="formHeading">
        Add User Profile
      </div>
        <div >
          <input className="Input userInput" type="text" placeholder="username" {...register("username")} />
          {errors.username && (
            <p className="errors">{errors.username.message}</p>
          )}
        </div>
        <div>
          <input
          className="Input"
            type="text"
            placeholder="description"
            {...register("description")}
          />
          {errors.description && (
            <p className="errors">{errors.description.message}</p>
          )}
        </div>
        <div>
          <input
          className="Input"
            type="text"
            placeholder="Interests separated by comma eg.. Interest 1, Interest 2, ..."
            {...register("interests", {
              setValueAs: (v) => {
                const ar = v.trim().split(",");
                ar.forEach((i) => {
                  if (i.length == 0) {
                    return [];
                  }
                });

                return ar;
                //   return v.trim().split(",");
              },
            })}
          />
          {errors.interests && (
            <p className="errors">{errors.interests[0].message}</p>
          )}
        </div>
        <div>
          <input
          className="Input"
            type="text"
            placeholder="Social Links separated by comma eg.. Link1, Link2, ..."
            {...register("links", {
              setValueAs: (v) => v.trim().split(","),
            })}
          />
          {errors.links && <p className="errors">{errors.links[0].message}</p>}
        </div>
        <div className="submitBtnContainer">
          <button type="submit" disabled={isSubmitting}>
            submit
          </button>
        </div>
      </div>
    </form>
  );
}
