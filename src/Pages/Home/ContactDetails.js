import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../Shared/Loading';

const ContactDetails = () => {
    const { _id } = useParams();

    const { data: contactDetails, isLoading, refetch } = useQuery('contactDetails', () => fetch(`http://localhost:5000/contactDetails/${_id}`).then(res => res.json()))

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='text-3xl font-semibold'>
            {contactDetails.name}
        </div>
    );
};

export default ContactDetails;