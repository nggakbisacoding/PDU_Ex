import {
  getNotificationService,
  markAllNotificationsAsSeenService,
  markNotificationAsSeenService,
} from "../service/notification.service.js";

export const getNotificationController = async (req, res, next) => {
  try {
    const result = await getNotificationService(req);
    res.status(200).json({ message: "Notification sent", data: result });
  } catch (error) {
    next(error);
  }
};

export const markNotificationAsSeenController = async (req, res, next) => {
  try {
    const result = await markNotificationAsSeenService(req);
    res
      .status(200)
      .json({ message: "Notification marked as seen", data: result });
  } catch (error) {
    next(error);
  }
};

export const markAllNotificationsAsSeenController = async (req, res, next) => {
  try {
    const result = await markAllNotificationsAsSeenService(req);
    res
      .status(200)
      .json({ message: "All notifications marked as seen", data: result });
  } catch (error) {
    next(error);
  }
};
