import { useCallback, useEffect, useState } from 'react'
import ListSaoKe from './components/list'
import { TextField } from '@mui/material'
import './App.css'
import "@fontsource/roboto"
function App() {
  const [title, setTitle] = useState("")
  const [deboundTitle, setDeboundTitle] = useState("")
  const pressKeyBoard = useCallback((e) => {
    setTitle(e.target.value)
  }, [])
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDeboundTitle(title)
    }, 1000)
    return () => { clearTimeout(timeOut) }
  }, [title])
  const styleTextField = {
    "& .MuiInputBase-input": {
      color: "#FFF" // input color
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#FFF"  // border color
      },
      "&:hover fieldset": {
        borderColor: "#FFF" // border color when hover
      },
      '& .Mui-focused fieldset': {
        borderColor: '#FFF', // Border color when focused
      },
    },
    '& .MuiInputLabel-root': {
      color: '#FFF', // Label color
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#FFF', // Label color when focused
    },
  }
  return (
    <div className='container'>
      <h2 className='title'>Sao kê</h2>
      <TextField sx={styleTextField} fullWidth margin='dense' onKeyUp={pressKeyBoard} id="search-input" label="Tìm kiếm " />
      <ListSaoKe value2={deboundTitle} />
    </div>
  )
}

export default App
