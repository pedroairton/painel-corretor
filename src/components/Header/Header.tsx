import { Building, Building2, LayoutDashboard, Snowflake } from "lucide-react";
import "./Header.scss";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <>
      <header className="header">
        <div className="img-logo">
          <Building size={96} color="white" />
        </div>
        <nav className="nav">
          <Link to="/home">
            <LayoutDashboard strokeWidth={1.5} />
            <button>Home</button>
          </Link>
          <Link to="/lista-fria" className="disabled" onClick={(e) => {e.preventDefault()}}>
            <Snowflake strokeWidth={1.5} />
            <button disabled>Lista fria</button>
          </Link>
          <Link to="/imoveis" className="disabled" onClick={(e) => {e.preventDefault()}}>
            <Building2 strokeWidth={1.5} />
            <button disabled>Imóveis</button>
          </Link>
        </nav>
      </header>
    </>
  );
};
