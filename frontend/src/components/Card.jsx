import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Users, IndianRupee } from "lucide-react";

function Card({ card }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/card/${card.id}`)}
      className="
        bg-[#2f4154]
        text-white
        w-full
        sm:w-[280px]
        md:w-[320px]
        rounded-xl
        shadow-lg
        p-5
        cursor-pointer
        transition
        duration-300
        hover:scale-105
        hover:shadow-2xl
      "
    >
      {/* Title */}
      <h3 className="text-xl font-serif text-yellow-300 text-center mb-3">
        {card.title}
      </h3>

      {/* Image */}
      <img
        src={card.image}
        alt={card.title}
        className="w-full h-40 object-cover rounded-md mb-3"
      />

      {/* Content */}
      <p className="text-sm text-center text-gray-200 mb-4">{card.content}</p>

      {/* Info Section */}
      <div className="space-y-2 text-sm text-gray-300">
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <span>2026-02-10</span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin size={16} />
          <span>Campus / Online</span>
        </div>

        <div className="flex items-center gap-2">
          <IndianRupee size={16} />
          <span>150</span>
        </div>

        <div className="flex items-center gap-2">
          <Users size={16} />
          <span>1-10</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
