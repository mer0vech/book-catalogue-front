import React from 'react';

import TextField from '@mui/material/TextField';

const FormInput = ({ label, ...props }) => {
  return (
    <TextField 
      id={props.name}
      label={label}
      placeholder={label}
      variant="outlined"
      InputLabelProps={{
          shrink: true,
      }}
      fullWidth
      required
      {...props} 
    />
  );
};

export default FormInput;