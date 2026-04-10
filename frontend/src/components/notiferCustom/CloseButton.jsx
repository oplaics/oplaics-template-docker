import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSnackbar } from 'notistack';

export default function CloseButton({ id }) {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton onClick={() => closeSnackbar(id)} sx={{ color: 'white' }}>
      <CloseIcon />
    </IconButton>
  )
}