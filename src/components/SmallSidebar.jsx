import React from 'react'
import Box from '@mui/material/Box';
import logo from '../assets/KOKO-black.png'
import pageSlice from '../features/page/pageSlice'
import { useDispatch } from 'react-redux';
import {toggleDrawer} from '../features/page/pageSlice';
import Fab from '@mui/material/Fab';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

export default function SmallSidebar() {
    
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(
            toggleDrawer()
        )
    }
    
    return (
        // <Box onClick={handleClick} sx={{
        //     width: '150px',
        //     height: '70px', 
        //     backgroundColor: "black",
        //     position: 'absolute',
        //     top: '35px',
        //     left: '35px',

        //     }}>
        //     <img src={logo} alt="LOGO" style={{width: '100%'}} />
        // </Box>
        <Fab onClick={handleClick}
                 variant="extended"
                 color="secondary"
                 sx={{
                    position: 'absolute',
                    top: '35px',
                    left: '35px'}}>
                <MenuOpenIcon />
            </Fab>
    )
}
