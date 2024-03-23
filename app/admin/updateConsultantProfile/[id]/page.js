'use client'

import React from "react";
import ConsultantProfile from 'app/consultant/profile/page';
function BrokerUpdate(props) {
    const id = props.params.id;
    return (
        <ConsultantProfile id={id} isAdminUpdate={true} />
    );
}

export default BrokerUpdate;
