import { PropTypes } from 'prop-types';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

FieldControl.propTypes = {
    name: PropTypes.string.isRequired,
    form: PropTypes.shape({
        control: PropTypes.object.isRequired
    }).isRequired,
    label: PropTypes.string,
    type: PropTypes.string
}

function FieldControl(props) {
    const { name,form ,label, type } = props
    return (
        <Controller
            name={name}
            control={form.control}
            render={({ field }) => <TextField label={label} type={type} {...field}></TextField>}
        ></Controller>
    );
}

export default FieldControl;