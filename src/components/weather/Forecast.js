import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

function Forecast (props){
    const CURRENT_DATE = props.current !== null ? new Date(props.current.dt * 1000) : 0;
    return (
        <Box style={{marginTop: "40px"}} sx={{ flexGrow: 1 }}>
            <Grid container spacing={3} justifyContent="space-between" style={{margin: "15px"}} columns={{ xs: 4, sm: 8, md: 12 }}>
                {props.current !== null ? (
                    <Grid key={props.current.dt} item xs={4} sm={8} md={12} zeroMinWidth container columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Paper style={{width: "100%"}}>
                            <Grid item xs={4} sm={8} md={12} container columns={{ xs: 6, sm: 8, md: 12 }}>
                                <Grid item xs={6} sm={8} md={12}>
                                    <Typography>Temperature now</Typography>
                                </Grid>
                                <Grid item xs={6} sm={8} md={12}>
                                    <Typography>{`${MONTH_LABELS[CURRENT_DATE.getMonth()]} ${CURRENT_DATE.getDate()}, ${CURRENT_DATE.getFullYear()}`}</Typography>
                                </Grid>
                                <Grid item xs={6} sm={8} md={12}>
                                    <Typography>{`${props.current.temp} °C`}</Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                ):(
                    <div/>
                )}
                {
                    props.dailyWeather.map(day => {
                        const DATE = new Date(day.dt * 1000);
                        return(
                            <Grid key={day.dt} item xs={2} sm={4} md={6} zeroMinWidth container columns={{ xs: 4, sm: 8, md: 12 }}>
                                <Paper style={{width: "100%"}}>
                                    <Grid item xs={4} sm={8} md={12} container columns={{ xs: 6, sm: 8, md: 12 }}>
                                        <Grid item xs={6} sm={8} md={12}>
                                            <Typography>Forecast temperature</Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={8} md={12}>
                                            <Typography>{`${MONTH_LABELS[DATE.getMonth()]} ${DATE.getDate()}, ${DATE.getFullYear()}`}</Typography>
                                        </Grid>
                                        <Grid item xs={3} sm={4} md={6}>
                                            <Typography>Min</Typography>
                                        </Grid>
                                        <Grid item xs={3} sm={4} md={6}>
                                            <Typography>Max</Typography>
                                        </Grid>
                                        <Grid item xs={3} sm={4} md={6}>
                                            <Typography>{`${day.temp.min} °C`}</Typography>
                                        </Grid>
                                        <Grid item xs={3} sm={4} md={6}>
                                            <Typography>{`${day.temp.max} °C`}</Typography>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Box>
    );
}

export default Forecast;