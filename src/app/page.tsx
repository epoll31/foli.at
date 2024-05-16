export default async function Home() {
  return (
    <>
      <h2 className="text-4xl text-center">Build Your Portfolio Now!</h2>
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
