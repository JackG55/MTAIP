import classNames from 'classnames/bind';
import styles from './Home.module.scss';

//<=====================SECTION IMPORT===============>
import HeroSection from './HeroSection';
import FeatureSection from './FeatureSection';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div>
            <HeroSection />
            <FeatureSection />
        </div>
    );
}

export default Home;
