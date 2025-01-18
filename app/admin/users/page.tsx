// NextAuth Version 4

// import { getServerSession } from "next-auth";

// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// NextAuth Version 5 (Beta 25)

import { auth } from "@/auth";

import { redirect } from "next/navigation";

import Auth from "@/components/Auth";

import AdimnMenu from "@/components/AdimnMenu";

import service from "@/utils/service";

import { User } from "@/interface/User";

import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Admin - Users",
  };
}

async function Users() {
  // NextAuth Version 4

  // const session = await getServerSession(authOptions);

  // NextAuth Version 5 (Beta 25)

  const session = await auth();

  if (!session?.user || !session?.user.isAdmin) redirect("/unauthorized");

  const users: User[] = await service.getUsersHandler();

  return (
    <Auth>
      <div className="grid grid-rows-[auto,1fr] gap-y-3 h-full">
        <AdimnMenu />
        <div>
          <h2 className="text-gray-800">Users</h2>
          <table className="my-2 w-full text-center text-sm text-white rounded-md overflow-hidden">
            <thead className="text-xs text-white uppercase bg-gray-700">
              <tr>
                <th className="px-8 py-3">Username</th>
                <th className="px-8 py-3">Email</th>
                <th className="px-8 py-3">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-gray-700 bg-gray-800 hover:bg-gray-600 transition-all"
                >
                  <td className="px-6 py-4">{item.username}</td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">{item.isAdmin.toString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Auth>
  );
}

export default Users;
