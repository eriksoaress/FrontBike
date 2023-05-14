import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, Snackbar, TextField, FormControl, InputLabel, FilledInput, OutlinedInput, InputAdornment, FormHelperText, Alert } from '@mui/material'
import { Navigate } from 'react-router-dom'
import { NavBar } from '../../components/NavBar'

export default function NewBike() {

    const [formValid, setFormValid] = useState(true);
    const [model, setModel] = useState('model')
    const [type, setType] = useState('type')
    const [pricePerHour, setPricePerHour] = useState(0)

    const [mensagem, setMensagem] = useState('')
    const [open, setOpen] = useState()
    const [bikeCreated, setBikeCreated] = useState(false)

    
    const modelValidation = () => {
        if (model === null || model === '') {
            return 'Model is required'
        }
        if (model.length < 3) {
            return 'Model must be at least 3 characters'
        }
        return ''
    }

    const typeValidation = () => {
        if (type === null || type === '') {
            return 'Type is required'
        }
        if (type.length < 3) {
            return 'Type must be at least 3 characters'
        }
        return ''
    }

    const pricePerHourValidation = () => {
        if (pricePerHour === null) {
            return 'Price per Hour is required'
        }
        if (!/^\d+(\.\d{1,2})?$/.test(pricePerHour)) {
            return 'Invalid price format'
        }
    }

    const handleClose = (event, reason) => {
        setOpen(false);
    };

    const handleClick = e => {

        const data = {
            'model': model,
            'type': type,
            'pricePHour': pricePerHour
        }
        if (data.type === "type" || data.model === "model" || data.pricePHour === 0){
            setFormValid(false);

        }else{
            setFormValid(true);
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
                    setBikeCreated(true)
                }
            }).catch(ex => {
                setMensagem('Erro ao cadastrar bike')
                setOpen(true)
            })
        }

    }


    return (
        <>
            <NavBar/>
            <Box
                sx={{
                    mx: 'auto',
                    marginTop: '200px',
                    width: '40%'
                }}
            >

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField fullWidth id="standard-basic" label="Model" color="primary" variant="filled" onChange={e => setModel(e.target.value)} error={!!modelValidation()} helperText={modelValidation()} />
                    </Grid>
                    <Grid item xs={12}> 
                        <TextField fullWidth id="standard-basic" label="Type" color="primary" variant="filled" onChange={e => setType(e.target.value)} error={!!typeValidation()} helperText={typeValidation()} />
                    </Grid>
                    <Grid item xs={12}>             
                        <FormControl fullWidth variant="filled">
                            <InputLabel htmlFor="filled-adornment-amount">Price per Hour</InputLabel>
                            <FilledInput
                                id="filled-adornment-amount"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                onChange={e => setPricePerHour(e.target.value)}
                                error={!!pricePerHourValidation()}
                            />
                            <FormHelperText error={!!pricePerHourValidation()}> {pricePerHourValidation()} </FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Button variant="contained" onClick={handleClick}>Enviar</Button>
                        {!formValid && (
                        <Alert severity="error">Todos os campos devem ser preenchidos adequadamente.</Alert>
                        )}
                    </Grid>
                </Grid>


                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={mensagem}
                />

                {bikeCreated && <Navigate to='/list' /> }

            </Box>
        </>
    )

}