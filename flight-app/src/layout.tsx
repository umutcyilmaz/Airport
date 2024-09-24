import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { RiFlightTakeoffFill } from "react-icons/ri";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div>
      <nav className="bg-blue-800 p-4 flex items-center justify-between px-10">
        <Link to="/">
          <RiFlightTakeoffFill size={48} />
        </Link>

        <ul className="flex gap-6">
          <li>
            <Link
              to="/"
              className={`p-2 rounded-md font-medium text-white hover:opacity-80 ${
                isActive("/") && "bg-blue-700 shadow-md"
              }`}
            >
              Anasayfa
            </Link>
          </li>
          <li>
            <Link
              to="/my-flights"
              className={`p-2 rounded-md font-medium text-white hover:opacity-80 ${
                isActive("/my-flights") && "bg-blue-700 shadow-md"
              }`}
            >
              Biletlerim
            </Link>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
