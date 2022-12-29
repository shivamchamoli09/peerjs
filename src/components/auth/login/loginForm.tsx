import * as Yup from "yup";
import { useState } from "react";
// import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from "formik";
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Switch,
  Grid,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// component
import Iconify from "../../common/Iconify";
import { useRouter } from "next/router";
import { observer, useLocalObservable } from "mobx-react-lite";
import { apiRequest } from "../../../core/services/http.service";
import { setUserSession } from "../../../core/services/user.service";
import { useDispatch } from "react-redux";
import { setAlert } from "../../../core/stores/actions/actions";
// import { createLocalObservable } from '../../../core/store/localobservable.store';
// import { callServerApi } from '../../../core/http/api-calls';
// import { startUserSession } from '../../../core/services/user.service';
// import { showAlert } from '../../../core/context/alert.store';

// ----------------------------------------------------------------------

export default observer((props: any) => {
  const navigate = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    organization: Yup.string(),
    // .required('Organization Name is required')
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      organization: "",
      auth_type_organization: false,
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      onSubmitLogin(formik.values);
    },
  });

  async function onSubmitLogin(values: {
    email: string;
    password: string;
    remember: boolean;
  }) {
    try {
      const payload = formik.values.auth_type_organization
        ? {
            email: formik.values.email,
            password: formik.values.password,
            auth_type: "ORGANIZATION",
            organization: formik.values.organization,
          }
        : {
            email: formik.values.email,
            password: formik.values.password,
            auth_type: "USER",
          };
      const res = await apiRequest("/auth/login", "POST", payload);
      setUserSession(res.data);
      return navigate?.push("/rooms");
    } catch (error: any) {
      formik.setSubmitting(false);
      // showAlert('error', error.response.data.message);
      console.log(error?.response?.data?.message);
    }
  }

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  function isLoginDisabled() {
    // return (!store?.form?.email?.length && !store?.form?.password?.length)
  }

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="Password"
            {...getFieldProps("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                      sx={{}}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          {formik.values.auth_type_organization && (
            <TextField
              fullWidth
              autoComplete="organization"
              type="text"
              label="Organization Name"
              {...getFieldProps("organization")}
              error={Boolean(touched.organization && errors.organization)}
              helperText={touched.organization && errors.organization}
            />
          )}
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{ my: 2 }}
        >
          {/* <FormControlLabel
                        control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
                        label="Remember me"
                    /> */}

          <span>
            {"Don't have an account?&nbsp;"}
            <Link
              // component={RouterLink}
              href="/register"
              sx={{ color: "white" }}
            >
              Register
            </Link>
          </span>
        </Stack>

        <Grid container alignItems="center" spacing={2} sx={{ my: 2 }}>
          <Grid item xs={12}>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              // disabled={isLoginDisabled}
              onClick={() => {
                formik.setFieldValue("auth_type_organization", false);
                handleSubmit();
              }}
            >
              Login
            </LoadingButton>
          </Grid>
          {/* <Grid item md={6} xs={12}>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              onClick={() => {
                formik.setFieldValue('auth_type_organization', true);
                handleSubmit()
              }}
            // disabled={isLoginDisabled}
            >
              Login as Organization
            </LoadingButton>
          </Grid> */}
        </Grid>
      </Form>
    </FormikProvider>
  );
});
