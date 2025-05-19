import { heroData } from './heroData';
import { diningLoungesData } from './diningLoungesData';
import { wellnessRecreationData } from './wellnessRecreationData';
import { guestServicesData } from './guestServicesData';
import { contactSectionData } from './contactSectionData';

export const amenitiesPageData = {
  hero: heroData,
  categories: [
    diningLoungesData,
    wellnessRecreationData,
    guestServicesData,
  ],
  contactSection: contactSectionData,
};

export const getAmenityById = (categoryId, amenityId) => {
  const category = amenitiesPageData.categories.find(cat => cat.id === categoryId);
  if (category) {
    return category.amenities.find(amenity => amenity.id === amenityId);
  }
  return null;
};