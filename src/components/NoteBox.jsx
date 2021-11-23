import React,{useState, useEffect} from 'react'
import { Container, Button, ButtonGroup, Box, Paper, Grid, Divider, TextField, Typography, List, ListItem, ListItemIcon, ListItemText, Avatar, Fab } from '@mui/material'
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw} from 'draft-js';
import { socket } from '../features/api/apiSlice';



export default function NoteBox({room}) {
    
    const blockType = [
        {run: 'ordered-list-item', btn: 'ol'},
        {run: 'unordered-list-item', btn: 'ul'},
        {run: 'blockquote', btn: 'block'},
        {run : 'header-one', btn: 'h1'},
        {run: 'header-two', btn: 'h2'},
        {run: 'header-three', btn: 'h3'},
        {run: 'header-four', btn: 'h4'},
        {run: 'header-five', btn: 'h5'},
        {run: 'header-six', btn: 'h6'}
        ]
    const inlineStyle = [{run: 'ITALIC',btn: 'I'}, {run: 'BOLD', btn: 'B'}, {run: 'UNDERLINE', btn: 'U'}, {run: 'CODE', btn: '<code>'}]
   
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty(),);

    const currentInlineStyle    = editorState.getCurrentInlineStyle()
    const currentBlockType      = RichUtils.getCurrentBlockType(editorState)

//Functions
    function toggleInlineStyle(event, type) {
        event.preventDefault();
        let newState = RichUtils.toggleInlineStyle(editorState, type)
        onChange(newState)
        }

    function toggleBlockType(event, type){
        event.preventDefault();
        let newState = RichUtils.toggleBlockType(editorState, type)
        onChange(newState)
    }
    

    function onChange(editorState) {
        setEditorState(editorState);
        // const raw = convertToRaw(editorState.getCurrentContent());
        // const raw = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        // console.log('This is how it started ', raw)
        // socket.emit('noteChange', 
        //     {
        //         "room": room.roomId,
        //         "note": raw
        //     })
        // const json = convertFromRaw(JSON.parse(raw))
        // console.log('convert it from json: ', json)
        // const newEditorState = EditorState.createWithContent(json)
        // setEditorState(() => newEditorState)
    }

    function handleSave(){
        // const raw = convertToRaw(editorState.getCurrentContent());
        const raw = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        console.log('This is how it started ', raw)
        socket.emit('noteChange', 
            {
                "room": room.roomId,
                "note": raw
            })
    }

    useEffect(() => {
        
        socket.on('noteChange',( payload ) => {
            console.log('This comes back: ', payload)
            const json = convertFromRaw(JSON.parse(payload))
            const newEditorThing = EditorState.createWithContent(json)
            console.log('something changed in notebox', json)
        //    console.log('AND HERE?? ',newEditorState)
             setEditorState(() => newEditorThing)
        })},[])


    
    console.log('ROOMID ARRVED??: ', room.roomId)
    return (
        <Paper
        elevation="10"
        sx={{display: 'flex',
            flexDirection: 'column'}}
        >
            <Grid item xs={12}>
                <Typography variant='h5' align='center'>Notes</Typography>
                <Box 
                    sx={{
                        minHeight: "80vh",
                        maxHeight: '80vh',
                        overflowX: 'hidden',
                        overflowY: 'scroll'
                    }}
                >

                
               <ButtonGroup 
                    variant="outlined" 
                    aria-label="outlined button group" 
                    sx={{
                        justifyContent: 'center',
                        margin: "0 auto",
                        width: "70%",
                        marginBottom: "50px",
                        display: 'flex',
                        flexWrap: "wrap" }}>
                {blockType.map((element) => {
                    return(
                        <Button
                            variant={currentBlockType === element.run ? 'contained' : 'outlined'}
                            onClick={(e) => toggleBlockType(e, element.run)}
                            size="small"
                        >{element.btn}</Button> 
                    )
                })}
                
                {inlineStyle.map((element) => {
                    return(
                        <Button
                            variant = {currentInlineStyle.size>0 && currentInlineStyle.has(element.run) ? 'contained' : 'outlined' }
                            onClick={(e) => toggleInlineStyle(e, element.run)}
                            size="small"
                        >{element.btn}</Button> 
                    )
                })}
                </ButtonGroup>
                <Box >
                <Button onClick={handleSave}>SAVE</Button>
                    <Editor
                        editorState={editorState}
                        onChange={onChange} 
                        
                        />
                        
                </Box>



            
            </Box>
            </Grid>

        </Paper>
    )
}
