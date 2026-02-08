import { useParams, Link } from "react-router-dom";
import cards from "../data";

function CardDetails() {
  const { id } = useParams();

  const card = cards.find((c) => c.id === Number(id));

  if (!card) return <h2>Not Found</h2>;

  return (
    <div>
      <h1>{card.title}</h1>

      <img src={card.image} width="300" />

      <p>{card.details}</p>

      <Link to="/">Go Back</Link>
    </div>
  );
}

export default CardDetails;
