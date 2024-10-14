import { FormData } from '@/components/ContactForm';

export async function sendEmail(data: FormData): Promise<{ message: string }> {
    const apiEndpoint = '/api/contactFormEmail';

    try {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Algo salió mal');
        }

        return result; // This will return the message from the backend
    } catch (err) {
        throw err;
    }
}