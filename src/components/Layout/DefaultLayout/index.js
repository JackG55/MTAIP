import Header from '../components/Header';
import Footer from '../components/Footer';

function DefaultLayout({ nft, marketplace, user, children }) {
    return (
        <div>
            <Header nft={nft} marketplace={marketplace} user={user} />
            <div className="container">
                <div className="content">{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
