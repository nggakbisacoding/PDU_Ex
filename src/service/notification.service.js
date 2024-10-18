// services/notificationService.js
import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response.error.js";

export const getNotificationService = async (request) => {
  const { well } = request.params;
  if (!well) {
    throw new ResponseError(400, "wellId is required");
  }
  return prismaClient.notification.findMany({
    where: {
      wellId: well,
      seen: false,
    },
  });
};

export const markNotificationAsSeenService = async (request) => {
  const { id } = request.params;
  if (!id) {
    throw new ResponseError(400, "id is required");
  }
  return prismaClient.notification.update({
    where: {
      id: id,
    },
    data: {
      seen: true,
    },
  });
};

export const markAllNotificationsAsSeenService = async (request) => {
  const { well } = request.params;
  if (!well) {
    throw new ResponseError(400, "wellId is required");
  }
  return prismaClient.notification.updateMany({
    where: {
      wellId: well,
      seen: false,
    },
    data: {
      seen: true,
    },
  });
};
