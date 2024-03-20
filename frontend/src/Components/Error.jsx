import { Link } from "react-router-dom";
import React from "react";

export default function Error() {
  return (
    <div>
      <h1>404 NOT FOUND</h1>
      <Link to="/">HOME</Link>
    </div>
  );
}
