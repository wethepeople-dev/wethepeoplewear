// data/productos.js


const productos = [
    {
        id: 1,
        nombre: "Chase Your Dream",
        categoriaId: '293e8dcf-6db0-4c28-be90-c9fd4628d909',
        categoriaNombre: "Graphic T-Shirts",
        descripcion: "Una camiseta inspiradora que te motiva a perseguir tus sueños. 100% algodón.",
        colores: ["Blanco"],
        variaciones: [
            { color: "Blanco", precio: 450, tallas: ["S", "M", "L", "XL"] },
        ],
        fotos: {
            "Blanco": ["/camisas/chaseyourdream_blanca_back.png", "/camisas/chaseyourdream_blanca_both.png"]
        },
        releaseDate: "2024-06-20"
    },
    {
        id: 2,
        nombre: "Believe",
        categoriaId: '293e8dcf-6db0-4c28-be90-c9fd4628d909',
        categoriaNombre: "Graphic T-Shirts",
        descripcion: "Una camiseta que te motiva a creer en ti mismo y en tu potencial. 100% algodón.",
        colores: ["Gris"],
        variaciones: [
            { color: "Gris", precio: 420, tallas: ["S", "M", "L", "XL"] },
        ],
        fotos: {
            "Gris": ["/camisas/believe_gris_back.png", "/camisas/believe_gris_both.png"],
        },
        releaseDate: "2024-06-18"
    },
    {
        id: 3,
        nombre: "Make It Happen",
        categoriaId: '293e8dcf-6db0-4c28-be90-c9fd4628d909',
        categoriaNombre: "Graphic T-Shirts",
        descripcion: "Una camiseta que te motiva a sobrepasar los obstáculos y hacer que las cosas sucedan. 100% algodón.",
        colores: ["Negro"],
        variaciones: [
            { color: "Negro", precio: 450, tallas: ["S", "M", "L", "XL"] },
        ],
        fotos: {
            "Negro": ["/camisas/makeithappen_negra_back.png", "/camisas/makeithappen_negra_both.png"],
        },
        releaseDate: "2024-06-15"
    },
    {
        id: 4,
        nombre: "The Future",
        categoriaId: '293e8dcf-6db0-4c28-be90-c9fd4628d909',
        categoriaNombre: "Graphic T-Shirts",
        descripcion: "Una camiseta que te recuerda que tu tienes el poder de crear tu propio futuro. 100% algodón.",
        colores: ["Gris", "Blanco"],
        variaciones: [
            { color: "Gris", precio: 420, tallas: ["S", "M", "L", "XL"] },
            { color: "Blanco", precio: 420, tallas: ["S", "M", "L", "XL"] },
        ],
        fotos: {
            "Gris": ["/camisas/thefuture_gris_back.png", "/camisas/thefuture_gris_both.png"],
            "Blanco": ["/camisas/thefuture_blanca_back.png", "/camisas/thefuture_blanca_both.png"]
        },
        releaseDate: "2024-06-10"
    },
    {
        id: 5,
        nombre: "Happiness From Within",
        categoriaId: '293e8dcf-6db0-4c28-be90-c9fd4628d909',
        categoriaNombre: "Graphic T-Shirts",
        descripcion: "Una camiseta que te recuerda que la felicidad viene desde dentro. 100% algodón.",
        colores: ["Blanco"],
        variaciones: [
            { color: "Blanco", precio: 400, tallas: ["S", "M", "L", "XL"] },
        ],
        fotos: {
            "Blanco": ["/camisas/happinessfromwithin_blanca_back.png", "/camisas/happinessfromwithin_blanca_both.png"]
        },
        releaseDate: "2024-06-08"
    },
    {
        id: 6,
        nombre: "Live In The Moment",
        categoriaId: '293e8dcf-6db0-4c28-be90-c9fd4628d909',
        categoriaNombre: "Graphic T-Shirts",
        descripcion: "Una camiseta que te recuerda vivir en el presente y disfrutarlo. 100% algodón.",
        colores: ["Negro"],
        variaciones: [
            { color: "Negro", precio: 450, tallas: ["S", "M", "L", "XL"] },
        ],
        fotos: {
            "Negro": ["/camisas/liveinthemoment_negra_back.png", "/camisas/liveinthemoment_negra_both.png"],
        },
        releaseDate: "2024-06-05"
    },
    {
        id: 7,
        nombre: "Fear Of Being Average",
        categoriaId: '293e8dcf-6db0-4c28-be90-c9fd4628d909',
        categoriaNombre: "Graphic T-Shirts",
        descripcion: "Una camiseta que te inspira a sobresalir y ser único. 100% algodón.",
        colores: ["Gris", "Blanco"],
        variaciones: [
            { color: "Gris", precio: 400, tallas: ["S", "M", "L", "XL"] },
            { color: "Blanco", precio: 400, tallas: ["S", "M", "L", "XL"] },
        ],
        fotos: {
            "Gris": ["/camisas/fearofbeingaverage_gris_back.png", "/camisas/fearofbeingaverage_gris_front.png", "/camisas/fearofbeingaverage_gris_both.png"],
            "Blanco": ["/camisas/fearofbeingaverage_blanca_back.png", "/camisas/fearofbeingaverage_blanca_front.png", "/camisas/fearofbeingaverage_blanca_both.png"]
        },
        releaseDate: "2024-06-03"
    },
    {
        id: 8,
        nombre: "Club Of Dreamers",
        categoriaId: '293e8dcf-6db0-4c28-be90-c9fd4628d909',
        categoriaNombre: "Graphic T-Shirts",
        descripcion: "Una camiseta para los que se atreven a creer en sus sueños. 100% algodón.",
        colores: ["Negro", "Blanco"],
        variaciones: [
            { color: "Negro", precio: 400, tallas: ["S", "M", "L", "XL"] },
            { color: "Blanco", precio: 400, tallas: ["S", "M", "L", "XL"] },
        ],
        fotos: {
            "Negro": ["/camisas/clubofdreamers_negra_back.png", "/camisas/clubofdreamers_negra_both.png"],
            "Blanco": ["/camisas/clubofdreamers_blanca_back.png", "/camisas/clubofdreamers_blanca_both.png"]
        },
        releaseDate: "2024-06-01"
    },
    {
        id: 9,
        nombre: "Change The World",
        categoriaId: '293e8dcf-6db0-4c28-be90-c9fd4628d909',
        categoriaNombre: "Graphic T-Shirts",
        descripcion: "Una camiseta que te motiva a cambiar el mundo con tus talentos únicos. 100% algodón.",
        colores: ["Blanco"],
        variaciones: [
            { color: "Blanco", precio: 450, tallas: ["S", "M", "L", "XL"] },
        ],
        fotos: {
            "Blanco": ["/camisas/changetheworld_blanca_back.png", "/camisas/changetheworld_blanca_both.png"]
        },
        releaseDate: "2024-05-28"
    },
    {
        id: 10,
        nombre: "Art In Our Lives",
        categoriaId: '293e8dcf-6db0-4c28-be90-c9fd4628d909',
        categoriaNombre: "Graphic T-Shirts",
        descripcion: "Una camiseta que nos recuerda encontrar lo bello en lo ordinario. 100% algodón.",
        colores: ["Negro"],
        variaciones: [
            { color: "Negro", precio: 420, tallas: ["S", "M", "L", "XL"] },
        ],
        fotos: {
            "Negro": ["/camisas/artinourlives_negra_back.png", "/camisas/artinourlives_negra_both.png"],
        },
        releaseDate: "2024-05-25"
    },
    {
        id: 11,
        nombre: "The Time Is Now",
        categoriaId: '293e8dcf-6db0-4c28-be90-c9fd4628d909',
        categoriaNombre: "Graphic T-Shirts",
        descripcion: "Una camiseta que te recuerda que no existe el tiempo perfecto para lanzarte. 100% algodón.",
        colores: ["Negro"],
        variaciones: [
            { color: "Negro", precio: 450, tallas: ["S", "M", "L", "XL"] },
        ],
        fotos: {
            "Negro": ["/camisas/thetimeisnow_negra_back.png", "/camisas/thetimeisnow_negra_both.png"],
        },
        releaseDate: "2024-05-20"
    },
    {
        id: 12,
        nombre: "Dream Big",
        categoriaId: '293e8dcf-6db0-4c28-be90-c9fd4628d909',
        categoriaNombre: "Graphic T-Shirts",
        descripcion: "Una camiseta que te motiva a soñar en grande. 100% algodón.",
        colores: ["Blanco"],
        variaciones: [
            { color: "Blanco", precio: 400, tallas: ["S", "M", "L", "XL"] },
        ],
        fotos: {
            "Blanco": ["/camisas/dreambig_blanca_back.png", "/camisas/dreambig_blanca_front.png", "/camisas/dreambig_blanca_both.png"]
        },
        releaseDate: "2024-05-15"
    },
    {
        id: 13,
        nombre: "Seek The Positive",
        categoriaId: '293e8dcf-6db0-4c28-be90-c9fd4628d909',
        categoriaNombre: "Graphic T-Shirts",
        descripcion: "Una camiseta que te recuerda a siempre buscar lo positivo. 100% algodón.",
        colores: ["Negro", "Blanco"],
        variaciones: [
            { color: "Negro", precio: 420, tallas: ["S", "M", "L", "XL"] },
            { color: "Blanco", precio: 420, tallas: ["S", "M", "L", "XL"] },
        ],
        fotos: {
            "Negro": ["/camisas/seekthepositive_negra_back.png", "/camisas/seekthepositive_negra_front.png", "/camisas/seekthepositive_negra_both.png"],
            "Blanco": ["/camisas/seekthepositive_blanca_back.png", "/camisas/seekthepositive_blanca_front.png", "/camisas/seekthepositive_blanca_both.png"]
        },
        releaseDate: "2024-05-10"
    },
    {
        id: 14,
        nombre: "Good Things Are Coming",
        categoriaId: '293e8dcf-6db0-4c28-be90-c9fd4628d909',
        categoriaNombre: "Graphic T-Shirts",
        descripcion: "Una camiseta que te motiva a creer que cosas buenas están por venir. 100% algodón.",
        colores: ["Blanco"],
        variaciones: [
            { color: "Blanco", precio: 450, tallas: ["S", "M", "L", "XL"] },
        ],
        fotos: {
            "Blanco": ["/camisas/goodthingarecoming_blanca_back.png", "/camisas/goodthingarecoming_blanca_both.png"]
        },
        releaseDate: "2024-05-05"
    },
    {
        id: 15,
        nombre: "Come On Kid, This Is Your Dream",
        categoriaId: '293e8dcf-6db0-4c28-be90-c9fd4628d909',
        categoriaNombre: "Graphic T-Shirts",
        descripcion: "Una camiseta inspiradora para aquellos que vencen el miedo y siguen sus sueños. 100% algodón.",
        colores: ["Negro"],
        variaciones: [
            { color: "Negro", precio: 400, tallas: ["S", "M", "L", "XL"] },
        ],
        fotos: {
            "Negro": ["/camisas/comeonkid_negra_back.png", "/camisas/comeonkid_negra_both.png"],
        },
        releaseDate: "2024-05-01"
    }
];

module.exports = productos;