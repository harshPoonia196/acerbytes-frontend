'use client'

import React from "react";
import UserProfile from 'app/user/profile/page';
function UserUpdate(props) {
    const id = props.params.id;
    return (
        <UserProfile id={id} isAdminUpdate={true} />
    );
}

export default UserUpdate;
