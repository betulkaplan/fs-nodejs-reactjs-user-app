import { useState } from "react";
import { Button, Input, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import style from "./home.module.css"

function App() {
  const [users, setUsers] = useState();
  const [input, setInput] = useState("");
  let navigate = useNavigate();

  const fetchUsers = async (inp) => {
    const res = await fetch(`http://localhost:5000/users?name=${inp}`);
    const response = await res.json();
    setUsers(response);
    console.log(response);
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
    if (event.target.value) fetchUsers(event.target.value);
    else setUsers();
  };

  const handleDetailClick = async (id) => {
    console.log(id);
    navigate(`/detail/${id}`);
  };

  const addNewUser = () => {
    navigate("/add");
  }

  return (
    <div className="App">
      <div className={style.topControl}>
        <h2>User App</h2>
        <Input
          className={style.topinput}
          type="text"
          onChange={handleInputChange}
          value={input}
          placeholder="name"
        />
        <Button
          className={style.topButton}
          type="primary"
          onClick={addNewUser}
        >Add New User</Button>
      </div>
      <div>
        {users && <Divider>Result</Divider>}
        {users &&
          users.map((user) => (
            <div
              key={user.id}
              style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "10px",
              }}
            >
              <div style={{ lineHeight: "0.3rem" }}>
                <p style={{ width: "200px" }}>{user.name}</p>
                <p style={{ width: "200px", fontSize: "0.7rem", color: "gray" }}>@{user.username}</p>
              </div>
              <p style={{ width: "200px", fontStyle: "italic" }}>{user.email}</p>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Button
                  type="primary"
                  onClick={() => handleDetailClick(user.id)}
                >
                  Details
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
