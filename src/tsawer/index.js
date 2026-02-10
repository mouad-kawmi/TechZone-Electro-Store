// Fonction helper pour charger les images dynamiquement
const loadImage = (name, num) => {
    try {
        return new URL(`./${name} - ${num}.png`, import.meta.url).href;
    } catch (e) {
        console.error(`Failed to load image: ${name} - ${num}.png`, e);
        return '';
    }
};

export const localImages = {
    // Smartphones
    "Asus Zenfone 10": [
        loadImage("Asus Zenfone 10", 1),
        loadImage("Asus Zenfone 10", 2),
        loadImage("Asus Zenfone 10", 3)
    ],
    "Google Pixel 7a": [
        loadImage("Google Pixel 7a", 1),
        loadImage("Google Pixel 7a", 2),
        loadImage("Google Pixel 7a", 3)
    ],
    "Google Pixel 8": [
        loadImage("Google Pixel 8", 1),
        loadImage("Google Pixel 8", 2),
        loadImage("Google Pixel 8", 3)
    ],
    "Google Pixel 8 Pro": [
        loadImage("Google Pixel 8 Pro", 1),
        loadImage("Google Pixel 8 Pro", 2),
        loadImage("Google Pixel 8 Pro", 3)
    ],
    "Honor Magic6 Pro": [
        loadImage("Honor Magic6 Pro", 1),
        loadImage("Honor Magic6 Pro", 2),
        loadImage("Honor Magic6 Pro", 3)
    ],
    "Huawei P60 Pro": [
        loadImage("Huawei P60 Pro", 1),
        loadImage("Huawei P60 Pro", 2),
        loadImage("Huawei P60 Pro", 3)
    ],
    "Infinix Zero 30 5G": [
        loadImage("Infinix Zero 30 5G", 1),
        loadImage("Infinix Zero 30 5G", 2),
        loadImage("Infinix Zero 30 5G", 3)
    ],
    "Motorola Edge 40 Pro": [
        loadImage("Motorola Edge 40 Pro", 1),
        loadImage("Motorola Edge 40 Pro", 2),
        loadImage("Motorola Edge 40 Pro", 3)
    ],
    "Nothing Phone (2)": [
        loadImage("Nothing Phone (2)", 1),
        loadImage("Nothing Phone (2)", 2),
        loadImage("Nothing Phone (2)", 3)
    ],
    "OnePlus 12": [
        loadImage("OnePlus 12", 1),
        loadImage("OnePlus 12", 2),
        loadImage("OnePlus 12", 3)
    ],
    "OPPO Find X6 Pro": [
        loadImage("OPPO Find X6 Pro", 1),
        loadImage("OPPO Find X6 Pro", 2),
        loadImage("OPPO Find X6 Pro", 3)
    ],
    "Poco F5 Pro": [
        loadImage("Poco F5 Pro", 1),
        loadImage("Poco F5 Pro", 2),
        loadImage("Poco F5 Pro", 3)
    ],
    "Realme GT 5G": [
        loadImage("Realme GT 5G", 1),
        loadImage("Realme GT 5G", 2),
        loadImage("Realme GT 5G", 3)
    ],
    "Samsung Galaxy A54 5G": [
        loadImage("Samsung Galaxy A54 5G", 1),
        loadImage("Samsung Galaxy A54 5G", 2),
        loadImage("Samsung Galaxy A54 5G", 3)
    ],
    "Samsung Galaxy S23 FE": [
        loadImage("Samsung Galaxy S23 FE", 1),
        loadImage("Samsung Galaxy S23 FE", 2),
        loadImage("Samsung Galaxy S23 FE", 3)
    ],
    "Samsung Galaxy S24 Ultra": [
        loadImage("Samsung Galaxy S24 Ultra", 1),
        loadImage("Samsung Galaxy S24 Ultra", 2),
        loadImage("Samsung Galaxy S24 Ultra", 3)
    ],
    "Samsung Galaxy Z Flip5": [
        loadImage("Samsung Galaxy Z Flip5", 1),
        loadImage("Samsung Galaxy Z Flip5", 2),
        loadImage("Samsung Galaxy Z Flip5", 3)
    ],
    "Sony Xperia 1 V": [
        loadImage("Sony Xperia 1 V", 1),
        loadImage("Sony Xperia 1 V", 2),
        loadImage("Sony Xperia 1 V", 3)
    ],
    "Xiaomi 14 Ultra": [
        new URL('./Xiaomi 14 Ultra -1.png', import.meta.url).href,
        new URL('./Xiaomi 14 Ultra -2.png', import.meta.url).href,
        new URL('./Xiaomi 14 Ultra -3.png', import.meta.url).href
    ],
    "Xiaomi Redmi Note 13 Pro+": [
        loadImage("Xiaomi Redmi Note 13 Pro+", 1),
        loadImage("Xiaomi Redmi Note 13 Pro+", 2),
        loadImage("Xiaomi Redmi Note 13 Pro+", 3)
    ],
    "ZTE Nubia Z60 Ultra": [
        loadImage("ZTE Nubia Z60 Ultra", 1),
        loadImage("ZTE Nubia Z60 Ultra", 2),
        loadImage("ZTE Nubia Z60 Ultra", 3)
    ],
    "iPhone 14 Plus": [
        loadImage("iPhone 14 Plus", 1),
        loadImage("iPhone 14 Plus", 2),
        loadImage("iPhone 14 Plus", 3)
    ],
    "iPhone 15": [
        loadImage("iPhone 15", 1),
        loadImage("iPhone 15", 2),
        loadImage("iPhone 15", 3)
    ],
    "iPhone 15 Pro Max": [
        loadImage("iPhone 15 Pro Max", 1),
        loadImage("iPhone 15 Pro Max", 2),
        loadImage("iPhone 15 Pro Max", 3)
    ],
    "iPhone SE (2022)": [
        loadImage("iPhone SE (2022)", 1),
        loadImage("iPhone SE (2022)", 2),
        loadImage("iPhone SE (2022)", 3)
    ],

    // Laptops
    "MacBook Air M3 (13\")": [
        new URL('./MacBook Air M3  - 1.png', import.meta.url).href,
        new URL('./MacBook Air M3  - 2.png', import.meta.url).href,
        new URL('./MacBook Air M3  - 3.png', import.meta.url).href
    ],
    "MacBook Pro 14\" M3 Pro": [
        loadImage("MacBook Pro 14 M3 Pro", 1),
        loadImage("MacBook Pro 14 M3 Pro", 2),
        loadImage("MacBook Pro 14 M3 Pro", 3)
    ],
    "Dell XPS 13 (9340)": [
        loadImage("Dell XPS 13 (9340)", 1),
        loadImage("Dell XPS 13 (9340)", 2),
        loadImage("Dell XPS 13 (9340)", 3)
    ],
    "HP Spectre x360 14": [
        loadImage("HP Spectre x360 14", 1),
        loadImage("HP Spectre x360 14", 2),
        loadImage("HP Spectre x360 14", 3)
    ],
    "Lenovo Yoga Slim 7i Gen 9": [
        loadImage("Lenovo Yoga Slim 7i Gen 9", 1),
        loadImage("Lenovo Yoga Slim 7i Gen 9", 2),
        loadImage("Lenovo Yoga Slim 7i Gen 9", 3)
    ],
    "Asus Zenbook 14 OLED": [
        loadImage("Asus Zenbook 14 OLED", 1),
        loadImage("Asus Zenbook 14 OLED", 2),
        loadImage("Asus Zenbook 14 OLED", 3)
    ],
    "Asus ROG Zephyrus G14": [
        loadImage("Asus ROG Zephyrus G14", 1),
        loadImage("Asus ROG Zephyrus G14", 2),
        loadImage("Asus ROG Zephyrus G14", 3)
    ],
    "MSI Stealth 16 AI Studio": [
        loadImage("MSI Stealth 16 AI Studio", 1),
        loadImage("MSI Stealth 16 AI Studio", 2),
        loadImage("MSI Stealth 16 AI Studio", 3)
    ],
    "Acer Swift Go 14": [
        loadImage("Acer Swift Go 14", 1),
        loadImage("Acer Swift Go 14", 2),
        loadImage("Acer Swift Go 14", 3)
    ],
    "Lenovo ThinkPad X1 Carbon Gen 12": [
        loadImage("Lenovo ThinkPad X1 Carbon Gen 12", 1),
        loadImage("Lenovo ThinkPad X1 Carbon Gen 12", 2),
        loadImage("Lenovo ThinkPad X1 Carbon Gen 12", 3)
    ],

    // Tablets
    "iPad Pro 12.9\" M2": [
        new URL('./iPad Pro 12.9 M2- 1.png', import.meta.url).href,
        new URL('./iPad Pro 12.9 M2- 2.png', import.meta.url).href,
        new URL('./iPad Pro 12.9 M2- 3.png', import.meta.url).href
    ],
    "Samsung Galaxy Tab S9 Ultra": [
        loadImage("Samsung Galaxy Tab S9 Ultra", 1),
        loadImage("Samsung Galaxy Tab S9 Ultra", 2),
        loadImage("Samsung Galaxy Tab S9 Ultra", 3)
    ],
    "iPad Air (5ème Gen)": [
        loadImage("iPad Air (5ème Gen)", 1),
        loadImage("iPad Air (5ème Gen)", 2),
        loadImage("iPad Air (5ème Gen)", 3)
    ],
    "Xiaomi Pad 6": [
        loadImage("Xiaomi Pad 6", 1),
        loadImage("Xiaomi Pad 6", 2),
        loadImage("Xiaomi Pad 6", 3)
    ],
    "iPad Mini (6ème Gen)": [
        loadImage("iPad Mini (6ème Gen)", 1),
        loadImage("iPad Mini (6ème Gen)", 2),
        loadImage("iPad Mini (6ème Gen)", 3)
    ],

    // Audio
    "AirPods Pro (2ème Gen) USB-C": [
        loadImage("AirPods Pro (2ème Gen) USB-C", 1),
        loadImage("AirPods Pro (2ème Gen) USB-C", 2),
        loadImage("AirPods Pro (2ème Gen) USB-C", 3)
    ],
    "Sony WH-1000XM5": [
        loadImage("Sony WH-1000XM5", 1),
        loadImage("Sony WH-1000XM5", 2),
        loadImage("Sony WH-1000XM5", 3)
    ],
    "Bose QuietComfort Ultra": [
        loadImage("Bose QuietComfort Ultra", 1),
        loadImage("Bose QuietComfort Ultra", 2),
        loadImage("Bose QuietComfort Ultra", 3)
    ],
    "AirPods Max": [
        loadImage("AirPods Max", 1),
        loadImage("AirPods Max", 2),
        loadImage("AirPods Max", 3)
    ],
    "Samsung Galaxy Buds2 Pro": [
        loadImage("Samsung Galaxy Buds2 Pro", 1),
        loadImage("Samsung Galaxy Buds2 Pro", 2),
        loadImage("Samsung Galaxy Buds2 Pro", 3)
    ]
};
