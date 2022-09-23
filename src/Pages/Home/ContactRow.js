import React from 'react';
import { useNavigate } from 'react-router-dom';

const ContactRow = ({ contact, refetch }) => {
    const navigate = useNavigate();
    const { _id, name, company, email, phone, img } = contact;
    const handleClick = () => {
        fetch(`http://localhost:5000/contacts/count/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            }
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch();
                    console.log('Updated');
                }
                navigate(`/contactDetails/${_id}`);
            })
    }

    return (
        <tr onClick={() => handleClick(_id)} className="hover">
            <th>
                <label>
                    <input type="checkbox" className="checkbox" />
                </label>
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={img} alt="Contact" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{name}</div>
                    </div>
                </div>
            </td>
            <td className='hidden md:table-cell'>
                {(email) ? <h3>{email}</h3> : <h3 className='text-gray-300'>No email</h3>}
            </td>
            <td className='hidden md:table-cell'>{(phone) ? <h3>{phone}</h3> : <h3 className='text-gray-300'>No phone</h3>}</td>
            <td className='hidden lg:table-cell'>{(company) ? <h3>{company}</h3> : <h3 className='text-gray-300'>No company or job title</h3>}</td>
        </tr>
    );
};

export default ContactRow;