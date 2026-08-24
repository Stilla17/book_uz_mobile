import { tabsData } from "@/data/tabMenuData";
import { useAuthStore } from "@/store/useAuthStore";
import { router } from "expo-router";
import type { BottomTabBarProps } from "expo-router/js-tabs";
import { Pressable, Text, View } from "react-native";

const PRIMARY_COLOR = "#F87F0D";
const INACTIVE_COLOR = "#292929";

export default function CustomTabBar({
  state,
  navigation,
  insets,
}: BottomTabBarProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <View
      className="px-2"
      style={{
        position: "absolute",
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 100,
        backgroundColor: "transparent",
        paddingBottom: Math.max(insets.bottom, 8),
      }}
    >
      <View
        className="h-20 flex-row rounded-[30px] bg-white px-1"
        style={{
          overflow: "visible",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.12,
          shadowRadius: 14,
          elevation: 10,
        }}
      >
        {state.routes.map((route, index) => {
          const tab = tabsData.find((item) => item.name === route.name);

          if (!tab) return null;

          const focused = state.index === index;
          const isQrCode = route.name === "qrcode";
          const Icon = tab.icon;

          const onPress = () => {
            if (route.name === "profile" && !isAuthenticated) {
              router.push("/(auth)/auth");
              return;
            }

            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={focused ? { selected: true } : {}}
              onPress={onPress}
              onLongPress={onLongPress}
              className="h-20 flex-1 items-center justify-end pb-3"
            >
              {isQrCode ? (
                <>
                  <View
                    pointerEvents="none"
                    className="absolute -top-9 h-[76px] w-[76px] rounded-full"
                  />

                  <View
                    className="absolute -top-7 h-16 w-16 items-center justify-center rounded-full bg-brend"
                    style={{
                      shadowColor: PRIMARY_COLOR,
                      shadowOffset: {
                        width: 0,
                        height: 5,
                      },
                      shadowOpacity: 0.3,
                      shadowRadius: 8,
                      elevation: 10,
                    }}
                  >
                    <Icon color="white" size={32} strokeWidth={2.2} />
                  </View>
                </>
              ) : (
                <Icon
                  color={focused ? PRIMARY_COLOR : INACTIVE_COLOR}
                  size={27}
                  strokeWidth={focused ? 2.7 : 1.5}
                />
              )}

              <Text
                numberOfLines={1}
                className="mt-1 text-[10px] font-medium"
                style={{
                  color: focused && !isQrCode ? PRIMARY_COLOR : INACTIVE_COLOR,
                }}
              >
                {tab.title}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
