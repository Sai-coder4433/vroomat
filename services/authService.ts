
import { User, UserRole, GarageProfile, DistributorProfile } from '../types';

// In a real application, this data would be in a secure database (e.g., MongoDB, SQLite).
// Passwords would be hashed using a strong algorithm like bcrypt.
interface UserCredentials extends User {
    // In a real app, this would be a hash, not a plaintext password.
    // e.g., passwordHash: string;
    password: string;
}

const mockDb: UserCredentials[] = [
    { 
        id: 'user_1', 
        name: 'Regular User', 
        email: 'user@vroomat.com', 
        phone: '9876543210',
        role: UserRole.User, 
        password: 'password' 
    },
    { 
        id: 'user_2', 
        name: 'ProMechanics Garage', 
        email: 'garage@vroomat.com', 
        role: UserRole.Garage, 
        password: 'password',
        garageProfile: {
            isVerified: false,
            profileComplete: false,
        }
    },
    { 
        id: 'user_3', 
        name: 'Auto Parts Co.', 
        email: 'distributor@vroomat.com', 
        role: UserRole.Distributor, 
        password: 'password'
    },
];

const isEmail = (identifier: string) => identifier.includes('@');
const isPhone = (identifier: string) => /^\d{10}$/.test(identifier);

const findUserByEmail = (email: string) => mockDb.find(u => u.email.toLowerCase() === email.toLowerCase());
const findUserByPhone = (phone: string) => mockDb.find(u => u.phone === phone);

// Removes sensitive data before sending user object to the client.
const sanitizeUser = (user: UserCredentials): User => {
    const { password, ...sanitizedUser } = user;
    return sanitizedUser;
};

// --- EXPORTED API ---

export const signIn = (identifier: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let user: UserCredentials | undefined;
            if (isEmail(identifier)) {
                user = findUserByEmail(identifier);
            } else if(isPhone(identifier)) {
                user = findUserByPhone(identifier);
            }

            if (!user) {
                return reject(new Error('User not found. Please check your credentials or sign up.'));
            }

            // In a real app, you would use a secure comparison:
            // const match = await bcrypt.compare(password, user.passwordHash);
            if (user.password !== password) {
                return reject(new Error('Incorrect password. Please try again.'));
            }

            resolve(sanitizeUser(user));
        }, 1000); // Simulate network delay
    });
};

export interface SignUpData {
    name: string;
    identifier: string;
    password: string;
    role: UserRole;
    // Garage fields
    garagePhoto?: string;
    aadharNumber?: string;
    panNumber?: string;
    bankDetailsFile?: string;
    aadharFile?: string;
    panFile?: string;
    addressProofFile?: string;
    location?: { lat: number; lng: number };
    // Distributor fields
    shopPhoto?: string;
    businessRegFile?: string;
}

export const signUp = (data: SignUpData): Promise<User> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const { name, identifier, password, role } = data;
            
            if (isEmail(identifier)) {
                if (findUserByEmail(identifier)) {
                    return reject(new Error('An account with this email already exists.'));
                }
            } else if (isPhone(identifier)) {
                if (findUserByPhone(identifier)) {
                     return reject(new Error('An account with this mobile number already exists.'));
                }
            } else {
                return reject(new Error('Invalid email or phone number format.'));
            }
            
            // In a real app, hash the password before saving: 
            // const saltRounds = 10;
            // const passwordHash = await bcrypt.hash(password, saltRounds);
            const newUser: UserCredentials = {
                id: `user_${Date.now()}`,
                name,
                email: isEmail(identifier) ? identifier : `${identifier}@vroomat-mobile.com`, // Create a dummy email for phone users
                phone: isPhone(identifier) ? identifier : undefined,
                role,
                password: password, // Store the hash in a real DB
            };

            if (role === UserRole.Garage) {
                newUser.garageProfile = {
                    isVerified: false,
                    profileComplete: false, // Set to false, user must complete profile after this
                    photoUrl: data.garagePhoto,
                    aadhar: data.aadharNumber,
                    pan: data.panNumber,
                    aadharImageUrl: data.aadharFile,
                    panImageUrl: data.panFile,
                    bankDetailsUrl: data.bankDetailsFile,
                    addressProofUrl: data.addressProofFile,
                    location: data.location,
                };
            } else if (role === UserRole.Distributor) {
                newUser.distributorProfile = {
                    isVerified: false,
                    profileComplete: true,
                    shopPhotoUrl: data.shopPhoto,
                    aadhar: data.aadharNumber,
                    pan: data.panNumber,
                    businessRegUrl: data.businessRegFile,
                };
            }


            mockDb.push(newUser);
            resolve(sanitizeUser(newUser));
        }, 1000);
    });
};


export const signInWithGoogle = (): Promise<User> => {
     return new Promise((resolve) => {
        setTimeout(() => {
            // This simulates a successful Google OAuth login for a standard user.
            // A real app would need a more complex flow to handle different roles with OAuth.
            const googleUserEmail = 'new.google.user@gmail.com';
            const existingUser = findUserByEmail(googleUserEmail);
            
            if (existingUser) {
                resolve(sanitizeUser(existingUser));
                return;
            }

            const newGoogleUser: UserCredentials = { 
                id: `user_google_${Date.now()}`, 
                name: 'New Google User', 
                email: googleUserEmail,
                role: UserRole.User, 
                password: '' // No password for OAuth users
            };

            mockDb.push(newGoogleUser);
            resolve(sanitizeUser(newGoogleUser));

        }, 1000);
    });
}