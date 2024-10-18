import {
  getAllWellIdService,
  getRecordService,
  postNotificationService,
} from "../service/ml.service.js";

export const getAllWellId = async (req, res, next) => {
  try {
    const result = await getAllWellIdService();
    if (!result) {
      res.status(404).json({ message: "Well not found" });
    }
    res.status(200).json({ message: "Well found", data: result });
  } catch (error) {
    next(error);
  }
};

export const getRecordController = async (req, res, next) => {
  try {
    const wellId = req.params.id;

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
    const window_size = req.query.window_size || 60;

    const request = {
      wellId,
      start_time,
      end_time,
      window_size,
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

export const postNotificationController = async (req, res, next) => {
  try {
    const result = await postNotificationService(req.body);
    res.status(201).json({ message: "Notification sent", data: result });
  } catch (error) {
    next(error);
  }
};
