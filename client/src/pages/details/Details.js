import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Input, Divider, Modal } from "antd";
import { useNavigate } from "react-router-dom";

const Details = () => {
  let { id } = useParams();
  const [user, setUser] = useState();
  const [newUser, setnewUser] = useState()
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const handleEditClick = async () => {
    setIsModalVisible(true);
    setnewUser(user[0])
  };
  const handleOk = () => {
    setIsModalVisible(false);
    console.log(newUser)

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    };
    fetch(`http://localhost:5000/users/${id}`, requestOptions)
      .then(response => response.json())
      .then(data => navigate(`/`));


  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleChange = (e) => {
    console.log(e.target.id)
    setnewUser({ ...newUser, [e.target.id]: e.target.value })
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
      <div>
        <Button type="danger" onClick={handleDeleteClick}>
          Delete
        </Button>
        <Button type="primary" onClick={handleEditClick}>
          Edit
        </Button>
        <Modal title="Edit User Info" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <Input id="name" defaultValue={user ? user[0].name : ""} onChange={handleChange} />
          <Input id="username" defaultValue={user ? user[0].username : ""} onChange={handleChange} />
          <Input id="phone" defaultValue={user ? user[0].phone : ""} onChange={handleChange} />
        </Modal>
      </div>
    </div>
  );
};

export default Details;
