import { Box, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import React, { ChangeEvent, useCallback, useState } from "react";

interface Temperature {
    kelvin: number;
}

const celsiusToKelvin = (celsius: number) => {
    return celsius + 273.15;
};

const kelvinToCelsius = (kelvin: number) => {
    return kelvin - 273.15;
};

const fahrenheitToKelvin = (fahrenheit: number) => {
    return (fahrenheit - 32) * 5 / 9 + 273.15;
};

const kelvinToFahrenheit = (kelvin: number) => {
    return 9 / 5 * (kelvin - 273.15) + 32;
};

const C = () => {
    console.log("ghi");
    return <></>;
}

const B = () => {
    console.log("def");
    return <C />;
}

const A = ({num}: {num: number}) => {
    console.log("abc");
    return <B />;
};

const TemperatureComponent = () => {
    const [kelvin, setKelvin] = useState<number>(0);

    const handleKelvinChange = useCallback((event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const kelvin = parseInt(event.target.value);

        setKelvin(kelvin);
    }, []);

    const handleCelsiusChange = useCallback((event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const celsius = parseInt(event.target.value);

        setKelvin(celsiusToKelvin(celsius));
    }, []);

    const handleFahrenheitChange = useCallback((event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const fahrenheit = parseInt(event.target.value);

        setKelvin(fahrenheitToKelvin(fahrenheit));
    }, []);

    const text = "dase<b>w</b>qerwqrqwrqwerewrewrewdasewqerwqrqwrqwerewrewrewdasewqerwqrqwrqwerewrewrewdasewqerwqrqwrqwerewrewrewdasewqerwqrqwrqwerewrewrewdasewqerwqrqwrqwerewrewrewdasewqerwqrqwrqwerewrewrewdasewqerwqrqwrqwerewrewrewdasewqerwqrqwrqwerewrewrewdasewqerwqrqwrqwerewrewrewdasewqerwqrqwrqwerewrewrewdasewqerwqrqwrqwerewrewrewdasewqerwqrqwrqwerewrewrewdasewqerwqrqwrqwerewrewrewdasewqerwqrqwrqwerewrewrew";

    const styles = makeStyles({
        input: {
            textOverflow: 'ellipsis'
        }
    })();

    return (
        <>
            <A num={4} />
            <Box width='200px' height='300px' bgcolor='red'>
                <TextField value={text} fullWidth InputProps={{classes: {
                    input: styles.input
                }}} />
            </Box>
            <Grid container direction='column' wrap='nowrap'>
                <Grid item xs={12}>
                    <Typography>
                        K
                    </Typography>
                    <TextField
                        id='temperature-kelvin'
                        value={kelvin}
                        onChange={handleKelvinChange}
                        type='number'
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                        °C
                    </Typography>
                    <TextField
                        id='temperature-celsius'
                        value={kelvinToCelsius(kelvin)}
                        onChange={handleCelsiusChange}
                        type='number'
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                        °F
                    </Typography>
                    <TextField
                        id='temperature-fahrenheit'
                        value={kelvinToFahrenheit(kelvin)}
                        onChange={handleFahrenheitChange}
                        type='number'
                    />
                </Grid>
            </Grid>
        </>
    );
}

export default TemperatureComponent;