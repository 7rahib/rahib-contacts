import React from 'react';
import { useNavigate } from 'react-router-dom';

const ContactRow = ({ contact, refetch }) => {
    const navigate = useNavigate();
    const { _id, name, company, email, phone, img } = contact;
    const handleClick = () => {
        navigate(`/contactDetails/${_id}`);
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
                {email}
            </td>
            <td className='hidden md:table-cell'>{phone}</td>
            <td className='hidden lg:table-cell'>{company}</td>
        </tr>
    );
};

export default ContactRow;