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

    const { register, formState: { errors }, handleSubmit, reset } = useForm();
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
                    fetch(`http://localhost:5000/contacts/${email}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(newContact)
                    }).then(res => res.json())
                        .then(data => {
                            console.log(data);
                            navigate('/');
                        })
                }
            })
    }
    return (
        <div>
            <h3 className='text-3xl font-semibold ml-5'>Create a new Contact</h3>
            <div class="flex justify-center">
                <div class="flex items-center w-full max-w-3xl mx-auto lg:px-12 lg:w-3/5">
                    <div class="w-full p-8">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div class="flex w-full items-center justify-center bg-grey-lighter">
                                <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-400 hover:text-white">
                                    <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                    </svg>
                                    <span class="mt-2 text-base leading-normal">Pick a photo</span>
                                    <input type='file' class="hidden" name='image'
                                        {...register("image", {
                                            required: {
                                                value: true,
                                                message: 'Image is required'
                                            }
                                        })}
                                    />
                                    <label className="label">
                                        {errors.image?.type === 'required' && <span className="label-text-alt text-red-500">{errors.image.message}</span>}
                                    </label>
                                </label>
                            </div>
                            <div className="divider"></div>
                            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                                <div className='flex justify-center items-center'>
                                    <label className='mr-2'><BiUser /></label>
                                    <input type="text" placeholder="Full Name" name='name' class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
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
                                    <input type="text" placeholder="Company and Job Title" name='company' class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                        {...register("company", {
                                            required: {
                                                value: true,
                                                message: 'Company and job title is required'
                                            }
                                        })}
                                    />
                                    <label className="label">
                                        {errors.company?.type === 'required' && <span className="label-text-alt text-red-500">{errors.company.message}</span>}
                                    </label>
                                </div>
                                <div className='flex justify-center items-center'>
                                    <label className='mr-2'><BiPhone /></label>
                                    <input type="text" placeholder="Phone number" name='phone' class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
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
                                    <input type="email" placeholder="Email address" name='email' class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                        {...register("email", {
                                            required: {
                                                value: true,
                                                message: 'Email Address is required'
                                            }
                                        })}
                                    />
                                    <label className="label">
                                        {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.phone.message}</span>}
                                    </label>
                                </div>
                                <div>
                                    <div className='flex justify-center items-center'>
                                        <label className='mr-2'><BiCake /></label>
                                        <input type="text" placeholder="Birthdate" name='birthDate' class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                            {...register("birthDate", {
                                                required: {
                                                    value: true,
                                                    message: 'Birthdate is required'
                                                }
                                            })}
                                        />
                                    </div>
                                    <label class="block mb-2 text-xs text-gray-400 ml-7">dd/mm/yyyy</label>
                                    <label className="label">
                                        {errors.birthDate?.type === 'required' && <span className="label-text-alt text-red-500">{errors.birthDate.message}</span>}
                                    </label>
                                </div>
                                <div>
                                    <div className='flex justify-center items-center'>
                                        <label className='mr-2'><BiNote /></label>
                                        <input type="text" placeholder="Note" name='note' class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                            {...register("note", {
                                                required: {
                                                    value: true,
                                                    message: 'Note is required'
                                                }
                                            })}
                                        />
                                    </div>
                                    <label class="block mb-2 text-xs text-gray-400 ml-7">Note</label>
                                    <label className="label">
                                        {errors.note?.type === 'required' && <span className="label-text-alt text-red-500">{errors.note.message}</span>}
                                    </label>
                                </div>
                            </div>
                            <button
                                class="flex items-center justify-between px-5 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 mt-3 ml-6">
                                <span>Save</span>

                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 rtl:-scale-x-100 mt-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd" />
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