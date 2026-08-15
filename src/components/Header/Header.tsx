import { Building, Building2, LayoutDashboard, Menu, Snowflake } from "lucide-react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  return (
    <>
      <header className={"header"+(isMobile ? " ativo" : "")}>
        <div className="img-logo">
          <Building size={96} color="white" />
        </div>
        <div className="mobile">
          <Menu size={32} color="white" onClick={() => setIsMobile(!isMobile)} />
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
