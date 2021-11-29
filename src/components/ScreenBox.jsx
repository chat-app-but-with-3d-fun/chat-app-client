import React,{useState, useEffect} from 'react'
import { Container, Button, ButtonGroup, Box, Paper, Grid, Divider, TextField, Typography, List, ListItem, ListItemIcon, ListItemText, Avatar, Fab } from '@mui/material'


export default function ScreenBox(props) {
    const {screenShare, setScreenShare} = props
    return (
        <Paper
        elevation="10"
        sx={{display: 'flex',
            flexDirection: 'column'}}
        >
            <Grid item xs={12}>
                <Typography variant='h5' align='center'>Screen Share</Typography>
                
            </Grid>

        </Paper>
    )
}