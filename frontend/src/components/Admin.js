import React, { useEffect, useState } from 'react';
import YodlrApi from '../api';
import UserCard from './UserCard.js';
import './styles/Admin.style.css';

const Admin = () => {

    const [users, setUsers] = useState([]);
    const [userCards, setUserCards] = useState([]);


    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users'));
        // local storage contains users
        if(storedUsers && storedUsers.length > 0) {
            updateFromLocalStorage(storedUsers);
        // no users in local storage, call API
        } else {
            getAllUsers();
        }
    }, []);


    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users]);


    async function getAllUsers() {
        const res = await YodlrApi.getAllUsers();
        setUsers(res);
    }
    

    useEffect(() => {
        if(users.length > 0){
            console.log('users', users)
            // Maps users returned from getAllUsers() to UserCard components
            const userCards = (users.map((u) => (
                <div className="userCard" key={u.id}>
                    <UserCard user={u} toggleUserState={toggleUserState}/>
                </div>
            )));
            console.log(userCards)
            
            // sets the state of userCards with map of user info
            setUserCards(userCards);
        }
    }, [users])


    function updateFromLocalStorage(localUsers) {
        setUsers((currentUsers) => {
            const updatedUsers = currentUsers.map((user) => {
                const matchingLocalUser = localUsers.find((localUser) => 
                localUser.id === user.id);
                if(matchingLocalUser) {
                    return { ...user, ...matchingLocalUser};
                }
                return user;
            })
            return updatedUsers;
        })
    }

    // toggles the state of users  'active' <-> 'pending'
    async function toggleUserState(user) {
        const updatedUsers = await Promise.all(users.map(async (u) => {
            // if user matching id found, toggle user.state change
            if(u.id === user.id) {
                const updatedState = u.state === 'active' 
                ? 'pending' 
                : 'active';
                await YodlrApi.updateUser({ ...u, state: updatedState});
                return { ...u, state: updatedState};
            }
            // else, return user
            return u;
        }))
        
        setUsers(updatedUsers);

    }

    return (
        <div className="container">
            <div className="adminCard">
                <h1 className="title">Admin Page</h1>
                <div className="userCard-container">
                    {userCards}
                </div>
            </div>
        </div>
    )
}

export default Admin;