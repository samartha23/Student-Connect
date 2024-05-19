import axios from "axios";
import React from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";

const SocialLoginAndSignup = ({ signup }) => {
  const handleGithub = async () => {
    try {
      window.location.href = `https://github.com/login/oauth/authorize?client_id=${
        import.meta.env.VITE_GITHUB_CLIENT_ID
      }&redirect_uri=${
        import.meta.env.VITE_ROOT_URL
      }/authorize/github&scope=user%20repo`;
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogle = async () => {
    try {
      window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${
        import.meta.env.VITE_GOOGLE_CLIENT_ID
      }&redirect_uri=${
        import.meta.env.VITE_ROOT_URL
      }/authorize/google&scope=openid+email+profile&response_type=code`;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="my-4 flex items-center">
        <div className="h-[1.2px] flex-1 bg-slate-400 dark:h-[0.9px]"></div>
        <span className="mx-4 text-xs font-semibold text-slate-500">OR</span>
        <div className="h-[1.2px] flex-1 bg-slate-400 dark:h-[0.9px]"></div>
      </div>
      <div className="flex flex-col">
        <button
          type="button"
          className="mb-2 mr-2 inline-flex w-full items-center justify-center rounded-lg bg-[#24292F] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#24292F]/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 dark:bg-gray-500 dark:hover:bg-gray-400 dark:focus:ring-gray-500"
          onClick={handleGithub}
        >
          <FaGithub className="mr-2" />
          {signup ? "Sign up" : "Sign in"} with Github
        </button>
        <button
          type="button"
          className="dark:focus:ring-[#4285F4]/55 mb-2 mr-2 inline-flex w-full items-center justify-center rounded-lg bg-[#4285F4] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#4285F4]/90 focus:outline-none focus:ring-4 focus:ring-[#4285F4]/50"
          onClick={handleGoogle}
        >
          <FaGoogle className="mr-2" />
          {signup ? "Sign up" : "Sign in"} with Google
        </button>
      </div>
    </div>
  );
};

export default SocialLoginAndSignup;
