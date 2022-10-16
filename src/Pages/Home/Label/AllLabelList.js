import React from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const AllLabelList = ({ allLabel, refetch }) => {
    const navigate = useNavigate();

    const { _id, label, userEmail } = allLabel;

    const labelDetails = (_id) => {
        navigate('/labelContacts', { state: { label: label, id: _id } });
    }

    const deleteLabel = (id) => {
        fetch(`https://rahib-contacts.onrender.com/label/${id}`, {
            method: "DELETE",
            headers: {
                'content-type': 'application/json',
            }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.deletedCount > 0) {
                    swal({
                        title: "Successfully deleted this label",
                        icon: "warning",
                    })
                    navigate('/')
                }
            });
    };

    return (
        <tr onClick={() => labelDetails(_id)} className="hover">
            <td>
                <div className="font-bold">{label}</div>
            </td>
            <td>
                <button onClick={() => deleteLabel(_id)} className="btn btn-sm btn-primary">Delete</button>
            </td>
        </tr>
    );
};

export default AllLabelList;