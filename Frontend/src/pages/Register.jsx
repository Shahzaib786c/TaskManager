import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth.js";
import "./Auth.css";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Min 6 characters")
    .required("Password is required"),
});

export default function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    try {
      await registerUser(data);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div>
      <h2 className="auth-form-heading">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="auth-form-group">
          <input
            className="auth-form-input"
            placeholder="Name"
            {...register("name")}
          />
          {errors.name && (
            <p className="auth-form-error">{errors.name.message}</p>
          )}
        </div>
        <div className="auth-form-group">
          <input
            className="auth-form-input"
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <p className="auth-form-error">{errors.email.message}</p>
          )}
        </div>
        <div className="auth-form-group">
          <input
            className="auth-form-input"
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <p className="auth-form-error">{errors.password.message}</p>
          )}
        </div>
        <button
          className="auth-form-submit"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
      <p className="auth-form-switch">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
