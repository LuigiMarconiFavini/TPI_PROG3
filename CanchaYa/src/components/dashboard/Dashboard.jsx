import React from "react";
import SearchForm from "../searchForm/SearchForm";
import Faq from "../faq/Faq";

const Dashboard = () => {
  return (
    <>
      <div className="text-center my-8">
        <h1 className="text-4xl font-bold mb-2">CANCHAS-YA</h1>
        <p className="text-lg text-gray-600">
          Encontra tu las mejores canchas cerca de donde estes!!
        </p>
        <SearchForm />
        <Faq />
      </div>
    </>
  );
};

export default Dashboard;
