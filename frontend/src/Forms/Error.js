import React from "react";

const Error = ({touched, message} ) => {
    if (!touched) {
        return <div className="invalid-feedback">&nbsp;</div>;
    } if (message) {
        return <div className="invalid-feedback">{message}</div>;
    }
    return <div className="valid-feedback">ok</div>;
};

export default Error;