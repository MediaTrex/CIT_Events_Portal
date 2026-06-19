import { CategoriesSection } from "../components/CategoriesSection";
import { FeaturedEvents } from "../components/FeaturedEvents";
import { HeroSection } from "../components/HeroSection";
import { StatsSection } from "../components/StatsSection";
import { UpcomingTimeline } from "../components/UpcomingTimeline";

const Home = () => {
    return (
        <div>
            <HeroSection />
            <StatsSection />
            <CategoriesSection/> 
            <FeaturedEvents/>
            <UpcomingTimeline/>
        </div>
    );
};

export default Home;
