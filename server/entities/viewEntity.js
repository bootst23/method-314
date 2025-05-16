import { db } from "../db.js";

class ViewEntity {
  // Insert a view record
  addView(serviceID, accountID) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO views (serviceID, accountID) VALUES (?, ?)";
      db.query(query, [serviceID, accountID], (err, results) => {
        if (err) return reject(err);
        resolve({ serviceID, accountID });
      });
    });
  }

  // Update the view count for a service
  updateViewCount() {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE services s
        JOIN (
            SELECT serviceID, COUNT(*) AS view_count
            FROM views
            GROUP BY serviceID
        ) v ON s.serviceID = v.serviceID
        SET s.view = v.view_count;
      `;
      db.query(query, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }
}

const viewEntity = new ViewEntity();

export { viewEntity };
