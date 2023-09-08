import Image from "next/image";

interface ShowImageTableProps {
  path: string;
}

export default function ShowImageTable({ path }: ShowImageTableProps) {
  console.log(path);
  return <Image src={path} alt={"alt"} width={150} height={150} />;
}
