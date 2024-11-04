import Link from "next/link";
export default function Sidebar() {
  const Routes = [

    { path: "/", Text: "Home",  },
    { path: "/dashboard", Text: "Go to Dashboard " },
    { path: "/profile", Text: "Go to Profile" },
    { path: "/forgotPassword", Text: "Change password" },
    
  ];
  return (
    <>
      <div className="w-44 min-h-screen bg-white dark:bg-slate-900 border-t rounded-md border-black dark:border-white border-r">
        {Routes.map((route) => (
            <div className="h-12 flex justify-center items-center border-b border-black dark:border-white" key={route.Text}>
              <Link href={route.path} className="w-36 text-left">{route.Text}</Link>
            </div>
        ))}
      </div>
    </>
  );
}
