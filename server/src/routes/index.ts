import { Router } from 'express';
import healthRoutes from './health.routes';
import authRoutes from './auth.routes';
import attendanceRoutes from './attendance.routes';

const router = Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/attendance', attendanceRoutes);
import {Router} from "express";
import healthRoutes from "./health.routes";
import authRoutes from "./auth.routes";
import domainRoutes from "./domain.routes";

const router = Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/", domainRoutes);

export default router;
