import { useForm } from "react-hook-form";
import axios from "axios";
import Types from "prop-types";

export const AddUser = ({ onAdd }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleAdd = (data) => {
    axios.post("http://localhost:3004/users", data).then((res) => {
      onAdd(res.data);
      reset();
    });
  };

  return (
    <div>
      <h1>Add User</h1>
      <form onSubmit={handleSubmit(handleAdd)}>
        <div>
          <label>Name</label>
          <input
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters long",
              },
              // pattern: {
              //   value: /^\d+$/,
              //   message: "Name must be a number",
              // },
            })}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </div>

        <div>
          <label>Surname</label>
          <input
            {...register("surname", {
              required: "Surname is required",
            })}
          />
          {errors.surname && (
            <p style={{ color: "red" }}>{errors.surname.message}</p>
          )}
        </div>

        <div>
          <label>Salary</label>
          <input
            {...register("salary", {
              required: "Salary is required",
            })}
          />
          {errors.salary && (
            <p style={{ color: "red" }}>{errors.salary.message}</p>
          )}
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

AddUser.propTypes = { onAdd: Types.func };
