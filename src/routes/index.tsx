import { useAtom } from 'jotai';
import { isFavouritesViewAtom } from '@/store/global';
import { CoinList, FullCoinList } from '@/features/coin-list';
import { NewsFeed } from '@/features/news';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const IndexPage = () => {
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

export default IndexPage;
