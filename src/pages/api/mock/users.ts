import { NextApiRequest, NextApiResponse } from "next";

export type User = {
  id: number;
  name: string;
  email: string;
  country: string;
};

const users: User[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@mail.com`,
  country: ["Indonesia", "Malaysia", "Singapore"][
    Math.floor(Math.random() * 3)
  ],
}));

export default function getUsers(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const pageSize = +(req.query.page_size as string) || 5;
    const pageNumber = +(req.query.page as string);
    const sort = req.query.sort as keyof User;
    const type = req.query.type as "asc" | "desc";
    const keyword = req.query.keyword as string;
    const country = req.query.country as string[];

    let serialized_items: User[];

    serialized_items = keyword
      ? users.filter(
          (user) => user.name.toUpperCase().indexOf(keyword.toUpperCase()) > -1
        )
      : users;

    serialized_items =
      country?.length > 0
        ? serialized_items.filter((user) => country.includes(user.country))
        : serialized_items;

    serialized_items = sort
      ? type === "asc"
        ? serialized_items.sort((a, b) => (a[sort] > b[sort] ? 1 : -1))
        : serialized_items.sort((a, b) => (a[sort] > b[sort] ? -1 : 1))
      : serialized_items;

    const lastPage = Math.ceil(serialized_items.length / pageSize);

    serialized_items =
      pageSize && pageNumber
        ? serialized_items.slice(
            (pageNumber - 1) * pageSize,
            pageNumber * pageSize
          )
        : serialized_items;

    return setTimeout(
      () =>
        res.status(200).json({
          code: 200,
          status: "OK",
          serialized_items,
          total_page: lastPage,
          total: serialized_items.length,
        }),
      1000
    );
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
