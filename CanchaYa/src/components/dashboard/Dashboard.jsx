import React from "react";
import SearchForm from "../searchForm/SearchForm";
import Footer from "../footer/Footer";

const Dashboard = () => {
  return (
    <>
      <div className="text-center my-8">
        <h1 className="text-4xl font-bold mb-2">CANCHAS-YA</h1>
        <p className="text-lg text-gray-600">
          Encontra tu las mejores canchas cerca de donde estes!!
        </p>
        <SearchForm />
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
