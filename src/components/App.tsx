import { useAtom } from 'jotai';
import Header from './Header';
import CoinList from './coins/CoinList';
import Footer from './Footer';
import NewsFeed from './news/NewsFeed';
import FullCoinList from './coins/FullCoinList';
import { isFavouritesViewAtom } from '../store/global';

const App = () => {
    const [isFavouritesView] = useAtom(isFavouritesViewAtom);

    return (
        <div className="container">
            <Header />

            <div className="main">
                <div className="list">{isFavouritesView ? <CoinList /> : <FullCoinList />}</div>
                <div className="detail">
                    <NewsFeed />
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default App;
