import React from "react";

export default function PaginationTeam({totalTeams,
    itemPerPage,
    setCurrentPage,
    currentPage}){

        let pages=[];

        for (let i=1; i<=Math.ceil(totalTeams/itemPerPage); i++){
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