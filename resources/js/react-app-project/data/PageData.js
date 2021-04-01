import tableImage from '../images/pexels-pixabay-509922.jpg';
import designImage from '../images/design.jpeg';
import threadImage from '../images/pexels-suzy-hazelwood-2564604.jpg';
import clayImage from '../images/pexels-gabby-k-5302946.jpg';
import buildPageBG from '../images/starkov1117452.jpeg';
import labImage from '../images/labartisan.jpg';
import sellSecondPic from '../images/pexels-karolina-grabowska-4491472.jpeg';
import sellFourthPic from '../images/pexels-ksenia-chernaya-3965539 (1).jpeg';
import sellFifthPic from '../images/pexels-andrea-piacquadio-3811830.jpeg';
import buildSecondPic from '../images/pexels-ivan-samkov-4458550.jpeg';
import buildThirdPic from '../images/pexels-cottonbro-3738088.jpg';
import buildFourthPic from '../images/pexels-gabby-k-5302946.jpg';
import buildFifthPic from '../images/pexels-yan-krukov-4458419.jpeg';



const SellPage = {
    header: {
        title: 'Sell Your Idea',
        subtitle: 'Sckedio is a platform to sell your unique product ideas and designs. You can upload anything from just a concept to a fully designed product.',
        button: 'Get Started',
        image: '../images/pexels-christina-morillo-1181345.jpg',
        url: '/get-started',
    },
    main: [
        {
            image: sellSecondPic,
            position: 'left'
        },

        {
            title: 'Step 1: Come Up with an Idea',
            subtitle: "Anyone can come up with an idea for a consumer product, whether it's a unique fashion item, a technological innovation, or a custom toy.",
            position: 'right'
        },
        {
            title: 'Step 2: Create Your Design',
            subtitle: 'Now that you have your idea, it’s time to make your designs. These designs will inform manufacturers how your product is made. Your designs can be anything from a quick description to a factory-ready blueprint.',
            position: 'left'
        },
        {
            image: designImage,
            position: 'right'
        },
        {
            image: sellFourthPic,
            position: 'left',
        },
        {
            title: 'Step 3: Upload Your Idea',
            subtitle: 'It’s easy. It’s free. It’s quick. Just click the link above to get started. With Sckedio’s IP protection system, only trusted manufacturers have access to your full designs before they are purchased. Manufacturers and buyers can view designs on Sckedio and denote interest in purchasing and building these products.',
            position: 'right'
        },
        {
            title: 'Step 4: Make Money',
            subtitle: 'When your design is bought, you get paid and the product is built by a manufacturer. Products cannot yet be purchased, but Sckedio is working hard to implement this feature.',
            position: 'left',
            buttons: true
        },
        {
            image: sellFifthPic,
            position: 'right'
        },

    ]
};

const BuildPage = {
    header: {
        title: 'Build with Sckedio',
        subtitle: 'Anyone can sign up to be a builder and manufacture any design that has been uploaded to Sckedio.',
        button: 'Create an Account',
        image: buildPageBG,
        url: '/login',
    },
    main: [
        {
            title: 'Step 1: Signing Up',
            subtitle: 'Quickly and easily sign up to build with Sckedio. Get started by creating an account on our login page.',
            position: 'left'
        },
        {
            image: buildSecondPic,
            position: 'right'
        },
        {
            image: buildThirdPic,
            position: 'left'
        },

        {
            title: 'Step 2: Denoting Interest',
            subtitle: 'On our sell page, you can denote interest to manufacture any of the designs on Sckedio. This interest is no commitment and you are not obligated to build any designs you select. Enjoy browsing through new and innovative products.',
            position: 'right'
        },
        {
            title: 'Step 3: Putting your skills to use',
            subtitle: 'Once the Sckedio site is completed, you will be able to request to view full designs and place manufacturing bids on products. You will be able to build as many or as few products as you want.',
            position: 'left'
        },
        {
            image: buildFourthPic,
            position: 'right'
        },
        {
            image: buildFifthPic,
            position: 'left'
        },
        {
            title: 'Step 4: Getting paid',
            subtitle: 'Once a buyer receives their completed product, you will receive the amount of money indicated in your manufacturing bid. Sckedio will take a small percentage of the final transaction.',
            position: 'right',
            buttons: true
        }
    ]
};

const AboutPage = {
    header: {
        title: 'How Skedio Works',
        subtitle: 'Sckedio serves as a platform to connect designers, manufacturers, and buyers. Designers submit their ideas, manufacturers place bids on what they can build, and buyers are able to purchase the whole package to receive a unique and customizable product. ',
        button: 'Our Work',
        image: '../images/pexels-christina-morillo-1181345.jpg'
    },
    main: [
        {
            title: 'Designers',
            subtitle: 'Anyone is able to submit a design on Sckedio for free- whether it’s just an idea or a factory-ready project. As a designer, you will be able to price your design yourself. If a buyer browsing available designs and ideas expresses interest, the material you have uploaded gets sent to a manufacturer with just the right skillset to make your product.',
            position: 'left'
        },
        {
            image: '../images/design.jpeg',
            position: 'right'
        },
        {
            image: '../images/design.jpeg',
            position: 'left'
        },
        {
            title: 'Manufacturers',
            subtitle: 'If your profile matches the skills needed for a specific design that has received interest from buyers, you will be sent all available information for that design. Then you are able to determine how much you will charge to make the product. The buyer receives your price and the price of the design as the total cost for buying a product on Sckedio.',
            position: 'right'
        },
        {
            title: 'Buyers',
            subtitle: 'Browse innovative ideas and designs and have the ability to buy a completely unique and customizable design. Take a look at the ideas on our site, click on the ones you like, and we’ll do the rest.',
            position: 'left'
        },
        {
            image: '../images/design.jpeg',
            position: 'right'
        },
        {
            image: '../images/design.jpeg',
            position: 'left'
        },
        {
            title: 'How Sckedio Makes Money.',
            subtitle: 'Sckedio takes a percentage of the final price that a buyer pays. This percentage comes out of the designer and manufacturer pay.',
            position: 'right'
        },


    ]
}

export { SellPage, BuildPage, AboutPage };
