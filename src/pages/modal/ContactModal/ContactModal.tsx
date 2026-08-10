import { Form, Input, Modal, Select } from "antd";
import type { Contact } from "../../../models/contact.model";
import "./ContactModal.scss";
import { useEffect } from "react";
import { apiService } from "../../../services/api.service";
import type { Client } from "../../../models/client.model";

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

  const handleFinish = (values: ContactFormValues) => {
    const payload = {
      ...values,
    };
    if(!clientData?.id) {
        alert("Cliente não encontrado.");
        return
    }
    if (isEditing) {
      // editar
      if (!contactData?.id) {
        alert("Erro ao editar contato.");
        return;
      }
      apiService.updateContact(clientData?.id, payload);
    } else {
      // cadastrar
      apiService.createContact(clientData?.id, payload);
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
                    label: "answered",
                    value: "Atenteu"
                },
                {
                    label: "not_answered",
                    value: "Não Atenteu"
                },
                {
                    label: "call_later",
                    value: "Retornar depois"
                },
                {
                    label: "visit_scheduled",
                    value: "Visita Agendada"
                },
                {
                    label: "closed_deal",
                    value: "Negócio fechado"
                }
            ]}
          ></Select>
        </Form.Item>
        <Form.Item label="Feedback" name="feedback">
          <Input.TextArea />
        </Form.Item>
        <Form.Item
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
