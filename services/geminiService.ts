

import { GoogleGenAI, Type } from "@google/genai";
import { BreakdownRequest, Garage, ServiceRequest, TowingRequest, TowingProblem } from "../types";

// Ensure the API key is available in the environment variables
const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey });

const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      garageName: {
        type: Type.STRING,
        description: "The name of the garage or service provider.",
      },
      eta: {
        type: Type.STRING,
        description: "Estimated time of arrival for breakdown (e.g., '15 mins') or total service time for scheduled service (e.g., '5-7 hours')."
      },
      distance: {
        type: Type.STRING,
        description: "Distance from the user, e.g., '3.5 km'."
      },
      serviceTypeIcons: {
        type: Type.ARRAY,
        description: "A list of 2-3 keywords for icons representing services offered, like 'Tire', 'Engine', 'Battery', 'Towing', 'AC', 'Full Service', 'Flatbed', 'Wrecker'.",
        items: {
          type: Type.STRING,
        },
      },
      totalEstimatedPrice: {
        type: Type.STRING,
        description: "An estimated total price for the service in Indian Rupees (INR), e.g., '₹1500 - ₹2000'."
      },
      latitude: {
        type: Type.NUMBER,
        description: "The fictional latitude of the garage, near the user's location."
      },
      longitude: {
        type: Type.NUMBER,
        description: "The fictional longitude of the garage, near the user's location."
      },
    },
    required: ["garageName", "eta", "distance", "serviceTypeIcons", "totalEstimatedPrice", "latitude", "longitude"],
  },
};


export const findGarages = async (request: BreakdownRequest): Promise<Garage[]> => {
  const prompt = `
    A user has a vehicle breakdown. Find 4 nearby, fictional but realistic-sounding, 24/7 roadside assistance services or garages that can service a ${request.vehicleDetails.category}.

    User's situation:
    - Vehicle Type: ${request.vehicleDetails.category}
    - Vehicle Details: ${request.vehicleDetails.brand} ${request.vehicleDetails.model} (${request.vehicleDetails.fuelType})
    - Issue: ${request.problemDescription}
    - Location: Near latitude ${request.location.lat.toFixed(4)}, longitude ${request.location.lng.toFixed(4)}

    Please provide a list of 4 service providers sorted by the shortest ETA.
    For each provider, generate realistic fictional latitude and longitude coordinates near the user's location.
    For the 'serviceTypeIcons', provide a few relevant keywords from this list: Tire, Engine, Battery, Fuel, EV, Towing, Brakes, AC, Electrical, Bike, Truck.
    For 'totalEstimatedPrice', provide a price range in Indian Rupees (INR), e.g., '₹1500 - ₹2000'.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    const garages: Garage[] = JSON.parse(jsonText);
    return garages;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // In a real app, you might want to return a default list or handle the error more gracefully.
    throw new Error("Failed to communicate with the garage search service.");
  }
};

export const findServiceGarages = async (request: ServiceRequest): Promise<Garage[]> => {
  const prompt = `
    A user wants to book a scheduled vehicle service. Find 4 nearby, fictional but realistic-sounding, vehicle service centers or garages that offer pickup and drop-off services.

    User's request:
    - Vehicle Type: ${request.vehicleDetails.category}
    - Vehicle Details: ${request.vehicleDetails.brand} ${request.vehicleDetails.model} (${request.vehicleDetails.fuelType})
    - Service Required: ${request.serviceType}
    - Location for Pickup/Drop-off: Near latitude ${request.location.lat.toFixed(4)}, longitude ${request.location.lng.toFixed(4)}

    Please provide a list of 4 service centers. For each, provide:
    - A realistic, fictional name ('garageName').
    - An estimated time for how long the entire process (pickup, service, drop-off) might take, as 'eta'. E.g., '5-7 hours'.
    - The distance from the user ('distance').
    - For each center, generate realistic fictional latitude and longitude coordinates near the user's location.
    - An estimated total price for the requested service in Indian Rupees (INR), e.g., '₹4500 - ₹5500'.
    - A list of 2-3 keywords for icons representing services offered, from this list: Engine, Tire, AC, Full Service, Battery, Brakes.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    const garages: Garage[] = JSON.parse(jsonText);
    return garages;

  } catch (error) {
    console.error("Error calling Gemini API for service garages:", error);
    throw new Error("Failed to communicate with the garage search service.");
  }
};


export const findTowingServices = async (request: TowingRequest): Promise<Garage[]> => {
    const { problem, customProblem, selectedTruck, location } = request;
    const problemDescription = problem === TowingProblem.Custom && customProblem ? customProblem : problem;
    
    const prompt = `
    A user requires towing assistance. Find 4 nearby, fictional but realistic-sounding, 24/7 towing service providers.

    User's situation:
    - Problem: ${problemDescription}
    - Required Tow Vehicle Type: ${selectedTruck.type}
    - Required Vehicle Specs: ${selectedTruck.brands[0].name} ${selectedTruck.brands[0].model} or similar, with features like: ${selectedTruck.features.join(', ')}.
    - User Location: Near latitude ${location.lat.toFixed(4)}, longitude ${location.lng.toFixed(4)}

    Please provide a list of 4 towing service providers sorted by the shortest ETA.
    For each provider, generate a realistic fictional name (e.g., "Singh Towing Co.", "24/7 Recovery"), ETA, distance, and realistic fictional latitude/longitude coordinates near the user's location.
    The service providers must have the required tow truck type available.
    For 'serviceTypeIcons', provide relevant keywords like 'Towing', '${selectedTruck.type}', 'Accident', 'Recovery'.
    For 'totalEstimatedPrice', provide a realistic price range in Indian Rupees (INR) for this specific towing job.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });

        const jsonText = response.text.trim();
        const services: Garage[] = JSON.parse(jsonText);
        return services;

    } catch (error) {
        console.error("Error calling Gemini API for towing services:", error);
        throw new Error("Failed to communicate with the towing service search.");
    }
};