// components/emails/DeliveryStatusEmail.tsx
import { Html, Head, Hr, Preview, Body, Container, Heading, Text, Section, Link, Button } from '@react-email/components';

interface DeliveryStatusEmailProps {
    // client
    name: string;
    addressLine: string;
    municipio: string;
    city: string;
    state: string;
    postalCode: string;
    // order
    total: number;
    discount: number;
    comments: string;
    shipping_method: string;
    shipping_cost: number;
    shipping_status: string;
    tracking_url?: string;
    session_id: string;
    // products
    products: Array<{
        nombre: string;
        tamanio: string;
        color: string;
        cantidad: number;
        precio: number;
    }>;
    // other
    host: string | undefined;
}

const nombres_playeras: { [key: string]: string } = {
    'Chase Your Dream': `chaseyourdream`,
    'Believe': `believe`,
    'Make It Happen': `makeithappen`,
    'The Future': `thefuture`,
    'Happiness From Within': `happinessfromwithin`,
    'Live In The Moment': `liveinthemoment`,
    'Fear Of Being Average': `fearofbeingaverage`,
    'Club Of Dreamers': `clubofdreamers`,
    'Change The World': `changetheworld`,
    'Art In Our Lives': `artinourlives`,
    'The Time Is Now': `thetimeisnow`,
    'Dream Big': `dreambig`,
    'Seek The Positive': `seekthepositive`,
    'Good Things Are Coming': `goodthingarecoming`,
    'Come On Kid, This Is Your Dream': `comeonkid`,
};

const getCodeName = (shirtName: string): string | undefined => {
    return nombres_playeras[shirtName];
};

export const DeliveryStatusEmail = ({
    // client
    name,
    addressLine,
    municipio,
    city,
    state,
    postalCode,
    // order
    total,
    discount,
    comments,
    shipping_method,
    shipping_cost,
    shipping_status,
    tracking_url,
    session_id,
    // products
    products,
    // other
    host,
}: DeliveryStatusEmailProps) => {
    const isHomeDelivery = shipping_method === 'local' || shipping_method === 'nacional';
    const message = isHomeDelivery
        ? `Tu pedido ha sido enviado exitosamente y pronto será entregado en tu domicilio. Puedes rastrear los detalles de la entrega aquí:`
        : `Tu pedido está listo para ser recogido en Collectif. Por favor, pasa por él en cuanto te sea posible.`;

    return (
        <Html>
            <Head />
            <Preview>Notificación de entrega</Preview>
            <Body style={main}>
                <Container style={container}>
                    <div style={{ marginBottom: '10px' }}>
                        <img src={`https://wethepeoplewear.vercel.app/logos/icon.png`} alt="Logo" style={{ width: '60px', borderRadius: '50%' }} />
                    </div>
                    <Heading style={heading}>¡Hola, {name}!</Heading>
                    <Text>{message}</Text>

                    {isHomeDelivery && tracking_url && (
                        <Section>
                            <Button
                                style={{ ...button, margin: '20px 0' }}
                                href={`${host}/success?session_id=${session_id}`}
                            >
                                Rastrear pedido
                            </Button>
                            <Text><strong>Dirección de envío:</strong></Text>
                            <Text>{addressLine}, {municipio}, {city}, {state}, {postalCode}</Text>
                        </Section>

                    )}

                    {!isHomeDelivery && (
                        <Section>
                            <Text><strong>Ubicación de recogida:</strong></Text>
                            <Text>Río Guadalquivir 320 Ote, Col. Del Valle, San Pedro Garza García, Nuevo León, CP 66220</Text>
                            <Text>https://maps.app.goo.gl/ZdFY7pYak5pMWfTT9</Text>
                        </Section>
                    )}

                    <Hr style={hr} />

                    <Heading style={heading}>Productos</Heading>
                    {products.map((product, index) => (
                        <div key={index} style={sideToSide}>
                            <div>
                                <img src={`https://wethepeoplewear.vercel.app/camisas/${getCodeName(product.nombre)}_${product.color == 'Negro' ? 'negra' : product.color == 'Blanco' ? 'blanca' : product.color == 'Gris' ? 'gris' : ''}_back.png`} alt={product.nombre} style={{ width: '80px', marginRight: '10px' }} />
                            </div>
                            <Text>
                                <strong>{product.nombre}</strong> ({product.tamanio} - {product.color}) <br />
                                {product.cantidad} x ${product.precio}
                            </Text>
                        </div>
                    ))}

                    <Hr style={hr} />

                    <Text style={{ textAlign: 'center' }}>¡Gracias por elegirnos!</Text>

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

const sideToSide = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: '5px',
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

const button = {
    backgroundColor: '#007bff',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    fontSize: '16px',
};

const hr = {
    borderColor: '#dddddd',
    margin: '20px 0',
};