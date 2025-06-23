import React, { useEffect, useState } from 'react'
import ChatRoom from './ChatRoom'
import axios from 'axios';
import { API_URL, getUserId } from '../config/config';

const MentorChat = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [mentee, setMentee] = useState(null);
    const userId = getUserId(localStorage.getItem("token"));

    useEffect(()=> {
        const getUser = async() => {
            try {
                const response = await axios.get(`${API_URL}/auth/getUsers/${userId}`)
                setCurrentUser(response.data)
                console.log(response.data)

            } catch (err) {
                console.log(err.message)
            }
        }
        getUser();
    }, [userId])

     useEffect(()=> {
        const getMentee = async() => {
            try {
                const response = await axios.get(`${API_URL}/auth/getMentor/${userId}`,{})
                setMentee(response.data)

            } catch (err) {
                console.log(err.message)
            }
        }
        getMentee();
    }, [userId])

  return (
    <div>
         {currentUser ? (
            <ChatRoom currentUser={currentUser} roleDetails={mentee} />
            ) : (
            <p>Loading chat...</p> 
            )}
    </div>
  )
}

export default MentorChat
