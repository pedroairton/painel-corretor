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
    last_contact?: string;
    priority: string | number;
    created_at: string;
}