import Container from "@/components/Container";
import CustomTitle from "@/components/CustomTitle";
import AuthorSection from "@/components/sections/AuthorSection";
import CarouselSection from "@/components/sections/CarouselSection";
import Categories from "@/components/sections/Categories";
import Navbar from "@/components/sections/Navbar";
import NewBookSection from "@/components/sections/NewBookSection";
import PublisherSection from "@/components/sections/PublisherSection";
import SearchInput from "@/components/sections/SearchInput";
import ViewBookSection from "@/components/sections/ViewBookSection";
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

          <NewBookSection />

          <CustomTitle title="Mashhur kitoblar" path="/library" />

          <ViewBookSection />

          <CustomTitle title="Nashryotlar" path="/library" />
          <PublisherSection />

          <CustomTitle title="Mualliflar" path="/library" />
          <AuthorSection />
        </Container>
      </View>
    </View>
  );
};

export default HomeScreen;
