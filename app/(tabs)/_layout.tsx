import { WardrobeProvider } from "@/context/WardrobeContext";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <WardrobeProvider>
      <Tabs />
    </WardrobeProvider>
  );
}
