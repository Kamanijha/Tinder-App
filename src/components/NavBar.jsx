import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import { removeUser } from '../utils/userSlice'
const NavBar = () => {
    const user = useSelector((store) => store.user)
    const disPatch = useDispatch()
     const navigate = useNavigate()

    const handleLogout = async () =>{
      try {
        await axios.post(BASE_URL + "/logout",{},{
          withCredentials:true
        })
        disPatch(removeUser())
        return navigate("/login")
      } catch (err) {
        
      }
    }

  return (
    <div className="navbar bg-base-200 shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">🎶MatchVibe</Link>
        </div>
        {user && (
        <div className="flex gap-2">
            <div>Welcome , {user.firstName}</div>
           <div className="dropdown dropdown-end mx-6 flex ">
            
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="user photo"
                  src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <Link to="/profile"className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li><Link to="/connection">Connection</Link></li>
              <li><Link to="/request">Connection Request</Link></li>
              <li><a onClick={handleLogout}>Logout</a></li>
            </ul>
          </div>
        </div>
        )}
      </div>
  )
}

export default NavBar
