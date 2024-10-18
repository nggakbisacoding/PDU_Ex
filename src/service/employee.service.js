import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  addEmployeeValidation,
  loginEmployeeValidation,
  registerEmployeeValidation,
} from "../validator/employee.validation.js";
import { validate } from "../validator/validation.js";
import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response.error.js";

export const registerEmployeeService = async (request) => {
  const data = validate(registerEmployeeValidation, request);
  const { name, email, password } = data;

  // Check if the employee already exists
  const countEmployee = await prismaClient.employee.count({
    where: {
      email,
    },
  });

  if (countEmployee > 0) {
    throw new ResponseError(409, "Employee already exists");
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new employee
  return prismaClient.employee.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "ADMIN",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });
};

export const loginEmployeeService = async (request) => {
  const data = validate(loginEmployeeValidation, request);
  const { email, password } = data;

  //check if credentials are correct
  const employeeData = await prismaClient.employee.findUnique({
    where: {
      email,
    },
  });

  if (!employeeData) {
    throw new ResponseError(401, "Invalid credentials");
  }

  const validPassword = await bcrypt.compare(password, employeeData.password);

  if (!validPassword) {
    throw new ResponseError(401, "Invalid credentials");
  }

  //generate token
  const token = jwt.sign(
    { id: employeeData.id, role: employeeData.role },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return {
    token,
  };
};

export const addEmployeeService = async (request) => {
  const data = validate(addEmployeeValidation, request);
  const { name, email, password, companyId } = data;

  if (!companyId) {
    return {
      statusCode: 400,
      body: {
        message: "companyId is required"
      }
    };
  }

  // Check if the company exists
  const company = await prismaClient.company.findUnique({
    where: {
      id: companyId,
    },
  });

  if (!company) {
    throw new ResponseError(400, "Company does not exist");
  }

  // Check if the employee already exists
  const countEmployee = await prismaClient.employee.count({
    where: {
      email,
    },
  });

  if (countEmployee > 0) {
    throw new ResponseError(400, "Employee already exists");
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new employee
  return prismaClient.employee.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "USER",
      companyId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });
};

export const getCurrentEmployeeService = async (request) => {
  const { id } = request.user;
  return prismaClient.employee.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });
};

export const getAllEmployeesService = async (request) => {
  const { companyId } = request.params;

  // Get all employee by the company id
  return prismaClient.employee.findMany({
    where: {
      companyId: companyId,
    },
  });
};

export const getEmployeeByIdService = async (request) => {
  const { id } = request.params;

  // Get the employee by id
  const employee = await prismaClient.employee.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      company: true,
      role: true,
    },
  });

  const data = {
    id: employee.id,
    name: employee.name,
    email: employee.email,
    company: employee.company.name,
    role: employee.role,
  };

  return data;
};
export const updateEmployeeService = async () => {};
export const deleteEmployeeService = async () => {};
