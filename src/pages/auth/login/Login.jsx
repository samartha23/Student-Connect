import { useEffect, useState } from "react";
import FormInput from "../../../components/form/FormInput";
import Button from "../../../components/Button";
import { FaEnvelope, FaEye, FaGithub, FaGoogle, FaLock } from "react-icons/fa";
import Form from "../../../components/form/Form";
import Layout from "../../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setUser } from "../../../features/user/userSlice";
import SocialLoginAndSignup from "../../../components/auth/SocialLoginAndSignup";
import AuthFormFooter from "../../../components/auth/AuthFormFooter";

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user } = useSelector((store) => store.user);

  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const [userIdError, setUserIdError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, []);

  const handleLogin = async () => {
    setUserIdError(null);
    setPasswordError(null);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_DJANGO_API}/authentication/login/`,
        {
          login_id: loginId,
          password: password,
        },
      );

      localStorage.setItem(
        "user",
        JSON.stringify({ token: res.data.token, ...res.data.user }),
      );

      dispatch(setUser({ token: res.data.token, ...res.data.user }));

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Form label={"Login"}>
        <FormInput
          label="Username or Email"
          placeholder="Username or studentconnect@gmail.com"
          type="text"
          required={true}
          value={loginId}
          onChange={(text) => setLoginId(text)}
          leftIcon={<FaEnvelope className="text-sm text-slate-400" />}
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
        <Button label={"Login"} radius={"lg"} onclick={handleLogin} />

        <SocialLoginAndSignup signup={false} />

        <AuthFormFooter text={"Don't have an account?"} url={"signup"} />
      </Form>
    </Layout>
  );
};

export default Login;
