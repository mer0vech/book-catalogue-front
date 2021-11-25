import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function FormButton({label, ...props}) {
    return (
        <Grid item xs={12}>
            <Button
                fullWidth
                {...props}
            >
                {label}
            </Button>
        </Grid>
    );
}

export default FormButton;