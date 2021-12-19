import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Input, Divider } from "antd";
import { useNavigate } from "react-router-dom";

const Details = () => {
  let { id } = useParams();
  const [user, setUser] = useState();
  let navigate = useNavigate();

  const fetchUser = async () => {
    const res = await fetch(`http://localhost:5000/users/${id}`);
    const response = await res.json();
    setUser(response);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleDeleteClick = async () => {
    const res = await fetch(`http://localhost:5000/users?id=${id}`, {
      method: "DELETE",
    });
    const response = await res.json();
    navigate(`/`);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
      }}
    >
      <h2>Details</h2>
      {user &&
        user.map((user) => (
          <div key={user.id}>
            <h2>{user.name}</h2>
            <h3>{user.username}</h3>
            <p>{user.phone}</p>
          </div>
        ))}
      <Button type="primary" onClick={handleDeleteClick}>
        Delete
      </Button>
    </div>
  );
};

export default Details;
