import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { wrapper } from "@/store/store";
import { fetchUsersById, getUserData } from "@/store/usersSlice";


const UserProfile = () => {
    const dispatch = useDispatch();
    const { usersById, status, error } = useSelector(getUserData);
    const router = useRouter();
    const { id } = router.query;

    console.log(usersById)

    useEffect(() => {
        if (id && status === 'idle') {
            console.log('Dispatching fetchUserById for id:', id)
            dispatch(fetchUsersById(id));
        }
    }, [id, status, dispatch]);


    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    if (status === 'failed') {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="w-[50%] m-auto text-center border-2 border-green-700 py-8 mt-24">
            <div className="flex justify-between px-8">
                <h1 className="text-2xl text-green-400">User Name:</h1>
                <span className="text-lg text-green-200 text-start">{usersById?.name}</span>
            </div>
            <div className="flex justify-between px-8">
                <p className="text-2xl text-green-400">Email:</p>
                <span className="text-lg text-green-200 text-start"> {usersById?.email}</span>
            </div>
        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    const { id } = context.query;
    console.log('Fetching user by id:', id);
    await store.dispatch(fetchUsersById(id));
    return {
        props: {id},
    };
})

export default UserProfile;