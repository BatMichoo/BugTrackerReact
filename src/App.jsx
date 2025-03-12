import Header from "./components/Header.jsx";
import ContentRoot from "./components/ContentRoot.jsx";
import Footer from "./components/Footer.jsx";
import { AuthContextProvider } from "./components/store/AuthContext.jsx";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Header />
        <ContentRoot />
        <Footer />
      </AuthContextProvider>
    </>
  );
}

export default App;
