import React from 'react';

const LabelListDetails = (props) => {
    const { onLabelChange } = props;
    const { label } = props.allLabel;
    return (
        <div>
            <div>
                <button
                    className="btn btn-md btn-primary m-3"
                    onClick={onLabelChange}
                >
                    {label}
                </button>
            </div>
        </div>
    );
};

export default LabelListDetails;