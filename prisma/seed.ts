import { prisma } from "../src/lib/prisma.js";
import { seedAdmin } from "./seed/admin.seed.js";
import { seedCities } from "./seed/cities.seed.js";
import { seedSpecialities } from "./seed/specialities.seed.js";

async function main() {
  // await seedSpecialities();
  // await seedCities();
  await seedAdmin();
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });