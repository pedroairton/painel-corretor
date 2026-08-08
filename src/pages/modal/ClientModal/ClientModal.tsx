import { useEffect } from "react";
import { Form, Input, InputNumber, Modal, Select, Switch } from "antd";
import type { Client } from "../../../models/client.model";
import { apiService } from "../../../services/api.service";

interface ClientModalProps {
  open: boolean;
  onCancel: () => void;
  clientData: Client | null;
}

interface ClientFormValues {
  name: string;
  phone: string;
  email?: string;
  income?: number;
  birth_date?: string;
  needs?: string;
  has_property: boolean;
  marital_status?: string;
  has_children: boolean;
  notes?: string;
  interest_status: string;
  priority: number;
}

const formatPhone = (value: string): string => {
  const numbers = value.replace(/\D/g, "").slice(0, 11);

  if (numbers.length <= 2) {
    return numbers.length ? `(${numbers}` : "";
  }

  if (numbers.length <= 7) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  }

  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
};

const parseCurrency = (value?: string | number): number | undefined => {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  if (typeof value === "number") {
    return value;
  }

  const normalized = value
    .replace(/\s/g, "")
    .replace("R$", "")
    .replace(/\./g, "")
    .replace(",", ".");

  const number = Number(normalized);

  return Number.isNaN(number) ? undefined : number;
};

const formatCurrency = (value?: string | number): string => {
  if (value === undefined || value === null || value === "") {
    return "";
  }

  const number = typeof value === "number" ? value : parseCurrency(value);

  if (number === undefined) {
    return "";
  }

  return number.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export default function ClientModal({
  open,
  onCancel,
  clientData,
}: ClientModalProps) {
  const [form] = Form.useForm<ClientFormValues>();

  const isEditing = !!clientData;

  useEffect(() => {
    if (!open) {
      return;
    }

    if (clientData) {
      form.setFieldsValue({
        name: clientData.name ?? "",
        phone: formatPhone(clientData.phone ?? ""),
        email: clientData.email ?? "",
        income: clientData.income ?? undefined,
        birth_date: clientData.birth_date ?? "",
        needs: clientData.needs ?? "",
        has_property: clientData.has_property ?? false,
        marital_status: clientData.marital_status ?? undefined,
        has_children: clientData.has_children ?? false,
        notes: clientData.notes ?? "",
        interest_status:
          clientData.interest_status?.value ??
          clientData.interest_status ??
          undefined,
        priority: clientData.priority ? Number(clientData.priority) : 1,
      });
    } else {
      form.resetFields();

      form.setFieldsValue({
        has_property: false,
        has_children: false,
        priority: 1,
      });
    }
  }, [clientData, open, form]);

  const handleFinish = (values: ClientFormValues) => {
    const payload = {
      ...values,

      phone: values.phone.replace(/\D/g, ""),

      income: values.income !== null ? values.income : undefined,
    };

    console.log(payload);

    if (isEditing) {
      // editar
      if(!clientData?.id) {
        alert("Erro ao editar cliente.");
        return
      }
      apiService.updateClient(clientData?.id, payload);
    } else {
      // cadastrar
      apiService.createClient(payload);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title={isEditing ? "Editar Cliente" : "Novo Cliente"}
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
          label="Nome"
          name="name"
          rules={[
            {
              required: true,
              message: "Informe o nome do cliente.",
            },
          ]}
        >
          <Input placeholder="Nome" />
        </Form.Item>

        <Form.Item
          label="Telefone"
          name="phone"
          rules={[
            {
              required: true,
              message: "Informe o telefone.",
            },
          ]}
        >
          <Input
            placeholder="(99) 99999-9999"
            maxLength={15}
            onChange={(event) => {
              const formatted = formatPhone(event.target.value);

              form.setFieldValue("phone", formatted);
            }}
          />
        </Form.Item>

        <Form.Item
          label="E-mail"
          name="email"
          rules={[
            {
              type: "email",
              message: "Informe um e-mail válido.",
            },
          ]}
        >
          <Input type="email" placeholder="email@exemplo.com" />
        </Form.Item>

        <Form.Item label="Renda" name="income">
          <InputNumber
            style={{ width: "100%" }}
            prefix="R$"
            placeholder="0,00"
            min={0}
            precision={2}
            decimalSeparator=","
            formatter={(value) => {
              if (
                value === undefined ||
                value === null
              ) {
                return "";
              }

              return formatCurrency(value);
            }}
            parser={(displayValue: string | undefined) => {
              const value = parseCurrency(displayValue);
              return value ?? 0;
            }}
          />
        </Form.Item>

        <Form.Item label="Data de nascimento" name="birth_date">
          <Input type="date" />
        </Form.Item>

        <Form.Item label="Necessidades" name="needs">
          <Input.TextArea
            placeholder="Descreva as necessidades do cliente"
            rows={3}
          />
        </Form.Item>

        <Form.Item
          label="Possui imóvel?"
          name="has_property"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item label="Estado civil" name="marital_status">
          <Select
            placeholder="Selecione o estado civil"
            allowClear
            options={[
              {
                label: "Solteiro",
                value: "single",
              },
              {
                label: "Casado",
                value: "married",
              },
              {
                label: "Divorciado",
                value: "divorced",
              },
              {
                label: "Viúvo",
                value: "widowed",
              },
              {
                label: "União Estável",
                value: "stable_union",
              }
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Possui filhos?"
          name="has_children"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label="Status de interesse"
          name="interest_status"
          rules={[
            {
              required: true,
              message: "Selecione o status de interesse.",
            },
          ]}
        >
          <Select
            placeholder="Selecione o status"
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
          />
        </Form.Item>

        <Form.Item
          label="Prioridade"
          name="priority"
          rules={[
            {
              required: true,
              message: "Informe a prioridade.",
            },
          ]}
        >
          <Select
            options={[
              {
                label: "⭐",
                value: 1,
              },
              {
                label: "⭐⭐",
                value: 2,
              },
              {
                label: "⭐⭐⭐",
                value: 3,
              },
              {
                label: "⭐⭐⭐⭐",
                value: 4,
              },
              {
                label: "⭐⭐⭐⭐⭐",
                value: 5,
              },
            ]}
          />
        </Form.Item>

        <Form.Item label="Observações" name="notes">
          <Input.TextArea placeholder="Observações adicionais" rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
