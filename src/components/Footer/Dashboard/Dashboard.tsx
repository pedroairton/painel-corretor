import './Dashboard.scss'
import {apiService} from "../../../services/api.service";
import { useEffect, useState } from 'react';

interface DashboardProps {
    total_clients: number;
    total_contacts: number;
    high_interest_clients: number;
    closed_deals: number
    clients_without_contacts: number
}
export default function Dashboard() {
    const [dashboard, setDashboard] = useState<DashboardProps | null>(null);
    useEffect(() => {
        loadDashboard();
    }, []);
    const loadDashboard = async () => {
        try {
            const response = await apiService.getDashboard();
            setDashboard(response.data);
        } catch (error) {
            console.error(error);
        }
    }
  return (
    <>
      <div className="cards">
        <div className="card">
          <h2 className="valor">{dashboard?.total_clients}</h2>
          <p className="label">Clientes na carteira</p>
        </div>
        <div className="card">
          <h2 className="valor">{dashboard?.clients_without_contacts}</h2>
          <p className="label">Clientes sem contato</p>
        </div>
        <div className="card">
          <h2 className="valor">{dashboard?.total_contacts}</h2>
          <p className="label">Contatos registrados</p>
        </div>
        <div className="card">
          <h2 className="valor">{dashboard?.high_interest_clients}</h2>
          <p className="label">Muito interessados</p>
        </div>
        <div className="card">
          <h2 className="valor">{dashboard?.closed_deals}</h2>
          <p className="label">Negócios fechados</p>
        </div>
      </div>
    </>
  );
}
