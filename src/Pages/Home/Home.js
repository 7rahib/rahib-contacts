import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <div className="drawer drawer-mobile lg:p-8">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 overflow-y-auto w-80 text-base-content">
                        <li><Link to='/'>Contacts</Link></li>
                        <li><Link to='/frequentlyUsed' className='mt-1'>Frequently Contacted</Link></li>
                    </ul>
                </div>
            </div>
            <button title="Add new Contact"
                class="fixed z-90 bottom-10 right-8 bg-white w-20 h-20 rounded-full border-solid border-2 shadow-xl flex justify-center items-center text-white text-4xl hover:bg-base-100 hover:drop-shadow-xl hover:shadow-2xl"><span className='text-2xl'>➕</span></button>
        </div>
    );
};

export default Home;