import React, { useEffect, useState } from 'react'
import ChatRoom from './ChatRoom'
import axios from 'axios';
import { API_URL, getUserId } from '../config/config';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MentorChat = () => {
    const [mentee, setMentee] = useState(null);
    const userId = getUserId(localStorage.getItem("token"));
    let params = useParams();
    const receiverId = params.receiverId;
    const currentUser = useSelector((state) => state.user.user)

    // useEffect(()=> {
    //     const getUser = async() => {
    //         try {
    //             const response = await axios.get(`${API_URL}/auth/getUsers/${userId}`)
    //             setCurrentUser(response.data)

    //         } catch (err) {
    //             console.log(err.message)
    //         }
    //     }
    //     getUser();
    // }, [userId])

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
            <ChatRoom 
                    currentUser={currentUser} 
                    roleDetails={mentee} 
                    receiverId={receiverId} 
                />
            ) : (
            <p>Loading chat...</p> 
            )}
    </div>
  )
}

export default MentorChat
