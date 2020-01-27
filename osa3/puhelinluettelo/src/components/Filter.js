import React from 'react'


const Filter = ({ filterInput, handleFilterInputChange }) => {
  return (
    <form>
        <div>
          Filter shown with: <input 
            value={filterInput}
            onChange={handleFilterInputChange} />
        </div>
      </form>
    )
  }

export default Filter