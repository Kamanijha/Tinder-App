import React from 'react'

import { useState } from 'react'
import UserCard from './UserCard'
import { data } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import ImageUploader from "./ImageUploader";



const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender || "");
    const [about, setAbout] = useState(user.about);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const dispatch = useDispatch()
    const [showToast, setshowToast] = useState(false)



    // const handleFileChange = (e) => {
    //     setFile(e.target.files[0]);
    // };

    // const uploadImage = async () => {
    //     if (!file) return;

    //     const formData = new FormData();
    //     formData.append("file", file);

    //     try {
    //         const res = await axios.post(BASE_URL + "/upload", formData, {
    //             headers: { 'Content-Type': 'multipart/form-data' },
    //             withCredentials: true,
    //         });
    //         return res.data.url; // Assuming the backend returns the uploaded image URL
    //     } catch (err) {
    //         console.error(err);
    //         setError("Failed to upload image.");
    //         return null;
    //     }
    // };
    

    const saveProfile = async () => {
        setError("");

        if (age < 1 || age > 99) {
            setError("Enter valid Age");
            return;
        }

        if (!["male", "female", "other"].includes(gender.toLowerCase())) {
            setError("Enter valid gender");
            return;
        }



        // let imageUrl = photoUrl;
        // if (file) {
        //     const uploadedUrl = await uploadImage();
        //     if (uploadedUrl) {
        //         imageUrl = uploadedUrl;
        //     } else {
        //         return;
        //     }
        // }


        try {

            const updateData = {
                firstName,
                lastName,
                photoUrl,
                age: Number(age),
                gender,
                about
            }
            console.log(updateData)
            const res = await axios.patch(BASE_URL + "/profile/edit", updateData, { withCredentials: true })

            dispatch(addUser(res?.data?.data))
            setshowToast(true)

            setTimeout(() => {
                setshowToast(false)
            }, 3000)
        } catch (error) {
            setError(error?.response?.data?.message || "Failed to update profile");
        }
    }


    return (
        <>
            <div className="flex justify-center items-start gap-10 my-10">
                {/* Left Side - Edit Profile Card */}
                <div className="card bg-base-300 w-[30rem] shadow-lg rounded-lg p-6">
                    <h2 className="card-title text-lg font-semibold text-center">Edit Profile</h2>

                    <div className="space-y-3 mt-4">
                        <fieldset className="flex flex-col">
                            <legend className="text-sm font-semibold">First Name</legend>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="input input-bordered w-full"
                            />
                        </fieldset>

                        <fieldset className="flex flex-col">
                            <legend className="text-sm font-semibold">Last Name</legend>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="input input-bordered w-full"
                            />
                        </fieldset>

                        <fieldset className="flex flex-col">
                            <legend className="text-sm font-semibold">Photo URL</legend>
                            <input
                                type="text"
                                value={photoUrl}
                                onChange={(e) => setPhotoUrl(e.target.value)}
                                className="input input-bordered w-full"
                                
                            />
                            
                        </fieldset>

                        {/* <fieldset className="flex flex-col">
                            <legend className="text-sm font-semibold">Upload Photo (Offline)</legend>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="input input-bordered w-full"
                            />
                        </fieldset> */}

                        <fieldset className="flex flex-col">
                            <legend className="text-sm font-semibold">Age</legend>
                            <input
                                type="number"
                                value={age}
                                min="1"
                                max="99"
                                onChange={(e) => setAge(e.target.value)}
                                className="input input-bordered w-full"
                            />
                        </fieldset>

                        <fieldset className="flex flex-col">
                            <legend className="text-sm font-semibold">Gender</legend>
                            <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="input input-bordered w-full"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </fieldset>

                        <fieldset className=" flex flex-col">
                            <legend className="fieldset-legend">About</legend>
                            <textarea className=" w-full textarea h-24" 
                            type="text"
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            ></textarea>
                            
                        </fieldset>


                    </div>

                    <p className="text-red-500 text-sm">{error}</p>

                    <div className="card-actions justify-center mt-4">
                        <button className="btn btn-primary w-full" onClick={saveProfile}>Save Profile</button>
                    </div>
                </div>

                {/* Right Side - User Profile Preview */}
                <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
            </div>
            {/* ✅ Success Alert - Appears Below the Profile Card */}
            {showToast && (
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>Upadate profile successfully.</span>
                    </div>
                </div>)}
        </>
    );
};

 export default EditProfile;


// import React, { useState } from 'react';
// import UserCard from './UserCard';
// import axios from 'axios';
// import { BASE_URL } from '../utils/constants';
// import { useDispatch } from 'react-redux';
// import { addUser } from '../utils/userSlice';

// const EditProfile = ({ user }) => {
//     const [firstName, setFirstName] = useState(user.firstName);
//     const [lastName, setLastName] = useState(user.lastName);
//     const [age, setAge] = useState(user.age || "");
//     const [gender, setGender] = useState(user.gender || "");
//     const [about, setAbout] = useState(user.about);
//     const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
//     const [file, setFile] = useState(null);
//     const [error, setError] = useState("");
//     const dispatch = useDispatch();
//     const [showToast, setShowToast] = useState(false);

//     const handleFileChange = (e) => {
//         setFile(e.target.files[0]);
//     };

//     const uploadImage = async () => {
//         if (!file) return;

//         const formData = new FormData();
//         formData.append("file", file);

//         try {
//             const res = await axios.post(BASE_URL + "/upload", formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//                 withCredentials: true,
//             });
//             return res.data.url; // Assuming the backend returns the uploaded image URL
//         } catch (err) {
//             console.error(err);
//             setError("Failed to upload image.");
//             return null;
//         }
//     };

//     const saveProfile = async () => {
//         setError("");

//         if (age < 1 || age > 99) {
//             setError("Enter valid Age");
//             return;
//         }

//         if (!["male", "female", "other"].includes(gender.toLowerCase())) {
//             setError("Enter valid gender");
//             return;
//         }

//         let imageUrl = photoUrl;
//         if (file) {
//             const uploadedUrl = await uploadImage();
//             if (uploadedUrl) {
//                 imageUrl = uploadedUrl;
//             } else {
//                 return;
//             }
//         }

//         try {
//             const updateData = {
//                 firstName,
//                 lastName,
//                 photoUrl: imageUrl,
//                 age: Number(age),
//                 gender,
//                 about,
//             };

//             const res = await axios.patch(BASE_URL + "/profile/edit", updateData, { withCredentials: true });

//             dispatch(addUser(res?.data?.data));
//             setShowToast(true);

//             setTimeout(() => {
//                 setShowToast(false);
//             }, 3000);
//         } catch (error) {
//             setError(error?.response?.data?.message || "Failed to update profile");
//         }
//     };

//     return (
//         <>
//             <div className="flex justify-center items-start gap-10 my-10">
//                 <div className="card bg-base-300 w-[30rem] shadow-lg rounded-lg p-6">
//                     <h2 className="card-title text-lg font-semibold text-center">Edit Profile</h2>

//                     <div className="space-y-3 mt-4">
//                         <fieldset className="flex flex-col">
//                             <legend className="text-sm font-semibold">First Name</legend>
//                             <input
//                                 type="text"
//                                 value={firstName}
//                                 onChange={(e) => setFirstName(e.target.value)}
//                                 className="input input-bordered w-full"
//                             />
//                         </fieldset>

//                         <fieldset className="flex flex-col">
//                             <legend className="text-sm font-semibold">Last Name</legend>
//                             <input
//                                 type="text"
//                                 value={lastName}
//                                 onChange={(e) => setLastName(e.target.value)}
//                                 className="input input-bordered w-full"
//                             />
//                         </fieldset>

//                         <fieldset className="flex flex-col">
//                             <legend className="text-sm font-semibold">Photo URL (Online)</legend>
//                             <input
//                                 type="text"
//                                 value={photoUrl}
//                                 onChange={(e) => setPhotoUrl(e.target.value)}
//                                 className="input input-bordered w-full"
//                             />
//                         </fieldset>

//                         <fieldset className="flex flex-col">
//                             <legend className="text-sm font-semibold">Upload Photo (Offline)</legend>
//                             <input
//                                 type="file"
//                                 accept="image/*"
//                                 onChange={handleFileChange}
//                                 className="input input-bordered w-full"
//                             />
//                         </fieldset>

//                         <fieldset className="flex flex-col">
//                             <legend className="text-sm font-semibold">Age</legend>
//                             <input
//                                 type="number"
//                                 value={age}
//                                 min="1"
//                                 max="99"
//                                 onChange={(e) => setAge(e.target.value)}
//                                 className="input input-bordered w-full"
//                             />
//                         </fieldset>

//                         <fieldset className="flex flex-col">
//                             <legend className="text-sm font-semibold">Gender</legend>
//                             <select
//                                 value={gender}
//                                 onChange={(e) => setGender(e.target.value)}
//                                 className="input input-bordered w-full"
//                             >
//                                 <option value="">Select Gender</option>
//                                 <option value="male">Male</option>
//                                 <option value="female">Female</option>
//                                 <option value="other">Other</option>
//                             </select>
//                         </fieldset>

//                         <fieldset className="flex flex-col">
//                             <legend className="text-sm font-semibold">About</legend>
//                             <textarea
//                                 className="w-full textarea h-24"
//                                 value={about}
//                                 onChange={(e) => setAbout(e.target.value)}
//                             ></textarea>
//                         </fieldset>

//                         <p className="text-red-500 text-sm">{error}</p>

//                         <div className="card-actions justify-center mt-4">
//                             <button className="btn btn-primary w-full" onClick={saveProfile}>
//                                 Save Profile
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
//             </div>

//             {showToast && (
//                 <div className="toast toast-top toast-center">
//                     <div className="alert alert-success">
//                         <span>Profile updated successfully.</span>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default EditProfile;


