import Container from "@/components/Container";
import { View, Text } from "react-native";

const QRcode = () => {
  return (
    <Container>
      <View className="rounded-2xl bg-orange-100 p-4">
        <Text className="text-2xl font-bold">QR Code</Text>
      </View>
    </Container>
  );
};

export default QRcode;
