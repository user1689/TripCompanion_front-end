import React from 'react'
import './UserItem.css'

import Avatar from '../../shared/UIElements/Avatar';
import Card from '../../shared/UIElements/Card';

import { Link } from 'react-router-dom';

export default function UserItem(props) {
    // console.log(props);
    console.log(props);
    return (
        <li className='user-item'>
            <Card className='user-item__content'>
                <Link to={`/${props.id}/places`}>
                    <div className='user-item__image'>
                        <Avatar image={props.image} alt={props.name} />
                    </div>
                    <div className='user-item__info'>
                        <h2>{props.name}</h2>
                        <h3>{props.places.length} {props.places.length <= 1 ? 'place' : 'places'}</h3>
                    </div>
                </Link>
            </Card>
        </li>
    )
}
