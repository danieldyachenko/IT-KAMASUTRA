import React, { useState } from 'react';
import s from './Paginator.module.css';

export const Paginator = ({totalItemsCount, pageSize, onPageChanged, currentPage, portionSize = 10}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let portionCount = Math.ceil(pagesCount/portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;
    return (
        <div className={s.paginator}>
            {
                portionNumber > 1 &&
                <button onClick={()=>{setPortionNumber(portionNumber-1)}}>PREV</button>
            }
            {
                pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map(p => {
                    return <div onClick={() => {
                        onPageChanged(p)
                    }} className={currentPage === p ? s.selectedPage : s.page} key={p}>{p}</div>
                })
            }
            {
                portionCount > portionNumber &&
                    <button onClick={()=>{setPortionNumber(portionNumber + 1)}}>NEXT</button>
            }
        </div>
    );
};