import React, { useEffect } from 'react'

export const NoPage = () => {
  useEffect(() => {
    document.title = "No Page"
  })
  return (
    <div className='text-3xl font-bold '>
        <h2>Error 404: Page Not Found</h2>
    </div>
  )
}

