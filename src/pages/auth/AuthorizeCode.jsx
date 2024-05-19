import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { setUser } from "../../features/user/userSlice";
import Layout from "../../components/Layout";
import { FaSpinner } from "react-icons/fa";

const AuthorizeCode = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.user);

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const code = searchParams.get("code");

    if (user) {
      navigate("/profile");
    }

    const handleSendCode = async () => {
      if (params.provider) {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_DJANGO_API}/authentication/o/auth/${
              params.provider
            }?code=${code}`,
          );
          localStorage.setItem(
            "user",
            JSON.stringify({ token: res.data.token, ...res.data.user }),
          );
          dispatch(setUser({ token: res.data.token, ...res.data.user }));
          navigate("/profile");

          console.log(res);
        } catch (error) {
          console.log(error);
          // navigate(-1);
        }
      }
    };

    handleSendCode();
  }, []);

  return (
    <Layout classes={"h-[80vh] flex items-center justify-center"}>
      <h4 className="flex items-center justify-center gap-3 text-base font-medium text-gray-900 dark:text-gray-300">
        <FaSpinner className="h-5 w-5 animate-spin fill-gray-900 dark:fill-gray-300" />
        Authorizing...
      </h4>
    </Layout>
  );
};

export default AuthorizeCode;
