import { AgentContextProvider } from "@/context/agent/agentProvider";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Theme appearance="dark">
          <AgentContextProvider>
            {children} 
          </AgentContextProvider>
        </Theme>
      </body>
    </html>
  );
}
