import {
  getAllCompaniesService,
  getCompanyByIdService,
  registerCompanyService,
} from "../service/company.service.js";

export const registerCompanyController = async (req, res, next) => {
  try {
    const result = await registerCompanyService(req);
    res.status(201).json({ message: "company created", data: result });
  } catch (error) {
    next(error);
  }
};

export const getCompaniesController = async (req, res, next) => {
  try {
    const result = await getAllCompaniesService(req);
    res.status(200).json({ message: "all Companies", data: result });
  } catch (error) {
    next(error);
  }
};

export const getCompanyByIdController = async (req, res, next) => {
  try {
    const result = await getCompanyByIdService(req);
    if (!result) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json({ message: "Company", data: result });
  } catch (error) {
    next(error);
  }
};
