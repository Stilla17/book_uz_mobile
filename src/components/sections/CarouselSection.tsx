import { carouselData } from "@/data/carouselData";
import { Image, useWindowDimensions, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Carousel } from "react-native-reanimated-carousel";

const CAROUSEL_HEIGHT = 180;

export default function CarouselSection() {
  const { width } = useWindowDimensions();
  const carouselWidth = width - 32;
  return (
    <GestureHandlerRootView
      style={{
        width: carouselWidth,
        height: CAROUSEL_HEIGHT,
        marginTop: 20,
      }}
    >
      <Carousel
        style={{
          width: carouselWidth,
          height: CAROUSEL_HEIGHT,
        }}
        itemSize={carouselWidth}
        data={carouselData}
        autoplay={true}
        loop={true}
        renderItem={({ item }) => (
          <View
            style={{
              width: carouselWidth,
              height: CAROUSEL_HEIGHT,
            }}
          >
            <Image
              source={item}
              resizeMode="cover"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 16,
              }}
            />
          </View>
        )}
      />
    </GestureHandlerRootView>
  );
}
