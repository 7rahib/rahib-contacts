import React from 'react';
import { useQuery } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loading from '../Shared/Loading';
import { BiMailSend } from "react-icons/bi";
import { BiPhone } from "react-icons/bi";
import { BiCake } from "react-icons/bi";
import { BiBuildings } from "react-icons/bi";
import { BiNote } from "react-icons/bi";
import swal from 'sweetalert';
import { MdOutlineMoreVert } from "react-icons/md";
import { MdStarRate } from "react-icons/md";


const ContactDetails = () => {
    const { _id } = useParams();
    const navigate = useNavigate();

    const { data: contactDetails, isLoading } = useQuery('contactDetails', () => fetch(`http://localhost:5000/contactDetails/${_id}`).then(res => res.json()))

    const handleFav = (_id) => {
        swal({
            title: "Add to your favourite list?",
            icon: "info",
            buttons: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    console.log('Favourite')
                }
            });
    }
    const handleDelete = (_id) => {
        swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: true,
            dangerMode: true
        })
            .then((willDelete) => {
                if (willDelete) {
                    console.log('Deleted')
                }
            });
    }
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='p-8'>
            <button className='btn btn-sm btn-ghost' onClick={() => navigate(-1)}>◀︎ Go Back</button>
            <div className='lg:flex items-end'>
                <div className="avatar ml-12">
                    <div className="w-80 rounded-full">
                        <img src={contactDetails.img} alt='Profile' />
                    </div>
                </div>
                <div>
                    <h3 className='text-3xl font-semibold ml-5 text-center'>{contactDetails.name}</h3>
                </div>
                <div className='flex lg:ml-10 sm:mt-5 items-center'>

                    <button className='text-2xl mr-2 text-gray-400 mb-2' onClick={() => handleFav(_id)}>☆</button>
                    {/* <button className='text-xl mr-2 font-thin text-gray-400' onClick={() => handleDelete(_id)}><MdOutlineMoreVert /></button> */}
                    <div className="dropdown dropdown-end">
                        <button className='text-xl mr-2 font-thin text-gray-400'><MdOutlineMoreVert /></button>
                        <ul tabIndex={0} className="mt-3 p-1 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-20">
                            <li><button onClick={() => handleDelete(_id)}>Delete</button></li>
                        </ul>
                    </div>
                    <Link className='btn btn-sm btn-primary'>Edit</Link>
                </div>
            </div >
            <div className="divider"></div>
            <div className='border-2 w-3/4 h-50 p-2'>
                <h5 className='text-xl font-semibold mb-2'>Contact Details</h5>
                <div className='flex items-center mb-1'><BiMailSend className='text-xl mr-5' />
                    {(contactDetails.email) ? <h3>{contactDetails.email}</h3> : <Link className='text-blue-500'>Add email</Link>}
                </div>
                <div className='flex items-center mb-1'><BiPhone className='text-xl mr-5' />
                    {(contactDetails.phone) ? <h3>{contactDetails.phone}</h3> : <Link className='text-blue-500'>Add number</Link>}</div>
                <div className='flex items-center mb-1'><BiCake className='text-xl mr-5' />
                    {(contactDetails.birthDate) ? <h3>{contactDetails.birthDate}</h3> : <Link className='text-blue-500'>Add birthday</Link>}</div>
                <div className='flex items-center mb-1'><BiBuildings className='text-xl mr-5' />
                    {(contactDetails.company) ? <h3>{contactDetails.company}</h3> : <Link className='text-blue-500'>Add company and job</Link>}</div>
                <div className='flex items-center mb-1'><BiNote className='text-xl mr-5' />
                    {(contactDetails.note) ? <h3>{contactDetails.note}</h3> : <Link className='text-blue-500'>Add note</Link>}</div>
            </div>
        </div >

    );
};

export default ContactDetails;