import React from "react";

export default function Pagination({totalOrders,
    itemPerPage,
    setCurrentPage,
    currentPage}){

        let pages=[];

        for (let i=1; i<=Math.ceil(totalOrders/itemPerPage); i++){
            pages.push(i);
        }

        return(
            <div className="pagination" >
            {
              pages.map((page,key)=>{
              return ( <button className={page == currentPage ? "activePagination":''} key={key} onClick={()=>{setCurrentPage(page)}}>{page}</button>)
              })
               
            }
            </div>
            
        )

}