import type { Contact } from "./contact.model";

export interface Client{
    id: number;
    name: string;
    email?: string;
    phone: string;
    income?: number;
    birth_date?: string;
    needs?: string;
    has_property: boolean;
    marital_status?: string;
    has_children: boolean;
    notes?: string;
    interest_status: {
        value: string;
        label: string;
    }
    contacts_count: number;
    last_contact?: string;
    contacts?: Contact[];
    priority: string | number;
    created_at: string;
}