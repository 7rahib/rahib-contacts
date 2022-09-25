import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import TrashRow from './TrashRow';

const Trash = () => {
    const { data: allTrash, isLoading, refetch } = useQuery('allTrash', () => fetch('http://localhost:5000/contact').then(res => res.json()))

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h5 className='text-xl font-semibold'>All Trashed Contacts</h5>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th className='hidden md:table-cell'>Email</th>
                            <th className='hidden md:table-cell'>Phone Number</th>
                            <th className='table-cell'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allTrash?.map((trash, index) => <TrashRow
                                key={trash._id}
                                trash={trash}
                                refetch={refetch}
                            >
                            </TrashRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Trash;