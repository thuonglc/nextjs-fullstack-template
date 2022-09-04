import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/system';
import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export interface LocaleProps {
  locale: string;
  title: string;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const locales = ['en', 'vi'];

export function LanguageSwitcher({ locale, title }: LocaleProps) {
  const theme = useTheme();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const changeTo = router.locale === 'en' ? 'vi' : 'en';

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Typography
        sx={{
          '&:hover': {
            color: theme.palette.primary.main,
            cursor: 'pointer',
          },
        }}
        onClick={handleClickOpen}
      >
        {locale}
      </Typography>
      <BootstrapDialog
        onClose={handleClose}
        open={open}
        aria-labelledby="customized-dialog-title"
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {title}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {locales.map((item) => (
            <Link key={item} href="/" locale={item}>
              <Button variant={router.locale === item ? 'contained' : 'text'}>
                {item}
              </Button>
            </Link>
          ))}
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
