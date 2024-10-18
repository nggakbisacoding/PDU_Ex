import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response.error.js";
import { registerCompanyValidation } from "../validator/company.validation.js";
import { validate } from "../validator/validation.js";

export const registerCompanyService = async (request) => {
  const company = validate(registerCompanyValidation, request.body);

  const { name, address } = company;
  const { id: userId } = request.user;

  const countCompany = await prismaClient.company.count({
    where: {
      name,
    },
  });

  if (countCompany > 0) {
    throw new ResponseError(400, "Company already exists");
  }

  // Create a new company and associate it with the user
  return prismaClient.company.create({
    data: {
      name,
      address,
      Employee: {
        connect: {
          id: userId,
        },
      },
    },
    select: {
      id: true,
      name: true,
    },
  });
};

export const getCompanyByIdService = async (request) => {
  const { id } = request.params;

  // Get the company by id
  return prismaClient.company.findUnique({
    where: {
      id: id,
    },
  });
};

export const getAllCompaniesService = async (request) => {
  const { id } = request.user;
  // Get all companies associated with the user
  return prismaClient.company.findMany({
    where: {
      Employee: {
        some: {
          id,
        },
      },
    },
  });
};

export const updateCompanyService = async (request) => {};

export const deleteCompanyService = async (request) => {};
