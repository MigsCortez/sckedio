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
import buildThirdPic from '../images/design.jpeg';
import buildFourthPic from '../images/pexels-gabby-k-5302946.jpg';
import buildFifthPic from '../images/pexels-yan-krukov-4458419.jpeg';



const SellPage = {
    header: {
        title: 'Sell Your Idea',
        subtitle: 'Do you have an awesome idea for a product? Then Sckedio is the right place for you! Sckedio is a platform to sell your unique product ideas and designs. You can upload anything from just an idea to a fully designed product.',
        button: 'Get Started',
        image: '../images/pexels-christina-morillo-1181345.jpg'
    },
    main: [
        {
            image: sellSecondPic,
            position: 'left'
        },

        {
            title: 'Step 1: Come Up with an Idea',
            subtitle: 'Anyone is able to submit a product design on Sckedio for free- whether it’s just an idea or a factory-ready project. These designs can be for any consumer product, whether its a unique fashion item, a technological innocation, or a custom toy.',
            position: 'right'
        },
        {
            title: 'Step 2: Create Your Design',
            subtitle: 'Now that you have your idea, it’s time to make your designs. These designs will inform manufacturers how your product is made. Your designs can be anything from a quick description to a factory-ready design.',
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
            subtitle: 'It’s. easy. It’s free. It’s quick. Just click the link above to get started.',
            position: 'right'
        },
        {
            title: 'Step 4: Make Money',
            subtitle: 'Once you’ve uploaded your design, it’s time to sit back and wait for a buyer to take interest. When your design is bought, you get paid!',
            position: 'left'
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
        subtitle: 'Join Sckedio as a manufacturer and make money building new and innovative products! Anyone can sign up to be a builder and you will have the ability to make any product you feel comfortable with.',
        button: 'Our Work',
        image: buildPageBG,
    },
    main: [
        {
            title: 'Step 1: Signing Up',
            subtitle: 'Anyone is able to submit a design on Sckedio for free- whether it’s just an idea or a factory-ready project. As a designer, you will be able to price your design yourself. If a buyer browsing available designs and ideas expresses interest, the material you have uploaded gets sent to a manufacturer with just the right skillset to make your product.',
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
            title: 'Step 2: Bidding on projects',
            subtitle: 'If your profile matches the skills needed for a specific design that has received interest from buyers, you will be sent all available information for that design. Then you are able to determine how much you will charge to make the product. The buyer receives your price and the price of the design as the total cost for buying a product on Sckedio.',
            position: 'right'
        },
        {
            title: 'Step 3: Putting your skills to use',
            subtitle: 'Browse innovative ideas and designs and have the ability to buy a completely unique and customizable design. Take a look at the ideas on our site, click on the ones you like, and we’ll do the rest.',
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
            subtitle: 'Sckedio takes a percentage of the final price that a buyer pays. This percentage comes out of the designer and manufacturer pay.',
            position: 'right'
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
