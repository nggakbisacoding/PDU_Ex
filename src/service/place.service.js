import { prismaClient } from "../app/database.js";

export const createPlaceService = async (request) => {
  //check if the company exists
  const company = await prismaClient.company.findUnique({
    where: {
      id: request.companyId,
    },
  });

  if (!company) {
    return null;
  }

  return prismaClient.place.create({
    data: {
      companyId: request.companyId,
      name: request.name,
      address: request.address,
      latitude: request.latitude || null,
      longitude: request.longitude || null,
    },
    select: {
      id: true,
      name: true,
      company: true,
    },
  });
};

export const getAllPlacesService = async (request) => {
  const { id } = request.params;

  // Get all place by the company id
  return prismaClient.place.findMany({
    where: {
      companyId: id,
    },
  });
};
