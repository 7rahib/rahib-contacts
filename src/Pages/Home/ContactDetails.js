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

    const { data: contactDetails, isLoading, refetch } = useQuery('contactDetails', () => fetch(`http://localhost:5000/contactDetails/${_id}`).then(res => res.json()))

    const handleFav = _id => {
        swal({
            title: "Are you sure?",
            icon: "info",
            buttons: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    fetch(`http://localhost:5000/contacts/fav/${_id}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json',
                        }
                    })
                        .then(res => {
                            if (res.status === 403) {
                                swal('Failed to star this contact');
                            }
                            return res.json()
                        })
                        .then(data => {
                            if (data.modifiedCount > 0) {
                                refetch();
                                swal();
                                swal({
                                    title: "Successfully made this a starred contact",
                                    icon: "success",
                                })
                            }

                        })
                } else {
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
                    fetch(`http://localhost:5000/contacts/${_id}`, {
                        method: 'DELETE',
                        headers: {
                            'content-type': 'application/json',
                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            refetch()
                            navigate('/')
                        })
                }
            });
    }

    const handleRemoveFav = (_id) => {
        swal({
            title: "Are you sure?",
            icon: "info",
            buttons: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    fetch(`http://localhost:5000/contacts/removeFav/${_id}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json',
                        }
                    })
                        .then(res => { return res.json() })
                        .then(data => {
                            if (data.modifiedCount > 0) {
                                refetch();
                                swal({
                                    title: "Not a starred contact anymore",
                                    icon: "info",
                                })
                            }
                        })
                }
            });
    }

    const handleUpdate = (_id) => {
        navigate(`/updateContact/${_id}`);
    }

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='p-8'>
            <button className='btn btn-sm btn-ghost' onClick={() => navigate('/')}>◀︎ Go Back</button>
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
                    {(contactDetails.role ? <button className='text-2xl mr-2 text-blue-400 mb-2' onClick={() => handleRemoveFav(_id)}><MdStarRate /></button> : <button className='text-2xl mr-2 text-gray-400 mb-2' onClick={() => handleFav(_id)}>☆</button>)}
                    <div className="dropdown dropdown-end">
                        <button className='text-xl mr-2 font-thin text-gray-400'><MdOutlineMoreVert /></button>
                        <ul tabIndex={0} className="mt-3 p-1 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-20">
                            <li><button onClick={() => handleDelete(_id)}>Delete</button></li>
                        </ul>
                    </div>
                    <button onClick={() => handleUpdate(_id)} className='btn btn-sm btn-primary'>Edit</button>
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