import React from 'react';
import { TowingProblem, TowTruck } from '../types';
import { 
    FlatbedTowTruckIcon, 
    WheelLiftTowTruckIcon, 
    HeavyDutyWreckerIcon,
    CraneMountedTowTruckIcon,
    MotorcycleVanIcon,
    WrenchIcon // Using Wrench as a generic 'Integrated' icon
} from '../components/Icons';

export const towTruckData: TowTruck[] = [
    {
        type: 'Flatbed',
        icon: FlatbedTowTruckIcon,
        brands: [
            { name: 'Ford', model: 'F-550', image: 'https://picsum.photos/seed/flatbed_ford/400/200' },
            { name: 'Chevrolet', model: 'Silverado 6500HD', image: 'https://picsum.photos/seed/flatbed_chevy/400/200' },
            { name: 'Ram', model: '5500', image: 'https://picsum.photos/seed/flatbed_ram/400/200' },
        ],
        features: ['Hydraulic-powered tilt bed', 'Winch system to pull car onboard'],
        useCase: 'Best for: Luxury cars, all-wheel-drive vehicles, and low-ground-clearance cars.',
        specs: {
            loadCapacity: 'Up to 5 Tons',
            vehicleSize: 'Medium to Large',
            equipment: ['Hydraulic Bed', 'Winch', 'Straps'],
        },
    },
    {
        type: 'Wheel-Lift',
        icon: WheelLiftTowTruckIcon,
        brands: [
            { name: 'Toyota', model: 'Dyna', image: 'https://picsum.photos/seed/wheellift_toyota/400/200' },
            { name: 'Tata', model: 'LPT', image: 'https://picsum.photos/seed/wheellift_tata/400/200' },
            { name: 'Ashok Leyland', model: 'Captain', image: 'https://picsum.photos/seed/wheellift_leyland/400/200' },
        ],
        features: ['Metal yoke fits under front/rear wheels', 'Pneumatic or hydraulic lift'],
        useCase: 'Best for: Quick city rescues, short-distance tows, and illegally parked cars.',
        specs: {
            loadCapacity: 'Up to 3.5 Tons',
            vehicleSize: 'Small to Medium',
            equipment: ['Yoke', 'Lift System', 'Safety chains'],
        },
    },
    {
        type: 'Integrated',
        icon: WrenchIcon, // Generic icon
        brands: [
            { name: 'Freightliner', model: 'M2', image: 'https://picsum.photos/seed/integrated_freightliner/400/200' },
            { name: 'Hino', model: '268A', image: 'https://picsum.photos/seed/integrated_hino/400/200' },
        ],
        features: ['Combines flatbed + wheel-lift', 'High torque and flexibility'],
        useCase: 'Best for: Highway towing, accident recoveries, and versatile heavy-duty jobs.',
        specs: {
            loadCapacity: '5-15 Tons',
            vehicleSize: 'Large',
            equipment: ['Boom', 'Winch', 'Wheel-lift'],
        },
    },
    {
        type: 'Heavy-Duty Wrecker',
        icon: HeavyDutyWreckerIcon,
        brands: [
            { name: 'Kenworth', model: 'T880', image: 'https://picsum.photos/seed/wrecker_kenworth/400/200' },
            { name: 'Volvo', model: 'VHD', image: 'https://picsum.photos/seed/wrecker_volvo/400/200' },
            { name: 'BharatBenz', model: '2823R', image: 'https://picsum.photos/seed/wrecker_bharatbenz/400/200' },
        ],
        features: ['Equipped with boom + stabilizer legs', 'Air brakes, dual winch systems'],
        useCase: 'Best for: Towing buses, trucks, tankers, and other large commercial vehicles.',
        specs: {
            loadCapacity: 'Over 17 Tons',
            vehicleSize: 'Very Large',
            equipment: ['Boom', 'Dual Winch', 'Stabilizers'],
        },
    },
    {
        type: 'Crane-Mounted',
        icon: CraneMountedTowTruckIcon,
        brands: [
            { name: 'SANY', model: 'STC250H', image: 'https://picsum.photos/seed/crane_sany/400/200' },
            { name: 'ACE', model: 'Hydra 14', image: 'https://picsum.photos/seed/crane_ace/400/200' },
            { name: 'TIL', model: 'Mobilift', image: 'https://picsum.photos/seed/crane_til/400/200' },
        ],
        features: ['Rotating crane arm for lifting', 'Can operate in difficult terrains'],
        useCase: 'Best for: Lifting overturned vehicles, off-road recovery, and construction site incidents.',
        specs: {
            loadCapacity: 'Varies (25+ Tons)',
            vehicleSize: 'Very Large',
            equipment: ['Crane Arm', 'Outriggers', 'Heavy Cables'],
        },
    },
    {
        type: 'Motorcycle Van',
        icon: MotorcycleVanIcon,
        brands: [
            { name: 'Maruti', model: 'Super Carry', image: 'https://picsum.photos/seed/bike_maruti/400/200' },
            { name: 'Piaggio', model: 'Ape Xtra LCV', image: 'https://picsum.photos/seed/bike_piaggio/400/200' },
        ],
        features: ['Special harness for 2-wheelers', 'Flat platform or rear loading ramp'],
        useCase: 'Best for: Safely transporting motorcycles, scooters, and bikes without damage.',
        specs: {
            loadCapacity: 'Up to 1 Ton',
            vehicleSize: 'Small',
            equipment: ['Ramp', 'Harness', 'Wheel Chocks'],
        },
    },
];

export const problemToTruckMapping: { [key in TowingProblem]?: TowTruck['type'][] } = {
    [TowingProblem.Breakdown]: ['Flatbed', 'Wheel-Lift'],
    [TowingProblem.Accident]: ['Flatbed', 'Integrated', 'Crane-Mounted'],
    [TowingProblem.StuckInMud]: ['Crane-Mounted', 'Heavy-Duty Wrecker', 'Integrated'],
    [TowingProblem.OffRoad]: ['Crane-Mounted', 'Heavy-Duty Wrecker'],
    [TowingProblem.FlatTire]: ['Wheel-Lift', 'Flatbed'],
    [TowingProblem.OutOfFuel]: ['Wheel-Lift', 'Flatbed'],
    [TowingProblem.HeavyEquipment]: ['Heavy-Duty Wrecker', 'Integrated', 'Crane-Mounted'],
    [TowingProblem.BikeTowing]: ['Motorcycle Van'],
    [TowingProblem.TruckBus]: ['Heavy-Duty Wrecker', 'Integrated'],
    [TowingProblem.IndustrialTransport]: ['Heavy-Duty Wrecker', 'Crane-Mounted'],
    [TowingProblem.Custom]: ['Flatbed', 'Wheel-Lift', 'Integrated', 'Heavy-Duty Wrecker', 'Crane-Mounted', 'Motorcycle Van'],
};
