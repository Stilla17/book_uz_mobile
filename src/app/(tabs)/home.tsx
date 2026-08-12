import Container from "@/components/Container";
import CustomTitle from "@/components/CustomTitle";
import BookSection from "@/components/sections/BookSection";
import CarouselSection from "@/components/sections/CarouselSection";
import Categories from "@/components/sections/Categories";
import Navbar from "@/components/sections/Navbar";
import SearchInput from "@/components/sections/SearchInput";
import { Image } from "expo-image";
import { StatusBar, StyleSheet, View } from "react-native";

const HomeScreen = () => {
  return (
    <View className="flex-1">
      <View className="w-full flex-1">
        <Image
          source={require("../../../assets/images/bg.png")}
          contentFit="contain"
          contentPosition="top"
          style={StyleSheet.absoluteFill}
        />
        <StatusBar barStyle={"light-content"} />
        <Container fixedHeader={<Navbar />}>
          <SearchInput />
          <CarouselSection />

          <Categories />

          <CustomTitle title="Yangi kitoblar" path="/library" />

          <BookSection />

          <CustomTitle title="Mashhur kitoblar" path="/library" />

          <BookSection />
        </Container>
      </View>
    </View>
  );
};

export default HomeScreen;
