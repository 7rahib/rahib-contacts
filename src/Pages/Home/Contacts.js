import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import ContactRow from './ContactRow';

const Contacts = () => {
    const { data: contacts, isLoading, refetch } = useQuery('contacts', () => fetch('http://localhost:5000/contacts').then(res => res.json()))

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className="overflow-x-auto w-full">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th className='hidden md:table-cell'>Email</th>
                        <th className='hidden md:table-cell'>Phone Number</th>
                        <th className='hidden lg:table-cell'>Job Title & Company</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        contacts.map((contact, index) => <ContactRow
                            key={contacts._id}
                            contact={contact}
                            refetch={refetch}
                        >
                        </ContactRow>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Contacts;