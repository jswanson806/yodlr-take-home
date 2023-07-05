import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import YodlrApi from '../api';
import './styles/UserRegistration.style.css';

const UserRegistration = () => {

    const navigate = useNavigate();
    //initial state of the form with empty fields
    const INITIAL_STATE = {
        email: '',
        firstName: '',
        lastName: ''
    }

    //tracks state of the form data
    const [formData, setFormData] = useState(INITIAL_STATE);

    /** Calls API to register user with provided user data */

    async function addUser(userInfo) {
        const res = await YodlrApi.registerUser(userInfo);
    }

    /** Handles updating the form fields dynamically */

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
            
        }))
    }

    /** Handles submission of data from the form
     * 
     * Call the addUser function
     * 
     * Resets the form fields to initial state
     */

    const handleSubmit = (e) => {
        e.preventDefault();

        const userInfo = {
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName
        }

        addUser(userInfo);
        setFormData(INITIAL_STATE);
        navigate("/")
    }

    return (
        <div className="container">
            <div className="Register-card">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="text"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <label htmlFor="firstName">First Name</label>
                    <input
                        id="firstName"
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    <label htmlFor="lastName">LastName</label>
                    <input
                        id="lastName"
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                <button type="submit">Register</button>
                </form>
            </div>
        </div>
    )
}


export default UserRegistration;