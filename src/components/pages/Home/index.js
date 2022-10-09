//import classNames from 'classnames/bind';
//import styles from './Home.module.scss';

//<=====================SECTION IMPORT===============>
import HeroSection from './HeroSection';
import FeatureSection from './FeatureSection';
import PricingSection from './PricingSection';
import InstructionSection from './InstructionSection';
import MyTeamSection from './MyTeamSection';

import { useEffect } from 'react';

//const cx = classNames.bind(styles);

function Home() {
    useEffect(() => {
        window.scroll(0, 0);
    },)

    return (
        <div>
            <HeroSection />
            <FeatureSection />
            <PricingSection />
            <InstructionSection />
            <MyTeamSection />
        </div>
    );
}

export default Home;
