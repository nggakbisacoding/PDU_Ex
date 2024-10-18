import { 
  createPlaceService,
  getAllPlacesService
} from "../service/place.service.js";

export const createPlaceController = async (req, res, next) => {
  try {
    req.body.companyId = req.params.id;
    const result = await createPlaceService(req.body);
    if (!result) {
      res.status(400).json({ message: "Place not created" });
    }
    res.status(201).json({ message: "Place created", data: result });
  } catch (error) {
    next(error);
  }
};

export const getPlacesController = async (req, res, next) => {
  try {
    const result = await getAllPlacesService(req);
    res.status(200).json({ message: "All place", data: result });
  } catch (error) {
    next(error);
  }
};

export const getPlaceByIdController = async (req, res, next) => {};
export const updatePlaceController = async (req, res, next) => {};
export const deletePlaceController = async (req, res, next) => {};
