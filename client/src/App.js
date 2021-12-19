import { useState } from "react";

import "./App.css";

function App() {
  const [users, setUsers] = useState();
  const [input, setInput] = useState("");

  const fetchUsers = async () => {
    const res = await fetch(`http://localhost:5000/users?name=${input}`);
    const response = await res.json();
    setUsers(response);
    console.log(response);
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" || event.key === "13") {
      fetchUsers();
    }
  };

  return (
    <div className="App">
      <h2>User App</h2>
      <input
        type="text"
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        value={input}
        placeholder="name"
      />
      <button onClick={fetchUsers}>Get User</button>
    </div>
  );
}

export default App;
