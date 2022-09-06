//import classNames from 'classnames/bind';
//import styles from './Home.module.scss';

//<=====================SECTION IMPORT===============>
import HeroSection from './HeroSection';
import FeatureSection from './FeatureSection';
import PricingSection from './PricingSection';
import InstructionSection from './InstructionSection';

//const cx = classNames.bind(styles);

function Home() {
    return (
        <div>
            <HeroSection />
            <FeatureSection />
            <PricingSection />
            <InstructionSection />
        </div>
    );
}

export default Home;
