import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FiClock } from "react-icons/fi";
import { FiUser } from "react-icons/fi";

const Home = () => {
    return (
        <div>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                        <li><Link to='/'><FiUser className='text-blue-600 text-xl' /> Contacts</Link></li>
                        <li><Link to='/frequentlyUsed' className='mt-1'><FiClock className='text-blue-600 text-xl' /> Frequently Contacted</Link></li>
                    </ul>
                </div>
            </div>
            <button title="Add new Contact"
                class="fixed z-90 bottom-10 right-8 bg-white w-20 h-20 rounded-full border-solid border-2 shadow-xl flex justify-center items-center text-white text-4xl hover:bg-base-100 hover:drop-shadow-xl hover:shadow-2xl"><span className='text-2xl'>➕</span></button>
        </div>
    );
};

export default Home;