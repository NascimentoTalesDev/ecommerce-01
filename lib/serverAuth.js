import { User } from "@/models/User";
import { getSession } from "next-auth/react";

const serverAuth = async (req) => {
  const session = await getSession({ req });
  console.log({session});

  if (!session?.user?.email) {
    throw new Error('Not signed in');
  }

  const currentUser = await User.findOne({email: session.user.email});
  console.log("CURRENT", currentUser);
  if (!currentUser) {
    throw new Error('Not signed in');
  }

  return { currentUser };
}

export default serverAuth;