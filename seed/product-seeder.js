var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/shopping');

var products = [
    new Product({
        imagePath: 'https://i5.walmartimages.com/asr/6deddd03-32b0-4669-a4e6-00220ad099e4_1.7ee7e92144d4757d0efb7d0ef6574e8e.jpeg?odnWidth=676&odnHeight=676&odnBg=ffffff',
        title: 'Asus Laptop Computer',
        description: 'This Asus laptop packs 4GB of memory and 1TB of hard drive storage capacity in a sleek design.',
        price: 499.99
    }),
    new Product({
        imagePath: 'https://i5.walmartimages.com/asr/2bde316e-86d6-41f1-8e54-ab818f91c4fc_1.a69a6716c0f4c718215fc49f78a426f8.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF',
        title: 'Samsung HDTV',
        description: 'Enjoy your favorite shows and movies in stellar quality with the Samsung 60Hz 1080p LED HDTV',
        price: 579.99
    }),
    new Product({
        imagePath: 'https://i5.walmartimages.com/asr/8ff3492b-60de-412c-a7c3-d54dc4bbf4fe_1.5ab45f1a44ec8a864f9774eff8b87c11.jpeg?odnWidth=676&odnHeight=676&odnBg=ffffff',
        title: 'Hoover SteamVac With Clean Surge',
        description: 'The Hoover SteamVac with Clean Surge F5914900 is designed to help you keep your carpets and upholstery clean',
        price: 98.99
    }),
    new Product({
        imagePath: 'https://i5.walmartimages.com/asr/c961c44e-ba40-4b0d-a69b-2a2bc0e17e80_1.b84e5260104605404ad8d430a166a760.jpeg?odnWidth=148&odnHeight=148&odnBg=ffffff',
        title: 'Golds Gym Trainer 430i Treadmill',
        description: 'Everything you need to reach your fitness goals lives on the Golds Gym Trainer 430i Treadmill',
        price: 377.99
    }),
    new Product({
        imagePath: 'https://i5.walmartimages.com/asr/b438c6f1-24c9-42e9-a323-6ba9d13c5b3a_1.a99d31c92caf99c23d46de3596f3dbde.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF',
        title: 'NES Classic Edition',
        description: 'the highly-anticipated Nintendo Entertainment System (NES) Classic Edition is finally here and its awesome',
        price: 498.99
    }),
    new Product({
        imagePath: 'https://i5.walmartimages.com/asr/d782abae-a434-4427-9f13-3af6f52bb587_1.bb4b2a1da76b83f4cc676d7f4a288a72.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF',
        title: 'Serta Power Recliner',
        description: 'This Serta Power Recliner makes relaxing simple! ',
        price: 299.99
    }),
    new Product({
        imagePath: 'https://i5.walmartimages.com/asr/f1f59ca7-ad25-421b-926d-ce628c0da203_1.09d1817241552a6a317e51046c0c50a6.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF',
        title: 'Google Home',
        description: 'Google Home is designed to help streamline your life and manage your everyday tasks',
        price: 129.99
    }),
    new Product({
        imagePath: 'https://i5.walmartimages.com/asr/511f6f5a-8032-4aa1-b9d7-d9064dfad39f_1.192e118c9b0ec19bb44c56889d45245e.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF',
        title: 'Brighton Billiard Pool Table',
        description: 'You will experience hours of entertaining pool sessions with the Eastpoint Sports 87" Brighton Billiard Table',
        price: 297.99
    }),
    new Product({
        imagePath: 'https://i5.walmartimages.com/asr/fe457d85-771a-492b-940f-58c1bde342ba_1.b214d716e32fe9986d23817fef79f755.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF',
        title: 'Stanley Jump Starter',
        description: 'This device packs 500 amps of instant starting power, as well as 1000 peak amps',
        price: 59.99
    }),
    new Product({
        imagePath: 'https://i5.walmartimages.com/asr/81ef03fb-5672-43bd-8fe7-fd2982830d76_1.0d7404f5aa014e3e53b753f7edb929d8.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF',
        title: 'Batman Batmobile',
        description: 'Now your little one can feel like a real life superhero when they enter the Batman Batmobile 6-Volt Battery-Powered Ride-On',
        price: 179.99
    })
];

/** Loops through products array */
var done = 0;
for (var i = 0; i < products.length; i++) {

    /** Creates products collection in database */
    products[i].save(function(err, result) {
        done++;
        if (done === products.length) {
            exit();
        }
    });
}

/** Function to disconnect from database */
function exit() {
    mongoose.disconnect();
}
