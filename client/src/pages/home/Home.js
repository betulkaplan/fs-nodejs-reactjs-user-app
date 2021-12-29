import { useState, useRef, useEffect } from "react";
import { Button, Input, Divider, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import style from "./home.module.css"
import ProductCard from "../../components/ProductCard";

function App() {
  const userSearch = useRef()
  const productSearch = useRef()
  const [users, setUsers] = useState();
  const [products, setProducts] = useState();
  const [input, setInput] = useState("");
  const [productInput, setProductInput] = useState("");
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    productSearch.current.focus();

  }, [])

  const fetchUsers = async (inp) => {
    const res = await fetch(`http://localhost:5000/users?name=${inp}`);
    const response = await res.json();
    setUsers(response);
  };

  const fetchProducts = async (inp) => {
    // const res = await fetch(`http://localhost:5000/users?name=${inp}`);
    const res = await fetch(`http://localhost:5000/product?name=${inp}`);
    const response = await res.json();
    console.log(response)
    setProducts(response);
  };

  const handleInputChange = (event) => {
    console.log(event.target.id);
    if (event.target.id === "userSearch") {
      setInput(event.target.value);
      if (event.target.value) fetchUsers(event.target.value);
      else setUsers();
    }
    else if (event.target.id === "productSearch") {
      setProductInput(event.target.value);
      if (event.target.value) fetchProducts(event.target.value);
      else setProducts();
    }


  };

  const handleDetailClick = async (id) => {
    console.log(id);
    navigate(`/detail/${id}`);
  };

  const addNewUser = () => {
    navigate("/add");
  }
  const addProductUser = () => {
    navigate("/product/add");
  }
  const showModal = () => {
    setIsProductModalVisible(true);
  };

  const handleOk = () => {
    setIsProductModalVisible(false);
  };

  const handleCancel = () => {
    setIsProductModalVisible(false);
  };

  return (
    <div className="App">
      <div className={style.topControl}>
        <h2>User App</h2>
        {/* <Input
          ref={userSearch}
          className={style.topinput}
          type="text"
          onChange={handleInputChange}
          value={input}
          placeholder="Search User"
          id="userSearch"
        /> */}
        <Input
          ref={productSearch}
          className={style.topinput}
          type="text"
          onChange={handleInputChange}
          value={productInput}
          placeholder="Search Product"
          id="productSearch"
        />
        {/* <Button
          className={style.topButton}
          type="primary"
          onClick={addNewUser}
        >Add New User</Button> */}
        <Button
          className={style.topButton}
          type="primary"
          onClick={addProductUser}
        >Add New Product</Button>
        <Modal title="Basic Modal" visible={isProductModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
      <div>
        {(users || products) && <Divider>Result</Divider>}
        {users &&
          users.map((user) => (
            <div
              key={user._id}
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
                  onClick={() => handleDetailClick(user._id)}
                >
                  Details
                </Button>
              </div>
            </div>
          ))}
      </div>
      <div className={style.productsWrapper}>
        {
          products?.map(product =>
            <ProductCard key={product._id} product={product} />
          )
        }
      </div>




    </div>
  );
}

export default App;
