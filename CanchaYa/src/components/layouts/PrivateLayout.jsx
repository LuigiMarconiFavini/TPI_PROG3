import Navbar from "../navbar/Navbar";

const PrivateLayout = ({ children, loggedIn, onSignOut }) => {
  return (
    <>
      <Navbar loggedIn={loggedIn} onsingout={onSignOut} />
      <main>{children}</main>
    </>
  );
};

export default PrivateLayout;
