export type Genre =
  | '140' | 'UKG' | 'Jungle' | 'Industrial' | 'Techno' | 'House'
  | 'Drum & Bass' | 'Grime' | 'Garage' | 'Afrobeats' | 'Breaks'
  | 'Footwork' | 'Dubstep' | 'Ambient' | 'Electro';

export type GenderIdentity = 'Man' | 'Woman' | 'Non-binary' | 'Prefer not to say';
export type ExperienceLevel = 'Emerging' | 'Mid-level' | 'Established' | 'Headliner';
export type Equipment = 'CDJ-3000s' | 'CDJ-2000NXS2' | 'Vinyl' | 'Controller' | 'Ableton' | 'Modular';
export type Currency = 'GBP' | 'EUR' | 'USD' | 'NZD';
export type SlotType = 'Opening' | 'B2B' | 'Peak Time' | 'Closing' | 'Live Act' | 'Warm-up';
export type UserRole = 'artist' | 'promoter' | 'venue';

export interface Artist {
  id: string;
  displayName: string;
  slug: string;
  bio: string;
  location: { city: string; country: string };
  profilePhoto: string;
  photoGallery: string[];
  genres: Genre[];
  experienceLevel: ExperienceLevel;
  genderIdentity: GenderIdentity;
  equipment: Equipment[];
  hardwareRequirements?: string;
  embeds: {
    type: 'soundcloud' | 'mixcloud';
    url: string;
    label: string;
  }[];
  fee: { minimum: number; currency: Currency; negotiable: boolean };
  availability: string[];
  socialLinks: { instagram?: string; twitter?: string; bandcamp?: string };
  createdAt: string;
  updatedAt: string;
}

export interface Promoter {
  id: string;
  displayName: string;
  slug: string;
  bio: string;
  location: { city: string; country: string };
  profilePhoto: string;
  pastEventsGallery: { imageUrl: string; caption: string; date: string }[];
  preferences: {
    preferredGenres: Genre[];
    preferredLocations: string[];
    preferredGenderIdentities: GenderIdentity[];
    preferredExperienceLevels: ExperienceLevel[];
  };
  trustedPartner: boolean;
  totalEventsHosted: number;
  socialLinks: { instagram?: string; website?: string; ra?: string };
  createdAt: string;
  updatedAt: string;
}

export interface Venue {
  id: string;
  name: string;
  slug: string;
  description: string;
  location: { address: string; city: string; country: string };
  capacity: number;
  photos: { imageUrl: string; caption: string; category: 'booth' | 'dancefloor' | 'exterior' | 'loadIn' }[];
  technicalSpecs: {
    boothSetup: string;
    soundSystem: string;
    lighting: string;
    stagingDimensions: string;
    monitorSetup: string;
  };
  loadInInfo: {
    accessTime: string;
    instructions: string;
    parkingAvailable: boolean;
    elevatorAccess: boolean;
    additionalNotes: string;
  };
  venueFee: { amount: number; currency: Currency; feeType: 'flat' | 'percentage' | 'negotiable'; notes: string };
  contactEmail: string;
  createdAt: string;
  updatedAt: string;
}

export interface Slot {
  id: string;
  slotType: SlotType;
  startTime: string;
  endTime: string;
  genres: Genre[];
  setDurationMinutes: number;
  fee: number;
  currency: Currency;
  notes: string;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  promoterId: string;
  venueId: string;
  date: string;
  doorsOpen: string;
  slots: Slot[];
  description: string;
  posterImageUrl: string;
  genres: Genre[];
  status: 'Draft' | 'Open' | 'Shortlisting' | 'Confirmed' | 'Completed' | 'Cancelled';
  blindApplications: boolean;
  applicationDeadline: string;
  ticketUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export type ApplicationStatus = 'Pending' | 'Shortlisted' | 'Rejected' | 'Confirmed' | 'Withdrawn';

export interface Application {
  id: string;
  eventId: string;
  slotId: string;
  artistId: string;
  status: ApplicationStatus;
  coverNote: string;
  mixUrl?: string;
  matchScore: number;
  appliedAt: string;
  updatedAt: string;
}

export type ContractStatus = 'Draft' | 'Sent' | 'SignedByArtist' | 'SignedByBoth' | 'Void';

export interface PaymentInstalment {
  id: string;
  label: string;
  amount: number;
  currency: Currency;
  dueDate: string;
  paid: boolean;
  paidAt?: string;
  method?: 'Bank Transfer' | 'Cash' | 'Card';
}

export interface Contract {
  id: string;
  eventId: string;
  slotId: string;
  artistId: string;
  promoterId: string;
  status: ContractStatus;
  termsText: string;
  artistSignedAt?: string;
  promoterSignedAt?: string;
  gigSheet: {
    eventName: string;
    date: string;
    venue: string;
    venueAddress: string;
    artistName: string;
    slotTime: string;
    soundcheckTime: string;
    loadInTime: string;
    fee: number;
    currency: string;
    advanceAmount: number;
    advanceDueDate: string;
    promoterContact: string;
    venueContact: string;
    hospitalityRider: string;
    technicalRider: string;
  };
  paymentInstalments: PaymentInstalment[];
  createdAt: string;
  updatedAt: string;
}

export interface CurrentUser {
  role: UserRole;
  profileId: string;
  displayName: string;
  profilePhoto: string;
}
