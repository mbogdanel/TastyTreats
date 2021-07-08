import React from 'react'
import '../App.css'

const Footer = () => {
  return (
    <div className='text-center footer mb-2 mt-5'>
      <h6 className='text-center footer_content mt-3'>
        &copy; built by{' '}
        <a className='anchTag' href='https://www.mariusbogdanel.com/'>
          Marius Bogdanel{' '}
        </a>
      </h6>

      <h6 className='text-center footer_content'>
        picture by{' '}
        <a className='anchTag' href='https://unsplash.com/@picoftasty'>
          Mae Mu
        </a>
      </h6>
    </div>
  )
}

export default Footer
