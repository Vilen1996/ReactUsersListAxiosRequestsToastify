import { useForm } from "react-hook-form";
import axios from "axios";
import PropTypes from "prop-types"; // corrected import
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().max(32).required(),
  surname: yup.string().max(32).required(),
  salary: yup.number().min(1000).max(99999999).required(),
});

export const AddUser = ({ onAdd }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

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
            })}
            placeholder="Enter name"
          />
          <p style={{ color: "red" }}>{errors.name?.message}</p>
        </div>

        <div>
          <label>Surname</label>
          <input
            {...register("surname", {
              required: "Surname is required",
            })}
            placeholder="Enter surname"
          />
          <p style={{ color: "red" }}>{errors.surname?.message}</p>
        </div>

        <div>
          <label>Salary</label>
          <input
            {...register("salary", {
              required: "Salary is required",
            })}
            placeholder="Enter salary"
          />
          <p style={{ color: "red" }}>{errors.salary?.message}</p>
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

AddUser.propTypes = {
  onAdd: PropTypes.func,
};
