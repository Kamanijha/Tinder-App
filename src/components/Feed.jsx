import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from "../utils/feedSlice"
import { BASE_URL } from '../utils/constants'
import UserCard from './UserCard'
import { h1 } from 'framer-motion/client'
const Feed = () => {
  const feed = useSelector((store) => store.feed)
  console.log(feed)
  const dispatch = useDispatch()

  const getFeed = async () => {
    if (feed) return
    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true })
      console.log(res.data)
      dispatch(addFeed(res?.data?.data))

    } catch (error) {
      console.error("Error fetching feed:", error);
    }
  }
  useEffect(() => {
    getFeed()
  }, [])

  if(!feed) return
  if(feed.length <= 0) return <h1>No new user available </h1>

  return feed && (
    <div className='flex justify-center my-10'>
      <UserCard user={feed[0]}/>
    </div>
  )
}

export default Feed
