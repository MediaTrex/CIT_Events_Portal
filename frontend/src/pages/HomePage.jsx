import Card from "../components/Card";
import cards from "../data";
import Search from "../Search";

const HomePage = () => {
    return (
        <div>
            <Search />
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {cards.map(card => (
                <Card key={card.id} card={card} />
              ))}
            </div>
        </div>
    );
};

export default HomePage;
