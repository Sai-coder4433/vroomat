
import React from 'react';
import {
    MarutiSuzukiIcon, HyundaiIcon, TataIcon, HondaIcon, ToyotaIcon, FordIcon, KiaIcon, MahindraIcon, MGIcon, BYDIcon, TeslaIcon, VolkswagenIcon, MercedesBenzIcon, BmwIcon, RoyalEnfieldIcon, BajajIcon, TvsIcon, AtherIcon, OlaIcon, EicherIcon, SkodaIcon
} from '../components/Icons';
import { VehicleData, VehicleCategory, FuelType } from '../types';

export const vehicleData: VehicleData = {
    [VehicleCategory.Car]: [
        {
            name: 'Maruti Suzuki',
            logo: MarutiSuzukiIcon,
            models: [
                { name: 'Alto', fuelTypes: [FuelType.Petrol, FuelType.CNG] },
                { name: 'Swift', fuelTypes: [FuelType.Petrol, FuelType.CNG] },
                { name: 'Baleno', fuelTypes: [FuelType.Petrol, FuelType.CNG] },
                { name: 'Wagon R', fuelTypes: [FuelType.Petrol, FuelType.CNG] },
                { name: 'Ertiga', fuelTypes: [FuelType.Petrol, FuelType.CNG] },
            ],
        },
        {
            name: 'Hyundai',
            logo: HyundaiIcon,
            models: [
                { name: 'i20', fuelTypes: [FuelType.Petrol, FuelType.Diesel] },
                { name: 'Creta', fuelTypes: [FuelType.Petrol, FuelType.Diesel] },
                { name: 'Venue', fuelTypes: [FuelType.Petrol, FuelType.Diesel] },
                { name: 'Verna', fuelTypes: [FuelType.Petrol, FuelType.Diesel] },
                { name: 'Verna Hybrid', fuelTypes: [FuelType.Hybrid] },
            ],
        },
        {
            name: 'Tata',
            logo: TataIcon,
            models: [
                { name: 'Tiago', fuelTypes: [FuelType.Petrol, FuelType.CNG, FuelType.EV] },
                { name: 'Nexon', fuelTypes: [FuelType.Petrol, FuelType.Diesel] },
                { name: 'Nexon EV', fuelTypes: [FuelType.EV] },
                { name: 'Punch', fuelTypes: [FuelType.Petrol, FuelType.CNG, FuelType.EV] },
                { name: 'Harrier', fuelTypes: [FuelType.Diesel] },
                { name: 'Altroz', fuelTypes: [FuelType.Petrol, FuelType.Diesel, FuelType.CNG] },
                { name: 'Curvv EV', fuelTypes: [FuelType.EV] },
            ],
        },
        {
            name: 'Honda',
            logo: HondaIcon,
            models: [
                { name: 'City', fuelTypes: [FuelType.Petrol, FuelType.Hybrid] },
                { name: 'Amaze', fuelTypes: [FuelType.Petrol, FuelType.Diesel] },
                { name: 'WR-V', fuelTypes: [FuelType.Petrol, FuelType.Diesel] },
                { name: 'Jazz', fuelTypes: [FuelType.Petrol] },
            ],
        },
        {
            name: 'Toyota',
            logo: ToyotaIcon,
            models: [
                { name: 'Innova Crysta', fuelTypes: [FuelType.Petrol, FuelType.Diesel] },
                { name: 'Fortuner', fuelTypes: [FuelType.Petrol, FuelType.Diesel] },
                { name: 'Glanza', fuelTypes: [FuelType.Petrol, FuelType.CNG] },
                { name: 'Urban Cruiser EV', fuelTypes: [FuelType.EV] },
            ],
        },
        {
            name: 'Ford',
            logo: FordIcon,
            models: [
                { name: 'Figo', fuelTypes: [FuelType.Petrol, FuelType.Diesel] },
                { name: 'EcoSport', fuelTypes: [FuelType.Petrol, FuelType.Diesel] },
            ],
        },
        {
            name: 'Kia',
            logo: KiaIcon,
            models: [
                { name: 'Seltos', fuelTypes: [FuelType.Petrol, FuelType.Diesel] },
                { name: 'Sonet', fuelTypes: [FuelType.Petrol, FuelType.Diesel] },
                { name: 'Carens', fuelTypes: [FuelType.Petrol, FuelType.Diesel] },
                { name: 'EV6', fuelTypes: [FuelType.EV] },
                { name: 'EV9', fuelTypes: [FuelType.EV] },
                { name: 'Clavis EV', fuelTypes: [FuelType.EV] },
            ],
        },
        {
            name: 'Mahindra',
            logo: MahindraIcon,
            models: [
                { name: 'Scorpio', fuelTypes: [FuelType.Diesel] },
                { name: 'Thar', fuelTypes: [FuelType.Petrol, FuelType.Diesel] },
                { name: 'XUV300', fuelTypes: [FuelType.Petrol, FuelType.Diesel] },
                { name: 'XUV.e8', fuelTypes: [FuelType.EV] },
                { name: 'BE.05', fuelTypes: [FuelType.EV] },
                { name: 'XEV 9e', fuelTypes: [FuelType.EV] },
            ],
        },
        {
            name: 'MG',
            logo: MGIcon,
            models: [
                { name: 'ZS EV', fuelTypes: [FuelType.EV] },
                { name: 'Windsor EV', fuelTypes: [FuelType.EV] },
                { name: 'Cloud EV', fuelTypes: [FuelType.EV] },
                { name: 'Cyberster', fuelTypes: [FuelType.EV] },
                { name: 'M9 EV', fuelTypes: [FuelType.EV] },
            ],
        },
        {
            name: 'BYD',
            logo: BYDIcon,
            models: [
                { name: 'Seal', fuelTypes: [FuelType.EV] },
                { name: 'eMAX7', fuelTypes: [FuelType.EV] },
                { name: 'Seagull', fuelTypes: [FuelType.EV] },
            ],
        },
        {
            name: 'Tesla',
            logo: TeslaIcon,
            models: [
                { name: 'Model Y', fuelTypes: [FuelType.EV] },
                { name: 'Model 3', fuelTypes: [FuelType.EV] },
            ],
        },
        {
            name: 'Volkswagen',
            logo: VolkswagenIcon,
            models: [
                { name: 'Polo', fuelTypes: [FuelType.Petrol, FuelType.Diesel] },
                { name: 'Vento', fuelTypes: [FuelType.Petrol, FuelType.Diesel] },
                { name: 'ID.4', fuelTypes: [FuelType.EV] },
            ],
        },
        {
            name: 'Skoda',
            logo: SkodaIcon,
            models: [
                { name: 'Kushaq', fuelTypes: [FuelType.Petrol] },
                { name: 'Slavia', fuelTypes: [FuelType.Petrol] },
                { name: 'Superb', fuelTypes: [FuelType.Petrol] },
                { name: 'Kodiaq', fuelTypes: [FuelType.Petrol] },
                { name: 'Enyaq', fuelTypes: [FuelType.EV] },
            ],
        },
        {
            name: 'Mercedes-Benz',
            logo: MercedesBenzIcon,
            models: [
                { name: 'EQA', fuelTypes: [FuelType.EV] },
                { name: 'EQG', fuelTypes: [FuelType.EV] },
                { name: 'C-Class', fuelTypes: [FuelType.Petrol, FuelType.Diesel] },
            ],
        },
        {
            name: 'BMW',
            logo: BmwIcon,
            models: [
                { name: 'iX1', fuelTypes: [FuelType.EV] },
                { name: '3 Series', fuelTypes: [FuelType.Petrol, FuelType.Diesel] },
            ],
        },
    ],
    [VehicleCategory.TwoWheeler]: [
        {
            name: 'Royal Enfield',
            logo: RoyalEnfieldIcon,
            models: [{ name: 'Classic 350', fuelTypes: [FuelType.Petrol] }],
        },
        {
            name: 'Bajaj',
            logo: BajajIcon,
            models: [
                { name: 'Pulsar 150', fuelTypes: [FuelType.Petrol] },
                { name: 'Chetak', fuelTypes: [FuelType.EV] },
            ],
        },
        {
            name: 'TVS',
            logo: TvsIcon,
            models: [
                { name: 'Apache Series', fuelTypes: [FuelType.Petrol] },
                { name: 'Jupiter', fuelTypes: [FuelType.Petrol] },
                { name: 'iQube', fuelTypes: [FuelType.EV] },
            ],
        },
        {
            name: 'Honda',
            logo: HondaIcon,
            models: [{ name: 'Activa', fuelTypes: [FuelType.Petrol] }],
        },
        {
            name: 'Ather',
            logo: AtherIcon,
            models: [{ name: '450X', fuelTypes: [FuelType.EV] }],
        },
        {
            name: 'Ola',
            logo: OlaIcon,
            models: [{ name: 'S1', fuelTypes: [FuelType.EV] }],
        },
    ],
    [VehicleCategory.LCV]: [
        {
            name: 'Tata',
            logo: TataIcon,
            models: [{ name: 'Ace', fuelTypes: [FuelType.Diesel, FuelType.CNG, FuelType.Petrol] }],
        },
        {
            name: 'Mahindra',
            logo: MahindraIcon,
            models: [{ name: 'Bolero Maxi Truck', fuelTypes: [FuelType.Diesel] }],
        },
        {
            name: 'Eicher',
            logo: EicherIcon,
            models: [{ name: 'Pro 2055', fuelTypes: [FuelType.Diesel] }],
        },
    ],
};