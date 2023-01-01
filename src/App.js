import React,{useEffect,useRef} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
function App()
{
let videoRef=useRef(null) //import from react library
let photoRef=useRef(null)

//for accessing user camera
const getUserCamera=()=>{
navigator.mediaDevices.getUserMedia({   //javascript command to initiate media
  video:true //get video of the user
})
.then((stream)=>{
  //attach the stream to video tag
  let video=videoRef.current
  video.srcObject=stream
  video.play()

})
.catch((error)=>{
  console.error(error)
})
}
const takePicture =() =>{
  //width and height
  let width=500
  let height=width /(16/ 9)
  let photo=photoRef.current
  let video=videoRef.current
  //set photo width and height
  photo.width=width
  photo.height=height
  let ctx=photo.getContext('2d')
  ctx.drawImage(video,0,0,photo.width,photo.height)
}
//clear screen
const clearImage=()=>{
  let photo=photoRef.current
  let ctx=photo.getContext('2d')
  ctx.clearRect(0,0,photo.width,photo.height) //using hooks
}
useEffect(()=>{
  getUserCamera()
},[videoRef])
return(
  <div className='container'>
    <h1 className='text-center'>Vitrendz Selfie Point in React.js</h1>
    <video className='container' ref={videoRef}></video>
    <button onClick={takePicture} className='btn btn-primary container'>Click to Snap</button>
    <canvas className='container' ref={photoRef}></canvas>
    <button onClick={clearImage} className='btn btn-danger container'>Clear Screen</button>
  </div>
)
}
export default App