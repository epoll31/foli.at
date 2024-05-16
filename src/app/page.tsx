import { auth } from "@/auth";
import getUserId from "@/utils/actions/getUserId";

export default async function Home() {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) {
    return <p className="text-center">You are not authenticated.</p>;
  }
  const userId = await getUserId(email);
  console.log("User ID:", userId);
  return (
    <>
      <h2 className="text-4xl text-center">Build Your Portfolio Now!</h2>
      <p className="text-center">User ID: {userId ? userId : "null"}</p>
    </>
  );
}

// export default function Home() {
//   const [userId, setUserId] = useState("");
//   getUserId()
//     .then((data) => {
//       console.log("User ID:", data);
//       setUserId(data.id);
//     })
//     .catch((error) => {
//       console.error("Failed to fetch user ID:", error);
//       setUserId(error.message);
//     });
//   return (
//     <>
//       <h2 className="text-4xl text-center">Build Your Portfolio Now!</h2>
//       <p className="text-center">User ID: {userId}</p>
//     </>
//   );
// }
