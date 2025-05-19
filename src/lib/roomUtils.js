import { supabase } from '@/lib/supabaseClient';
import { getAllRoomsStaticData as getAllStatic, getRoomBySlug } from '@/data/roomDetailsStaticData';

const isValidImageUrl = (url) => {
  return url && typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://'));
};
const placeholderImage = "https://i.postimg.cc/Fs7Gf0b2/placeholder-room.webp";

const enrichRoomData = (dbRooms) => {
  const allStaticRooms = getAllStatic();
  const enrichedData = (dbRooms || []).map(dbRoom => {
    const staticDetails = getRoomBySlug(dbRoom.slug);
    
    if (!staticDetails) {
      console.warn(`Static details not found for slug: ${dbRoom.slug}. Using DB data only.`);
      return {
        ...dbRoom,
        images: dbRoom.images && dbRoom.images.length > 0 ? dbRoom.images.map(img => isValidImageUrl(img) ? img : placeholderImage) : [placeholderImage],
        amenities: dbRoom.amenities || [],
        description: dbRoom.description || "No description available.",
        shortDescription: dbRoom.description ? dbRoom.description.substring(0, 100) + "..." : "No description available.",
        capacity: dbRoom.capacity || "N/A",
        sqm: "N/A",
        view: "N/A",
        price_per_night: dbRoom.price_per_night || 0,
        basePrice: dbRoom.price_per_night || 0,
        displayPriceVND: dbRoom.price_per_night ? `${dbRoom.price_per_night.toLocaleString('vi-VN')} VND` : null,
      };
    }

    return {
      ...staticDetails, 
      id: dbRoom.id || staticDetails.id,
      name: dbRoom.name || staticDetails.name,
      description: dbRoom.description || staticDetails.description,
      shortDescription: staticDetails.shortDescription || (dbRoom.description ? dbRoom.description.substring(0,150) + "..." : staticDetails.description.substring(0,150) + "..."),
      price_per_night: dbRoom.price_per_night !== undefined && dbRoom.price_per_night !== null ? dbRoom.price_per_night : staticDetails.basePrice,
      basePrice: dbRoom.price_per_night !== undefined && dbRoom.price_per_night !== null ? dbRoom.price_per_night : staticDetails.basePrice,
      displayPriceVND: staticDetails.displayPriceVND,
      capacity: dbRoom.capacity || staticDetails.capacity,
      sqm: staticDetails.sqm,
      view: staticDetails.view,
      images: (dbRoom.images && dbRoom.images.length > 0 ? dbRoom.images : staticDetails.images).map(img => isValidImageUrl(img) ? img : placeholderImage),
      amenities: (dbRoom.amenities && dbRoom.amenities.length > 0 ? dbRoom.amenities.map(a => typeof a === 'object' ? a.label : a) : staticDetails.amenities.map(a => a.label)),
      slug: dbRoom.slug || staticDetails.slug,
    };
  });

  const allStaticRoomsNotInDb = allStaticRooms.filter(staticRoom => 
    !enrichedData.find(enrichedRoom => enrichedRoom.slug === staticRoom.slug)
  ).map(staticRoom => ({
      ...staticRoom,
      price_per_night: staticRoom.basePrice,
      displayPriceVND: staticRoom.displayPriceVND,
      amenities: staticRoom.amenities.map(a => a.label),
      images: (staticRoom.images && staticRoom.images.length > 0 ? staticRoom.images : [placeholderImage]).map(img => isValidImageUrl(img) ? img : placeholderImage),
      shortDescription: staticRoom.shortDescription || staticRoom.description.substring(0,150) + "...",
  }));

  return [...enrichedData, ...allStaticRoomsNotInDb].sort((a, b) => (a.basePrice || 0) - (b.basePrice || 0));
};

export const fetchAndEnrichRooms = async (forceStatic = false) => {
  const allStaticRooms = getAllStatic();
  if (forceStatic) {
    return allStaticRooms.map(room => ({
        ...room,
        price_per_night: room.basePrice,
        displayPriceVND: room.displayPriceVND,
        amenities: room.amenities.map(a => a.label),
        images: (room.images && room.images.length > 0 ? room.images : [placeholderImage]).map(img => isValidImageUrl(img) ? img : placeholderImage),
        shortDescription: room.shortDescription || room.description.substring(0,150) + "...",
    }));
  }

  try {
    const { data: dbRooms, error: dbError } = await supabase
      .from("rooms")
      .select("id, name, description, price_per_night, capacity, images, amenities, slug")
      .order("price_per_night", { ascending: true });

    if (dbError) throw dbError;
    
    return enrichRoomData(dbRooms);
  } catch (err) {
    console.error("Error fetching rooms from Supabase, falling back to static:", err);
    return allStaticRooms.map(room => ({
        ...room,
        price_per_night: room.basePrice,
        displayPriceVND: room.displayPriceVND,
        amenities: room.amenities.map(a => a.label),
        images: (room.images && room.images.length > 0 ? room.images : [placeholderImage]).map(img => isValidImageUrl(img) ? img : placeholderImage),
        shortDescription: room.shortDescription || room.description.substring(0,150) + "...",
    }));
  }
};