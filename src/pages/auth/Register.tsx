import {
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
import * as yup from "yup";
import { CardContainer } from "../../components/CardContainer";
import { GridLayout } from "../../components/GridLayout";
import { UserProfile } from "../../models/UserProfile";

interface RegisterFormProps {
  setActivationCode: Dispatch<SetStateAction<string>>;
}

const validationSchema = yup.object({
  username: yup
    .string()
    .min(4, "Username should be at least 4 characters long")
    .required("Username is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  bio: yup.string().required("Bio is required"),
  location: yup.string().required("Location is required"),
  gender: yup.string().required("Gender is required"),
});

const RegisterForm: FC<RegisterFormProps> = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      bio: "",
      location: "",
      gender: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const profile: UserProfile = {
        user: { username: values.username, password: values.password },
        bio: values.bio,
        location: values.location,
        gender: values.gender,
      };
      alert(JSON.stringify(profile, null, 2));
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
  const activationLink = window.location.host;

  return (
    <CardContainer title="Register">
      {!activationCode && (
        <RegisterForm setActivationCode={setActivationCode} />
      )}
      {activationCode && (
        <Typography variant="h6">
          Please go to {activationLink}/{activationCode} to activate your
          account.
        </Typography>
      )}
    </CardContainer>
  );
};
