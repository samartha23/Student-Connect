import { useEffect, useState } from "react";
import FormInput from "../../../components/form/FormInput";
import Button from "../../../components/Button";
import {
  FaEnvelope,
  FaEye,
  FaGithub,
  FaGoogle,
  FaLock,
  FaUser,
  FaUserAlt,
} from "react-icons/fa";
import Form from "../../../components/form/Form";
import Layout from "../../../components/Layout";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import SocialLoginAndSignup from "../../../components/auth/SocialLoginAndSignup";
import AuthFormFooter from "../../../components/auth/AuthFormFooter";

const Signup = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user } = useSelector((store) => store.user);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState(null);
  const [emailError, setEmailError] = useState(null);

  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, []);

  const handleRegister = async () => {
    setUsernameError(null);
    setEmailError(null);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_DJANGO_API}/authentication/register/`,
        {
          full_name: name,
          user_name: username,
          email: email,
          password: password,
          account_type: "user",
        },
      );

      localStorage.setItem(
        "user",
        JSON.stringify({ token: res.data.token, ...res.data.user }),
      );

      dispatch(setUser({ token: res.data.token, ...res.data.user }));

      navigate("/dashboard");
    } catch (error) {
      if (error.response?.data?.error[0]?.email) {
        setEmailError(error.response?.data?.error[0]?.email);
      }
      if (error.response?.data?.error[0]?.user_name) {
        setUsernameError(error.response?.data?.error[0]?.user_name);
      }

      console.log(error.response);
    }
  };

  return (
    <Layout>
      <Form label={"Signup"}>
        <FormInput
          label="Full Name"
          placeholder="John Doe"
          type="text"
          required={true}
          value={name}
          onChange={(text) => setName(text)}
          leftIcon={<FaUser className="text-sm text-slate-400" />}
        />
        <FormInput
          label="Username"
          placeholder="johndoe"
          type="text"
          required={true}
          value={username}
          onChange={(text) => setUsername(text)}
          leftIcon={<FaUserAlt className="text-sm text-slate-400" />}
          error={usernameError}
        />
        <FormInput
          label="Email"
          placeholder="studentconnect@gmail.com"
          type="email"
          required={true}
          value={email}
          onChange={(text) => setEmail(text)}
          leftIcon={<FaEnvelope className="text-sm text-slate-400" />}
          error={emailError}
        />
        <FormInput
          label="Password"
          placeholder="Password"
          type="password"
          required={true}
          value={password}
          onChange={(text) => setPassword(text)}
          leftIcon={<FaLock className="text-sm text-slate-400" />}
          rightIcon={<FaEye className="text-sm text-slate-400" />}
        />
        <Button label={"Signup"} radius={"lg"} onclick={handleRegister} />

        <SocialLoginAndSignup signup={true} />

        <AuthFormFooter text={"Already have an account?"} url={"login"} />
      </Form>
    </Layout>
  );
};

export default Signup;
