import { FormData } from '@/components/ContactForm';

export function sendEmail(data: FormData) {
    const apiEndpoint = '/api/contactFormEmail';

    fetch(apiEndpoint, {
        method: 'POST',
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((response) => {
            alert(response.message);
        })
        .catch((err) => {
            alert(err);
        });
}