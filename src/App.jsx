import { useCallback, useEffect, useState } from 'react'
import ListSaoKe from './components/list'
import { styled, TextField } from '@mui/material'
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
  const CssTextField = {
    '& .MuiInputBase-input': {
      color: "#FFF"
    },
    '& .MuiInputLabel-root': {
      color: "#FFF"
    },
    '& label.Mui-focused': {
      color: '#FFF',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#fff',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#FFF',
        color: "#FFF"
      },
      '&:hover fieldset': {
        borderColor: '#FFF',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#FFF',
      },
    },
  }

  return (
    <div className='container'>
      <h2 className='title'>Sao kê</h2>
      <TextField sx={CssTextField} autoComplete='off' fullWidth margin='dense' onKeyUp={pressKeyBoard} id="search-input" label="Tìm kiếm " />
      <ListSaoKe value2={deboundTitle} />
    </div>
  )
}

export default App
