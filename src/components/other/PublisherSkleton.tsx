import { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";

export default function PublisherSkeleton() {
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
    <View className="w-[280px] flex-row items-center gap-3 rounded-2xl bg-white p-3">
      <Animated.View
        className="h-20 w-20 rounded-xl bg-slate-200"
        style={{ opacity }}
      />

      <View className="flex-1 gap-3">
        <Animated.View
          className="h-5 w-full rounded-md bg-slate-200"
          style={{ opacity }}
        />

        <Animated.View
          className="h-4 w-2/3 rounded-md bg-slate-200"
          style={{ opacity }}
        />
      </View>
    </View>
  );
}
