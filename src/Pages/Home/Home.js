import React, { useRef } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FiClock } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { FiPrinter } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { useQuery } from 'react-query';
import { useReactToPrint } from 'react-to-print';

const Home = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const { data: contacts } = useQuery('contacts', () => fetch('http://localhost:5000/contacts').then(res => res.json()))
    return (
        <div>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content font-semibold">
                        <li><Link ref={componentRef} className='focus:text-blue-600' to='/'><FiUser className='text-xl' /> Contacts <span className='ml-24'>{contacts?.length}</span></Link></li>
                        <li><Link className='focus:text-blue-600 mt-1' to='/frequentlyUsed'><FiClock className='text-xl' /> Frequently Contacted</Link></li>
                        <div className='divider'></div>
                        <li><button onClick={handlePrint} className='focus:text-blue-600' to='/frequentlyUsed'><FiPrinter className='text-xl' /> Print</button></li>
                        <div className='divider'></div>
                        <li><Link to='/trash' className='focus:text-blue-600'><FiTrash2 className='text-xl' /> Trash</Link></li>
                    </ul>
                </div>
            </div>
            <Link to="/addContact" title="Add new Contact"
                className="fixed z-90 bottom-10 right-8 bg-white w-20 h-20 rounded-full border-solid border-2 shadow-xl flex justify-center items-center text-white text-4xl hover:bg-base-100 hover:drop-shadow-xl hover:shadow-2xl"><span className='text-2xl'>➕</span></Link>
        </div>
    );
};

export default Home;