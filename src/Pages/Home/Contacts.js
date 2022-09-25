import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import ContactRow from './ContactRow';

const Contacts = () => {

    const { data: contacts, isLoading, refetch } = useQuery('contacts', () => fetch('http://localhost:5000/contacts').then(res => res.json()))
    const { data: starContacts, isStarLoading } = useQuery('starContacts', () => fetch('http://localhost:5000/starContact').then(res => res.json()))

    console.log(starContacts);
    if (isLoading || isStarLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            {(starContacts[0]?.email) ? <div>
                <h5 className='text-xl font-semibold'>Starred Contacts</h5>
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
                                starContacts?.map((contact, index) => <ContactRow
                                    key={contact._id}
                                    contact={contact}
                                    refetch={refetch}
                                >
                                </ContactRow>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
                :
                <></>
            }
            <div>
                <h5 className='text-xl font-semibold'>All Contacts</h5>
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
                                contacts?.map((contact, index) => <ContactRow
                                    key={contact._id}
                                    contact={contact}
                                    refetch={refetch}
                                >
                                </ContactRow>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Contacts;