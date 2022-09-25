import React from 'react';

const TrashRow = ({ trash }) => {
    const { name, email, phone, img } = trash;
    return (
        <tr className="hover">
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
            <td className='table-cell'><button className='btn btn-xs btn-primary'>Delete</button></td>
        </tr>
    );
};

export default TrashRow;