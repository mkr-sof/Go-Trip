import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getCurrentUser } from "services/userService";
import { profile } from "services/authService";
import { validateField } from "validations/formValidation";
import Error from "components/common/Error/Error";
import InputField from "components/common/InputField/InputField";
import Button from "components/common/Button/Button";
import styles from "./Auth.module.scss";

function Login({ onClick }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [submitError, setSubmitError] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const rememberedUser = await getCurrentUser();
            if (rememberedUser) {
                setFormData((prev) => ({ ...prev, email: rememberedUser.email }));
                setRememberMe(true);
            } else {
                setRememberMe(false);
            }
        };

        fetchUser();
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setSubmitError("");
        if (touched[name]) {
            setErrors((errs) => ({
                ...errs,
                [name]: validateField(name, value, formData),
            }));
        }
    };
    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        setErrors((errs) => ({
            ...errs,
            [name]: validateField(name, value, formData),
        }));
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const newErrors = {
            email: validateField("email", formData.email),
            password: validateField("password", formData.password),
        };
        setErrors(newErrors);
        setTouched({ email: true, password: true });

        if (Object.values(newErrors).some(Boolean)) return;
        try {
            const response = await profile({ ...formData, rememberMe }, dispatch);
            if (response.success) {
                setFormData({ email: "", password: "" });
                navigate("/");
            } else {
                setSubmitError(response.message);
            }
        } catch (error) {
            setSubmitError(error.message);
        }
        
    };

    return (
        <div className={styles.authContainer}>
            <h2>Login</h2>
            {submitError && <Error message={submitError}/>}
            <form className={styles.formContainer} noValidate onSubmit={handleSubmit}>
                <InputField
                    label="Email"
                    name="email"
                    className={styles.authInput}
                    type="email"
                    placeholder=" "
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {touched.email && errors.email && <p className={styles.fieldError}>{errors.email}</p>}

                <InputField
                    label="Password"
                    name="password"
                    className={styles.authInput}
                    type="password"
                    placeholder=" "
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {touched.password && errors.password && <p className={styles.fieldError}>{errors.password}</p>}

                <div className={styles.rememberMeContainer}>
                    <input
                        type="checkbox"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label htmlFor="rememberMe">Remember Me</label>
                </div>
                <Button
                    onClick={onClick}
                    className={styles.authLink}
                    type="submit"
                    text="Login"
                    disabled={
                        Object.keys(touched).length > 0 &&
                        Object.entries(errors).some(([key, error]) => touched[key] && error)
                    }
                />
            </form>
            <p>
                <span style={{ color: "#007bff", margin: "5px", cursor: "pointer" }} onClick={() => navigate("/signup")}>Signup</span>
                <span style={{ color: "#007bff", margin: "5px", cursor: "pointer" }} onClick={() => navigate("/forgot-password")}>Recover</span>
            </p>
        </div>
    );
}

export default Login;