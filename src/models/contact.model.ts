export interface Contact{
    id: number;
    contact_type : {
        value: string;
        label: string;  
    }
    contact_date: string;
    result: {
        value: string;
        label: string;
    }
    feedback: string;
    interest_status_after : {
        value: string;
        label: string;
    }
}