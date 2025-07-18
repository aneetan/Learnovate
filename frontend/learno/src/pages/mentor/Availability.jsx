import React, { useEffect, useState } from 'react'
import { API_URL, getUserId } from '../../config/config';
import axios from 'axios';
import AvailabilitySchedule from '../../components/Mentor/AvailabilitySchedule';
import MentorSchedules from './MentorSchedules';

const Availability = () => {
    const [mentor, setMentor] = useState(null);
    const [availability, setAvailability] = useState(null);
    const userId = getUserId(localStorage.getItem("token"));
    useEffect(()=> {
        const getMentor = async() => {
            try {
                const response = await axios.get(`http://localhost:8080/api/mentor/getMentor/${userId}`,{
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setMentor(response.data);
                setAvailability(response.data.availability);

            } catch (err) {
                console.log(err.message)
            }
        }
        getMentor();
    }, [userId]);

  return (
    <>
    { availability  ? (
        <MentorSchedules/>

    ): (
        <AvailabilitySchedule/>
    )}
    </>
  )
}

export default Availability
