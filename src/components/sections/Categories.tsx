import { iconMap } from "@/data/categoryData";
import { useCategories } from "@/hooks/queries/useCategory";
import { CategoryItem } from "@/types/categories.types";
import { BookOpen, LayoutGrid } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import CategorySkeleton from "../other/CategorySkeleton";

export default function Categories() {
  const { data, isLoading } = useCategories();
  const categories: CategoryItem[] = data?.data ?? [];

  return (
    <View className="-mx-4 mt-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 16 }}
      >
        {isLoading ? (
          <CategorySkeleton />
        ) : (
          <>
            <Pressable
              className={`h-[92px] w-[100px] items-center bg-white justify-center overflow-hidden rounded-2xl px-3 py-3 `}
            >
              <LayoutGrid color="#FF7300" size={24} strokeWidth={2} />

              <Text className={`mt-2 text-center text-[12px] font-semibold `}>
                Barcha janrlar
              </Text>
            </Pressable>
            {categories.map(({ id, title }, index) => {
              const isActive = index === 0;
              const Icon = iconMap[title.uz] ?? BookOpen;

              return (
                <Pressable
                  key={id ?? index}
                  className={`h-[92px] w-[100px] items-center bg-white justify-center overflow-hidden rounded-2xl px-3 py-3 `}
                >
                  <Icon color="#FF7300" size={24} strokeWidth={2} />

                  <Text
                    numberOfLines={2}
                    adjustsFontSizeToFit
                    minimumFontScale={0.85}
                    className={`mt-2 min-h-[32px] w-full text-center text-[#272727] text-[12px] font-semibold leading-[16px]`}
                  >
                    {title.uz}
                  </Text>
                </Pressable>
              );
            })}
          </>
        )}
      </ScrollView>
    </View>
  );
}
