import React, { useEffect, useState } from 'react'
import '../styles/Contact.css'

function Contact() {

  const useStorageState = (key, initialState) =>{
    const [value, setValue] = useState(localStorage.getItem(key) || initialState);
    useEffect(()=>{
      localStorage.setItem(key, value);
    }, [key, value]);
    return([value, setValue]);
  }
  
  const [name, setName] = useStorageState('name', '');
  const handleName = (event) => {
    setName(event.target.value);
  }

  const [email, setEmail] = useStorageState('email', '');
  const handleEmail = (event) =>{
    setEmail(event.target.value);
  }

  const [message, setMessage] = useStorageState('message', '');
  const handleMessage = (event) =>{
    setMessage(event.target.value);
  }

  const encode = (data) =>{
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }

  // Submit form to Netlify
  const handleSubmit = (event) => {
      event.preventDefault();
      fetch("/", {
        method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encode({ "form-name": "contact", name, email, message})
      })
      .then(() => alert("Thanks for contacting us! We'll get back to you within 48 hours."))
      .catch(error => alert(error));

      setName('');
      setEmail('');
      setMessage('');
  };

  return (
    <div>
        <header className="section-header" id = 'Contact-Us'>Contact Us</header>

        <div className = 'contact-us' >
        <h1 className = 'contact-header'>BECOME A DRAGON</h1>
        <p className='contact-us-description'>Have any further questions? Interested in joining us? Want to send feedback about our website? Let us know here!</p>
        <form method='POST' name = 'contact' data-netlify="true" onSubmit = {handleSubmit}>
          <input type = "hidden" name = "form-name" value = "contact" />
          <label htmlFor='name'>Name</label>
          <input type= 'text' id = 'name' name = "name" placeHolder = "Chad" value ={name} onChange={handleName} required/>
          <label htmlFor='email'>Your Email</label>
          <input type= 'email' id = 'email' name = "email" placeHolder = "example@gmail.com" value ={email} onChange={handleEmail} required/>
          <label htmlFor='message'>Your message</label>
          <textarea id='message' rows="10" columns="30" name="message" placeholder="Leave a comment" value={message} onChange={handleMessage} required></textarea>
          <button type="submit">Submit</button> 
        </form>
        </div>
    </div>
  )
}

export default Contact

