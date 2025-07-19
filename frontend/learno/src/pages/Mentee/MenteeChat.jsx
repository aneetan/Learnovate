import React, { useEffect, useState } from 'react'
import WebSocketClient from '../../components/websocket/ChatRoom'
import ChatRoom from '../../components/websocket/ChatRoom'
import axios from 'axios';
import { API_URL, getUserId } from '../../config/config';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const MenteeChat = () => {
    const [mentee, setMentee] = useState(null);
    const userId = getUserId(localStorage.getItem("token"));
    const currentUser = useSelector((state) => state.user.user);
     let params = useParams();
    const receiverId = params.receiverId;

     useEffect(()=> {
        const getMentee = async() => {
            try {
                const response = await axios.get(`${API_URL}/auth/getMentee/${userId}`,{})
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
            <ChatRoom currentUser={currentUser} roleDetails={mentee} receiverId={receiverId} />
            ) : (
            <p>Loading chat...</p> 
            )}
    </div>
  )
}

export default MenteeChat
