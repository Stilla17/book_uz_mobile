import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export default function CategorySkeleton() {
  const opacity = useRef(new Animated.Value(0.45)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.45,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return Array.from({ length: 4 }).map((_, index) => (
    <Animated.View
      key={index}
      style={{ opacity }}
      className="h-[92px] w-[100px] rounded-2xl bg-[#E5E7EB]"
    />
  ));
}
