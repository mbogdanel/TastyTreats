import React, { useEffect, useState } from 'react'
import Axios from 'axios'

const Inquiries = () => {
  const [inquiriesList, setInquiriesList] = useState([])

  useEffect(() => {
    Axios.get('https://tastytreatschallenge.herokuapp.com/read').then(
      (response) => {
        setInquiriesList(response.data)
      }
    )
  }, [])
  const inquiriesListReversed = inquiriesList.reverse()

  return (
    <div className='inquiriesContainer m-2'>
      <h1 className='mt-5'>Inquiries</h1>
      {inquiriesListReversed.map((inquiry, index) => {
        return (
          <div className='form2 inquiry m-5 p-2' key={index}>
            <div>
              <h6>
                <strong>Time: </strong>
                {inquiry.createdAt}
              </h6>
              <h6>
                <strong>Name: </strong>
                {inquiry.name}
              </h6>
              <h6>
                <strong>Email Address: </strong>
                {inquiry.emailAddress}
              </h6>
              <h6>
                <strong>Subscribed: </strong>
                {inquiry.subscribed ? 'Yes' : 'No'}
              </h6>
              <h6>
                <strong>Message: </strong>
                {inquiry.message}
              </h6>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Inquiries
