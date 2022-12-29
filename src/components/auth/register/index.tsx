import { styled } from '@mui/material/styles';
import { Card, Stack, Container, Typography } from '@mui/material';
// layouts
// import AuthLayout from '../layout/AuthLayout';
// components
import Page from '../../common/Page';
import RegisterForm from './registerForm';
// import AuthSocial from '../authentication/AuthSocial';
import Link from 'next/link';
import { observer } from 'mobx-react-lite';
// import { createLocalObservable } from '../../core/store/localobservable.store';
import { toJS } from 'mobx';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex'
    }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
    width: '100%',
    maxWidth: 464,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default observer(() => {
    return (
        <RootStyle>
            <SectionStyle sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5, textAlign: 'center' }}>
                    Join the club!
                </Typography>
                <div style={{ padding: '20px' }}>
                    <img src="/images/signup.svg" alt="signup" width="100%" />
                </div>
            </SectionStyle>

            <Container maxWidth="sm">
                <ContentStyle>
                    <Stack sx={{ mb: 5 }}>
                        <Typography variant="h4" gutterBottom>
                            Sign Up
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
                    </Stack>
                    {/* <AuthSocial /> */}

                    <RegisterForm />

                    <Typography
                        variant="body2"
                        align="center"
                        sx={{
                            mt: 3,
                            display: { sm: 'none' }
                        }}
                    >
                        Don’t have an account?&nbsp;
                        <Link
                            href="register">
                            Get started
                        </Link>
                    </Typography>
                </ContentStyle>
            </Container>
        </RootStyle>
    );
})




