export const BUSINESS_INFO = {
  name: "Rose Browsz",
  clinicName: "Rose Browsz & Beauty Academy",
  legalName: "Rose Browsz LLC",
  tagline: "Roseville's Premier PMU Brow Studio & Beauty Academy — Nano Brows, Ombré Powder, Lip Blush & Professional Artist Certifications",
  address: {
    street: "973 Pleasant Grove Blvd, Suite #130",
    city: "Roseville",
    state: "CA",
    zip: "95678",
    fullZip: "95678-7612",
    county: "Placer County",
    formatted: "973 Pleasant Grove Blvd, Suite #130, Roseville, CA 95678",
  },
  phone: "(916) 626-2076",
  email: "jesiker90@yahoo.com",
  instagram: "https://www.instagram.com/rose.browsz/",
  instagramHandle: "@rose.browsz",
  followersCount: "8,855+",
  postsCount: "382+",
  bookingUrl: "#/services",
  googleMapsLink: "https://www.google.com/maps/search/?api=1&query=Rose+Browsz+973+Pleasant+Grove+Blvd+Suite+130+Roseville+CA+95678",
  googleMapsEmbedUrl: "https://maps.google.com/maps?q=973%20Pleasant%20Grove%20Blvd%20Suite%20130%2C%20Roseville%2C%20CA%2095678&t=&z=15&ie=UTF8&iwloc=&output=embed",

  hours: [
    { day: "Monday", open: "Closed", close: "Closed", hours: "Closed", note: "Private Academy & 1-on-1 Apprenticeships" },
    { day: "Tuesday", open: "9:00 AM", close: "4:00 PM", hours: "9:00 AM – 4:00 PM", note: "Nano Brows & Lip Blush Appointments" },
    { day: "Wednesday", open: "9:00 AM", close: "4:00 PM", hours: "9:00 AM – 4:00 PM", note: "Ombré Powder Brows & Touch-Ups" },
    { day: "Thursday", open: "9:00 AM", close: "4:00 PM", hours: "9:00 AM – 4:00 PM", note: "Nano Combo Brows & Consultations" },
    { day: "Friday", open: "9:00 AM", close: "4:00 PM", hours: "9:00 AM – 4:00 PM", note: "Client Rejuvenations & Permanent Jewelry" },
    { day: "Saturday", open: "9:00 AM", close: "4:00 PM", hours: "9:00 AM – 4:00 PM", note: "Weekend PMU Services (By Appt)" },
    { day: "Sunday", open: "Closed", close: "Closed", hours: "Closed", note: "Masterclasses & Academy Training" },
  ],

  history: [
    {
      year: "2017",
      title: "Artistic Foundations & Passion for PMU",
      description: "Jess launched her permanent makeup journey with extensive clinical certifications, determined to bring hyper-realistic eyebrow transformations and natural aesthetic finishes to Northern California."
    },
    {
      year: "2020",
      title: "Pioneering Machine Nano Hairstrokes in Roseville",
      description: "Transitioned from traditional microblading to advanced rotary machine Nano Brows and gentle Ombré Powder shading, creating longer-lasting results with minimal epidermal trauma for all skin types."
    },
    {
      year: "2024",
      title: "Li Pigments Global PRO Artist Recognition",
      description: "Awarded prestigious ambassadorship as an official Li Pigments Global PRO Artist for 2024 & 2025, validating precision color theory, pigment retention mastery, and industry leadership."
    },
    {
      year: "Present",
      title: "Rose Browsz & Beauty Academy",
      description: "Roseville's leading destination for permanent cosmetics, having served over 1,500+ happy clients while mentoring and certifying dozens of aspiring PMU artists in hands-on masterclasses."
    }
  ],

  owner: {
    name: "Jessica (Jess)",
    role: "Founder, Master PMU Brow Artist & Educator",
    credentials: "Li Pigments Global PRO 2024 & 2025 • Bloodborne Pathogens Certified • Licensed PMU Master Educator",
    experience: "7+ Years Experience • 8.8K+ Followers • 1,500+ Client Transformations",
    quote: "Brows are the architectural foundation of the face. My signature machine nano strokes and velvet powder techniques are custom-mapped to each client's unique facial anatomy—giving you effortless, wake-up-and-go beauty that heals softly and lasts."
  },

  reviews: [
    {
      author: "Brianna M.",
      location: "Roseville, CA",
      city: "Roseville, CA",
      source: "Instagram / Google Review",
      rating: 5,
      stars: 5,
      date: "Verified PMU Client",
      comment: "Jess is a TRUE artist! I got nano combo brows done and they look so natural everyone thinks I was just born with perfect arches. Zero pain, clean studio, and she maps everything out so meticulously. Worth every single penny!",
      text: "Jess is a TRUE artist! I got nano combo brows done and they look so natural everyone thinks I was just born with perfect arches. Zero pain, clean studio, and she maps everything out so meticulously. Worth every single penny!"
    },
    {
      author: "Samantha K.",
      location: "Sacramento, CA",
      city: "Sacramento, CA",
      source: "Google Review",
      rating: 5,
      stars: 5,
      date: "Verified PMU Client",
      comment: "Drove 45 minutes from Sacramento because Jess is the only artist I trust with my face. Being a Li Pigments Pro artist really shows in her color mixing—my ombré powder brows healed the exact warm neutral shade I wanted with no graying!",
      text: "Drove 45 minutes from Sacramento because Jess is the only artist I trust with my face. Being a Li Pigments Pro artist really shows in her color mixing—my ombré powder brows healed the exact warm neutral shade I wanted with no graying!"
    },
    {
      author: "Alyssa R.",
      location: "Rocklin, CA",
      city: "Rocklin, CA",
      source: "Academy Graduate Review",
      rating: 5,
      stars: 5,
      date: "Certified PMU Student",
      comment: "Took Jess's PMU Brow Academy certification course and it was life changing! The student kit was packed with premium machine tools and Li Pigments, and she provided live model supervision. I gained the confidence to launch my own business!",
      text: "Took Jess's PMU Brow Academy certification course and it was life changing! The student kit was packed with premium machine tools and Li Pigments, and she provided live model supervision. I gained the confidence to launch my own business!"
    }
  ]
};

export const isOpenNow = () => {
  const now = new Date();
  const day = now.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
  const hour = now.getHours();

  if (day === 0 || day === 1) return false; // Sun, Mon Closed
  // Tuesday - Saturday: 9:00 AM - 4:00 PM
  return hour >= 9 && hour < 16;
};
