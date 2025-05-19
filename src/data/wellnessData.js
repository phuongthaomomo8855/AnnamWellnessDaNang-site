import { mainContent } from './wellness/mainContent';
import { signatureTreatments } from './wellness/signatureTreatments';
import { holisticPrograms } from './wellness/holisticPrograms';
import { wellnessWorkshops } from './wellness/wellnessWorkshops';
import { culturalPageData as culturalExperiences } from './wellness/culturalExperiences';
import { packageOffers } from './wellness/packageOffers';
import { extraServicesPageData as extraServices } from './wellness/extraServices';

export const wellnessOffersData = {
  ...mainContent,
  signatureTreatments,
  holisticPrograms,
  wellnessWorkshops,
  culturalExperiences,
  packageOffers,
  extraServices,
};

// Adding this export to ensure other parts of the application that might use `wellnessData` directly
// don't break, assuming they expect the same structure as wellnessOffersData.
// If this alias is not needed elsewhere, it can be removed.
export const wellnessData = wellnessOffersData;