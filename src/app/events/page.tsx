import { sanityFetch } from "../../sanity/lib/client";
import { allEventsQuery } from "../../sanity/lib/queries";

interface EventEntry {
  title: string;
  date: string;
  distance?: number;
  participants?: number;
}

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Datum unbekannt";
  }

  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function sortAndSplitEvents(events: EventEntry[]) {
  const now = new Date();

  const upcoming = events
    .filter((event) => {
      const eventDate = new Date(event.date);
      return !Number.isNaN(eventDate.getTime()) && eventDate >= now;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const past = events
    .filter((event) => {
      const eventDate = new Date(event.date);
      return !Number.isNaN(eventDate.getTime()) && eventDate < now;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return { upcoming, past };
}

function renderEventList(events: EventEntry[]) {
  if (!events.length) {
    return (
      <div className="single-upcoming-matches-item">
        <span className="sub-title">Keine Einträge vorhanden.</span>
      </div>
    );
  }

  return events.map((event, index) => (
    <div
      className="single-upcoming-matches-item"
      key={`${event.title}-${index}`}
    >
      <div className="date">
        <span>{formatDate(event.date)}</span>
      </div>
      <h3>{event.title}</h3>
      {typeof event.distance === "number" && (
        <span className="sub-title">{event.distance} km</span>
      )}
      {typeof event.participants === "number" && (
        <span className="sub-title">
          {event.participants}{" "}
          {event.participants === 1 ? "PotsRunner" : "PotsRunners"}
        </span>
      )}
    </div>
  ));
}

export default async function EventsPage() {
  const events = (await sanityFetch<
    { title: string; date: string; distance?: number; participants?: number }[]
  >({
    query: allEventsQuery,
    revalidate: 60,
  })) as EventEntry[];

  const { upcoming, past } = sortAndSplitEvents(events ?? []);

  return (
    <>
      <div
        className="page-banner-area"
        style={{
          height: "auto",
        }}
      >
        <div className="back-home">
          <a href="/">
            <i className="bx bxs-left-arrow-alt"></i> Zurück
          </a>
        </div>
      </div>

      <section className="upcoming-matches-area pt-100 pb-70">
        <div className="container">
          <div className="section-title">
            <h2>Kommende Wettkämpfe</h2>
            <p>
              Hier findest du alle geplanten Wettkämpfe von PotsRun. Die
              Übersicht basiert auf den Daten aus unserem Sanity CMS und wird
              regelmäßig aktualisiert.
            </p>
          </div>

          <div className="matches-list">{renderEventList(upcoming)}</div>
        </div>
      </section>

      <section className="upcoming-matches-area pt-0 pb-100">
        <div className="container">
          <div className="section-title">
            <h2>Vergangene Wettkämpfe</h2>
            <p>
              Ein Rückblick auf vergangene Veranstaltungen, bei denen PotsRun
              vertreten war.
            </p>
          </div>

          <div className="matches-list">{renderEventList(past)}</div>
        </div>
      </section>
    </>
  );
}
