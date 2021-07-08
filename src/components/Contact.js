import React, { useState } from 'react'
import Axios from 'axios'
import Recaptcha from 'react-recaptcha'

const Contact = () => {
  const [name, setName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [message, setMessage] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [nameError, setNameError] = useState('')
  const [emailAddressError, setEmailAddressError] = useState('')
  const [messageError, setMessageError] = useState('')
  const [isHuman, setIsHuman] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [isHumanMessageError, setIsHumanMessageError] = useState('')

  //  recaptcha logic
  let recaptchaInstance
  const resetRecaptcha = () => {
    recaptchaInstance.reset()
  }
  const recaptchaLoaded = () => {
    console.log('Recaptcha has loaded')
  }

  const verifyCallback = (response) => {
    if (response) {
      setIsHuman(true)
    }
  }

  //   form validation
  const validate = () => {
    let emailErr = ''
    let nameErr = ''
    let messageErr = ''
    if (!emailAddress.includes('@')) {
      emailErr = 'Please enter a valid email address'
    }
    if (!message) {
      messageErr = 'Please write a message'
    }
    if (!name) {
      nameErr = 'Name can not be empty'
    }
    if (emailErr || nameErr || messageErr) {
      setEmailAddressError(emailErr)
      setMessageError(messageErr)
      setNameError(nameErr)
      return false
    }
    return true
  }

  //   submitting the form
  const submitInquiry = (e) => {
    e.preventDefault()
    const isValid = validate()

    if (isValid && isHuman) {
      setSuccessMessage('Your message was sent')
      Axios.post('https://tastytreatschallenge.herokuapp.com/insert', {
        name: name,
        emailAddress: emailAddress,
        message: message,
        subscribed: subscribed,
      })
      //   clearing the form after validation, returning to initial state
      setName('')
      setEmailAddress('')
      setMessage('')
      setSubscribed(false)
      setNameError('')
      setEmailAddressError('')
      setMessageError('')
      setIsHuman(false)
      setIsHumanMessageError('')
      // reseting reCaptcha and succes message after 5s
      resetRecaptcha()
      setTimeout(() => {
        setSuccessMessage('')
      }, 5000)
    } else if (!isHuman) {
      setIsHumanMessageError('please verify that you are human')
    }
  }
  return (
    <div>
      <h1 className='mt-5'>Send an Inquiry by submitting the form below </h1>
      <form className='form2 mt-5'>
        <input
          value={name}
          type='text'
          placeholder='Name'
          name='name'
          onChange={(e) => setName(e.target.value)}
        />
        <div className='messageError'>{nameError}</div>
        <br />
        <input
          value={emailAddress}
          type='text'
          placeholder='Email Address'
          name='emailAddress'
          onChange={(e) => setEmailAddress(e.target.value)}
        />
        <div className='messageError'>{emailAddressError}</div>
        <br />
        <textarea
          value={message}
          type='text'
          placeholder='Your message'
          name='message'
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className='messageError'>{messageError}</div>
        <br />
        <div className='checkboxBlock mb-3'>
          <input
            className='checkboxBlockElements'
            type='checkbox'
            value={subscribed}
            name='Subscribe'
            onChange={(e) => setSubscribed(e.target.checked)}
          />
          <label className='checkboxBlockElements'>Subscribe </label>
        </div>
        <Recaptcha
          ref={(e) => (recaptchaInstance = e)}
          sitekey='6LdqNoAbAAAAAIXxR9wnRDC8n_VoFSiqUK6-Hu2k'
          render='explicit'
          verifyCallback={verifyCallback}
          onloadCallback={recaptchaLoaded}
        />

        {successMessage ? (
          <div className='messageSuccess'>{successMessage}</div>
        ) : !isHuman ? (
          <div className='messageError'>{isHumanMessageError}</div>
        ) : null}

        <button className='my-5' onClick={submitInquiry}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default Contact
