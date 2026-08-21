import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth.js";
import "./Auth.css";

const schema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required")
});

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(schema)
    });

    async function onSubmit(data) {
        try {
            await login(data);
            navigate("/");
        } catch (error) {
            alert(error.response?.data?.message || "Login failed");
        }
    }

    return (
        <div>
            <h2 className="auth-form-heading">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="auth-form-group">
                    <input className="auth-form-input" type="email" placeholder="Email" {...register("email")} />
                    {errors.email && <p className="auth-form-error">{errors.email.message}</p>}
                </div>
                <div className="auth-form-group">
                    <input className="auth-form-input" type="password" placeholder="Password" {...register("password")} />
                    {errors.password && <p className="auth-form-error">{errors.password.message}</p>}
                </div>
                <button className="auth-form-submit" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Logging in..." : "Login"}
                </button>
            </form>
            <p className="auth-form-switch">Don't have an account? <Link to="/register">Register</Link></p>
        </div>
    );
}