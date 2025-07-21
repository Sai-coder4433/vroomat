

export enum VehicleCategory {
  Car = "Cars",
  TwoWheeler = "Two-Wheelers",
  LCV = "Trucks / LCVs",
}

export enum CommonIssue {
    FlatTire = "Flat Tire",
    BatteryDead = "Battery Dead",
    EngineNotStarting = "Engine Not Starting",
    BrakeFailure = "Brake Failure",
    Overheating = "Overheating",
    ACNotWorking = "AC Not Working",
    ElectricalFault = "Electrical Fault",
    FuelLeak = "Fuel Leak",
    HeadlightFault = "Headlight/Foglight Fault",
    Other = "Other / Custom Issue",
}

export enum FuelType {
    Petrol = "Petrol",
    Diesel = "Diesel",
    CNG = "CNG",
    EV = "EV",
    Hybrid = "Hybrid",
}

export interface VehicleDetails {
    category: VehicleCategory;
    brand: string;
    model: string;
    fuelType: FuelType;
}

export interface Vehicle {
    name: string;
    fuelTypes: FuelType[];
    logo?: React.FC<{ className?: string }>;
}

export interface VehicleBrand {
    name: string;
    logo: React.FC<{ className?: string }>;
    models: Vehicle[];
}

export interface VehicleData {
    [key: string]: VehicleBrand[];
}


export enum ServiceType {
  FullService = "Full Vehicle Service",
  OilChange = "Engine Oil Change",
  TireService = "Tire Rotation & Alignment",
  BrakeService = "Brake Inspection & Service",
  ACService = "AC System Check & Recharge",
  BatteryCheck = "Battery Health Check",
  CarSpa = "Car Spa / Detailing",
  Custom = "Custom Repair/Checkup",
}

export interface BreakdownRequest {
  vehicleDetails: VehicleDetails;
  problemDescription: string;
  location: {
    lat: number;
    lng: number;
  };
}

export interface ServiceRequest {
  vehicleDetails: VehicleDetails;
  serviceType: ServiceType;
  location: {
    lat: number;
    lng: number;
  };
}

export interface Garage {
  garageName: string;
  eta: string;
  distance: string;
  serviceTypeIcons: string[];
  totalEstimatedPrice: string;
  latitude: number;
  longitude: number;
}

export enum UserRole {
  User = "User",
  Garage = "Garage / Workshop Owner",
  Distributor = "Distributor / Seller",
}

export interface GarageProfile {
    photoUrl?: string;
    address?: string;
    contactNumber?: string;
    aadhar?: string;
    pan?: string;
    gst?: string;
    bankAccountName?: string;
    bankAccountNumber?: string;
    ifsc?: string;
    isVerified: boolean;
    profileComplete: boolean;
    aadharImageUrl?: string;
    panImageUrl?: string;
    bankDetailsUrl?: string;
    addressProofUrl?: string;
    location?: { lat: number; lng: number };
}

export interface DistributorProfile {
    shopPhotoUrl?: string;
    aadhar?: string;
    pan?: string;
    businessRegUrl?: string;
    isVerified: boolean;
    profileComplete: boolean;
}


export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  garageProfile?: GarageProfile;
  distributorProfile?: DistributorProfile;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
    brand: string;
    stock: number;
    seller: string;
    rating?: number;
    reviews?: number;
}

export interface Review {
  name: string;
  city: string;
  rating: number;
  comment: string;
}

export enum TowingProblem {
    Breakdown = "Car breakdown",
    Accident = "Accident recovery",
    StuckInMud = "Stuck in mud",
    OffRoad = "Off-road recovery",
    FlatTire = "Flat tire (needs tow)",
    OutOfFuel = "Out of fuel (needs tow)",
    HeavyEquipment = "Heavy equipment towing",
    BikeTowing = "Bike towing",
    TruckBus = "Truck/Bus failure",
    IndustrialTransport = "Industrial equipment transport",
    Custom = "Custom Problem",
}

export interface TowTruck {
    type: 'Flatbed' | 'Wheel-Lift' | 'Integrated' | 'Heavy-Duty Wrecker' | 'Crane-Mounted' | 'Motorcycle Van';
    brands: {
        name: string;
        model: string;
        image: string; 
    }[];
    features: string[];
    useCase: string;
    specs: {
        loadCapacity: string;
        vehicleSize: string;
        equipment: string[];
    };
    icon: React.FC<{ className?: string }>;
}

export interface TowingRequest {
  problem: TowingProblem;
  customProblem?: string;
  selectedTruck: TowTruck;
  location: {
    lat: number;
    lng: number;
  };
}


export enum AppState {
  HOME,
  DASHBOARD,
  REPORTING_BREAKDOWN,
  BOOKING_SERVICE,
  BOOKING_TOWING,
  SEARCHING,
  VIEWING_GARAGES,
  BOOKING_CONFIRMED,
  TRACKING_GARAGE,
  SIGN_IN,
  PROFILE,
  ECOM_HOME,
  ECOM_PRODUCT_DETAIL,
  ECOM_SELLER_DASHBOARD,
  ECOM_ADD_PRODUCT,
  GARAGE_SETUP,
}