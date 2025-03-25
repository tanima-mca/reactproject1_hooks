
import Header from "../header/header";
import Footer from "../footer/footer";


export default function Wrapper({ children }) {
  return (
    <>
   
      <Header/> 
      {children}
      <Footer/>
    </>
  );
}