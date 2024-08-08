import { deleteUser } from "@/store/usersSlice";
import Link from "next/link";
import { useDispatch } from "react-redux";


export default function UserList({ users })  {
    console.log(users)
    const dispatch = useDispatch()

    const handleDelete = (id) => {
        dispatch(deleteUser(id));
    }

    return (
        <ul className="grid grid-cols-4 gap-6 mb-6">
            {users?.map((user, index) => (
                <li key={index} className="flex justify-between gap-6 border-2 border-gray-300 px-4 py-6">
                    <Link href={`/users/${user.id}`}>{user.name}</Link>
                    <button onClick={() => handleDelete(user.id)} className="bg-green-700 px-2 py-2 rounded-lg">Delete</button>
                </li>
            ))}
        </ul>
    )
}