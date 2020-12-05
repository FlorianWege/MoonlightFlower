import { TextField, Typography } from '@material-ui/core';
import React, { useMemo, useState } from 'react';
import { roman } from './roman';

const RomanComponent = () => {
    const [value, setValue] = useState<number>(4);
    const romanValue = useMemo(() => roman(value), [value]);
    return <>
        <TextField
            type='number'
            InputProps={{ inputProps: { min: 0, max: 9999 } }}
            value={value}
            onChange={(e) => setValue(parseInt(e.target.value))}
        />
        <Typography>
            {romanValue}
        </Typography>
    </>;
}

export default RomanComponent;