import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser, fetchUsers } from "@/store/usersSlice";

export default function UserForm() {
    const [ formData, setFormData ] = useState({ name: '', email: ''})
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await dispatch(createUser(formData))
            alert('User created successfully');
            setFormData({ name: '', email: ''});
            dispatch(fetchUsers());
        } catch (error) {
            console.error('Error creating user:', error);
            alert('Failed to create user.')
        }
    };

        return (
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col w-[50%] gap-6 mb-6">
                    <input className="px-2 py-3 rounded-lg text-gray-700" type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" />
                    <input className="px-2 py-3 rounded-lg text-gray-700" type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" />
                </div>
                <button className="bg-green-700 px-2 py-2 rounded-lg" type="submit">Create User</button>
            </form>
        );
    }
