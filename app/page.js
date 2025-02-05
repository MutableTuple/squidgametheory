import Image from "next/image";
import Homepage from "./_components/Homepage";
import { getAllTheories } from "./_lib/data-service";

export const revalidate = 30;

export default async function Home() {
  const theories = await getAllTheories();
  const theory_count = theories.length || 0;
  return <Homepage theories={theories} theory_count={theory_count} />;
}
