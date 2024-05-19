import React from "react";
import HeroImage from "../../assets/hero-image.svg";
import Button from "../../components/Button";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div>
        <div className="flex flex-col items-center md:flex-row">
          <div className="flex-1">
            <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
              Student Connect
            </h1>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white md:text-3xl">
              Igniting Connections Among Students
            </h2>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus
              iste repellendus reprehenderit possimus saepe ex rerum expedita
              praesentium molestias commodi! Lorem ipsum dolor sit amet
              consectetur, adipisicing elit!
            </p>
            <Button
              label={"Join Student Connect"}
              radius={"full"}
              leftIcon={<FaSignInAlt className="text-lg" />}
              onclick={() => navigate("/signup")}
            />
          </div>
          <img
            src={HeroImage}
            alt="hero-image"
            className="mt-10 w-[80%] md:mt-0 md:w-2/6"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
