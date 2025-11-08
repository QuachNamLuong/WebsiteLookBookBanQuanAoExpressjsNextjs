import type { Size } from "../src/generated/prisma";
import prisma from "../src/lib/prisma";

async function main() {
  // 🧠 Example: Seed ProductSize table
  const sizes: Size[] = ["XS", "XXXL", "S", "M", "L", "XL", "XXL"];

  for (const size of sizes) {
    await prisma.productSize.upsert({
      where: { size },
      update: {},
      create: { size },
    });
  }

  console.log("✅ Seeded product sizes successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seed error:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
