import React from 'react'
import { Container, Box, Paper, Grid, Divider, TextField, Typography, List, ListItem, ListItemIcon, ListItemText, Avatar, Fab } from '@mui/material'

export default function NoteBox() {
    return (
        <Paper
        elevation="10"
        sx={{display: 'flex',
            flexDirection: 'column'}}
        >
            <Grid item xs={12}>
                <Typography variant='h5' align='center'>Notes</Typography>
            </Grid>
        </Paper>
    )
}
