/* import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { usersAPI } from '../../../api/api';
import ReactDOM from 'react-dom';

const TestUsersPaginator = ({
  totalUsersCount,
  pageSize,
  currentPage,
  onPageChanged,
  pageNumber,
  setUsers,
  ...props
}) => {
  let pagesCount = Math.ceil(totalUsersCount / pageSize);

  let items = [];
  for (let i = 1; i <= pagesCount; i++) {
    items.push(i);
  }

  const [pageCount, setPageCount] = useState(0);

  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    usersAPI.getUsers(pageNumber, pageSize).then((data) => {
      //  props.toggleIsFetching(false);
      setUsers(data.items);
      const endOffset = itemOffset + pageSize;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setPageCount(Math.ceil(items.length / pageSize));
    });
  }, [itemOffset, pageSize, items, pageNumber, setUsers]);

  const handlePageClick = (event) => {
    props.setCurrentPage(event.selected);
    //  props.toggleIsFetching(true);
    const newOffset = (event.selected * pageSize) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <ReactPaginate
        breakLabel='...'
        nextLabel='next >'
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel='< previous'
        renderOnZeroPageCount={1}
      />
    </>
  );
};

export default TestUsersPaginator;
 */
