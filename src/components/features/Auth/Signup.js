import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "services/authService";
import { setProfile, setUsers } from "store/modules/authSlice";
import { ReactComponent as EyeIcon } from "assets/svgs/eye.svg";
import { ReactComponent as EyeOffIcon } from "assets/svgs/eye-off.svg";
import Error from "components/common/Error/Error";
import InputField from "components/common/InputField/InputField";
import Button from "components/common/Button/Button";
import styles from "./Auth.module.scss";

function Signup({ onClick }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);


    const [submitError, setSubmitError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const users = useSelector((state) => state.auth.users);
    const validateField = (field, value) => {
        switch (field) {
            case "name":
                if (!value.trim()) return "Name is required";
                break;
            case "email":
                if (!value) return "Email is required";

                if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value))
                    return "Invalid email address";
                break;
            case "password":
                if (!value) return "Password is required";
                if (value.length < 6) return "Must be at least 6 characters";
                break;
            case "confirmPassword":
                if (!value) return "Please confirm your password";
                if (value !== password) return "Passwords do not match";
                break;
            default:
                return "";
        }
        return "";
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched((t) => ({ ...t, [name]: true }));
        setErrors((errs) => ({
            ...errs,
            [name]: validateField(name, value),
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // update value
        if (name === "name") setName(value);
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
        if (name === "confirmPassword") setConfirmPassword(value);

        // re‑validate live if already touched
        if (touched[name]) {
            setErrors((errs) => ({
                ...errs,
                [name]: validateField(name, value),
            }));
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const newErrors = {
            name: validateField("name", name),
            email: validateField("email", email),
            password: validateField("password", password),
            confirmPassword: validateField("confirmPassword", confirmPassword),
        };
        setErrors(newErrors);
        setTouched({ name: true, email: true, password: true, confirmPassword: true });

        if (Object.values(newErrors).some(Boolean)) return;
        try {
            const { success, user, message } = await signupUser({ name, email, password });
            if (!success) {
                setSubmitError(message);
                return;
            }
            dispatch(setUsers([...(users || []), user]));
            dispatch(setProfile(user));

            navigate("/profile");


        } catch (error) {
            console.error("Error during signup", error);
            setSubmitError(error.message)
        }
    }


    return (
        <div className={styles.authContainer}>
            <h2>SignUp</h2>
            {submitError && <Error>{submitError}</Error>}
            <form className={styles.formContainer} noValidate onSubmit={handleSubmit}>
                <InputField
                    name="name"
                    label="Full Name"
                    className={styles.authInput}
                    type="text"
                    placeholder=" "
                    value={name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {touched.name && errors.name && (
                    <p className={styles.fieldError}>{errors.name}</p>
                )}
                <InputField
                    name="email"
                    label="Email"
                    className={styles.authInput}
                    type="email"
                    placeholder=" "
                    value={email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.email && <p className={styles.fieldError}>{errors.email}</p>}
                <div className={styles.passwordWrapper}>
                    <InputField
                        name="password"
                        label="Password"
                        placeholder=" "
                        className={styles.authInput}
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <span
                        className={styles.toggle}
                        onClick={() => setShowPassword((v) => !v)}
                    >
                        {showPassword
                            ? <EyeOffIcon className={styles.eyeIcon} />
                            : <EyeIcon className={styles.eyeIcon} />
                        }
                    </span>
                </div>
                {errors.password && <p className={styles.fieldError}>{errors.password}</p>}
                <div className={styles.passwordWrapper}>
                    <InputField
                        name="confirmPassword"
                        label="Confirm Password"
                        className={styles.authInput}
                        type={showConfirm ? "text" : "password"}
                        placeholder=" "
                        value={confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <span
                        className={styles.toggle}
                        onClick={() => setShowConfirm((v) => !v)}
                    >
                        {showConfirm
                            ? <EyeOffIcon className={styles.eyeIcon} />
                            : <EyeIcon className={styles.eyeIcon} />
                        }
                    </span>
                </div>
                {errors.confirmPassword && (
                    <p className={styles.fieldError}>{errors.confirmPassword}</p>
                )}
                <Button
                    onClick={onClick}
                    className={styles.authLink}
                    type="submit"
                    disabled={!name || !email || !password || !confirmPassword ||
                        Object.values(errors).some(Boolean)}
                    text="SignUp"
                />
            </form>
            <div>
                <p>Already have an account?</p>
                <span className={styles.link} onClick={() => navigate("/login")}>Login</span>
            </div>
        </div>
    );
}


export default Signup;
