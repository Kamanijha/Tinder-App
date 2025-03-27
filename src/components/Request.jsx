import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest } from '../utils/requestSlice'
import { motion } from 'framer-motion';
const Request = () => {
    const requests = useSelector((store) => store.requests)
    console.log(requests)
    const dispatch = useDispatch()

 
    const reviewRequest = async (status,_id) =>{
        console.log(`Reviewing request with status: ${status}, ID: ${_id}`);
        try {
            const res =  await axios.post(BASE_URL +"/request/review/" + status +"/"+_id, {},{withCredentials:true} )

           
            if (res.status === 200) {
                // Remove the accepted/rejected request from the state
                const updatedRequests = requests.filter((request) => request._id !== _id);
                dispatch(addRequest(updatedRequests));
            }

        } catch (error) {
            console.error(error)
        }
    }
     


    const receivedRequest = async () =>{
        try {
            const res = await axios.get(BASE_URL + "/user/request/received",{withCredentials:true})

          dispatch(addRequest(res.data.data))
          console.log(res.data.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() =>{
        receivedRequest()
    },[])
    if (!requests) return <h1>Loading...</h1>;
    if (requests.length === 0) return <h1>No request found</h1>;

    return (
        requests && (
            <div className='text-center my-6'>
                <h1 className='text-2xl font-bold mb-4'>Request</h1>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {requests.map((request) => {
                        const { _id,firstName, lastName, gender, age, photoUrl, about } = request.fromUserId;

                        return (
                            <motion.div
                                key={_id}
                                //key={request.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className='m-2 p-4 bg-base-300 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out max-w-sm'
                            >
                                <div>
                                    <img
                                        alt={`${firstName} ${lastName}`}
                                        src={photoUrl}
                                        className='h-30 w-30 rounded-full mx-auto object-cover'
                                    />
                                </div>

                                <div className='text-center m-2 p-2'>
                                    <h2 className='text-lg font-semibold'>
                                        {firstName} {lastName}
                                    </h2>

                                    {age && gender && <p className='text-sm text-gray-500'>{`${age}, ${gender}`}</p>}

                                    <p className='mt-2 text-sm text-gray-300 overflow-hidden break-words max-h-24'>
                                        {about}
                                    </p>
                                </div>
                                <div>
                                <button className="btn btn-primary m-2" onClick={() => reviewRequest("accepted",request._id)} >Accept</button>
                                <button className="btn btn-secondary m-2"onClick={() => reviewRequest("rejected",request._id)} >Reject</button>
                                </div>
                            </motion.div>
                            
                        );
                    })}
                </div>
            </div>
        )

    )
}

export default Request
