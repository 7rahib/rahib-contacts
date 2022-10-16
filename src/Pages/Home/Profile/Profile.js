import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import auth from '../../../firebase.init';

const Profile = () => {
    const user = useAuthState(auth);
    const email = user[0]?.email;
    const { data: users } = useQuery('users', () => fetch(`https://rahib-contacts.onrender.com/users/${email}`).then(res => res.json()))
    return (
        <div>
            <h1 className="text-2xl m-3 text-center text-black font-semibold">My Profile</h1>

            <div class="flex flex-col md:lg:xl:flex-row mt-5">

                <div class="md:lg:xl:w-full bg-white flex justify-center content-center ">

                    <div class="md:lg:xl:w-1/2 bg-white flex flex-wrap justify-center content-center mb-10">

                        <div class="bg-white p-8 rounded-xl shadow-xl shadow-neutral-900 w-120">

                            <div class="flex justify-between mb-4">
                                <div>
                                    <p class="text-xl font-semibold text-black">{(users?.name)}</p>
                                </div>
                            </div>
                            <span class="text-black text-lg rounded-lg font-semibold">{(users?.email)}</span>
                            <Link to='/updateProfile'><button className='btn btn-primary btn-xs w-1/2 max-w-xs text-black mt-5'>Update Profile</button></Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;