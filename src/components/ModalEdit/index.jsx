import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { PropTypes } from 'prop-types'
import { useForm } from 'react-hook-form';
import FieldControl from '../form-control/FieldControl';
import list from '../../api/ListApi';
import { useEffect } from 'react';
FormDialog.propTypes = {
    open: PropTypes.bool,
    item_id: PropTypes.string,
    note: PropTypes.string,
    handleClose: PropTypes.func,
    handleChangeValue: PropTypes.func
}
export default function FormDialog(props) {
    const { open, item_id, note, handleClose } = props
    const form = useForm({
        defaultValues: {
            note: ""
        },
    })
    useEffect(() => {
        form.setValue("note", note)
    }, [note, form])
    const editNote = (data) => {
        const { handleChangeValue } = props
        if (handleChangeValue) {
            handleChangeValue(item_id, data.note)
        }
        list.setNote(item_id, data.note)
        handleClose()
    }
    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Chỉnh sửa ghi chú</DialogTitle>
                <form onSubmit={form.handleSubmit(editNote)}>
                    <DialogContent>
                        <FieldControl type="text" name="note" label="Sửa ghi chú" form={form}></FieldControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit" variant='contained'>Chỉnh sửa</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}