import { Star } from "lucide-react";
import "./Estrelas.scss";
import { apiService } from "../../services/api.service";
import { useState } from "react";

export const Estrelas = ({
  num = 0,
  clientId,
}: {
  num?: number;
  clientId: number;
}) => {
  const [valor, setValor] = useState(num);
  const prioridade = Math.max(0, Math.min(5, Math.round(valor)));

  const patchPriority = async (clientId: number, prioridade: number) => {
    try {
      setValor(prioridade);
      await apiService.patchClient(clientId, { priority: prioridade });
      console.log("Prioridade atualizada com sucesso");
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar prioridade");
    }
  };

  return (
    <div className="estrelas" aria-label={`Prioridade: ${prioridade} de 5`}>
      {[...Array(5)].map((_, index) => {
        const preenchida = index < prioridade;

        return (
          <Star
            key={index}
            className={`estrela ${preenchida ? "preenchida" : ""}`}
            onClick={() => {
              console.log(`Clicou na estrela ${index + 1}`);
              patchPriority(clientId, index + 1);
            }}
          />
        );
      })}
    </div>
  );
};
