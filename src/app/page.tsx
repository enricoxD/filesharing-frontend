import {Button} from "@/components/Button";
import {Analytics} from "@/components/landing/Analytics";

export default function Page() {

  return (
    <main>
      <section className={"hero-section is-flex-column"}>
        <h1 className={"title gradient-text"}>Filesharing</h1>
        <h2 className={"subtitle"}>Simple sharing, storing and managing</h2>
        <Button href={"/upload"} layout={"filled"}>
          <p>Start Uploading!</p>
        </Button>
      </section>

      <Analytics/>
    </main>
  )
}
