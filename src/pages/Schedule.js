import React from 'react'
import { useState, useEffect } from 'react';
import '../styles/Table.css'
import '../styles/Schedule.css'

function Schedule() {
    const [schedule, setSchedule] = useState([]);
    const [scheduleGroup, setScheduleGroup] = useState("U18")

    const [lineup, setLineup] = useState([]);


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

    useEffect(() => {
        async function fetchLineupData() {
            try {
                const response = await fetch(`/.netlify/functions/getlineup`); // No query param needed
                if(response.ok) {
                    setLineup(await response.json()); // Save to your second state
                }
            } catch(error) { console.error("Lineup fetch failed", error); }
        }
        fetchLineupData();
    }, []);


    function info(id, date, tournamentName, state){
        return(
            <tr className = 'row' key={id}>
                <td className='schedule-data'>{date}</td>
                <td className='schedule-data'>{tournamentName}</td>
                <td className='schedule-data'>{state}</td>

            </tr>
        )
    }

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
        <header className="section-header" id = 'schedule-topper'>SCHEDULE</header>


        <div className="tourney-header-wrapper">


        <div id='Schedule' className='curr-tourney-info'>
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
                    {info("header","Date", "Time", "Location", "Opponent")}
                    {schedule ? Object.entries(schedule).map(([id, game]) => {
                            return info(id, game['date'],game['time'],game['rink'],game['opponent']);
                    }):null}
                </tbody>
            </table>
        </div>
      
        <div className = 'schedule'>
            <div className='tourney-info'>
                <span>2026 Summer Tournament Lineup</span>
            </div>

            <table>
                <tbody>
                    {info("header","Date", "Tournament", "State")}
                    {lineup ? Object.entries(lineup).map(([id, tournament]) => {
                            return info(id, tournament['date'],tournament['tournamentName'],tournament['state']);
                    }):null}
                </tbody>
            </table>
        </div>


    </div>
  )
}

export default Schedule
