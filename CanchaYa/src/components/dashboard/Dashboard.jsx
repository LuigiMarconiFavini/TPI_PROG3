import React from "react";
import Navbar from "../navbar/Navbar";
import SearchForm from "../searchForm/SearchForm";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="text-center my-8">
        <h1 className="text-4xl font-bold mb-2">CANCHA-YA</h1>
        <p className="text-lg text-gray-600">
          ¡Encontrá las mejores canchas cerca de donde estés!
        </p>
        <SearchForm />
      </div>
    </>
  );
};

export default Dashboard;

