// data/productos.ts

export interface Variacion {
    color: string;
    precio: number;
    tallas: string[];
}

export interface Producto {
    id: number;
    nombre: string;
    categoriaId: number;
    categoriaNombre: string;
    descripcion: string;
    colores: string[];
    variaciones: Variacion[];
    fotos: { [color: string]: string[] };
    releaseDate: string; // Agregado para la fecha de lanzamiento
}

export const productos: Producto[] = [
    {
        id: 1,
        nombre: "Chase Your Dream",
        categoriaId: 1,
        categoriaNombre: "Graphic T-Shirts",
        descripcion: "Una camiseta inspiradora que te recuerda perseguir tus sueños.",
        colores: ["Blanco"],
        variaciones: [
            // { color: "Negro", precio: 450, tallas: ["S", "M", "L", "XL"] },
            // { color: "Gris", precio: 450, tallas: ["S", "M", "L", "XL"] },
            { color: "Blanco", precio: 450, tallas: ["S", "M", "L", "XL"] },
        ],
        fotos: {
            // "Negro": ["https://example.com/images/chase-your-dream-black-front.png", "https://example.com/images/chase-your-dream-black-back.png"],
            // "Gris": ["https://example.com/images/chase-your-dream-grey-front.png", "https://example.com/images/chase-your-dream-grey-back.png"],
            "Blanco": ["/camisas/chaseyourdream_blanca_back.png", "/camisas/chaseyourdream_blanca_both.png"]
        },
        releaseDate: "2024-06-20"
    },
    {
        id: 2,
        nombre: "Believe",
        categoriaId: 1,
        categoriaNombre: "Graphic T-Shirts",
        descripcion: "Una camiseta que te anima a creer en ti mismo.",
        colores: ["Gris"],
        variaciones: [
            // { color: "Negro", precio: 420, tallas: ["S", "M", "L", "XL"] },
            { color: "Gris", precio: 420, tallas: ["S", "M", "L", "XL"] },
            // { color: "Blanco", precio: 420, tallas: ["S", "M", "L", "XL"] },
        ],
        fotos: {
            // "Negro": ["https://example.com/images/believe-black-front.png", "https://example.com/images/believe-black-back.png"],
            "Gris": ["/camisas/believe_gris_back.png", "/camisas/believe_gris_both.png"],
            // "Blanco": ["https://example.com/images/believe-white-front.png", "https://example.com/images/believe-white-back.png"]
        },
        releaseDate: "2024-06-18"
    },
    {
        id: 3,
        nombre: "Make It Happen",
        categoriaId: 1,
        categoriaNombre: "Graphic T-Shirts",
        descripcion: "Camiseta que te motiva a hacer que las cosas sucedan.",
        colores: ["Negro"],
        variaciones: [
            { color: "Negro", precio: 450, tallas: ["S", "M", "L", "XL"] },
            // { color: "Gris", precio: 450, tallas: ["S", "M", "L", "XL"] },
            // { color: "Blanco", precio: 450, tallas: ["S", "M", "L", "XL"] },
        ],
        fotos: {
            "Negro": ["/camisas/makeithappen_negra_back.png", "/camisas/makeithappen_negra_both.png"],
            // "Gris": ["https://example.com/images/make-it-happen-grey-front.png", "https://example.com/images/make-it-happen-grey-back.png"],
            // "Blanco": ["https://example.com/images/make-it-happen-white-front.png", "https://example.com/images/make-it-happen-white-back.png"]
        },
        releaseDate: "2024-06-15"
    },
    {
        id: 4,
        nombre: "The Future",
        categoriaId: 1,
        categoriaNombre: "Graphic T-Shirts",
        descripcion: "Una camiseta que te recuerda que el futuro está en tus manos.",
        colores: ["Gris", "Blanco"],
        variaciones: [
            // { color: "Negro", precio: 420, tallas: ["S", "M", "L", "XL"] },
            { color: "Gris", precio: 420, tallas: ["S", "M", "L", "XL"] },
            { color: "Blanco", precio: 420, tallas: ["S", "M", "L", "XL"] },
        ],
        fotos: {
            // "Negro": ["https://example.com/images/the-future-black-front.png", "https://example.com/images/the-future-black-back.png"],
            "Gris": ["/camisas/thefuture_gris_back.png", "/camisas/thefuture_gris_both.png"],
            "Blanco": ["/camisas/thefuture_blanca_back.png", "/camisas/thefuture_blanca_both.png"]
        },
        releaseDate: "2024-06-10"
    },
    {
        id: 5,
        nombre: "Happiness From Within",
        categoriaId: 1,
        categoriaNombre: "Graphic T-Shirts",
        descripcion: "Una camiseta que te recuerda que la felicidad viene desde dentro.",
        colores: ["Blanco"],
        variaciones: [
            // { color: "Negro", precio: 400, tallas: ["S", "M", "L", "XL"] },
            // { color: "Gris", precio: 400, tallas: ["S", "M", "L", "XL"] },
            { color: "Blanco", precio: 400, tallas: ["S", "M", "L", "XL"] },
        ],
        fotos: {
            // "Negro": ["https://example.com/images/happiness-from-within-black-front.png", "https://example.com/images/happiness-from-within-black-back.png"],
            // "Gris": ["https://example.com/images/happiness-from-within-grey-front.png", "https://example.com/images/happiness-from-within-grey-back.png"],
            "Blanco": ["/camisas/happinessfromwithin_blanca_back.png", "/camisas/happinessfromwithin_blanca_both.png"]
        },
        releaseDate: "2024-06-08"
    },
    {
        id: 6,
        nombre: "Live In The Moment",
        categoriaId: 1,
        categoriaNombre: "Graphic T-Shirts",
        descripcion: "Camiseta que te motiva a vivir el momento.",
        colores: ["Negro"],
        variaciones: [
            { color: "Negro", precio: 450, tallas: ["S", "M", "L", "XL"] },
            // { color: "Gris", precio: 450, tallas: ["S", "M", "L", "XL"] },
            // { color: "Blanco", precio: 450, tallas: ["S", "M", "L", "XL"] },
        ],
        fotos: {
            "Negro": ["/camisas/liveinthemoment_negra_back.png", "/camisas/liveinthemoment_negra_both.png"],
            // "Gris": ["https://example.com/images/live-in-the-moment-grey-front.png", "https://example.com/images/live-in-the-moment-grey-back.png"],
            // "Blanco": ["https://example.com/images/live-in-the-moment-white-front.png", "https://example.com/images/live-in-the-moment-white-back.png"]
        },
        releaseDate: "2024-06-05"
    },
    {
        id: 7,
        nombre: "Fear Of Being Average",
        categoriaId: 1,
        categoriaNombre: "Graphic T-Shirts",
        descripcion: "Una camiseta que te inspira a sobresalir y evitar la mediocridad.",
        colores: ["Gris", "Blanco"],
        variaciones: [
            // { color: "Negro", precio: 400, tallas: ["S", "M", "L", "XL"] },
            { color: "Gris", precio: 400, tallas: ["S", "M", "L", "XL"] },
            { color: "Blanco", precio: 400, tallas: ["S", "M", "L", "XL"] },
        ],
        fotos: {
            // "Negro": ["https://example.com/images/fear-of-being-average-black-front.png", "https://example.com/images/fear-of-being-average-black-back.png"],
            "Gris": ["/camisas/fearofbeingaverage_gris_back.png", "/camisas/fearofbeingaverage_gris_front.png", "/camisas/fearofbeingaverage_gris_both.png"],
            "Blanco": ["/camisas/fearofbeingaverage_blanca_back.png", "/camisas/fearofbeingaverage_blanca_front.png", "/camisas/fearofbeingaverage_blanca_both.png"]
        },
        releaseDate: "2024-06-03"
    },
    {
        id: 8,
        nombre: "Club Of Dreamers",
        categoriaId: 1,
        categoriaNombre: "Graphic T-Shirts",
        descripcion: "Camiseta para aquellos que sueñan en grande.",
        colores: ["Negro", "Blanco"],
        variaciones: [
            { color: "Negro", precio: 400, tallas: ["S", "M", "L", "XL"] },
            // { color: "Gris", precio: 400, tallas: ["S", "M", "L", "XL"] },
            { color: "Blanco", precio: 400, tallas: ["S", "M", "L", "XL"] },
        ],
        fotos: {
            "Negro": ["/camisas/clubofdreamers_negra_back.png", "/camisas/clubofdreamers_negra_both.png"],
            // "Gris": ["https://example.com/images/club-of-dreamers-grey-front.png", "https://example.com/images/club-of-dreamers-grey-back.png"],
            "Blanco": ["/camisas/clubofdreamers_blanca_back.png", "/camisas/clubofdreamers_blanca_both.png"]
        },
        releaseDate: "2024-06-01"
    },
    {
        id: 9,
        nombre: "Change The World",
        categoriaId: 1,
        categoriaNombre: "Graphic T-Shirts",
        descripcion: "Una camiseta que te motiva a cambiar el mundo.",
        colores: ["Blanco"],
        variaciones: [
            // { color: "Negro", precio: 450, tallas: ["S", "M", "L", "XL"] },
            // { color: "Gris", precio: 450, tallas: ["S", "M", "L", "XL"] },
            { color: "Blanco", precio: 450, tallas: ["S", "M", "L", "XL"] },
        ],
        fotos: {
            // "Negro": ["https://example.com/images/change-the-world-black-front.png", "https://example.com/images/change-the-world-black-back.png"],
            // "Gris": ["https://example.com/images/change-the-world-grey-front.png", "https://example.com/images/change-the-world-grey-back.png"],
            "Blanco": ["/camisas/changetheworld_blanca_back.png", "/camisas/changetheworld_blanca_both.png"]
        },
        releaseDate: "2024-05-28"
    },
    {
        id: 10,
        nombre: "Art In Our Lives",
        categoriaId: 1,
        categoriaNombre: "Graphic T-Shirts",
        descripcion: "Una camiseta que celebra el arte en nuestras vidas.",
        colores: ["Negro"],
        variaciones: [
            { color: "Negro", precio: 420, tallas: ["S", "M", "L", "XL"] },
            // { color: "Gris", precio: 420, tallas: ["S", "M", "L", "XL"] },
            // { color: "Blanco", precio: 420, tallas: ["S", "M", "L", "XL"] },
        ],
        fotos: {
            "Negro": ["/camisas/artinourlives_negra_back.png", "/camisas/artinourlives_negra_both.png"],
            // "Gris": ["https://example.com/images/art-in-our-lives-grey-front.png", "https://example.com/images/art-in-our-lives-grey-back.png"],
            // "Blanco": ["https://example.com/images/art-in-our-lives-white-front.png", "https://example.com/images/art-in-our-lives-white-back.png"]
        },
        releaseDate: "2024-05-25"
    },
    {
        id: 11,
        nombre: "The Time Is Now",
        categoriaId: 1,
        categoriaNombre: "Graphic T-Shirts",
        descripcion: "Una camiseta que te recuerda que el momento es ahora.",
        colores: ["Negro"],
        variaciones: [
            { color: "Negro", precio: 450, tallas: ["S", "M", "L", "XL"] },
            // { color: "Gris", precio: 450, tallas: ["S", "M", "L", "XL"] },
            // { color: "Blanco", precio: 450, tallas: ["S", "M", "L", "XL"] },
        ],
        fotos: {
            "Negro": ["/camisas/thetimeisnow_negra_back.png", "/camisas/thetimeisnow_negra_both.png"],
            // "Gris": ["https://example.com/images/the-time-is-now-grey-front.png", "https://example.com/images/the-time-is-now-grey-back.png"],
            // "Blanco": ["https://example.com/images/the-time-is-now-white-front.png", "https://example.com/images/the-time-is-now-white-back.png"]
        },
        releaseDate: "2024-05-20"
    },
    {
        id: 12,
        nombre: "Dream Big",
        categoriaId: 1,
        categoriaNombre: "Graphic T-Shirts",
        descripcion: "Una camiseta que te motiva a soñar en grande.",
        colores: ["Blanco"],
        variaciones: [
            // { color: "Negro", precio: 400, tallas: ["S", "M", "L", "XL"] },
            // { color: "Gris", precio: 400, tallas: ["S", "M", "L", "XL"] },
            { color: "Blanco", precio: 400, tallas: ["S", "M", "L", "XL"] },
        ],
        fotos: {
            // "Negro": ["https://example.com/images/dream-big-black-front.png", "https://example.com/images/dream-big-black-back.png"],
            // "Gris": ["https://example.com/images/dream-big-grey-front.png", "https://example.com/images/dream-big-grey-back.png"],
            "Blanco": ["/camisas/dreambig_blanca_back.png", "/camisas/dreambig_blanca_front.png", "/camisas/dreambig_blanca_both.png"]
        },
        releaseDate: "2024-05-15"
    },
    {
        id: 13,
        nombre: "Seek The Positive",
        categoriaId: 1,
        categoriaNombre: "Graphic T-Shirts",
        descripcion: "Camiseta que te recuerda buscar lo positivo en la vida.",
        colores: ["Negro", "Blanco"],
        variaciones: [
            { color: "Negro", precio: 420, tallas: ["S", "M", "L", "XL"] },
            // { color: "Gris", precio: 420, tallas: ["S", "M", "L", "XL"] },
            { color: "Blanco", precio: 420, tallas: ["S", "M", "L", "XL"] },
        ],
        fotos: {
            "Negro": ["/camisas/seekthepositive_negra_back.png", "/camisas/seekthepositive_negra_front.png", "/camisas/seekthepositive_negra_both.png"],
            // "Gris": ["https://example.com/images/seek-the-positive-grey-front.png", "https://example.com/images/seek-the-positive-grey-back.png"],
            "Blanco": ["/camisas/seekthepositive_blanca_back.png", "/camisas/seekthepositive_blanca_front.png", "/camisas/seekthepositive_blanca_both.png"]
        },
        releaseDate: "2024-05-10"
    },
    {
        id: 14,
        nombre: "Good Things Are Coming",
        categoriaId: 1,
        categoriaNombre: "Graphic T-Shirts",
        descripcion: "Una camiseta que te motiva a creer que cosas buenas están por venir.",
        colores: ["Blanco"],
        variaciones: [
            // { color: "Negro", precio: 450, tallas: ["S", "M", "L", "XL"] },
            // { color: "Gris", precio: 450, tallas: ["S", "M", "L", "XL"] },
            { color: "Blanco", precio: 450, tallas: ["S", "M", "L", "XL"] },
        ],
        fotos: {
            // "Negro": ["https://example.com/images/good-things-are-coming-black-front.png", "https://example.com/images/good-things-are-coming-black-back.png"],
            // "Gris": ["https://example.com/images/good-things-are-coming-grey-front.png", "https://example.com/images/good-things-are-coming-grey-back.png"],
            "Blanco": ["/camisas/goodthingarecoming_blanca_back.png", "/camisas/goodthingarecoming_blanca_both.png"]
        },
        releaseDate: "2024-05-05"
    },
    {
        id: 15,
        nombre: "Come On Kid, This Is Your Dream",
        categoriaId: 1,
        categoriaNombre: "Graphic T-Shirts",
        descripcion: "Camiseta inspiradora para aquellos que siguen sus sueños.",
        colores: ["Negro"],
        variaciones: [
            { color: "Negro", precio: 400, tallas: ["S", "M", "L", "XL"] },
            // { color: "Gris", precio: 400, tallas: ["S", "M", "L", "XL"] },
            // { color: "Blanco", precio: 400, tallas: ["S", "M", "L", "XL"] },
        ],
        fotos: {
            "Negro": ["/camisas/comeonkid_negra_back.png", "/camisas/comeonkid_negra_both.png"],
            // "Gris": ["https://example.com/images/come-on-kid-this-is-your-dream-grey-front.png", "https://example.com/images/come-on-kid-this-is-your-dream-grey-back.png"],
            // "Blanco": ["https://example.com/images/come-on-kid-this-is-your-dream-white-front.png", "https://example.com/images/come-on-kid-this-is-your-dream-white-back.png"]
        },
        releaseDate: "2024-05-01"
    }
];
