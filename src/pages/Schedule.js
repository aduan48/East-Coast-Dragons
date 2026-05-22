import React from 'react'
import { useState, useEffect } from 'react';
import '../styles/Table.css'
import '../styles/Schedule.css'

function Schedule() {
    const [schedule, setSchedule] = useState([]);
    const [scheduleGroup, setScheduleGroup] = useState("U18")


    useEffect(() => {
        async function fetchData() {
            try{
                const response = await fetch(`/.netlify/functions/getschedule?group=${scheduleGroup}`);

                if(response.ok){
                    const data = await response.json();
                    setSchedule(data);
                }else{
                    console.error("server aint working on the schedule lil bro");
                }
            }catch(error){
                console.error('Network error - check if netlify dev is running', error);
            }
        }
        fetchData();
    }, [scheduleGroup]);

    function info(id, date, time, rink, opponent){
        return(
            <tr className = 'row' key={id}>
                <td className='schedule-data'>{date}</td>
                <td className='schedule-data'>{time}</td>
                <td className='schedule-data'>{rink}</td>
                <td className='schedule-data'>{opponent}</td>

            </tr>
        )
    }

    const handleChange = (event)=>{
        setScheduleGroup(event.target.value);
    }


  return (
    <div>

        <div className="tourney-header-wrapper">

        <div id='Schedule' className='tourney-info'>
            <span>Over The Edge Tournament</span>
        </div>
        
        <select className='dropdown' onChange={handleChange} value = {scheduleGroup}>
            <option value = "U18">U18</option>
            <option value = "U16">U16</option>
            <option value = "U14">U14</option>
        </select>

        </div>

        <div className = 'schedule'>
            <table>
                <tbody>
                    {info("Date", "Time", "Location", "Opponent")}
                    {schedule ? Object.entries(schedule).map(([id, game]) => {
                            return info(id, game['date'],game['time'],game['rink'],game['opponent']);
                    }):null}
                </tbody>
            </table>
        </div>
      



    </div>
  )
}

export default Schedule
