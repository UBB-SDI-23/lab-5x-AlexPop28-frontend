import {
  Alert,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { Dispatch, FC, SetStateAction, useState } from "react";
import * as Yup from "yup";
import { CardContainer } from "../../components/CardContainer";
import { GridLayout } from "../../components/GridLayout";
import useAxios from "../../lib/hooks/useAxios";
import { UserProfile } from "../../models/UserProfile";

interface RegisterFormProps {
  setActivationCode: Dispatch<SetStateAction<string>>;
  setMessage: Dispatch<SetStateAction<string>>;
  setSuccessful: Dispatch<SetStateAction<boolean | undefined>>;
}

const validationSchema = Yup.object({
  username: Yup.string()
    .min(4, "Username should be at least 4 characters long")
    .required("Username is required"),
  password: Yup.string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  bio: Yup.string().required("Bio is required"),
  location: Yup.string().required("Location is required"),
  gender: Yup.string().required("Gender is required"),
  birthday: Yup.date().max(new Date()).required("Birthday is required"),
  marital_status: Yup.string().required("Marital status is required"),
});

const RegisterForm: FC<RegisterFormProps> = ({
  setActivationCode,
  setMessage,
  setSuccessful,
}) => {
  const axios = useAxios();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      bio: "",
      location: "",
      birthday: "",
      gender: "",
      marital_status: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const profile: UserProfile = {
        user: { username: values.username, password: values.password },
        bio: values.bio,
        location: values.location,
        gender: values.gender,
        birthday: values.birthday,
        marital_status: values.marital_status,
      };
      try {
        const response = await axios.post("/register/", profile);
        setMessage("Registration successful");
        setActivationCode(response.data.activation_code);
        setSuccessful(true);
      } catch (error: any) {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <GridLayout>
        <TextField
          name="username"
          label="Username"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
          fullWidth
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          fullWidth
        />
        <TextField
          name="bio"
          label="Bio"
          value={formik.values.bio}
          onChange={formik.handleChange}
          error={formik.touched.bio && Boolean(formik.errors.bio)}
          helperText={formik.touched.bio && formik.errors.bio}
          fullWidth
        />
        <TextField
          name="location"
          label="Location"
          value={formik.values.location}
          onChange={formik.handleChange}
          error={formik.touched.location && Boolean(formik.errors.location)}
          helperText={formik.touched.location && formik.errors.location}
          fullWidth
        />
        <TextField
          name="birthday"
          label="Birthday"
          value={formik.values.birthday}
          onChange={formik.handleChange}
          error={formik.touched.birthday && Boolean(formik.errors.birthday)}
          helperText={formik.touched.birthday && formik.errors.birthday}
          fullWidth
        />
        <FormControl
          error={
            formik.touched.marital_status &&
            Boolean(formik.errors.marital_status)
          }
          fullWidth
        >
          <InputLabel id="marital_status-label">Marital status</InputLabel>
          <Select
            name="marital_status"
            label="marital_status"
            labelId="marital_status-label"
            value={formik.values.marital_status}
            onChange={formik.handleChange}
            error={
              formik.touched.marital_status &&
              Boolean(formik.errors.marital_status)
            }
            fullWidth
          >
            <MenuItem value="Single">Single</MenuItem>
            <MenuItem value="Married">Married</MenuItem>
            <MenuItem value="Divorced">Divorced</MenuItem>
            <MenuItem value="Widowed">Widowed</MenuItem>
          </Select>
          <FormHelperText>
            {formik.touched.marital_status && formik.errors.marital_status}
          </FormHelperText>
        </FormControl>

        <FormControl
          error={formik.touched.gender && Boolean(formik.errors.gender)}
          fullWidth
        >
          <InputLabel id="gender-label">Gender</InputLabel>
          <Select
            name="gender"
            label="gender"
            labelId="gender-label"
            value={formik.values.gender}
            onChange={formik.handleChange}
            error={formik.touched.gender && Boolean(formik.errors.gender)}
            fullWidth
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
          <FormHelperText>
            {formik.touched.gender && formik.errors.gender}
          </FormHelperText>
        </FormControl>
        <Button color="primary" variant="contained" type="submit">
          Register
        </Button>
      </GridLayout>
    </form>
  );
};

export const Register = () => {
  const [activationCode, setActivationCode] = useState("");
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState<boolean>();
  const activationLink = window.location.host;

  return (
    <CardContainer title="Register">
      {!activationCode && (
        <RegisterForm
          setActivationCode={setActivationCode}
          setMessage={setMessage}
          setSuccessful={setSuccessful}
        />
      )}
      {successful !== undefined && (
        <Alert severity={successful ? "success" : "error"}>{message}</Alert>
      )}
      {activationCode && (
        <Typography variant="h6">
          Please go to {activationLink}/activate/{activationCode} to activate
          your account.
        </Typography>
      )}
    </CardContainer>
  );
};
