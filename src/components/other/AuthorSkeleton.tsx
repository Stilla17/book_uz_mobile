import { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";

export default function AuthorSkeleton() {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => animation.stop();
  }, [opacity]);

  return (
    <View className="w-[140px] items-center rounded-2xl bg-white p-4">
      <Animated.View
        className="h-[88px] w-[88px] rounded-full bg-slate-200"
        style={{ opacity }}
      />

      <Animated.View
        className="mt-3 h-4 w-full rounded-md bg-slate-200"
        style={{ opacity }}
      />

      <Animated.View
        className="mt-2 h-3 w-2/3 rounded-md bg-slate-200"
        style={{ opacity }}
      />
    </View>
  );
}
