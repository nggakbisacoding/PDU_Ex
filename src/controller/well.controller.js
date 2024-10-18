import {
  addRecordService,
  createWellService,
  getRecordService,
  getAllWellService,
} from "../service/well.service.js";

export const createWellController = async (req, res, next) => {
  try {
    req.body.companyId = req.params.company;
    req.body.placeId = req.params.place;
    const result = await createWellService(req.body);
    if (!result) {
      res.status(400).json({ message: "Well not created" });
    }
    res.status(201).json({ message: "Well created", data: result });
  } catch (error) {
    next(error);
  }
};

export const addRecordController = async (req, res, next) => {
  try {
    req.body.wellId = req.sensor;
    const result = await addRecordService(req.body);
    if (!result) {
      res.status(400).json({ message: "Record not created" });
    }
    res.status(201).json({ message: "Record created", data: result });
  } catch (error) {
    next(error);
  }
};

export const getRecordController = async (req, res, next) => {
  try {
    const wellId = req.params.well;

    const currentDate = new Date();

    const startOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      0,
      0,
      0
    );
    const endOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      23,
      59,
      59
    );

    const start_time = req.query.from || startOfDay;
    const end_time = req.query.to || endOfDay;

    const request = {
      wellId,
      start_time,
      end_time,
    };
    const result = await getRecordService(request);
    if (!result) {
      res.status(404).json({ message: "Record not found" });
    }
    res.status(200).json({ message: "Record found", data: result });
  } catch (error) {
    next(error);
  }
};

export const getWellController = async (req, res, next) => {
  try {
    const result = await getAllWellService(req);
    res.status(200).json({ message: "Success get all well", data: result });
  } catch (error) {
    next(error);
  }
};
