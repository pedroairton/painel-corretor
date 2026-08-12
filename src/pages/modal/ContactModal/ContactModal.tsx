import "./ContactModal.scss";
import { Form, Input, Modal, Select } from "antd";
import type { Contact } from "../../../models/contact.model";
import "./ContactModal.scss";
import { useEffect, useState } from "react";
import { apiService } from "../../../services/api.service";
import type { Client } from "../../../models/client.model";
import { examples } from "../../../utils/feedback-examples";

interface ContactModalProps {
  open: boolean;
  onCancel: () => void;
  contactData: Contact | null;
  clientData: Client | null;
}
interface ContactFormValues {
  contact_type: string;
  contact_date: string;
  result: string;
  feedback: string;
  interest_status_after: string;
}
export default function ContactModal({
  open,
  onCancel,
  contactData,
  clientData,
}: ContactModalProps) {
  const [form] = Form.useForm<ContactFormValues>();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const isEditing = !!contactData;

  useEffect(() => {
    if (!open) {
      return;
    }

    if (contactData) {
      form.setFieldsValue({
        contact_type:
          contactData.contact_type.value ??
          contactData.contact_type ??
          undefined,
        contact_date: contactData.contact_date,
        result: contactData.result.value ?? contactData.result ?? undefined,
        feedback: contactData.feedback ?? "",
        interest_status_after:
          contactData.interest_status_after.value ??
          contactData.interest_status_after ??
          undefined,
      });
    } else {
      form.resetFields();
    }
  }, [open, contactData]);

  const handleFinish = async (values: ContactFormValues) => {
    const payload = {
      ...values,
    };
    setConfirmLoading(true);
    if (!clientData?.id) {
      alert("Cliente não encontrado.");
      return;
    }
    if (isEditing) {
      // editar
      if (!contactData?.id) {
        alert("Erro ao editar contato.");
        return;
      }
      try {
        const response = await apiService.updateContact(
          clientData?.id,
          payload,
        );
        console.log(response);
        alert("Contato editado com sucesso.");
      } catch (error) {
        console.error("Error ao editar contato:", error);
        alert("Erro ao editar contato.");
      } finally {
        setConfirmLoading(false);
        onCancel();
      }
    } else {
      // cadastrar
      try {
        const response = await apiService.createContact(
          clientData?.id,
          payload,
        );
        console.log(response);
        alert("Contato cadastrado com sucesso.");
      } catch (error) {
        console.error("Error ao cadastrar contato:", error);
        alert("Erro ao cadastrar contato.");
      } finally {
        setConfirmLoading(false);
        onCancel();
      }
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };
  return (
    <Modal
      title={isEditing ? "Editar Contato" : "Novo Contato"}
      open={open}
      onCancel={handleCancel}
      onOk={() => form.submit()}
      okText={isEditing ? "Salvar" : "Cadastrar"}
      confirmLoading={confirmLoading}
      cancelText="Cancelar"
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        requiredMark={false}
      >
        <Form.Item
          style={{ marginBottom: 0 }}
          label="Tipo de Contato"
          name="contact_type"
          rules={[
            {
              required: true,
              message: "Selecione um tipo de contato",
            },
          ]}
        >
          <Select
            placeholder="Selecione um tipo de contato"
            allowClear
            options={[
              {
                value: "call",
                label: "Ligação",
              },
              {
                value: "whatsapp",
                label: "Whatsapp",
              },
              {
                value: "meeting",
                label: "Reunião",
              },
              {
                value: "email",
                label: "E-mail",
              },
              {
                value: "other",
                label: "Outro",
              },
            ]}
          ></Select>
        </Form.Item>
        <Form.Item
          style={{ marginBottom: 0 }}
          label="Data do Contato"
          name="contact_date"
          rules={[
            {
              required: true,
              message: "Selecione uma data",
            },
          ]}
        >
          <Input type="date" />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: 0 }}
          label="Resultado do Contato"
          name="result"
          rules={[
            {
              required: true,
              message: "Selecione um resultado",
            },
          ]}
        >
          <Select
            placeholder="Selecione um resultado"
            allowClear
            options={[
              {
                value: "answered",
                label: "Atenteu",
              },
              {
                value: "not_answered",
                label: "Não Atenteu",
              },
              {
                value: "call_later",
                label: "Retornar depois",
              },
              {
                value: "visit_scheduled",
                label: "Visita Agendada",
              },
              {
                value: "closed_deal",
                label: "Negócio fechado",
              },
            ]}
          ></Select>
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }} label="Feedback" name="feedback">
          <Input.TextArea />
        </Form.Item>
        <div className="exemplos">
          {examples.map((example: string, index: number) => (
            <div
              key={index}
              className="exemplo"
              onClick={() => form.setFieldValue("feedback", example)}
            >
              <p>{example}</p>
            </div>
          ))}
        </div>
        <Form.Item
          style={{ marginBottom: 0 }}
          label="Status do Interesse"
          name="interest_status_after"
          rules={[
            {
              required: true,
              message: "Selecione um status",
            },
          ]}
        >
          <Select
            placeholder="Selecione um status"
            allowClear
            options={[
              {
                label: "Muito interessado",
                value: "very_interested",
              },
              {
                label: "Interesse moderado",
                value: "moderated_interest",
              },
              {
                label: "Pouco interesse",
                value: "low_interest",
              },
              {
                label: "Sem interesse",
                value: "no_interest",
              },
              {
                label: "Negócio fechado",
                value: "closed_deal",
              },
            ]}
          ></Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}
