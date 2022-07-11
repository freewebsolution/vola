import React, { useState, useRef } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthUser from '../services/AuthUser';
const required = (value) => {
    if (!value) {
        return (
            <div className='invalid-feedback d-block'>
                This field is required
            </div>
        )
    }
}
const Login = () => {
    const { http, setToken } = AuthUser();
    const form = useRef();
    const checkBtn = useRef();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    }
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    }
    const submitForm = (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            http.post('/login', { email: email, password: password }).then((res) => {
                setToken(res.data.user, res.data.access_token);
            },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    setLoading(false);
                    setMessage(resMessage)
                }
            )
        } else {
            setLoading(false);
        }
    }
    return (
        <div className='row justify-content-center pt-5'>
            <div className="col-sm-6">
                <div className="card p-4">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />
                    <Form ref={form}>
                        <div className="form-group">
                            <label>Email address:</label>
                            <Input
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                                id="email"
                                name="email"
                                onChange={onChangeEmail}
                                validations={[required]}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password:</label>
                            <Input
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                                id="password"
                                name="password"
                                onChange={onChangePassword}
                                validations={[required]}
                            />
                        </div>
                        <div className="form-group">
                            <button type="button" className="btn btn-warning btn-block mt-4" disabled={loading} onClick={submitForm} >
                                {loading && (
                                    <span className='spinner-border spinner-border-sm'></span>
                                )}
                                <span>Login</span>
                            </button>
                        </div>
                        {message && (
                            <div className='form-group'>
                                <div className='alert alert-danger' role='alert'>
                                    {message}
                                </div>
                            </div>
                        )}
                        <CheckButton style={{ display: "none" }} ref={checkBtn}></CheckButton>

                    </Form>
                </div>

            </div>

        </div>
    );
};

export default Login