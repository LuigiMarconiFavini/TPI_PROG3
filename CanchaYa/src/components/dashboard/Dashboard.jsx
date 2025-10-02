import React from "react"; 
import SearchForm from "../searchForm/SearchForm";
import Faq from "../faq/Faq";
import Footer from "../footer/Footer";

const Dashboard = () => {
  return (
    <>
      <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 
        bg-gray-100 text-black dark:bg-gray-800 dark:text-gray-100 transition-colors duration-300">
        
        <div className="text-center my-8">
          <h1 className="text-4xl font-bold mb-2">CANCHAS-YA</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Encontra las mejores canchas cerca de donde estés!!
          </p>
          
          <SearchForm />

          <div className="mt-12 flex justify-center">
            <div className="w-full lg:w-3/4 bg-gray-100 dark:bg-gray-700 rounded-xl p-6 shadow-md transition-colors duration-300">
              <Faq />
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Dashboard;
