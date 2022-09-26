import React from 'react';
import { useForm } from 'react-hook-form';
import { BiUser } from "react-icons/bi";
import { BiBuildings } from "react-icons/bi";
import { BiMailSend } from "react-icons/bi";
import { BiPhone } from "react-icons/bi";
import { BiCake } from "react-icons/bi";
import { BiNote } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

const AddContact = () => {
    const navigate = useNavigate();

    const { register, formState: { errors }, handleSubmit } = useForm();
    const imageStorageKey = 'a1d7d3a7e4fde5cadc71e0a2315af238';

    const onSubmit = async data => {
        const email = data.email;
        const formData = new FormData();
        const image = data.image[0];
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(result => {
                if (result.success) {
                    const img = result.data.url;
                    const newContact = {
                        img: img,
                        name: data.name,
                        company: data.company,
                        phone: data.phone,
                        email: email,
                        birthDate: data.birthDate,
                        note: data.note
                    };
                    fetch(`https://rahib-contacts-server-side-wadd-8nmf2cleg-7rahib.vercel.app/contacts/${email}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(newContact)
                    }).then(res => res.json())
                        .then(data => {
                            navigate('/');
                        })
                }
            })
    }
    return (
        <div>
            <h3 className='text-3xl font-semibold ml-5'>Create a new Contact</h3>
            <div className="flex justify-center">
                <div className="flex items-center w-full max-w-3xl mx-auto lg:px-12 lg:w-3/5">
                    <div className="w-full p-8">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex w-full items-center justify-center bg-grey-lighter">
                                <label className="w-64 flex flex-col items-center px-4 py-6 text-blue rounded-lg tracking-wide uppercase  cursor-pointer">
                                    <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                    </svg>
                                    <span className="mt-2 text-base leading-normal">Pick another photo</span>
                                    <input type='file' className="input input-xs pb-10" name='image' {...register("image")} />
                                </label>
                            </div>
                            <div className="divider"></div>
                            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                                <div className='flex justify-center items-center'>
                                    <label className='mr-2'><BiUser /></label>
                                    <input type="text" placeholder="Full Name" name='name' className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                        {...register("name", {
                                            required: {
                                                value: true,
                                                message: 'Full Name is required'
                                            }
                                        })}
                                    />
                                    <label className="label">
                                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                                    </label>
                                </div>
                                <div className='flex justify-center items-center'>
                                    <label className='mr-2'><BiBuildings /></label>
                                    <input type="text" placeholder="Company and Job Title" name='company' className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                        {...register("company")} />
                                </div>
                                <div className='flex justify-center items-center'>
                                    <label className='mr-2'><BiPhone /></label>
                                    <input type="text" placeholder="Phone number" name='phone' className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                        {...register("phone", {
                                            required: {
                                                value: true,
                                                message: 'Phone number is required'
                                            }
                                        })}
                                    />
                                    <label className="label">
                                        {errors.phone?.type === 'required' && <span className="label-text-alt text-red-500">{errors.phone.message}</span>}
                                    </label>
                                </div>
                                <div className='flex justify-center items-center'>
                                    <label className='mr-2'><BiMailSend /></label>
                                    <input type="email" placeholder="Email address" name='email' className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                        {...register("email", {
                                            required: {
                                                value: true,
                                                message: 'Email Address is required'
                                            }
                                        })}
                                    />
                                    <label className="label">
                                        {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                    </label>
                                </div>
                                <div>
                                    <div className='flex justify-center items-center'>
                                        <label className='mr-2'><BiCake /></label>
                                        <input type="text" placeholder="Birthdate" name='birthDate' className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                            {...register("birthDate")} />
                                    </div>
                                    <label className="block mb-2 text-xs text-gray-400 ml-7">dd/mm/yyyy</label>
                                </div>
                                <div>
                                    <div className='flex justify-center items-center'>
                                        <label className='mr-2'><BiNote /></label>
                                        <input type="text" placeholder="Note" name='note' className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"{...register("note")} />
                                    </div>
                                    <label className="block mb-2 text-xs text-gray-400 ml-7">Note</label>
                                </div>
                            </div>
                            <button
                                className="flex items-center justify-between px-5 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 mt-3 ml-6">
                                <span>Save</span>

                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100 mt-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        cilpRule="evenodd" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default AddContact;