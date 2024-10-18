import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response.error.js";

export const getAllWellIdService = async (request) => {
  //get all well id from database
  return await prismaClient.well.findMany({
    select: {
      id: true,
    },
  });
};

export const getRecordService = async (request) => {
  //cek apakah wellId ada di database
  console.log(request.wellId);
  console.log("masuk sini");
  const well = await prismaClient.well.findUnique({
    where: {
      id: request.wellId,
    },
  });

  if (!well) return null;

  const now = new Date();

  let start_time = request.start_time;
  let end_time = request.end_time;

  if (!end_time) {
    end_time = now;
  }

  if (!start_time) {
    startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 jam yang lalu
  }

  // ambil data record berdasarkan wellId, start_time, dan end_time, window_size
  return prismaClient.record.findMany({
    where: {
      wellId: request.wellId,
      date: {
        gte: start_time,
        lte: end_time,
      },
    },
    take: request.window_size,
    select: {
      id: true,
      date: true,
      bitdepth: true,
      scfm: true,
      mudcondin: true,
      mudcondout: true,
      blockpos: true,
      wob: true,
      ropin: true,
      bvdepth: true,
      torque: true,
      rpm: true,
      hkldp: true,
      logdepth: true,
      h2s_1: true,
      mudflowoutp: true,
      totspm: true,
      sppress: true,
      mudflowin: true,
      co2_1: true,
      gas: true,
      mudtempin: true,
      mudtempout: true,
      tankvoltot: true,
      well: true,
    },
  });
};

export const postNotificationService = async (request) => {
  const { wellId, title, message } = request;

  //cek apakah wellId dan title ada
  if (!wellId || !title) {
    throw new ResponseError(400, "WellId and title are required");
  }
  const well = await prismaClient.well.findUnique({
    where: {
      id: wellId,
    },
  });
  if (!well) {
    throw new ResponseError(404, "Well not found");
  }

  //buat notifikasi baru
  return prismaClient.notification.create({
    data: {
      title,
      message,
      wellId,
    },
  });
};
