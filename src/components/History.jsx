import React from 'react';
import { getTimeDifference } from './../helper';
import { FaLocationArrow } from "react-icons/fa6";

const History = ({ history, clearAll }) => {
    return (
        <>
            <div className='border col-span-2'>
                <div className='text-xl text-center mb-3'>History</div>
                <button onClick={clearAll} className='bg-blue-600 text-white p-2 rounded ms-6 mb-2'>Clear All</button>
                <ul className='px-3'>
                    {
                        history.map(
                            (h, i) => {
                                return <li key={i} className='py-1 px-3 relative flex  items-center gap-3'><span><FaLocationArrow /> </span>{h}
                                </li>
                            }
                        )
                    }
                </ul>
            </div>
        </>
    );
}

export default History;
