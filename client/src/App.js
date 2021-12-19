import { useState } from "react";
import { Button, Input, Divider } from "antd";
import "./App.css";

function App() {
  const [users, setUsers] = useState();
  const [input, setInput] = useState("");

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
    // const res = await fetch(`http://localhost:5000/users?id=${id}`, {
    //   method: "DELETE",
    // });
    // const response = await res.json();
    // console.log(response);
    // setUsers("");
  };

  return (
    <div className="App">
      <h2>User App</h2>
      {/* <Button type="primary">Primary Button</Button> */}
      <Input
        style={{ width: "200px" }}
        type="text"
        onChange={handleInputChange}
        value={input}
        placeholder="name"
      />
      <div>
        {users && <Divider>Result</Divider>}
        {users &&
          users.map((user) => (
            <div
              key={user.id}
              style={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <p style={{ width: "200px" }}>{user.name}</p>
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
