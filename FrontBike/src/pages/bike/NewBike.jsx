import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, Snackbar, TextField, FormControl, InputLabel, FilledInput, OutlinedInput, InputAdornment } from '@mui/material'

export default function NewBike() {

    const [model, setModel] = useState()
    const [type, setType] = useState()
    const [pricePerHour, setPricePerHour] = useState()

    const [mensagem, setMensagem] = useState('')
    const [open, setOpen] = useState()

    const pattern = /^[0-9]*$/; // regular expression for numerical values only
    
    const handleInputChange = (e) => {
        const inputValue = e.target.value;

        // Only update state if input value matches pattern
        if (pattern.test(inputValue)) {
            setPricePerHour(inputValue)
        }
    };

    const handleClose = (event, reason) => {
        setOpen(false);
    };

    const handleClick = e => {

        const data = {
            'model': model,
            'type': type,
            'price_p_hour': pricePerHour
        }

        fetch('http://localhost:8080/bike', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.status === 200) {
                //listTeams()
                setMensagem('Bike cadastrada com sucesso')
                setOpen(true)
            }
        }).catch(ex => {
            setMensagem('Erro ao cadastrar bike')
            setOpen(true)
        })

    }


    return (
            <Box
                sx={{
                    width: 600,
                    mx: 'auto',
                    marginTop: '200px',
                    width: '40%'
                }}
            >

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField fullWidth id="standard-basic" label="Model" color="primary" variant="filled" onChange={e => setModel(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}> 
                        <TextField fullWidth id="standard-basic" label="Type" color="primary" variant="filled" onChange={e => setType(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>             
                        <FormControl fullWidth variant="filled">
                            <InputLabel htmlFor="filled-adornment-amount">Price per Hour</InputLabel>
                            <FilledInput
                                id="filled-adornment-amount"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                onChange={handleInputChange}
                                helperText="Incorrect entry."
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Button variant="contained" onClick={handleClick}>Enviar</Button>
                    </Grid>
                </Grid>


                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={mensagem}
                />

            </Box>
    )

}