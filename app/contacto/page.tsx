import ContactoContent from "./ContactoContent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contacto",
    description: "Contáctanos para cualquier duda o comentario.",
};

export default function Contacto() {

    return <ContactoContent />;
}
