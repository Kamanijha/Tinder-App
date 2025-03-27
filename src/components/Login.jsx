// import React, { useState } from 'react'
// import axios from "axios"
// import { useDispatch } from 'react-redux'
// import { addUser } from '../utils/userSlice'
// import { useNavigate } from 'react-router-dom'
// import { BASE_URL } from '../utils/constants'
// const Login = () => {

//     const [emailId,setEmailId] = useState("")
//     const [password,setPassword] = useState("")
//     const [firstName,setFirstName] = useState("")
//     const [lastName,setLastName] = useState("")
//     const [isLoginForm, setIsLoginForm] = useState(true)
//     const dispatch = useDispatch()
//     const navigate = useNavigate()
//     const [error, setError] = useState()


//     const handleLogin = async () =>{

//         try {
//             const res = await axios.post( BASE_URL + "/login",{
//                 emailId,
//                 password
//             },{withCredentials : true})
//             dispatch(addUser(res.data))
//             return navigate("/")
//             //console.log(res.data)
//         } catch (error) {
//             setError(error?.response?.data || "something went wrong")
//             //console.error(error?.response?.message || "something went wrong")
//         }
//     }

//     const handleSignUp = async () => {
//         try {
//             const res = await axios.post(BASE_URL + "/signup",{
//                 firstName,
//                 lastName,
//                 emailId,
//                 password
//             },{withCredentials:true})
//             dispatch(addUser(res.data))
//             return navigate("/profile")
//         } catch (error) {
//             setError(error?.response?.data || "something went wrong")
//         }
//     }

//     return (
//         <div className='flex justify-center my-10'>
//             <div className="card card-dash bg-base-300 w-96">
//                 <div className="card-body">
//                     <h2 className="card-title">{isLoginForm ? "Login" :"SignUp"}</h2>
//                     { !isLoginForm && <><div>
//                         <fieldset className="fieldset">
//                             <legend className="fieldset-legend">First Name</legend>
//                             <input 
//                             type="text" 
//                             value={firstName} 
//                             onChange={(e)=> setFirstName(e.target.value)}
//                             className="input" 
//                             placeholder="" />

//                         </fieldset>

//                     </div>
//                     <div>
//                         <fieldset className="fieldset">
//                             <legend className="fieldset-legend">Last Name</legend>
//                             <input 
//                             type="text" 
//                             value={lastName} 
//                             onChange={(e)=> setLastName(e.target.value)}
//                             className="input" placeholder="" />

//                         </fieldset>

//                     </div></>}

//                     <div>
//                         <fieldset className="fieldset">
//                             <legend className="fieldset-legend">Email ID</legend>
//                             <input 
//                             type="text" 
//                             value={emailId} 
//                             onChange={(e)=> setEmailId(e.target.value)}
//                             className="input" 
//                             placeholder="" />

//                         </fieldset>

//                     </div>
//                     <div>
//                         <fieldset className="fieldset">
//                             <legend className="fieldset-legend">Passsword</legend>
//                             <input 
//                             type="password" 
//                             value={password} 
//                             onChange={(e)=> setPassword(e.target.value)}
//                             className="input" placeholder="" />

//                         </fieldset>

//                     </div>
//                     <p className='text-red-500'>{error} </p>
//                     <div className="card-actions justify-center">
//                         <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignUp}>{isLoginForm ? "Login" :"SignUp"}</button>
//                     </div>
//                 </div>
//                 <p onClick={() =>setIsLoginForm(value=> !value)}className='text-center cursor-pointer'>{isLoginForm ? "New user ? Sign up here" :"Existing user?Login here"}</p>
//             </div>
//         </div>
//     )
// }

// export default Login


import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isLoginForm, setIsLoginForm] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [gender, setGender] = useState("");    // ✅ Define gender state
    const [age, setAge] = useState("");
    const [about, setAbout] = useState("")
    const [photoUrl, setPhotoUrl] = useState("")
    // Handle Login
    const handleLogin = async () => {
        try {
            const res = await axios.post(
                `${BASE_URL}/login`,
                { emailId, password },
                { withCredentials: true }
            );
            dispatch(addUser(res.data));
            navigate('/');
        } catch (error) {
            setError(error?.response?.data?.message || 'Something went wrong');
        }
    };



    // const handleSignUp = async () => {
    //     try {
    //         const res = await axios.post(
    //             `${BASE_URL}/signup`,
    //             { firstName, lastName, emailId, password },
    //             { withCredentials: true }
    //         );

    //         // Check the response structure and dispatch correctly
    //         const userData = res?.data?.data || res?.data;
    //         if (userData) {
    //             dispatch(addUser(userData));
    //             navigate('/profile');
    //         } else {
    //             setError('Signup failed. Please try again.');
    //         }
    //     } catch (error) {
    //         setError(error?.response?.data?.message || 'Something went wrong');
    //         console.error(error);
    //     }
    // };



    // const handleSignUp = async () => {
    //     if (!firstName || !lastName || !emailId || !password) {
    //         setError("All fields are required!");
    //         return;
    //     }

    //     try {
    //         const res = await axios.post(BASE_URL + "/signup", {
    //             firstName,
    //             lastName,
    //             emailId,
    //             password,
    //             gender: "Not specified", // or set from user input
    //             age: 1,                  // default age if not provided
    //             about: "",
    //             photoUrl: "",            // default or user-provided
    //         }, { withCredentials: true });

    //         dispatch(addUser(res.data.data));  
    //         navigate("/profile");
    //     } catch (error) {
    //         console.error(error);
    //         setError(error?.response?.data || "Something went wrong");
    //     }
    // };



    // const handleSignUp = async () => {
    //     const payload = {
    //         firstName,
    //         lastName,
    //         emailId,
    //         password,
    //     };

    //     // Only add optional fields if they have values
    //     if (gender) payload.gender = gender;
    //     if (age) payload.age = age;
    //     if (about) payload.about = about;
    //     if (photoUrl) payload.photoUrl = photoUrl;

    //     try {
    //         const res = await axios.post(BASE_URL + "/signup", payload, { withCredentials: true });
    //         dispatch(addUser(res.data.data));
    //         navigate("/profile");
    //     } catch (error) {
    //         console.error(error);
    //         setError(error?.response?.data || "Something went wrong");
    //     }
    // };


    const handleSignUp = async () => {
        // Construct the payload with required fields
        const payload = {
            firstName,
            lastName,
            emailId,
            password,
        };
    
        // Optional fields: only add them if they have values
        if (gender) {
            const validGenders = ["male", "female", "other"];
            if (!validGenders.includes(gender.toLowerCase())) {
                setError("Gender must be 'male', 'female', or 'other'.");
                return;
            }
            payload.gender = gender;
        }
    
        if (age) payload.age = age;
        if (about) payload.about = about;
        if (photoUrl) payload.photoUrl = photoUrl;
    
        try {
            // Debug: Log the payload before sending
            console.log("Payload:", payload);
    
            const res = await axios.post(BASE_URL + "/signup", payload, { withCredentials: true });
    
            // Check if the response has the expected data
            if (res.data && res.data.data) {
                dispatch(addUser(res.data.data)); // Store the user in Redux
                navigate("/profile"); // Navigate to profile page
            } else {
                setError("Signup failed. Please try again.");
            }
        } catch (error) {
            console.error("Signup Error:", error);
            // Handle detailed error messages from the backend
            setError(error?.response?.data || "Something went wrong during signup.");
        }
    };
    

    return (
        <div className="flex justify-center my-10">
            <div className="card card-dash bg-base-300 w-96">
                <div className="card-body">
                    <h2 className="card-title">{isLoginForm ? 'Login' : 'SignUp'}</h2>

                    {!isLoginForm && (
                        <>
                            <div>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">First Name</legend>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="input"
                                        placeholder="Enter First Name"
                                    />
                                </fieldset>
                            </div>
                            <div>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Last Name</legend>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="input"
                                        placeholder="Enter Last Name"
                                    />
                                </fieldset>
                            </div>

                            <div>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Age</legend>
                                    <input
                                        type="number"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                        className="input"
                                        placeholder="Age"
                                    />
                                </fieldset>
                            </div>


                            <div>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Gender</legend>
                                    <input
                                        type="text"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        className="input"
                                        placeholder="Gender"
                                    />
                                </fieldset>
                            </div>
                            <div>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Optional</legend>
                                    <input
                                        type="text"
                                        value={photoUrl}
                                        onChange={(e) => setPhotoUrl(e.target.value)}
                                        className="input"
                                        placeholder="photoUrl"
                                    />
                                </fieldset>
                            </div>

                            <div>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Optional</legend>
                                    <input
                                        type="text"
                                        value={about}
                                        onChange={(e) => setAbout(e.target.value)}
                                        className="input"
                                        placeholder="About"
                                    />
                                </fieldset>
                            </div>
                        </>
                    )}

                    <div>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Email ID</legend>
                            <input
                                type="email"
                                value={emailId}
                                onChange={(e) => setEmailId(e.target.value)}
                                className="input"
                                placeholder="Enter Email ID"
                            />
                        </fieldset>
                    </div>

                    <div>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Password </legend>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input"
                                placeholder="Enter Password"
                            />
                        </fieldset>
                    </div>


                    {error && <p className="text-red-500">{error}</p>}

                    <div className="card-actions justify-center">
                        <button
                            className="btn btn-primary"
                            onClick={isLoginForm ? handleLogin : handleSignUp}
                        >
                            {isLoginForm ? 'Login' : 'SignUp'}
                        </button>
                    </div>
                </div>

                <p
                    onClick={() => {
                        setIsLoginForm((prev) => !prev);
                        setError(''); // Reset error when switching forms
                    }}
                    className="text-center cursor-pointer"
                >
                    {isLoginForm ? 'New user? Sign up here' : 'Existing user? Login here'}
                </p>
            </div>
        </div>
    );
};

export default Login;
