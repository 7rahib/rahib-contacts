import React from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import Loading from '../Shared/Loading';
import { BiMailSend } from "react-icons/bi";
import { BiPhone } from "react-icons/bi";
import { BiCake } from "react-icons/bi";
import { BiBuildings } from "react-icons/bi";

const ContactDetails = () => {
    const { _id } = useParams();

    const { data: contactDetails, isLoading } = useQuery('contactDetails', () => fetch(`http://localhost:5000/contactDetails/${_id}`).then(res => res.json()))

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='p-8'>
            <div className='lg:flex items-center'>
                <div className="avatar ml-12">
                    <div className="w-80 rounded-full">
                        <img src={contactDetails.img} alt='Profile' />
                    </div>
                </div>
                <div>
                    <h3 className='text-3xl font-semibold ml-5 text-center'>{contactDetails.name}</h3>
                </div>
            </div>
            <div className="divider"></div>
            <div className='border-2 w-2/3 h-52 p-2'>
                <h5 className='text-xl font-semibold mb-2'>Contact Details</h5>
                <div className='flex items-center mb-1'><BiMailSend className='text-xl mr-5' />
                    {(contactDetails.email) ? <h3>{contactDetails.email}</h3> : <Link className='text-blue-500'>Add email</Link>}</div>
                <div className='flex items-center mb-1'><BiPhone className='text-xl mr-5' />
                    {(contactDetails.phone) ? <h3>{contactDetails.phone}</h3> : <Link className='text-blue-500'>Add number</Link>}</div>
                <div className='flex items-center mb-1'><BiCake className='text-xl mr-5' />
                    {(contactDetails.birthDate) ? <h3>{contactDetails.birthDate}</h3> : <Link className='text-blue-500'>Add birthday</Link>}</div>
                <div className='flex items-center mb-1'><BiBuildings className='text-xl mr-5' />
                    {(contactDetails.company) ? <h3>{contactDetails.company}</h3> : <Link className='text-blue-500'>Add company and job</Link>}</div>
            </div>
        </div>

    );
};

export default ContactDetails;