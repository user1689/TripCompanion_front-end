import React from 'react'
import './UserList.css'
import UserItem from './UserItem'

export default function UserList(props) {
    
    if (props.items.length === 0 || props.items === null) {
        return (
            <div className='center'>No users found</div>
        )
    }

    return (
        <ul className='users-list'>

            {
                props.items.map((user) => {
                    return <UserItem key={user.id} {...user} />;
                })
            }

        </ul>
    )
}
