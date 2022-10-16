import React, { useRef } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FiClock } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { FiPrinter } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { FiCommand } from "react-icons/fi";
import { FiChevronUp } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { FiSave } from "react-icons/fi";
import { FiInbox } from "react-icons/fi";
import { useQuery } from 'react-query';
import { useReactToPrint } from 'react-to-print';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};


Modal.setAppElement('#root');

const Home = () => {
    const user = useAuthState(auth);
    const email = user[0]?.email;

    const navigate = useNavigate();

    const { register, formState: { errors }, handleSubmit } = useForm();

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    const createLabel = (data) => {
        const newLabel = {
            label: data.labelName,
            userEmail: email,
        };
        fetch("https://rahib-contacts.onrender.com/label", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(newLabel),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.insertedId) {
                    console.log(data);
                    closeModal();
                    navigate("/");
                }
            });
    }

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const { data: contacts } = useQuery('contacts', () => fetch('https://rahib-contacts.onrender.com/contacts').then(res => res.json()))
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
                        <li><Link className='focus:text-blue-600 mt-1' to='/'><FiCommand className='text-xl' /> Merge & Fix</Link></li>
                        <div className='divider'></div>
                        <li><Link className='focus:text-blue-600 mt-1' to='/allLabel'><FiChevronUp className='text-xl' /> Labels</Link></li>
                        <li><button onClick={openModal} className='focus:text-blue-600 mt-1' to='/'><FiPlus className='text-xl' /> Create Label</button>
                            <Modal
                                isOpen={modalIsOpen}
                                onAfterOpen={afterOpenModal}
                                onRequestClose={closeModal}
                                style={customStyles}
                                contentLabel="Example Modal"
                            >
                                <form onSubmit={handleSubmit(createLabel)}>
                                    <h1 className="mb-5">Create New Label</h1>
                                    <div className="flex justify-center items-center">
                                        <div>
                                            <label className='mr-2'>Label Name:</label>
                                        </div>
                                        <div>
                                            <input type="text" name='labelName' className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                                {...register("labelName", {
                                                    required: {
                                                        value: true,
                                                        message: 'Label Name is required'
                                                    }
                                                })}
                                            />
                                            <label className="label">
                                                {errors.labelName?.type === 'required' && <span className="label-text-alt text-red-500">{errors.labelName.message}</span>}
                                            </label>
                                        </div>
                                    </div>
                                    <br />
                                    <div className="flex justify-end mt-3">
                                        <button className="btn btn-sm mr-3" onClick={closeModal}>
                                            Cancel
                                        </button>
                                        <input type="submit" value="Save" className="btn btn-sm" />
                                    </div>
                                </form>
                            </Modal></li>
                        <div className='divider'></div>
                        <li><Link className='focus:text-blue-600 mt-1' to='/'><FiSave className='text-xl' /> Import</Link></li>
                        <li><Link className='focus:text-blue-600 mt-1' to='/'><FiInbox className='text-xl' /> Export</Link></li>
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