import CatalogoContent from './CatalogoContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Catálogo",
    description: "Descubre nuestra colección de camisetas con diseños positivos y mensajes inspiradores.",
};

export default function Catalogo() {
    return <CatalogoContent />;
}
