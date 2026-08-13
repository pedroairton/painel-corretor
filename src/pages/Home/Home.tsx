import { Select } from "antd";
import "./Home.scss";
import {
  Building,
  Check,
  ChevronDown,
  ChevronUp,
  Pencil,
  Phone,
  PhoneCall,
  Plus,
  RotateCcw,
  Search,
  Trash,
  X,
} from "lucide-react";
import { apiService } from "../../services/api.service";
import { useEffect, useState } from "react";
import type { Client } from "../../models/client.model";
import ClientModal from "../modal/ClientModal/ClientModal";
import type { Contact } from "../../models/contact.model";
import ContactModal from "../modal/ContactModal/ContactModal";
import { maritalStatus } from "../../utils/marital-status";
import { Estrelas } from "../../components/Stars/Estrelas";
import Dashboard from "../../components/Footer/Dashboard/Dashboard";

interface ClientFilter {
  search: string;
  status: string | null;
  sort: string | null;
}

export const Home = () => {
  const [filter, setFilter] = useState<ClientFilter>({
    search: "",
    status: "",
    sort: "priority",
  });
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [loading, setLoading] = useState('');
  const [accordion, setAccordion] = useState<number | null>(null);
  const [client, setClient] = useState<Client | null>(null);
  const [contact, setContact] = useState<Contact | null>(null);
  const handleStatusChange = (value: string) => {
    setFilter({ ...filter, status: value });
    loadClients({
      search: filter.search,
      status: value,
      sort: filter.sort,
    });
  };
  const handleOrdemChange = (value: string) => {
    setFilter({ ...filter, sort: value });
    console.log(filter);
    loadClients({
      search: filter.search,
      status: filter.status,
      sort: value,
    });
  };
  const handleSearchChange = (value: string) => {
    console.log(`selected ${value}`);
    setFilter({ ...filter, search: value });
    if (value.length < 3 && value !== "") return;
    loadClients({
      search: value,
      status: filter.status,
      sort: filter.sort,
    });
  };

  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>();
  const formatarTelefone = (telefone: string) => {
    return telefone
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3");
  };
  const loadClients = async (params?: any) => {
    setAccordion(null);
    setLoading('clients');
    try {
      const response = await apiService.getClients(params);
      console.log(response);
      setClients(response.data);
      setLoading('');
    } catch (error) {
      console.error(error);
    }
  };
  const loadContacts = async (params?: any) => {
    setLoading('contacts');
    try {
      const response = await apiService.getClientContacts(params);
      console.log(response);
      setSelectedClient(response.data);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar contatos desse cliente.");
    }
  };
  const deleteClient = async (id: number) => {
    if(!confirm("Tem certeza que deseja excluir esse cliente?")) return
    try {
      await apiService.deleteClient(id);
      alert("Cliente excluido com sucesso.");
      loadClients(filter);
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir cliente.");
    }
  };
  useEffect(() => {
    loadClients(filter);
  }, []);
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
          <button
            className="btn-novo-cliente"
            onClick={() => {
              setIsClientModalOpen(true);
              setClient(null);
            }}
          >
            <Plus strokeWidth={1.5} /> Novo Cliente
          </button>
        </div>
        <Dashboard />
        <div className="filtros">
          <button
            className="btn-reset"
            onClick={() => {
              setFilter({ search: "", status: "", sort: "priority" });
              loadClients();
            }}
          >
            <RotateCcw />
          </button>
          <div className="input">
            <Search strokeWidth={1.5} />
            <input
              type="text"
              name="busca"
              id="busca"
              placeholder="Buscar por nome ou telefone"
              value={filter.search}
              onInput={(e) => handleSearchChange(e.currentTarget.value)}
            />
          </div>
          <div className="select">
            <Select
              className="select-item"
              value={filter.status}
              onChange={handleStatusChange}
              options={[
                {
                  value: "",
                  label: "Todos os status",
                },
                {
                  value: "very_interested",
                  label: "Muito interessados",
                },
                {
                  value: "moderated_interest",
                  label: "Interesse moderado",
                },
                {
                  value: "low_interest",
                  label: "Pouco interessados",
                },
                {
                  value: "no_interest",
                  label: "Sem interesse",
                },
                {
                  value: "closed_deal",
                  label: "Negócios fechados",
                },
              ]}
            ></Select>
          </div>
          <div className="select">
            <Select
              className="select-item"
              value={filter.sort}
              onChange={handleOrdemChange}
              options={[
                {
                  value: "priority",
                  label: "Ordernar: Prioridade",
                },
                {
                  value: "interest",
                  label: "Ordernar: Nível de interesse",
                },
                {
                  value: "recent",
                  label: "Ordernar: Mais recentes",
                },
                {
                  value: "name",
                  label: "Ordernar: Nome (A-Z)",
                },
              ]}
            ></Select>
          </div>
        </div>
        <div className="tabela">
          {clients.length > 0 ? (
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
                {clients.map((client: Client) => (
                  <div className="item-grid" key={client.id}>
                    <div className="linha">
                      <div className="cliente">
                        <h3>{client.name}</h3>
                        <span className={client.contacts_count === 0 ? "sem-contato" : ""}>
                          {formatarTelefone(client.phone)} ·{" "}
                          {client.contacts_count} contato(s)
                        </span>
                      </div>
                      <span>R$ {client.income?.toLocaleString("pt-BR")}</span>
                      <span
                        className={`status ${client.interest_status.value}`}
                      >
                        • {client.interest_status.label}
                      </span>
                      <Estrelas
                        clientId={client.id}
                        num={Number(client.priority)}
                      />
                      <div className="acoes">
                        <button
                          className="btn-ligar"
                          onClick={() => {
                            setIsContactModalOpen(true);
                            setContact(null);
                            setClient(client);
                          }}
                        >
                          <PhoneCall strokeWidth={1.5} />
                          Contato
                        </button>
                        <button
                          className="btn-editar"
                          onClick={() => {
                            setIsClientModalOpen(true);
                            setClient(client);
                          }}
                        >
                          <Pencil strokeWidth={1.5} />
                        </button>
                        <button
                          className="btn-excluir"
                          onClick={() => deleteClient(client.id)}
                        >
                          <Trash strokeWidth={1.5} />
                        </button>
                        <button
                          className="detalhes"
                          aria-label="Expand"
                          onClick={() => {
                            if (accordion === client.id) setAccordion(null);
                            else {
                              setAccordion(client.id);
                              loadContacts(client.id);
                            }
                          }}
                        >
                          {accordion === client.id ? (
                            <ChevronUp strokeWidth={1.5} />
                          ) : (
                            <ChevronDown strokeWidth={1.5} />
                          )}
                        </button>
                      </div>
                    </div>
                    {accordion === client.id ? (
                      <div className="linha-detalhes">
                        <div className="outras-infos">
                          <h4>Outras informações</h4>
                          <p className="necessidades">
                            <b>Necessidades:</b> {client.needs}
                          </p>
                          <div className="itens">
                            <div className="item">
                              <span className="label-item">Estado civil</span>
                              <div className="checkbox">
                                {maritalStatus(client.marital_status as string)}
                              </div>
                            </div>
                            <div className="item">
                              <span className="label-item">Filhos?</span>
                              <div className="checkbox">
                                {client.has_children ? (
                                  <Check
                                    size={20}
                                    strokeWidth={4}
                                    color="green"
                                  />
                                ) : (
                                  <X size={20} strokeWidth={4} color="red" />
                                )}
                              </div>
                            </div>
                            <div className="item">
                              <span className="label-item">Imóvel?</span>
                              <div className="checkbox">
                                {client.has_property ? (
                                  <Check
                                    size={20}
                                    strokeWidth={4}
                                    color="green"
                                  />
                                ) : (
                                  <X size={20} strokeWidth={4} color="red" />
                                )}
                              </div>
                            </div>
                          </div>
                          <p className="observacoes">
                            <b>Observações:</b> {client.notes}
                          </p>
                        </div>
                        <div className="historico">
                          <h4>Histórico de contato</h4>
                          <div className="contatos">
                            {selectedClient?.contacts ? (
                              selectedClient.contacts.map(
                                (contact: Contact) => (
                                  <div
                                    className="item-contato"
                                    key={contact.id}
                                  >
                                    <div className="topo-contato">
                                      <Phone size={20} />
                                      <span className="data-contato">
                                        {contact.contact_date
                                          .split("T")[0]
                                          .split("-")
                                          .reverse()
                                          .join("/")}
                                      </span>
                                      <span className="resultado-contato">
                                        · {contact.result.label}
                                      </span>
                                      <span
                                        className={`status-interesse ${contact.interest_status_after.value}`}
                                      >
                                        • {contact.interest_status_after.label}
                                      </span>
                                    </div>
                                    <p className="feedback-contato">
                                      {contact.feedback}
                                    </p>
                                  </div>
                                ),
                              )
                            ) : (
                              <>
                                <h2>Nenhum contato registrado</h2>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <h2 style={{ textAlign: "center" }}>Nenhum cliente encontrado</h2>
          )}
        </div>
        <ClientModal
          open={isClientModalOpen}
          onCancel={() => {
            setIsClientModalOpen(false);
            loadClients(filter);
          }}
          clientData={client}
        />
        <ContactModal
          open={isContactModalOpen}
          onCancel={() => {
            setIsContactModalOpen(false);
            loadClients(filter);
          }}
          contactData={contact}
          clientData={client}
        />
      </article>
    </>
  );
};
