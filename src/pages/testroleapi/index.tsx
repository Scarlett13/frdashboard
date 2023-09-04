import Button from "@/components/button";
import Card from "@/components/card";
import DropDownRole from "@/components/selectrole";
import { provideRequestOptions } from "@/libs/api";
import { Role } from "@/type/role";
import { useState } from "react";

export default function apiRoleTest() {
  const [listRole, setListRole] = useState<any>();

  async function Role(
    url: string,
    method: string,
    params?: string,
    body?: string
  ) {
    const request = provideRequestOptions({ path: url, method });

    try {
      fetch(request)
        .then((res) => res.json())
        .then((roleApi) => {
          setListRole(roleApi);
          console.log(roleApi);
        });
    } catch (error) {
      console.log(error);
      setListRole(error);
    }
  }
  return (
    <div>
      <div>
        <Button buttonname={"GET"} onClick={() => Role("/role", "GET")} />
        <Button buttonname={"LIST"} onClick={() => Role("/role", "GET")} />
      </div>
      <div>
        {listRole &&
          listRole.map((listrole: Role, index: number) => (
            <Card key={listrole.RoleName}>
              <div>
                <p>Index</p>
                <p>Role ID</p>
                <p>Role Name</p>
              </div>
              <div>
                <p>: {listrole.id}</p>
                <p>: {listrole.RoleName}</p>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
}
