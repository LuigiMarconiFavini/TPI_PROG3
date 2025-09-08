import React from "react";
import SearchForm from "../searchForm/SearchForm";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900 text-white">
      <div className="text-center my-8">
        <h1 className="text-4xl font-bold mb-2">CANCHAS-YA</h1>
        <p className="text-lg text-gray-300">
          Encontra las mejores canchas cerca de donde estés!!
        </p>
        <SearchForm />
      </div>
    </div>
  );
};

export default Dashboard;
