import {prisma} from "../../src/lib/prisma.js";
import { CITIES ,type Governorate} from "../../src/utils/constants.js";



export async function seedCities() {
  const data = (Object.keys(CITIES) as Governorate[]).flatMap((governorate) =>
    CITIES[governorate].map(([nameAr, nameEn]) => ({
      governorate,
      nameAr,
      nameEn,
    })),
  );
 
  const result = await prisma.city.createMany({
    data,
    skipDuplicates: true, 
  });
 
  console.log(`Added ${result.count} cities out of ${data.length}`);
}
