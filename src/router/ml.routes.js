import express from "express";
import { mlMiddleware } from "../middleware/ml.middleware.js";
import {
  getAllWellId,
  getRecordController,
  postNotificationController,
} from "../controller/ml.controller.js";

const mlRouter = express.Router();

/**
 * @openapi
 * /api/ml/well:
 *   get:
 *     tags:
 *       - Machine Learning
 *     summary: Get all well id
 *     security:
 *       - mlKeyAuth: []
 *
 *     responses:
 *       '200':
 *         description: Success get all well id
 *         content:
 *           application/json:
 *             example:
 *               message: Record found
 *               data:
 *                 - wellId: "1"
 *                 - wellId: "2"
 *                 - wellId: "3"
 *
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               message: Bad request
 *       '401':
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             example:
 *               message: Invalid credentials
 *       '500':
 *         description: Internal Server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 */
mlRouter.get("/api/ml/well", mlMiddleware, getAllWellId);

/**
 * @openapi
 * /api/ml/well/{wellId}:
 *   get:
 *     tags:
 *       - Machine Learning
 *     summary: Get Record
 *     security:
 *       - mlKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: wellId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the well
 *
 *       - in: query
 *         name: from
 *         required: false
 *         schema:
 *           type: string
 *         description: startOfDay
 *
 *       - in: query
 *         name: to
 *         required: false
 *         schema:
 *           type: string
 *         description: endOfDay
 *
 *     responses:
 *       '200':
 *         description: Success get well record
 *         content:
 *           application/json:
 *             example:
 *               message: Record found
 *               data:
 *                 - id: clv571uge000111l96ya36bij
 *                   date: 2024-04-18T12:04:32.637Z
 *                   bitdepth: 1
 *                   scfm: 2
 *                   mudcondin: 3
 *                   mudcondout: 4
 *                   blockpos: 5
 *                   wob: 6
 *                   ropin: 7
 *                   bvdepth: 8
 *                   torque: 9
 *                   rpm: 10
 *                   hkldp: 11
 *                   logdepth: 12
 *                   h2s_1: 13
 *                   mudflowoutp: 14
 *                   totspm: 15
 *                   sppress: 16
 *                   mudflowin: 17
 *                   co2_1: 18
 *                   gas: 19
 *                   mudtempin: 20
 *                   mudtempout: 21
 *                   tankvoltot: 22
 *                   well:
 *                     id: clv52rg7200017w7dn3wvxxw1
 *                     name: Well 1
 *                     address: Jl. Sumur 1
 *                     latitude: null
 *                     longtitude: null
 *                     placeId: clv52blhz000177unu724rwvc
 *
 *                 - id: clv57470h000311l94yhr5uk8
 *                   date: 2024-04-18T12:06:22.325Z
 *                   bitdepth: 1
 *                   scfm: 2
 *                   mudcondin: 3
 *                   mudcondout: 4
 *                   blockpos: 5
 *                   wob: 6
 *                   ropin: 7
 *                   bvdepth: 8
 *                   torque: 9
 *                   rpm: 10
 *                   hkldp: 11
 *                   logdepth: 12
 *                   h2s_1: 13
 *                   mudflowoutp: 14
 *                   totspm: 15
 *                   sppress: 16
 *                   mudflowin: 17
 *                   co2_1: 18
 *                   gas: 19
 *                   mudtempin: 20
 *                   mudtempout: 21
 *                   tankvoltot: 22
 *                   well:
 *                     id: clv52rg7200017w7dn3wvxxw1
 *                     name: Well 1
 *                     address: Jl. Sumur 1
 *                     latitude: null
 *                     longtitude: null
 *                     placeId: clv52blhz000177unu724rwvc
 *
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               message: Bad request
 *       '401':
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             example:
 *               message: Invalid credentials
 *       '500':
 *         description: Internal Server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 */
mlRouter.get("/api/ml/well/:id", mlMiddleware, getRecordController);

/**
 * @openapi
 * /api/ml/notification:
 *   post:
 *     tags:
 *       - Machine Learning
 *     summary: Post notification
 *     security:
 *       - mlKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - wellId
 *               - title
 *               - message
 *             properties:
 *               wellId:
 *                 type: string
 *                 default: cluumt39j000312u8bg7bcnid
 *               title:
 *                 type: string
 *                 default: title
 *               message:
 *                 type: string
 *                 default: message
 *
 *     responses:
 *       '201':
 *         description: Success sent notification
 *         content:
 *           application/json:
 *             example:
 *               message: Notification sent
 *               data:
 *                 title: title
 *                 message: message
 *                 wellId: cluumt39j000312u8bg7bcnid
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               message: Bad request
 *       '401':
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             example:
 *               message: Invalid credentials
 *       '500':
 *         description: Internal Server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 */
mlRouter.post("/api/ml/notification", mlMiddleware, postNotificationController);

export { mlRouter };
