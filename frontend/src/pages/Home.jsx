import { CategoriesSection } from "../components/CategoriesSection";
import { HeroSection } from "../components/HeroSection";
import { StatsSection } from "../components/StatsSection";

const Home = () => {
    return (
        <div>
            <HeroSection />
            <StatsSection />
            <CategoriesSection/> 
        </div>
    );
};

export default Home;
