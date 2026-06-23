import { CategoriesSection } from "../components/CategoriesSection";
import { FeaturedEvents } from "../components/FeaturedEvents";
import { Footer } from "../components/Footer";
import { HeroSection } from "../components/HeroSection";
import { StatsSection } from "../components/StatsSection";
import { SuccessStories } from "../components/SuccessStories";
import { UpcomingTimeline } from "../components/UpcomingTimeline";
import MetaData from "../components/MetaData";

const Home = () => {
    return (
        <div>
            <MetaData
                title="CIT Events Portal"
                description="Welcome to the CIT Events Portal. Discover, explore, and register for the latest upcoming college festivals, tech symposiums, and success stories at CIT."
                canonical="/"
            />
            <HeroSection />
            <StatsSection />
            <CategoriesSection />
            <FeaturedEvents />
            <UpcomingTimeline />
            <SuccessStories />
            <Footer />
        </div>
    );
};

export default Home;
