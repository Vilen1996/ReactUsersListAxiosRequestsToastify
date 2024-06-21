import axios from "axios";
import Types from "prop-types";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

export const UserList = ({ users, deleteItem, updateItem }) => {
  const { reset } = useForm();
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3004/users/${id}`)
      .then((res) => {
        deleteItem(id);
        reset();
        toast.success("Successfully deleted");
      })
      .catch((error) => {
        toast.error("Failed to delete");
      });
  };

  const handleSalaryUp = (user) => {
    const updatedUser = { ...user, salary: +user.salary + 50000 };
    axios
      .put(`http://localhost:3004/users/${user.id}`, updatedUser)
      .then((res) => {
        updateItem(res.data);
        toast.success("Salary updated successfully");
      })
      .catch(() => {
        toast.error("Failed to update salary");
      });
  };

  return (
    <div>
      <h1>UserList</h1>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>surname</th>
            <th>salary</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((elm) => (
            <tr
              key={elm.id}
              style={
                elm.salary > 800000 ? { backgroundColor: "lightgreen" } : {}
              }
            >
              <td>{elm.id}</td>
              <td>{elm.name}</td>
              <td>{elm.surname}</td>
              <td>{elm.salary}</td>
              <td
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <button
                  onClick={() => handleDelete(elm.id)}
                  style={{ marginTop: "-1px" }}
                >
                  delete
                </button>
                <button
                  onClick={() => handleSalaryUp(elm)}
                  style={{ marginTop: "-1px" }}
                >
                  salary up
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

UserList.propTypes = {
  users: Types.arrayOf(
    Types.exact({
      id: Types.string,
      name: Types.string,
      surname: Types.string,
      salary: Types.number,
    })
  ),
  handleDelete: Types.func,
  handleSalaryUp: Types.func,
};
