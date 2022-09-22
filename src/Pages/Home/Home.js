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
                    <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                        <li><Link to='/'>Contacts</Link></li>
                        <li><Link to='/frequentlyUsed'>Frequently Contacted</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Home;