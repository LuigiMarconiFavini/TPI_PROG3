  import React from "react";
  import Navbar from "../navbar/Navbar";
  import SearchForm from "../searchForm/SearchForm";
  import Faq from "../faq/Faq";
  import Footer from "../footer/Footer";
  import MyProfile from "../myProfile/MyProfile";

  const Dashboard = () => {

    return (
      <>
        <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900 text-white">
          <div className="text-center my-8">
            <h1 className="text-4xl font-bold mb-2">CANCHAS-YA</h1>
            <p className="text-lg text-gray-300">
              Encontra las mejores canchas cerca de donde estés!!
            </p>
            <SearchForm />
            <MyProfile />

            <div className="mt-12 flex justify-center">
              <div className="w-full lg:w-3/4 bg-gray-900 rounded-xl p-6 shadow-md">
              <Faq />
              </div>
            </div>

            <Footer />
          </div>
        </div>
      </>
    );
  };

  export default Dashboard;