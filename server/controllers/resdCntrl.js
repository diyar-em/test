import asyncHandler from "express-async-handler";
import { Residency } from '../models/Residency.js';
import { prisma } from "../config/prismaConfig.js";

export const createResidency = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    userEmail,
  } = req.body.data;

  console.log(req.body.data);
  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
        owner: { connect: { email: userEmail } },
      },
    });

    res.send({ message: "Residency created successfully", residency });
  } catch (err) {
    if (err.code === "P2002") {
      throw new Error("A residency with address already there");
    }
    throw new Error(err.message);
  }
});



export const getAllResidencies = asyncHandler(async (req, res) => {
  try {
    // Using Mongoose to find all residencies and sort them by 'createdAt' in descending order
    const residencies = await Residency.find().sort({ createdAt: -1 });
    res.send(residencies);
  } catch (err) {
    // Handle any errors that occur during the query
    res.status(500).send({ message: err.message });
  }
});


/* 
// function to get all the documents/residencies
export const getAllResidencies = asyncHandler(async (req, res) => {
  console.log("get all residencies");
  console.log(req.body);
  const residencies = await prisma.residency.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  res.send(residencies);
}); */

// function to get a specific document/residency
export const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const residency = await prisma.residency.findUnique({
      where: { id },
    });
    res.send(residency);
  } catch (err) {
    throw new Error(err.message);
  }
});
