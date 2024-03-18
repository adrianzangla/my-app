import { useSession } from "next-auth/react";

export default async function Index() {
  const { data: session, status } = useSession();

  let email;
  if (status === "authenticated")
    email = session.user ? session.user.email : "Guest";

  return (
    <main>
      <h1 className="text-4xl font-bold text-center mt-10 mb-6">
        Welcome to My App
      </h1>
      <p className="text-center">Signed in as {email}</p>
    </main>
  );
}
