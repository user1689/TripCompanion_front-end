import React, { useEffect, useState } from "react";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import UserList from "../components/UserList";
import useHttpClient from "../../shared/hooks/http-hook";


function User() {
    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState(null);
    const [loadedUsers, setLoadedUsers] = useState(null);
    const { isLoading, error, sendRequest, clearError } = useHttpClient(); 

    useEffect(() => {
        const fetchUsers = async () => {
            // setIsLoading(true);
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users`);
                // const responseData = await response.json();

                // if (!response.ok) {
                //     throw new Error(responseData.message);
                // }

                // setIsLoading(false);
                setLoadedUsers(responseData.users);
            } catch (error) {
                // setIsLoading(false);
                // setError(error.message);
            }
        };
        fetchUsers();
    }, [sendRequest]);
    const errorHandler = () => {
        // setError(null);
        clearError();
    };
    return (
        <React.Fragment>
            <ErrorModal error={error} isClear={errorHandler} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            <div>
                {!isLoading && loadedUsers && <UserList items={loadedUsers} />}
            </div>
        </React.Fragment>
    );
}

export default User;
