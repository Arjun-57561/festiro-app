import { redirect } from "next/navigation"

export default function HomePage() {
  // Redirect to chat assistant as the default landing page
  redirect("/chat-assistant")
}
