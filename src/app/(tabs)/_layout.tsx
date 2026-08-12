import CustomTabBar from "@/components/CustomTabBar";
import { tabsData } from "@/data/tabMenuData";
import { Tabs } from "expo-router/js-tabs";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      {tabsData.map(({ name, title }) => (
        <Tabs.Screen key={name} name={name} options={{ title }} />
      ))}
    </Tabs>
  );
}
