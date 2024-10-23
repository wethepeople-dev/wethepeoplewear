import { Html, Head, Preview, Body, Container, Heading, Text, Button, Section, Hr } from '@react-email/components';
import { formatCurrency } from '@/lib/utils';

interface ConfirmationEmailProps {
    name: string;
    total: number;
    discount: number;
    comments: string;
    addressLine: string;
    city: string;
    state: string;
    postalCode: string;
    session_id: string;
    host: string | undefined;
    products: Array<{
        nombre: string;
        tamanio: string;
        color: string;
        cantidad: number;
        precio: number;
    }>;
}

export const ConfirmationEmail = ({
    name,
    total,
    discount,
    comments,
    addressLine,
    city,
    state,
    postalCode,
    session_id,
    host,
    products,
}: ConfirmationEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>Confirmación de tu pedido</Preview>
            <Body style={main}>
                <Container style={container}>
                    <div style={{ textAlign: 'center' }}>
                        <img src={'https://wethepeoplewear.vercel.app/logos/icon.png'} alt="Logo" style={{ width: '100px', borderRadius: '50%' }} />
                    </div>
                    <Heading style={heading}>¡Gracias por tu pedido, {name}!</Heading>
                    <Text>Tu orden ha sido recibida. Estamos preparando tu paquete para envío.</Text>

                    <Hr style={hr} />

                    <Heading style={heading}>Productos</Heading>
                    {products.map((product, index) => (
                        <Text key={index}>
                            <strong>{product.nombre}</strong> ({product.tamanio} - {product.color}), {product.cantidad} x ${product.precio}
                        </Text>
                    ))}

                    <Hr style={hr} />

                    <Section>
                        <Heading style={heading}>Resumen de compra</Heading>
                        <Text><strong>Precio original:</strong> {formatCurrency(total)} MXN</Text>
                        <Text><strong>Descuento:</strong> {formatCurrency(total * discount)} MXN</Text>
                        <Text><strong>Total:</strong> {formatCurrency(total * (1 - discount))} MXN</Text>
                        {comments && <Text><strong>Mensaje:</strong> {comments}</Text>}
                    </Section>

                    <Hr style={hr} />

                    <Section>
                        <Heading style={heading}>Envío</Heading>
                        <Text><strong>Dirección de envío:</strong> {addressLine}, {city}, {state}, {postalCode}</Text>
                    </Section>

                    <Hr style={hr} />

                    <Section style={{ textAlign: 'center' }}>
                        <Text>Puedes revisar tu pedido aquí:</Text>
                        <Button
                            style={{ ...button, padding: '10px 20px' }}
                            href={`${host}/success?session_id=${session_id}`}
                        >
                            Ver mi pedido
                        </Button>
                    </Section>

                    <Text style={{ textAlign: 'center' }}>¡Gracias por elegirnos!</Text>

                    <Hr style={hr} />

                    {/* Footer Section */}
                    <Section style={{ textAlign: 'center', marginTop: '20px' }}>
                        <Text style={{ fontSize: '12px', color: '#666' }}>
                            Contáctanos: <a href="mailto:hola@wethepeoplewear.com.mx">hola@wethepeoplewear.com.mx</a>
                        </Text>
                        <Text style={{ fontSize: '12px', color: '#666' }}>
                            Síguenos en:
                            <a href="https://www.instagram.com/wethepeople.wear/" style={{ marginLeft: '5px' }}>Instagram</a> |
                            <a href="https://www.tiktok.com/@wethepeople.wear" style={{ marginLeft: '5px' }}>TikTok</a>
                        </Text>
                        <Text style={{ fontSize: '12px', color: '#666' }}>
                            Visita nuestra página: <a href="https://wethepeoplewear.com.mx">wethepeoplewear.com.mx</a>
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

const main = {
    backgroundColor: '#f6f9fc',
    fontFamily: 'Arial, sans-serif',
};

const container = {
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    maxWidth: '600px',
    margin: '0 auto',
};

const heading = {
    color: '#333333',
    fontSize: '24px',
    marginBottom: '15px',
};

const hr = {
    borderColor: '#dddddd',
    margin: '20px 0',
};

const button = {
    backgroundColor: '#007bff',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    fontSize: '16px',
};
