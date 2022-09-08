import React, { useState } from 'react';
import { Button } from 'primereact/button';
import style from './paginator.module.css';
import 'primeicons/primeicons.css';

const UsersPaginator = ({
  totalUsersCount,
  pageSize,
  currentPage,
  onPageChanged,
  portionSize = 10,
}) => {
  let pagesCount = Math.ceil(totalUsersCount / pageSize);

  let pages = []; // --- how many pages
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  let portionCount = Math.ceil(pagesCount / portionSize);

  let [portionNumber, setPortionNumber] = useState(1);

  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;

  let rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div className={style.paginator}>
      {portionNumber > 1 && (
        <>
          <Button
            label='First'
            onClick={() => {
              setPortionNumber(1);
            }}
          />
          <Button
            label='Prev'
            onClick={() => {
              setPortionNumber(portionNumber - 1);
            }}
          />
        </>
      )}
      <span className={style.pages}>
        {pages

          .filter(
            (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
          )
          .map((p, key) => {
            return (
              <span
                key={key}
                className={
                  currentPage === p
                    ? style.selectedPage
                    : undefined + ' ' + style.onFocus
                }
                onClick={(e) => {
                  onPageChanged(p);
                }}
              >
                {` ${p} `}
              </span>
            );
          })}
      </span>
      {portionCount > portionNumber && (
        <>
          <Button
            label='Next'
            onClick={() => {
              setPortionNumber(portionNumber + 1);
            }}
          />

          <Button
            label='Last'
            onClick={() => {
              setPortionNumber(portionCount);
            }}
          />
        </>
      )}
    </div>
  );
};
export default UsersPaginator;
