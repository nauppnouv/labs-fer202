import ListOfOrchids from "../data/ListOfOrchids";
import OrchidCard from "./OrchidCard";
import "./Orchids.css";

function Orchids() {
  return (
    <section className="orchids-section">
      <div className="orchids-header">
        <h2 className="orchids-title">🌸 Our Orchid Collection</h2>
        <p className="orchids-subtitle">Discover {ListOfOrchids.length} exquisite orchid varieties from around the world</p>
      </div>
      <div className="orchids-grid">
        {ListOfOrchids.map((orchid) => (
          <OrchidCard key={orchid.id} orchid={orchid} />
        ))}
      </div>
    </section>
  );
}

export default Orchids;
