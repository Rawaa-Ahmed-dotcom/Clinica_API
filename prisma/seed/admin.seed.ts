import bcrypt from "bcrypt";
import { prisma } from "../../src/lib/prisma.js";
import { hashPassword } from "../../src/utils/hashing.js";
import { ParseStatus } from "zod";
import "dotenv/config";

export async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  const phone = process.env.ADMIN_PHONE?.trim();

  if (!email || !password || !phone) {
    throw new Error(
      "ADMIN_EMAIL, ADMIN_PASSWORD and ADMIN_PHONE must be set in .env",
    );
  }

  // seedCities() must run before seedAdmin()
  const city = await prisma.city.findFirstOrThrow({
    where: { governorate: "CAIRO" },
  });

  const hashedPassword = await hashPassword(password);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: hashedPassword,
      first_name: "Admin",
      last_name: "Clinica",
      phone,
      address: "Clinica HQ",
      governorate: city.governorate,
      city_id: city.id,
      role: "ADMIN",
      status: "ACTIVE",
    },
  });

  console.log(`Seeded admin: ${email}`);
}
