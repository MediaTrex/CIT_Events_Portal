import { CategoriesSection } from "../components/CategoriesSection";
import { FeaturedEvents } from "../components/FeaturedEvents";
import { Footer } from "../components/Footer";
import { HeroSection } from "../components/HeroSection";
import { StatsSection } from "../components/StatsSection";
import { SuccessStories } from "../components/SuccessStories";
import { UpcomingTimeline } from "../components/UpcomingTimeline";

const Home = () => {
    return (
        <div>
            <HeroSection />
            <StatsSection />
            <CategoriesSection/> 
            <FeaturedEvents/>
            <UpcomingTimeline/>
            <SuccessStories/>
            <Footer/>
        </div>
    );
};

export default Home;
