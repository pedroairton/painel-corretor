import { Building, Building2, LayoutDashboard, Snowflake } from "lucide-react";
import "./Header.scss";

export const Header = () => {
  return (
    <>
      <header className="header">
        <div className="img-logo">
            <Building size={96} color="white" />
        </div>
        <nav className="nav">
            <a href=""><LayoutDashboard strokeWidth={1.5} />Home</a>
            <a href=""><Snowflake strokeWidth={1.5} /> Lista fria</a>
            <a href=""><Building2 strokeWidth={1.5} /> Imóveis</a>
        </nav>
      </header>
    </>
  );
};
