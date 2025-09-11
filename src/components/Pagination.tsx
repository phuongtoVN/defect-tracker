import React from 'react';

export default function Pagination({ page, pageCount, onChange }:{
  page: number; pageCount: number; onChange: (p: number)=>void;
}) {
  return (
    <div className="pagination">
      <button disabled={page<=1} onClick={()=>onChange(page-1)}>Prev</button>
      <span>Page {page} / {Math.max(1,pageCount)}</span>
      <button disabled={page>=pageCount} onClick={()=>onChange(page+1)}>Next</button>
    </div>
  );
}
