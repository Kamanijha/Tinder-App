import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { connect, useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionSlice';
import { motion } from 'framer-motion';

const Connection = () => {
    const connections = useSelector((store) => store.connections);


    const dispatch = useDispatch();
    //const connections = useSelector((store) => store.connections);
    const fetchConnection = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connection", { withCredentials: true });
            dispatch(addConnection(res.data.data));

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchConnection();
    }, []);

    // Handling loading and no data scenarios
    if (!connections) return <h1>Loading...</h1>;
    if (connections.length === 0) return <h1>No connection found</h1>;

    return (
        connections && (
            <div className='text-center my-6'>
                <h1 className='text-2xl font-bold mb-4'>Connections</h1>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {connections.map((connection) => {
                        const { _id, firstName, lastName, gender, age, photoUrl, about } = connection;

                        return (
                            <motion.div
                               key={_id}
                                // key={connection.id}
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
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        )

    )
};


//export default Connection;


export default Connection;
