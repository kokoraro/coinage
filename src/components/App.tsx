import { useAtom } from 'jotai';
import Header from './Header';
import Footer from './Footer';
import { isFavouritesViewAtom } from '@/store/global';
import { CoinList, FullCoinList } from '@/features/coin-list';
import { NewsFeed } from '@/features/news';

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
