import React from 'react';

const FreqeuntlyUsed = () => {
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
                    <tr>
                        <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                        </th>
                        <td>
                            <div className="flex items-center space-x-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold">Naimur Rashid Rahib</div>
                                </div>
                            </div>
                        </td>
                        <td className='hidden md:table-cell'>
                            rahib@gmail.com
                        </td>
                        <td className='hidden md:table-cell'>+8801785766545</td>
                        <td className='hidden lg:table-cell'>Student at Leading University, Sylhet</td>
                    </tr>
                    <tr>
                        <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                        </th>
                        <td>
                            <div className="flex items-center space-x-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold">Naimur Rashid Rahib</div>
                                </div>
                            </div>
                        </td>
                        <td className='hidden md:table-cell'>
                            rahib@gmail.com
                        </td>
                        <td className='hidden md:table-cell'>+8801785766545</td>
                        <td className='hidden lg:table-cell'>Student at Leading University, Sylhet</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default FreqeuntlyUsed;