import { CategoriesSection } from "../components/CategoriesSection";
import { FeaturedEvents } from "../components/FeaturedEvents";
import { HeroSection } from "../components/HeroSection";
import { StatsSection } from "../components/StatsSection";

const Home = () => {
    return (
        <div>
            <HeroSection />
            <StatsSection />
            <CategoriesSection/> 
            <FeaturedEvents/>
        </div>
    );
};

export default Home;
