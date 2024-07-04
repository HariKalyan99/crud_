import React, { useState } from 'react'

const ReadMore = ({body}) => {
    const [readMore, setReadMore] = useState(false);
  
  const reading = () => {
    setReadMore(!readMore);
  }
  return (
    <>
    <span onClick={() => reading()}>
        {readMore ? body : body.slice(0, 100) + "..."}
    </span> 
    </>
  )
}

export default ReadMore