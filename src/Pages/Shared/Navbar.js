import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillIdcard } from "react-icons/ai";

const Navbar = () => {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <div className="flex justify-start">
                    <label tabIndex="1" htmlFor="my-drawer-2" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                </div>
                <Link to="/" className="btn btn-ghost normal-case text-xl pr-5"><AiFillIdcard className="text-3xl mr-2 text-blue-600" />Contacts</Link>
            </div>
            <div className="flex-none gap-2">
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered ml-10" />
                </div>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://placeimg.com/80/80/people" alt='Profile' />
                        </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                        <li><Link to="/profile" className="justify-between"> Profile</Link></li>
                        <li><button>Logout</button></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;