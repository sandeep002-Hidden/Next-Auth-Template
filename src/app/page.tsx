import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import Sidebar from "./components/sidebar";
export default function Home() {
  return (
    <>
      <div>
        <Header />
        <div className="min-h-screen flex justify-start items-center">
          <Sidebar/>
          <div className="flex justify-center items-center min-h-screen flex-1">
            <h1>Home Page</h1>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
