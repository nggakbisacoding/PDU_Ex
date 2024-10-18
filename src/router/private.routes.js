import express from "express";
import {
  getCompaniesController,
  getCompanyByIdController,
  registerCompanyController,
} from "../controller/company.controller.js";
import {
  addEmployeeController,
  getAllEmployeeController,
  getCurrentEmployeeController,
  getEmployeeByIdController,
  loginEmployeeController,
  registerEmployeeController,
} from "../controller/employee.controller.js";
import { authMiddleWare } from "../middleware/auth.middleware.js";
import {
  createPlaceController,
  getPlacesController,
} from "../controller/place.controller.js";
import { sensorMiddleware } from "../middleware/sensor.middleware.js";
import {
  addRecordController,
  createWellController,
  getRecordController,
  getWellController,
} from "../controller/well.controller.js";
import {
  getNotificationController,
  markAllNotificationsAsSeenController,
  markNotificationAsSeenController,
} from "../controller/notification.controller.js";
// import { profile } from "winston";

const privateRouter = new express.Router();

//employee  routes
//get current employee login
/**
 * @openapi
 * /api/employee/profile:
 *   get:
 *     tags:
 *       - Employee
 *     summary: Get current employee profile
 *     security:
 *       - JWTAuth: []
 *
 *     responses:
 *       '200':
 *         description: Success get current employee
 *         content:
 *           application/json:
 *             example:
 *               message: Current employee
 *               data:
 *                id: clv3zrjst0000ovxf6mg2ldio
 *                name: john doe
 *                email: jd@pdu.com
 *                role: ADMIN
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
privateRouter.get(
  "/api/employee/profile",
  authMiddleWare,
  getCurrentEmployeeController
);

//get employee by id
/**
 * @openapi
 * /api/employee/{id}:
 *   get:
 *     tags:
 *       - Employee
 *     summary: Get employee by id
 *     security:
 *       - JWTAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the employee
 *
 *     responses:
 *       '200':
 *         description: Success get employee by id
 *         content:
 *           application/json:
 *             example:
 *               message: employee by id
 *               data:
 *                id: clv3zrjst0000ovxf6mg2ldio
 *                name: john doe
 *                email: jd@pdu.com
 *                company: PT. PDU
 *                role: ADMIN
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
privateRouter.get(
  "/api/employee/:id",
  authMiddleWare,
  getEmployeeByIdController
);

//get all employee
/**
 * @openapi
 * /api/employee:
 *   get:
 *     tags:
 *       - Employee
 *     summary: Get all employee
 *     security:
 *       - JWTAuth: []
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the company
 *
 *     responses:
 *       '200':
 *         description: Success get all employee
 *         content:
 *           application/json:
 *             example:
 *               message: all employee
 *               data:
 *                 - id: clv3zrjst0000ovxf6mg2ldio,
 *                   name: john doe
 *                   email: jd@pdu.com
 *                   role: ADMIN
 *                   password: $2b$10$h1qCj8G9iajPok7TjE6X3.SBGPrvGhlfp35ce2iVELXYhcPoh6GF.
 *                   companyId: clv4y7ncx0000l2u43cb5f7ex
 *
 *                 - id: clv414sso0000gl4oyu2qizxo
 *                   name: David Lee
 *                   email: david@pdu.com
 *                   role: ADMIN
 *                   password: $2b$10$fVW8UuF9OCOlKsJ5xlx2bulks0AoyXA1Q.2AmJSAO7R.fXyWeAmj.
 *                   companyId: clv4y7ncx0000l2u43cb5f7ex
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
privateRouter.get("/api/employee", authMiddleWare, getAllEmployeeController);

//company routes
//register company
/**
 * @openapi
 * /api/company:
 *   post:
 *     tags:
 *       - Company
 *     summary: Create new company
 *     security:
 *       - JWTAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *             properties:
 *               name:
 *                 type: string
 *                 default: PT. PDU
 *               address:
 *                 type: string
 *                 default: Jl. PDU No. 1
 *
 *     responses:
 *       '201':
 *         description: Success created new company
 *         content:
 *           application/json:
 *             example:
 *               message: company created
 *               data:
 *                 id: clv4y7ncx0000l2u43cb5f7ex
 *                 name: PT. PDU
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
privateRouter.post("/api/company", authMiddleWare, registerCompanyController);

//get all companies
/**
 * @openapi
 * /api/company:
 *   get:
 *     tags:
 *       - Company
 *     summary: Get all companies
 *     security:
 *       - JWTAuth: []
 *
 *     responses:
 *       '200':
 *         description: Success get all companies
 *         content:
 *           application/json:
 *             example:
 *               message: all Companies
 *               data:
 *                - id: clv4y7ncx0000l2u43cb5f7ex
 *                  name: PT. PDU
 *                  address: Jl. PDU No. 1
 *                - id: clv4yeofr0000muqoqq8vgkcv
 *                  name: PT. Maju Berkah
 *                  address: Jl. Berkah No. 1
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
privateRouter.get("/api/company", authMiddleWare, getCompaniesController);

// get company by id
/**
 * @openapi
 * /api/company/{companyId}:
 *   get:
 *     tags:
 *       - Company
 *     summary: Get company by id
 *     security:
 *       - JWTAuth: []
 *     parameters:
 *      - in: path
 *        name: companyId
 *        required: true
 *        schema:
 *          type: string
 *        description: ID of the company
 *
 *     responses:
 *       '200':
 *         description: Success get company by id
 *         content:
 *           application/json:
 *             example:
 *               message: Company
 *               data:
 *                id: clv4y7ncx0000l2u43cb5f7ex
 *                name: PT. PDU
 *                address: Jl. PDU No. 1
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
privateRouter.get("/api/company/:id", authMiddleWare, getCompanyByIdController);

// add employee to company
/**
 * @openapi
 * /api/company/{companyId}/employee:
 *   post:
 *     tags:
 *       - Company
 *     summary: Add employee to company
 *     security:
 *       - JWTAuth: []
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the company
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               name:
 *                 type: string
 *                 default: Karyawan 1
 *               email:
 *                 type: string
 *                 default: k1@mail.com
 *               password:
 *                 type: string
 *                 default: Password123;
 *               confirmPassword:
 *                 type: string
 *                 default: Password123;
 *
 *     responses:
 *       '201':
 *         description: Success added new employee
 *         content:
 *           application/json:
 *             example:
 *               message: new employee added
 *               data:
 *                 id: clv51x3dr0001jne2l5p2vcw9
 *                 name: Karyawan 1
 *                 email: k1@mail.com
 *                 role: User
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
privateRouter.post(
  "/api/company/:id/employee",
  authMiddleWare,
  addEmployeeController
);

//place routes
//create place for company
/**
 * @openapi
 * /api/company/{companyId}/place:
 *   post:
 *     tags:
 *       - Place
 *     summary: Create place for company
 *     security:
 *       - JWTAuth: []
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the company
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *             properties:
 *               name:
 *                 type: string
 *                 default: Drilling Site 1
 *               address:
 *                 type: string
 *                 default: Jl. Gunung Emas No. 1
 *
 *     responses:
 *       '201':
 *         description: Success creating new place
 *         content:
 *           application/json:
 *             example:
 *               message: Place created
 *               data:
 *                 id: clv52blhz000177unu724rwvc
 *                 name: Drilling Site 1
 *                 company:
 *                   id: clv4y7ncx0000l2u43cb5f7ex
 *                   name: PT. PDU
 *                   address: Jl. PDU No. 1
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
privateRouter.post(
  "/api/company/:id/place",
  authMiddleWare,
  createPlaceController
);

/**
 * @openapi
 * /api/company/{companyId}/place/{placeId}/well:
 *   get:
 *     tags:
 *       - Well
 *     summary: Get all well
 *     security:
 *       - JWTAuth: []
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the company
 *       - in: path
 *         name: placeId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the place
 *
 *     responses:
 *       '200':
 *         description: Success get all well
 *         content:
 *           application/json:
 *             example:
 *               message: All well
 *               data:
 *                 - id: clv52rg7200017w7dn3wvxxw1
 *                   name: Well 1
 *                   address: Jl. Sumur 1
 *                   latitude: null
 *                   longitude: null
 *                   placeId: clv52blhz000177unu724rwvc
 *
 *                 - id: clx30dtwc0001nuw5w5xyfk1k
 *                   name: Well 2
 *                   address: Jl. Sumur 2
 *                   latitude: null
 *                   longitude: null
 *                   placeId: clv52blhz000177unu724rwvc
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
privateRouter.get(
  "/api/company/:companyId/place/:placeId/well",
  authMiddleWare,
  getWellController
);

//well routes
//create well for place
/**
 * @openapi
 * /api/company/{companyId}/place/{id}/well:
 *   post:
 *     tags:
 *       - Well
 *     summary: Create well for place
 *     security:
 *       - JWTAuth: []
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the company
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the place
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *             properties:
 *               name:
 *                 type: string
 *                 default: Well 1
 *               address:
 *                 type: string
 *                 default: Jl. Sumur 1
 *
 *     responses:
 *       '201':
 *         description: Success creating new well
 *         content:
 *           application/json:
 *             example:
 *               message: Well created
 *               data:
 *                 id: clv52blhz000177unu724rwvc
 *                 name: Drilling Site 1
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
privateRouter.post(
  "/api/company/:company/place/:place/well",
  authMiddleWare,
  createWellController
);

/**
 * @openapi
 * /api/company/{companyId}/place:
 *   get:
 *     tags:
 *       - Place
 *     summary: Get all place
 *     security:
 *       - JWTAuth: []
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the company
 *
 *     responses:
 *       '200':
 *         description: Success get all place
 *         content:
 *           application/json:
 *             example:
 *               message: All place
 *               data:
 *                 - id: clv52blhz000177unu724rwvc
 *                   name: Drilling Site 1
 *                   address: Jl. Gunung Emas No. 1
 *                   latitude: null
 *                   longitude: null
 *                   companyId: clv4y7ncx0000l2u43cb5f7ex
 *
 *                 - id: clv5dp8l10001rae2whae92ta
 *                   name: Drilling Site 2
 *                   address: Jl. Gunung Emas No. 10
 *                   latitude: null
 *                   longitude: null
 *                   companyId: clv4y7ncx0000l2u43cb5f7ex
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
privateRouter.get(
  "/api/company/:id/place",
  authMiddleWare,
  getPlacesController
);

//create well record
/**
 * @openapi
 * /api/well:
 *   post:
 *     tags:
 *       - Well
 *     summary: Create record for well for bot sensor
 *     security:
 *       - sensorKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - bitdepth
 *               - scfm
 *               - mudcondin
 *               - mudcondout
 *               - blockpos
 *               - wob
 *               - ropin
 *               - bvdepth
 *               - torque
 *               - rpm
 *               - hkldp
 *               - logdepth
 *               - h2s_1
 *               - mudflowoutp
 *               - totspm
 *               - sppress
 *               - mudflowin
 *               - co2_1
 *               - gas
 *               - mudtempin
 *               - mudtempout
 *               - tankvoltot
 *             properties:
 *               date:
 *                 type: datetime
 *                 default: null
 *               bitdepth:
 *                 type: float
 *                 default: 1
 *               scfm:
 *                 type: float
 *                 default: 2
 *               mudcondin:
 *                 type: float
 *                 default: 3
 *               mudcondout:
 *                 type: float
 *                 default: 4
 *               blockpos:
 *                 type: float
 *                 default: 5
 *               wob:
 *                 type: float
 *                 default: 6
 *               ropin:
 *                 type: float
 *                 default: 7
 *               bvdepth:
 *                 type: float
 *                 default: 8
 *               torque:
 *                 type: float
 *                 default: 9
 *               rpm:
 *                 type: float
 *                 default: 10
 *               hkldp:
 *                 type: float
 *                 default: 11
 *               logdepth:
 *                 type: float
 *                 default: 12
 *               h2s_1:
 *                 type: float
 *                 default: 13
 *               mudflowoutp:
 *                 type: float
 *                 default: 14
 *               totspm:
 *                 type: float
 *                 default: 15
 *               sppress:
 *                 type: float
 *                 default: 16
 *               mudflowin:
 *                 type: float
 *                 default: 17
 *               co2_1:
 *                 type: float
 *                 default: 18
 *               gas:
 *                 type: float
 *                 default: 19
 *               mudtempin:
 *                 type: float
 *                 default: 20
 *               mudtempout:
 *                 type: float
 *                 default: 21
 *               tankvoltot:
 *                 type: float
 *                 default: 22
 *
 *     responses:
 *       '201':
 *         description: Success creating new record
 *         content:
 *           application/json:
 *             example:
 *               message: Record created
 *               data:
 *                 id: clv57470h000311l94yhr5uk8
 *                 date: null
 *                 well:
 *                   id: clv52rg7200017w7dn3wvxxw1
 *                   name: Well 1
 *                   address: Jl. Sumur 1
 *                   latitude: null
 *                   longitude: null
 *                   placeId: clv52blhz000177unu724rwvc
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
privateRouter.post("/api/well", sensorMiddleware, addRecordController);

/**
 * @openapi
 * /api/well/{wellId}:
 *   get:
 *     tags:
 *       - Well
 *     summary: Get record for a well
 *     security:
 *       - JWTAuth: []
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
privateRouter.get("/api/well/:well", authMiddleWare, getRecordController);

/**
 * @openapi
 * /api/well/{wellId}/notification:
 *   get:
 *     tags:
 *       - Notification
 *     summary: Get notification
 *     security:
 *       - JWTAuth: []
 *     parameters:
 *       - in: path
 *         name: wellId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the well
 *        
 *     responses:
 *       '200':
 *         description: Success Sent Notification 
 *         content:
 *           application/json:
 *             example:
 *               message: Notification sent
 *               data:
 *                   id: clv52rg7200017w7dn3wvxxw1
 *                   title: Lorem ipsum
 *                   message: Lorem ipsum dolor sit amet
 *                   wellId:  clxcv6dxf0004dnzwrke3wmpc
 *                   Created-At: null
 *                   seen: false
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
privateRouter.get(
  "/api/well/:well/notification",
  authMiddleWare,
  getNotificationController
);

/**
 * @openapi
 * /api/well/{wellId}/notification/seen:
 *   patch:
 *     tags:
 *       - Notification
 *     summary: Mark all notifications as seen
 *     security:
 *       - JWTAuth: []
 *     parameters:
 *       - in: path
 *         name: wellId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the well
 *
 *     responses:
 *       '200':
 *         description: All notifications marked as seen
 *         content:
 *           application/json:
 *             example:
 *               message: All notifications marked as seen
 *               data:
 *                   seen: true
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
privateRouter.patch(
  "/api/well/:well/notification/seen",
  authMiddleWare,
  markAllNotificationsAsSeenController
);

/**
 * @openapi
 * /api/well/{wellId}/notification/{id}/seen:
 *   patch:
 *     tags:
 *       - Notification
 *     summary: Mark a notifications as seen
 *     security:
 *       - JWTAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the notification
 *
 *     responses:
 *       '200':
 *         description: Notification marked as seen
 *         content:
 *           application/json:
 *             example:
 *               message: Notification marked as seen
 *               data:
 *                   seen: true
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
privateRouter.patch(
  "/api/well/:well/notification/:id/seen",
  authMiddleWare,
  markNotificationAsSeenController
);
export { privateRouter };
