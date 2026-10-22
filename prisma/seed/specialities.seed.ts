import { prisma } from "../../src/lib/prisma.js";

const specialities = [
  { name: "Cardiology", description: "Heart and blood vessel diseases" },
  { name: "Dermatology", description: "Skin, hair and nail conditions" },
  { name: "Neurology", description: "Brain, spinal cord and nervous system disorders" },
  { name: "Pediatrics", description: "Medical care for infants, children and adolescents" },
  { name: "Orthopedics", description: "Bones, joints, muscles and ligaments" },
  { name: "Ophthalmology", description: "Eye and vision care" },
  { name: "ENT", description: "Ear, nose and throat disorders" },
  { name: "Gynecology", description: "Women's reproductive health" },
  { name: "Psychiatry", description: "Mental health and behavioral disorders" },
  { name: "Urology", description: "Urinary tract and male reproductive system" },
  { name: "Gastroenterology", description: "Digestive system and liver diseases" },
  { name: "Endocrinology", description: "Hormonal and metabolic disorders such as diabetes" },
  { name: "Dentistry", description: "Teeth, gums and oral health" },
  { name: "General Surgery", description: "Surgical treatment of a wide range of conditions" },
  { name: "Internal Medicine", description: "Diagnosis and treatment of adult diseases" },
];

export async function seedSpecialities() {
  for (const speciality of specialities) {
    const name = speciality.name.trim().toLowerCase();

    await prisma.speciality.upsert({
      where: { name },
      update: { description: speciality.description },
      create: { name, description: speciality.description },
    });
  }
  console.log(`Seeded ${specialities.length} specialities`);
}
