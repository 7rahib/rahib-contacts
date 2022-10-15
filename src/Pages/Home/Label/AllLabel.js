import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading';
import AllLabelList from './AllLabelList';

const AllLabel = () => {

    const { data: allLabels, isLoading, refetch } = useQuery('allLabels', () => fetch('http://localhost:5000/labels').then(res => res.json()))

    if (isLoading) {
        <Loading></Loading>
    }

    return (
        <div>
            <h3 className='text-2xl'>All Labels</h3>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <tbody>
                        {
                            allLabels?.map((allLabel) => <AllLabelList
                                key={allLabel._id}
                                allLabel={allLabel}
                                refetch={refetch}
                            >
                            </AllLabelList>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllLabel;