import { Button, Stack, Typography, Box, TextField } from "@mui/material";
import axios from 'axios'
import React, { useState, useRef } from 'react';
import { request } from '../../API';


const UniversalConverter = () => {
    const [inputNum, setinputNum] = useState('')
    const [InputFbase, setInputFbase] = useState('')
    const [InputSBase, setInputSBase] = useState('')
    const [Res, SetRes] = useState('')
    const handleInput1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setinputNum(event.target.value);
    }
    const handleInput2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputFbase(event.target.value);
    }
    const handleInput3Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputSBase(event.target.value);
    }
    const handleInputChange = (New: string) => {
        SetRes(New)
    }
    return (
        <Stack spacing={3}>
            <Typography variant="h6" textAlign={"center"}>Universal Converter</Typography>
            <TextField variant="outlined" id="NumInput" label="Number" value={inputNum} onChange={handleInput1Change}/>
            <TextField variant="outlined" id="BaseFInput" label="From Base" value={InputFbase} onChange={handleInput2Change}/>
            <TextField variant="outlined" id="BaseSInput" label="To Base" value={InputSBase} onChange={handleInput3Change}/>
                <TextField variant="outlined" id="Result" label="Result" value={Res} InputProps={{ readOnly: true }}/>
            <Button variant="filled" size="large" onClick={async () => {
            const answer = (await request(inputNum, InputFbase, InputSBase)).answer[0];
            handleInputChange(answer);      
            }}
            >Сonvert</Button>
        </Stack>
    );
}
export default UniversalConverter;
