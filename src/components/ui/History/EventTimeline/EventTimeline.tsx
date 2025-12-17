import React from "react";
import { EventTimelineProps } from "../../../../interfaces/historial";
import styles from "./EventTimeline.module.css";

// Component to display a timeline of events
const EventTimeline: React.FC<EventTimelineProps> = ({ events }) => {
  return (
    <div className={styles.timelineContainer}>
      <h2 className={styles.title}>Timeline de Eventos</h2>

      <div className={styles.timeline}>
        {events.map((event, index) => (
          <div key={event.id} className={styles.eventItem}>
            <div className={styles.eventIndicator}>
              <div className={styles.eventDot}></div>
              {index < events.length - 1 && (
                <div className={styles.eventLine}></div>
              )}
            </div>

            <div className={styles.eventCard}>
              <div className={styles.eventHeader}>
                <h3 className={styles.eventTitle}>{event.title}</h3>
                <span className={styles.eventPriority}>{event.priority}</span>
              </div>

              <p className={styles.eventDate}>{event.date}</p>
              <p className={styles.eventDescription}>{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventTimeline;
