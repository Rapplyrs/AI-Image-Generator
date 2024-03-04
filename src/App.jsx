import { useState } from 'react'
import './App.css'



function App() {

  const API_KEY = "Insert-API-Key"

  const [inputValue, setinputValue] = useState(''); 
  const [images, setImages] = useState([]); 


  const getImages = async () => {
    const options = {
      method:"POST", 
      headers: {
        "Authorization": `Bearer ${API_KEY}`, 
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        "prompt":inputValue, 
        "n": 4, 
        "size": "1024x1024"
      })
    }


    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', options)
      const data = await response.json()
      console.log(data)
      setImages(data.data)
    }
    catch(error){
      console.error(error)
    }
  }

  const handleClick = () => {
    getImages();
  }
  
  return (
    <>
    <div className = "content">
      <h1>AI Image Generator</h1>
      <div className = "image-section">
        {images.map((imageObject, index) => (
          <div className ="image-container" key ={index}>
            <img src = {imageObject.url} alt ={`Generated Image ${index}`}/>

            </div>
        ))}

      </div>
      <div className = "bottom-section">
        <div className = "input-container">

          <input className = "input" type ="text" placeholder = "Enter something here" value ={inputValue} onChange = {(e) => setinputValue(e.target.value)}></input>
          <div className = "symbol">
            <a id = "submit-icon" onClick = {handleClick}> &#x1F50D;</a>
          </div>
        </div>
      </div>
   </div>
    </>
  )
}

export default App
