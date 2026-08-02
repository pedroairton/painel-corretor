import { Collapse, Select } from "antd";
import "./Home.scss";
import {
  Building,
  ChevronDown,
  Pencil,
  Phone,
  PhoneCall,
  Plus,
  Search,
  Trash,
} from "lucide-react";

export const Home = () => {
  const handleStatusChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const handleOrdemChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <>
      <article className="page-home">
        <div className="topo">
          <div className="icon">
            <Building size={32} color="white" />
          </div>
          <div className="info">
            <h1>Painel do Corretor</h1>
            <p>
              Sua planilha automática de clientes, ligações e status de
              interesse.
            </p>
          </div>
          <button className="btn-novo-cliente">
            <Plus strokeWidth={1.5} /> Novo Cliente
          </button>
        </div>
        <div className="cards">
          <div className="card">
            <h2 className="valor">49</h2>
            <p className="label">Clientes na carteira</p>
          </div>
          <div className="card">
            <h2 className="valor">38</h2>
            <p className="label">Ligações registradas</p>
          </div>
          <div className="card">
            <h2 className="valor">27</h2>
            <p className="label">Muito interessados</p>
          </div>
          <div className="card">
            <h2 className="valor">16</h2>
            <p className="label">Negócios fechados</p>
          </div>
        </div>
        <div className="filtros">
          <div className="input">
            <Search strokeWidth={1.5} />
            <input
              type="text"
              name="busca"
              id="busca"
              placeholder="Buscar por nome ou telefone"
            />
          </div>
          <div className="select">
            <Select
              className="select-item"
              defaultValue="todos"
              onChange={handleStatusChange}
              options={[
                {
                  value: "todos",
                  label: "Todos os status",
                },
                {
                  value: "muito_interessados",
                  label: "Muito interessados",
                },
                {
                  value: "interesse_moderado",
                  label: "Interesse moderado",
                },
                {
                  value: "pouco_interessados",
                  label: "Pouco interessados",
                },
                {
                  value: "negocios_fechados",
                  label: "Negócios fechados",
                },
                {
                  value: "sem_interesse",
                  label: "Sem interesse",
                },
              ]}
            ></Select>
          </div>
          <div className="select">
            <Select
              className="select-item"
              defaultValue="prioridade"
              onChange={handleOrdemChange}
              options={[
                {
                  value: "prioridade",
                  label: "Ordernar: Prioridade",
                },
                {
                  value: "nivel_interesse",
                  label: "Ordernar: Nível de interesse",
                },
                {
                  value: "mais_recentes",
                  label: "Ordernar: Mais recentes",
                },
                {
                  value: "nome",
                  label: "Ordernar: Nome (A-Z)",
                },
              ]}
            ></Select>
          </div>
        </div>
        <div className="tabela">
          {/* <table>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Renda</th>
                <th>Status</th>
                <th>Prioridade</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="cliente">
                    <h3>Nome do cliente</h3>
                    <span>(81) 99999-9999 - 2 ligações</span>
                  </div>
                </td>
                <td>R$ 3.000</td>
                <td>Muito interessado</td>
                <td>
                  <div className="stars">
                    <span>⭐⭐⭐⭐⭐</span>
                  </div>
                </td>
                <td>
                  <div className="acoes">
                    <button className="btn-ligar">
                      <PhoneCall strokeWidth={1.5} />
                      Ligação
                    </button>
                    <button className="btn-editar">
                      <Pencil strokeWidth={1.5} />
                    </button>
                    <button className="btn-excluir">
                      <Trash strokeWidth={1.5} />
                    </button>
                    <button className="detalhes">
                      <ChevronDown strokeWidth={1.5} />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table> */}
          <div className="grid">
            <div className="topo-grid">
              <div className="linha">
                <span>Cliente</span>
                <span>Renda</span>
                <span>Status</span>
                <span>Prioridade</span>
                <span>Ações</span>
              </div>
            </div>
            <div className="itens-grid">
              <div className="item-grid">
                <div className="linha">
                  <div className="cliente">
                    <h3>Nome do cliente</h3>
                    <span>(81) 99999-9999 - 2 ligações</span>
                  </div>
                  <span>R$ 3.000</span>
                  <span>Muito interessado</span>
                  <span>⭐⭐⭐⭐⭐</span>
                  <div className="acoes">
                    <button className="btn-ligar">
                      <PhoneCall strokeWidth={1.5} />
                      Ligação
                    </button>
                    <button className="btn-editar">
                      <Pencil strokeWidth={1.5} />
                    </button>
                    <button className="btn-excluir">
                      <Trash strokeWidth={1.5} />
                    </button>
                    <button className="detalhes" aria-label="Expand">
                      <ChevronDown strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
                <div className="linha-detalhes">
                  <p className="observacoes"><b>Observações:</b> Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                  <div className="historico">
                    <h4>Histórico de contato</h4>
                    <div className="contatos">
                      <div className="item-contato">
                        <div className="topo-contato">
                          <Phone size={20} />
                          <span className="data-contato">01/08/2026</span>
                          <span className="resultado-contato">· Agendou visita</span>
                          <span className="status-interesse">Muito interessado</span> 
                        </div>
                        <p className="feedback-contato">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};
