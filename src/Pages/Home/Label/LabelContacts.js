import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useLocation } from 'react-router-dom';
import auth from '../../../firebase.init';
import LabelContactList from './LabelContactList';

const LabelContacts = () => {
    const user = useAuthState(auth);
    const email = user[0]?.email;
    const location = useLocation();
    let label = location.state.label;
    const [labelContacts, setLabelContacts] = useState([]);
    useEffect(() => {
        fetch("https://rahib-contacts.onrender.com/contacts")
            .then((res) => res.json())
            .then((data) => {
                const fetchData = data.filter(
                    (data) => data.label === label
                );
                console.log(data.label);
                setLabelContacts(fetchData);
            });
    }, [label, user.email, email]);



    return (
        <div>
            <h3 className='text-xl font-semibold'>{label} Contacts</h3>
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
                            labelContacts?.map((labelContact, index) => <LabelContactList
                                key={labelContact._id}
                                labelContact={labelContact}
                            >
                            </LabelContactList>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LabelContacts;