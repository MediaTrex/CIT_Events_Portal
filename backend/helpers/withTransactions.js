// If anything goes wrong then this helper help db not to update any changes 
// i.e "Hey DB, I’m about to do something important. If anything goes wrong, pretend I never touched you."


import { getDB } from "./db.js";

export async function withTransaction(work) {
  const db = await getDB();

  try {
    await db.beginTransaction();

    const result = await work(db);

    await db.commit();
    return result;
  } catch (error) {
    await db.rollback();
    throw error;
  } finally {
    db.release();
  }
}

// How to use

// import { withTransaction } from "../db/withTransaction.js";

// export const registerTeamForEvent = async (req, res) => {
//   try {
//     await withTransaction(async (db) => {
//       const [reg] = await db.query(
//         `INSERT INTO event_registrations 
//          (event_id, team_id, registered_by, registration_type, total_amount)
//          VALUES (?, ?, ?, 'team', ?)`,
//         [eventId, teamId, req.user.id, totalAmount]
//       );

//       await db.query(
//         `INSERT INTO payments (registration_id, amount, status)
//          VALUES (?, ?, 'success')`,
//         [reg.insertId, totalAmount]
//       );
//     });

//     res.json({ success: true });
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// };
