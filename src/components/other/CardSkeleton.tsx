import { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  type DimensionValue,
  type ViewStyle,
  View,
} from "react-native";

type SkeletonBlockProps = {
  width: DimensionValue;
  height: number;
  borderRadius: number;
  opacity: Animated.Value;
};

function SkeletonBlock({
  width,
  height,
  borderRadius,
  opacity,
}: SkeletonBlockProps) {
  const style: Animated.WithAnimatedValue<ViewStyle> = {
    width,
    height,
    borderRadius,
    backgroundColor: "#E5E7EB",
    opacity,
  };

  return <Animated.View style={style} />;
}

export default function CardSkeleton() {
  const opacity = useRef(new Animated.Value(0.45)).current;

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
          toValue: 0.45,
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
    <View className="w-[180px] rounded-[24px] bg-white p-4">
      <SkeletonBlock
        width="100%"
        height={220}
        borderRadius={16}
        opacity={opacity}
      />

      <View className="mt-3 gap-2">
        <SkeletonBlock
          width="100%"
          height={18}
          borderRadius={6}
          opacity={opacity}
        />

        <SkeletonBlock
          width="65%"
          height={14}
          borderRadius={6}
          opacity={opacity}
        />

        <View className="mt-2 flex-row justify-between">
          <SkeletonBlock
            width={55}
            height={14}
            borderRadius={6}
            opacity={opacity}
          />

          <SkeletonBlock
            width={40}
            height={14}
            borderRadius={6}
            opacity={opacity}
          />
        </View>
      </View>
    </View>
  );
}
