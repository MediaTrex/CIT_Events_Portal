import Card from "../components/Card";
import cards from "../data";
import Search from "../components/Search";

const HomePage = () => {
  return (
    <div>
      <Search />
      <div className="mb-3">
        <div className="flex flex-wrap gap-6 justify-center mt-10 px-4">
          {cards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
