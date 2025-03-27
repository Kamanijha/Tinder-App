import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';
import { BASE_URL } from '../utils/constants'
const UserCard = ({ user }) => {
    const {  _id,firstName, lastName, age, gender, about, photoUrl } = user;
    const dispatch = useDispatch()

const hnadleSendRequest = async (status,userId) =>{
    try {
        const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId ,{},{withCredentials:true}     
        )
        dispatch(removeUserFromFeed(userId))
    } catch (error) {
        console.error(error)
    }
}



    return (
        <div className="card bg-base-200 w-96 shadow-lg rounded-lg overflow-hidden">
            <figure className="w-full h-64 bg-gray-800">
                <img
                    src={photoUrl}
                    alt="User"
                    className="w-full h-full object-cover"
                />
            </figure>
            <div className="card-body text-center">
                <h2 className="card-title text-lg font-bold">{firstName + " " + lastName}</h2>
                <p className="text-sm text-gray-400 break-words whitespace-pre-wrap">
                    {about}
                </p>
                {age && gender && <p className="text-sm text-gray-500">{age} • {gender}</p>}

                <div className="card-actions flex justify-center mt-3">
                    <button className="btn btn-primary" onClick={() => hnadleSendRequest("interested",_id)}>Like</button>
                    <button className="btn btn-secondary" onClick={() => hnadleSendRequest("ignored",_id)}>Dislike</button>
                </div>
            </div>
        </div>
    );
};




export default UserCard
