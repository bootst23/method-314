import { db } from "../db.js";

class ShortlistEntity {
  // Add a shortlist
  addShortlist(serviceID, hownerID) {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO shortlists (serviceID, hownerID) VALUES (?, ?)";
      db.query(query, [serviceID, hownerID], (err, results) => {
        if (err) return reject(err);
        resolve({ serviceID, hownerID });
      });
    });
  }

  // Remove a shortlist
  removeShortlist(serviceID, hownerID) {
    return new Promise((resolve, reject) => {
      const query =
        "DELETE FROM shortlists WHERE serviceID = ? AND hownerID = ?";
      db.query(query, [serviceID, hownerID], (err, results) => {
        if (err) return reject(err);
        resolve({ serviceID, hownerID });
      });
    });
  }

  // Update the shortlist count for each service
  updateShortlistCount() {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE services s
        JOIN (
          SELECT serviceID, COUNT(*) AS shortlist_count
          FROM shortlists
          GROUP BY serviceID
        ) st ON s.serviceID = st.serviceID
        SET s.shortlistCount = st.shortlist_count;
      `;
      db.query(query, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  getHomeownersByService(serviceID) {
    return new Promise((resolve, reject) => {
      const query = "SELECT hownerID FROM shortlists WHERE serviceID = ?";
      db.query(query, [serviceID], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }
}

const shortlistEntity = new ShortlistEntity();
export { shortlistEntity };
