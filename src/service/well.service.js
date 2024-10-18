import { prismaClient } from "../app/database.js";

export const createWellService = async (request) => {
  // check company and place
  const company = await prismaClient.company.findUnique({
    where: {
      id: request.companyId,
    },
  });

  const place = await prismaClient.place.findUnique({
    where: {
      id: request.placeId,
    },
  });

  if (!company || !place) return null;

  return prismaClient.well.create({
    data: {
      placeId: request.placeId,
      name: request.name,
      address: request.address,
      latitude: request.latitude || null,
      longitude: request.longitude || null,
    },
    select: {
      id: true,
      name: true,
      place: true,
    },
  });
};

export const getAllWellService = async (request) => {
  const { companyId } = request.params;
  const { placeId } = request.params;

  console.log(companyId, placeId);
  return await prismaClient.well.findMany({
    where: {
      place: {
        id: placeId,
        companyId: companyId,
      },
    },
  });
};

export const addRecordService = async (request) => {
  return prismaClient.record.create({
    data: {
      date: request.date || new Date(),
      bitdepth: request.bitdepth || null,
      scfm: request.scfm || null,
      mudcondin: request.mudcondin || null,
      mudcondout: request.mudcondout || null,
      blockpos: request.blockpos || null,
      wob: request.wob || null,
      ropin: request.ropin || null,
      bvdepth: request.bvdepth || null,
      torque: request.torque || null,
      rpm: request.rpm || null,
      hkldp: request.hkldp || null,
      logdepth: request.logdepth || null,
      h2s_1: request.h2s_1 || null,
      mudflowoutp: request.mudflowoutp || null,
      totspm: request.totspm || null,
      sppress: request.sppress || null,
      mudflowin: request.mudflowin || null,
      co2_1: request.co2_1 || null,
      gas: request.gas || null,
      mudtempin: request.mudtempin || null,
      mudtempout: request.mudtempout || null,
      tankvoltot: request.tankvoltot || null,
      wellId: request.wellId,
    },
    select: {
      id: true,
      date: true,
      well: true,
    },
  });
};

export const getRecordService = async (request) => {
  //cek apakah wellId ada di database
  // console.log(request.wellId);
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

  // ambil data record berdasarkan wellId, start_time, dan end_time
  return prismaClient.record.findMany({
    where: {
      wellId: request.well,
      date: {
        gte: start_time,
        lte: end_time,
      },
    },
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
