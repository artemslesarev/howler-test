'use client'

import React, { useEffect, useState } from 'react'

const Counter = ({icon, name, value, summand, onCountChange}) => {

    const [count, setCount] = useState(value || 0);

    useEffect(() => {
        setCount(value || 0)
    }, [value])

    const handleCountChange = (newCount) => {
        setCount(newCount);
        onCountChange(newCount, name);
      };

    

    return (
        <div className='flex flex-row text-[1.2rem] gap-2 p-2'>

         
                {icon}

                <div className='mt-2'>
                    <h2 className=''>{count}</h2>
                    {/* <div className='flex flex-row gap-4 text-[1rem]'>
                        <button type="button" onClick={() => {handleCountChange(count+summand)}}>+</button>
                        <button type="button" onClick={() => {handleCountChange(count-summand)}}>-</button>
                    </div> */}
                </div>

        </div>
    );
}

export default Counter;