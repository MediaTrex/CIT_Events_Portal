import { CategoriesSection } from "../../components/Home/CategoriesSection";
import { FeaturedEvents } from "../../components/Home/FeaturedEvents";
import { Footer } from "../../components/Footer";
import { HeroSection } from "../../components/Home/HeroSection";
import { StatsSection } from "../../components/Home/StatsSection";
import { SuccessStories } from "../../components/Home/SuccessStories";
import { UpcomingTimeline } from "../../components/Home/UpcomingTimeline";
import MetaData from "../../components/MetaData";
import Layout from "../../layout/Layout";

const Home = () => {
    return (
        <Layout>
            <MetaData
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
        </Layout>
    );
};

export default Home;
