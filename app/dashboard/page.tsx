import ButtonAccount from "@/components/ButtonAccount";

export const dynamic = "force-dynamic";

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default async function Dashboard() {
  return (
    <main className="min-h-screen pt-16">
      <header className="fixed top-0 left-0 right-0 bg-white z-10 p-4 flex justify-end shadow-md">
        <ButtonAccount />
      </header>
      <section className="max-w-full mx-auto space-y-8 p-8 ">
        <h1 className="text-3xl md:text-4xl font-extrabold h-[1080px] bg-pink-300">
          Private Page
        </h1>
      </section>
    </main>
  );
}
