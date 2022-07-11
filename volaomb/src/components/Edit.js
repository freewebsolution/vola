import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import AuthUser from '../services/AuthUser';
import { useNavigate } from 'react-router-dom';

export default function Edit() {
    const formSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is mendatary')
            .min(3, 'Name must be at 3 char long'),
        email: Yup.string().email('Must be a valid email').max(255)
            .required('Email is required'),
        password: Yup.string().test(
            'empty-or-8-characters-check',
            'Password must be at least 8 characters',
            password => !password || password.length >= 8,
        ),
        password_confirmation: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords does not match'),
    })
    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, formState } = useForm(formOptions)
    const { errors } = formState
    const navigate = useNavigate();
    const { http, user, updateToken } = AuthUser();
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);
    const [passwordConf, setPasswordConf] = useState("");
    const [name, setName] = useState(user.name);
    const [loading, setLoading] = useState(false);

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    }

    const onChangeName = (e) => {
        const name = e.target.value;
        setName(name);
    }
    const onChangePassword = (e) => {
        const password = e.target.value;
        if (password !== "") {
            setPassword(password);
        }

    }
    const onChangePasswordConf = (e) => {
        const passwordConf = e.target.value;
        if (passwordConf !== "") {
            setPasswordConf(passwordConf);
        }

    }
    function onSubmit(data) {
        setLoading(true);
        console.log(JSON.stringify(user.name, null, 4))
        http.post(`/edit/${user.id}`, {
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordConf
        }).then((res) => {
            updateToken(res.data.user);
            navigate('/dashboard')
        })
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
                    <h2>Edit {user.name}</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                name="name"
                                value={name}
                                type="pastextsword"
                                {...register('name')}
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                onChange={onChangeName}
                            />
                            <div className="invalid-feedback">{errors.name?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                name="email"
                                value={email}
                                type="text"
                                {...register('email')}
                                onChange={onChangeEmail}
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            />
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                name="password"
                                type="password"
                                value={password}
                                {...register('password')}
                                onChange={onChangePassword}
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                name="password_confirmation"
                                type="password"
                                {...register('password_confirmation')}
                                onChange={onChangePasswordConf}
                                className={`form-control ${errors.password_confirmation ? 'is-invalid' : ''}`}
                            />
                            <div className="invalid-feedback">{errors.password_confirmation?.message}</div>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-warning btn-block mt-4" disabled={loading}>
                                {loading && (
                                    <span className='spinner-border spinner-border-sm'></span>
                                )}
                                <span>Edit</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}