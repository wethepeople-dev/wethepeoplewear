import { Html, Head, Preview, Body, Container, Heading, Text, Button, Section, Hr } from '@react-email/components';
import { formatCurrency } from '@/lib/utils';

interface ConfirmationEmailProps {
    name: string;
    total: number;
    discount: number;
    comments: string;
    addressLine: string;
    municipio: string;
    city: string;
    state: string;
    shipping_method: string;
    shipping_cost: number;
    shipping_status: string;
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

export const ConfirmationEmail = ({
    name,
    total,
    discount,
    comments,
    addressLine,
    municipio,
    city,
    state,
    shipping_method,
    shipping_cost,
    shipping_status,
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
                        <img src={`https://wethepeoplewear.vercel.app/logos/icon.png`} alt="Logo" style={{ width: '50px', borderRadius: '50%' }} />
                    </div>
                    <Heading style={heading}>¡Gracias por tu pedido, {name}!</Heading>
                    <Text>Tu orden ha sido recibida. Estamos preparando tu paquete para envío.</Text>

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

                    <Section>
                        <Heading style={heading}>Resumen de compra</Heading>
                        <Text><strong>Precio original:</strong> {formatCurrency(total)} MXN</Text>
                        <Text><strong>Envío:</strong> {formatCurrency(shipping_cost)} MXN</Text>
                        <Text><strong>Descuento:</strong> {discount > 0 ? '-' : ''}{formatCurrency(total * discount)} MXN</Text>
                        <Text><strong>Total:</strong> {formatCurrency(total * (1 - discount) + shipping_cost)} MXN</Text>
                        {comments && <Text><strong>Mensaje:</strong> {comments}</Text>}
                    </Section>

                    <Hr style={hr} />

                    <Section>
                        <Heading style={heading}>Envío</Heading>
                        {shipping_method == 'collectif' && <Text><strong>Recolección en Collectif:</strong> Río Guadalquivir 320 ote, col. Del Valle, San Pedro Garza García, Nuevo León, CP 66220</Text>}
                        {shipping_method != 'collectif' && <Text><strong>Dirección de envío:</strong> {addressLine}, {municipio}, {city}, {state}, {postalCode}</Text>}
                        <Text><strong>Tipo de envío:</strong> {shipping_method == 'local' ? 'Envío a domicilio en Monterrey' : shipping_method == 'nacional' ? 'Envío nacional' : shipping_method == 'collectif' ? 'Recolección en Collectif' : ''}</Text>
                        <Text><strong>Estatus:</strong> {shipping_status == 'processing' ? 'En proceso' : shipping_status == 'delivered' ? 'Enviado' : shipping_status == 'completed' ? 'Paquete entregado' : "Desconocido"}</Text>
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
