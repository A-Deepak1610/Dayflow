import {Router} from "express";
import {authenticate} from "../middlewares/auth.middleware";
import {requireRole} from "../middlewares/role.middleware";
import {
  clockIn,
  clockOut,
  createLeave,
  listEmployees,
  listMyAttendance,
  listMyLeaves,
  listNotifications,
  markNotificationRead,
  updateMyProfile,
} from "../controllers/domain.controller";

const router = Router();
router.use(authenticate);

router.get("/employees", requireRole(["ADMIN", "HR"]), listEmployees);
router.patch("/employees/me/profile", updateMyProfile);
router.get("/attendance/me", listMyAttendance);
router.post("/attendance/clock-in", clockIn);
router.post("/attendance/clock-out", clockOut);
router.get("/leaves/me", listMyLeaves);
router.post("/leaves", createLeave);
router.get("/notifications", listNotifications);
router.patch("/notifications/:id/read", markNotificationRead);

export default router;
