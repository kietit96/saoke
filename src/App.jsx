import { useCallback, useEffect, useState } from 'react'
import ListSaoKe from './components/List'
import { Icon, TextField } from '@mui/material'
import chicken from "./assets/chicken.png"
import './App.scss'
import "@fontsource/roboto"
import SearchIcon from '@mui/icons-material/Search';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import FormDialog from './components/ModalEdit'
function App() {
  const [title, setTitle] = useState("")
  const [deboundTitle, setDeboundTitle] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const pressKeyBoard = useCallback((e) => {
    setTitle(e.target.value)
  }, [])
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDeboundTitle(title)
    }, 1000)
    return () => { clearTimeout(timeOut) }
  }, [title])
  const btnEditNote = (id, note_content) => {
    console.log(id, note_content)
    setOpenDialog(true)
  }

  return (
    <div className='container'>
      <h2 className='title'><Icon className="icon-star"><StarRoundedIcon /></Icon> Sao kê <Icon className="icon-chicken"><img src={chicken} /></Icon></h2>
      <TextField className="search-title" autoComplete='off' fullWidth margin='dense' onKeyUp={pressKeyBoard} id="search-input" label={<><SearchIcon /> Tìm kiếm</>} />
      <ListSaoKe btnEditNote={btnEditNote} value2={deboundTitle} />
      <FormDialog state={openDialog} />
    </div>
  )
}

export default App
