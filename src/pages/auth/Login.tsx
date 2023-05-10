import { Alert, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { CardContainer } from "../../components/CardContainer";
import { GridLayout } from "../../components/GridLayout";
import useAxios from "../../lib/hooks/useAxios";
import { LocalStorageUser } from "../../models/LocalStorageUser";
import { User } from "../../models/User";

interface LoginFormProps {
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
});

const LoginForm: FC<LoginFormProps> = ({ setMessage, setSuccessful }) => {
  const navigate = useNavigate();
  const axios = useAxios();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const user: User = {
        username: values.username,
        password: values.password,
      };
      try {
        const { data } = await axios.post("/api/token/", user);
        if (data.access) {
          const {
            data: { role },
          } = await axios.get(`/users/${user.username}/`);

          const localStorageUser: LocalStorageUser = {
            tokens: { ...data },
            username: user.username,
            role: role,
          };
          localStorage.setItem("user", JSON.stringify(localStorageUser));
          navigate("/");
        }
      } catch (error: any) {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.error) ||
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
        <Button color="primary" variant="contained" type="submit">
          Login
        </Button>
      </GridLayout>
    </form>
  );
};

export const Login = () => {
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState<boolean>();

  return (
    <CardContainer title="Login">
      <LoginForm setMessage={setMessage} setSuccessful={setSuccessful} />
      {successful !== undefined && (
        <Alert severity={successful ? "success" : "error"}>{message}</Alert>
      )}
    </CardContainer>
  );
};
