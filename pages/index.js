import Image from "next/image";
import { Inter } from "next/font/google";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, getUserData } from "@/store/usersSlice";
import { useEffect } from "react";
import { wrapper } from "@/store/store";
import UserForm from "@/components/UserForm";
import UserList from "@/components/UserList";



export default function Home() {
  const dispatch = useDispatch()
  const {users, status, error } = useSelector(getUserData);
  console.log(users)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  return (
    <div className="p-8">
      <h1 className='text-2xl font-bold my-4'>Users</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && users.length > 0 && <UserList users={users} />}
      {status === 'succeeded' && users.length === 0 && <p>No users found</p>}
      <h1 className="text-2xl font-bold my-4">Create Users</h1>
      <UserForm />
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  await store.dispatch(fetchUsers());
  return {
    props: {}
  };
});
