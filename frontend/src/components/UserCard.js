import React from "react";
import YodlrApi from "../api";

const UserCard = ({user, toggleUserState}) => {

    async function handleToggle() {
        await toggleUserState(user);
    }

    return (
        <>
            <h3>{user.lastName}, {user.firstName}</h3>
            <p>
                Email: {user.email} <br/>
                Status: {user.state}
            </p>
            {/* render button text based on current user state */}
            <button onClick={handleToggle}>
                {user.state === 'active' ? 'Deactivate' : 'Activate'}
            </button>
        </>
    )
}

export default UserCard;