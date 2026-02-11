import type { TimelineEvent } from '../types/models';

export const TimelineSection = ({ events }: { events: TimelineEvent[] }) => {
  return (
    <section className="kachel">
      <h3>Timeline</h3>
      {events.length === 0 ? (
        <p className="muted">Keine Ereignisse vorhanden.</p>
      ) : (
        <ul className="timeline-list">
          {events.map((event) => (
            <li key={event.eventId}>
              <strong>{event.title}</strong>
              <p>{event.detail}</p>
              <span className="muted">{new Date(event.date).toLocaleString('de-DE')}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
