import React from 'react';
import { useForm } from 'react-hook-form';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loading from '../Shared/Loading';
import auth from '../../firebase.init';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    let signInError;

    const { register, formState: { errors }, handleSubmit } = useForm();
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password)
    };

    const handleSocialLogin = async () => {
        await signInWithGoogle();

    }

    if (user || googleUser) {
        navigate('/');
    }

    if (error || googleError) {
        signInError = <p className='text-red-500'><small>{error?.message || googleError?.message}</small></p>
    }

    if (loading || googleLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h3 className='text-2xl font-bold text-center mt-5 mb-5'>Login to your account</h3>
            <div className='flex justify-center items-center mb-5'>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: 'Email is Required'
                                        },
                                        pattern: {
                                            value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                            message: 'Provide a valid Email'
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                    {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                </label>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: 'Password is Required'
                                        },
                                        minLength: {
                                            value: 6,
                                            message: 'Must be 6 characters or longer'
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                    {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                </label>
                            </div>
                            {signInError}
                            <input className='btn w-full max-w-xs text-white' type="submit" value="Login" />
                        </form>
                        <p className='text-center'><small>Don't have an account ?<Link className='text-primary' to="/signup">  Create New Account</Link></small></p>
                        <div className="divider">OR</div>
                        <button
                            onClick={handleSocialLogin}
                            className="btn btn-outline"
                        >Continue with Google</button>
                    </div>
                </div>
            </div >
        </div>

    );
};

export default Login;