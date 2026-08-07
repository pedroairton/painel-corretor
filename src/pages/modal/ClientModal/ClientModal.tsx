import "./ClientModal.scss";
import { Modal } from "antd";

export const ClientModal = ({
  open,
  onOk,
  onCancel,
  isEditMode
}: {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  isEditMode?: boolean;
}) => {
  const title = isEditMode ? "Editar Cliente" : "Novo Cliente";
  return (
    <>
      <Modal title={title} open={open} onOk={onOk} onCancel={onCancel}>
        <form>
          <input type="text" placeholder="Nome" />
          <input type="text" placeholder="Telefone" id="" />
          <input type="email" placeholder="Email" id="" />
          <input type="text" placeholder="Renda" />
          <select id="">
            <option value="" selected disabled>
              Status de interesse
            </option>
            <option value="">
              Muito interessado
            </option>
            <option value="">
              Interesse moderado
            </option>
            <option value="">
              Pouco interessado
            </option>
            <option value="">
              Não interessado
            </option>
            <option value="">
              Negócio fechado
            </option>
            <textarea placeholder="Anotações" id=""></textarea>
          </select>
        </form>
      </Modal>
    </>
  );
};
