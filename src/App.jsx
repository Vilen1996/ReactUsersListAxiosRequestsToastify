import { useEffect, useState } from "react";
import "./App.css";
import { AddUser } from "./components/AddUser";
import { UserList } from "./components/UserList";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [users, setUsers] = useState([]);

  const addItem = (obj) => {
    obj.salary = +obj.salary;
    setUsers([...users, obj]);
  };

  const deleteItem = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const updateItem = (updatedUser) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };
  useEffect(() => {
    axios.get("http://localhost:3004/users").then((res) => setUsers(res.data));
    // .then(() => {
    //   toast.success("hello");
    // });
  }, []);

  return (
    <div className="row">
      <AddUser onAdd={addItem} />
      <ToastContainer />
      <UserList users={users} deleteItem={deleteItem} updateItem={updateItem} />
    </div>
  );
}

export default App;
