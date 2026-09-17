import { showAlert } from "@/store/useAlertStore";
import { LinearGradient } from "expo-linear-gradient";
import {
  BookOpen,
  Check,
  GripVertical,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react-native";
import { useCallback, useMemo, useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { runOnJS } from "react-native-worklets";

type Book = {
  id: string;
  title: string;
  shortTitle: string;
  author: string;
  color: string;
  accent: string;
  height: number;
  width: number;
};

type ShelvesState = Record<string, Book[]>;
type DragPayload = { bookId: string; fromShelf: string };
type ShelfMeta = { id: string; label: string };
type LayoutRect = { x: number; y: number; width: number; height: number };
type DropTarget = {
  shelfId: string;
  index: number;
  bookId?: string;
  side?: "left" | "right";
};

const initialShelves: ShelvesState = {
  shelf_1: [
    {
      id: "b1",
      title: "O‘tkan kunlar",
      shortTitle: "O‘TKAN\nKUNLAR",
      author: "A. Qodiriy",
      color: "#B13A32",
      accent: "#E9C989",
      height: 118,
      width: 54,
    },
    {
      id: "b2",
      title: "Mehrobdan chayon",
      shortTitle: "MEHROBDAN\nCHAYON",
      author: "A. Qodiriy",
      color: "#1E5E54",
      accent: "#D4B26C",
      height: 130,
      width: 57,
    },
    {
      id: "b3",
      title: "Kecha va kunduz",
      shortTitle: "KECHA VA\nKUNDUZ",
      author: "Cho‘lpon",
      color: "#263E68",
      accent: "#D8C59A",
      height: 112,
      width: 50,
    },
  ],
  shelf_2: [
    {
      id: "b4",
      title: "Ikki eshik orasi",
      shortTitle: "IKKI ESHIK\nORASI",
      author: "O‘. Hoshimov",
      color: "#815129",
      accent: "#F1D7A1",
      height: 126,
      width: 56,
    },
    {
      id: "b5",
      title: "Dunyoning ishlari",
      shortTitle: "DUNYONING\nISHLARI",
      author: "O‘. Hoshimov",
      color: "#6F384B",
      accent: "#E2B8B8",
      height: 116,
      width: 52,
    },
    {
      id: "b6",
      title: "Shum bola",
      shortTitle: "SHUM\nBOLA",
      author: "G‘. G‘ulom",
      color: "#315B78",
      accent: "#F0C96E",
      height: 108,
      width: 49,
    },
  ],
  shelf_3: [
    {
      id: "b7",
      title: "Yulduzli tunlar",
      shortTitle: "YULDUZLI\nTUNLAR",
      author: "P. Qodirov",
      color: "#4D3F70",
      accent: "#DCCB8D",
      height: 124,
      width: 55,
    },
  ],
};

const INITIAL_SHELVES: ShelfMeta[] = [
  { id: "shelf_1", label: "Sevimlilar" },
  { id: "shelf_2", label: "O‘qilmoqda" },
  { id: "shelf_3", label: "Keyinroq o‘qiyman" },
];

export default function LibraryScreen() {
  const [shelves, setShelves] = useState<ShelvesState>(initialShelves);
  const [shelfList, setShelfList] =
    useState<ShelfMeta[]>(INITIAL_SHELVES);
  const [draggedBookId, setDraggedBookId] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<DropTarget | null>(null);
  const [dragPosition, setDragPosition] = useState<{ x: number; y: number } | null>(
    null,
  );
  const shelfNodes = useRef<Record<string, View | null>>({});
  const bookNodes = useRef<Record<string, View | null>>({});
  const shelfRects = useRef<Record<string, LayoutRect>>({});
  const bookRects = useRef<Record<string, LayoutRect>>({});

  const refreshDropMeasurements = useCallback(() => {
    Object.entries(shelfNodes.current).forEach(([id, node]) => {
      node?.measureInWindow((x, y, width, height) => {
        shelfRects.current[id] = { x, y, width, height };
      });
    });
    Object.entries(bookNodes.current).forEach(([id, node]) => {
      node?.measureInWindow((x, y, width, height) => {
        bookRects.current[id] = { x, y, width, height };
      });
    });
  }, []);

  const findDropTarget = useCallback(
    (absoluteX: number, absoluteY: number, payload: DragPayload) => {
      const targetShelf = shelfList.find((shelf) => {
        const rect = shelfRects.current[shelf.id];
        return (
          rect &&
          absoluteX >= rect.x &&
          absoluteX <= rect.x + rect.width &&
          absoluteY >= rect.y &&
          absoluteY <= rect.y + rect.height
        );
      });

      if (!targetShelf) return null;

      const books = shelves[targetShelf.id] ?? [];
      const candidates = books
        .map((book, index) => ({ book, index, rect: bookRects.current[book.id] }))
        .filter(
          (candidate) =>
            candidate.book.id !== payload.bookId && candidate.rect !== undefined,
        );

      for (const candidate of candidates) {
        const rect = candidate.rect as LayoutRect;
        if (absoluteX < rect.x + rect.width / 2) {
          return {
            shelfId: targetShelf.id,
            index: candidate.index,
            bookId: candidate.book.id,
            side: "left" as const,
          };
        }
      }

      const last = candidates.at(-1);
      if (last) {
        return {
          shelfId: targetShelf.id,
          index: last.index + 1,
          bookId: last.book.id,
          side: "right" as const,
        };
      }

      return { shelfId: targetShelf.id, index: books.length };
    },
    [shelfList, shelves],
  );

  const beginDrag = useCallback(
    (payload: DragPayload) => {
      refreshDropMeasurements();
      setDraggedBookId(payload.bookId);
    },
    [refreshDropMeasurements],
  );

  const updateDrag = useCallback(
    (absoluteX: number, absoluteY: number, payload: DragPayload) => {
      setDragPosition({ x: absoluteX, y: absoluteY });
      const nextTarget = findDropTarget(absoluteX, absoluteY, payload);
      setDropTarget((current) => {
        if (
          current?.shelfId === nextTarget?.shelfId &&
          current?.index === nextTarget?.index &&
          current?.bookId === nextTarget?.bookId &&
          current?.side === nextTarget?.side
        ) {
          return current;
        }
        return nextTarget;
      });
    },
    [findDropTarget],
  );

  const finishDrag = useCallback(
    (absoluteX: number, absoluteY: number, payload: DragPayload) => {
      const target = findDropTarget(absoluteX, absoluteY, payload);
      if (target) {
        moveBook(payload.bookId, payload.fromShelf, target.shelfId, target.index);
      }
      setDraggedBookId(null);
      setDropTarget(null);
      setDragPosition(null);
    },
    [findDropTarget],
  );

  const cancelDrag = useCallback(() => {
    setDraggedBookId(null);
    setDropTarget(null);
    setDragPosition(null);
  }, []);

  const draggedBook = draggedBookId
    ? Object.values(shelves)
        .flat()
        .find((book) => book.id === draggedBookId)
    : undefined;

  const addShelf = () => {
    const id = `shelf_${Date.now()}`;
    setShelfList((current) => [
      ...current,
      { id, label: `Yangi javon ${current.length + 1}` },
    ]);
    setShelves((current) => ({ ...current, [id]: [] }));
  };

  const renameShelf = (shelfId: string, label: string) => {
    const cleanLabel = label.trim();
    if (!cleanLabel) return;
    setShelfList((current) =>
      current.map((shelf) =>
        shelf.id === shelfId ? { ...shelf, label: cleanLabel } : shelf,
      ),
    );
  };

  const requestDeleteShelf = (shelfId: string, label: string) => {
    if (shelfList.length === 1) {
      showAlert(
        "Javonni o‘chirib bo‘lmaydi",
        "Kutubxonada kamida bitta javon qolishi kerak.",
      );
      return;
    }

    if (shelves[shelfId].length > 0) {
      showAlert(
        "Javon bo‘sh emas",
        "Avval kitoblarni boshqa javonga ko‘chiring, keyin javonni o‘chiring.",
      );
      return;
    }

    showAlert(
      "Javonni o‘chirish",
      `“${label}” javonini o‘chirishni xohlaysizmi?`,
      [
        { text: "Bekor qilish", style: "cancel" },
        {
          text: "O‘chirish",
          style: "destructive",
          onPress: () => {
            delete shelfNodes.current[shelfId];
            delete shelfRects.current[shelfId];
            setShelfList((current) =>
              current.filter((shelf) => shelf.id !== shelfId),
            );
            setShelves((current) => {
              const next = { ...current };
              delete next[shelfId];
              return next;
            });
          },
        },
      ],
    );
  };

  const moveBook = (
    bookId: string,
    fromShelf: string,
    toShelf: string,
    requestedIndex: number,
  ) => {
    setShelves((current) => {
      const sourceIndex = current[fromShelf].findIndex(
        (book) => book.id === bookId,
      );
      if (sourceIndex < 0) return current;

      const next = Object.fromEntries(
        Object.entries(current).map(([id, books]) => [id, [...books]]),
      ) as ShelvesState;
      const [movedBook] = next[fromShelf].splice(sourceIndex, 1);

      let insertIndex = requestedIndex;
      if (fromShelf === toShelf && sourceIndex < requestedIndex) {
        insertIndex -= 1;
      }
      insertIndex = Math.max(0, Math.min(insertIndex, next[toShelf].length));
      next[toShelf].splice(insertIndex, 0, movedBook);
      return next;
    });
  };

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            onContentSizeChange={refreshDropMeasurements}
            onLayout={refreshDropMeasurements}
            scrollEnabled={draggedBookId === null}
            showsVerticalScrollIndicator={false}
            style={styles.scroll}
          >
            <View style={styles.header}>
              <View style={styles.headerIcon}>
                <BookOpen color="#F5DFC0" size={23} strokeWidth={1.8} />
              </View>
              <View style={styles.headerCopy}>
                <Text style={styles.eyebrow}>SHAXSIY KUTUBXONA</Text>
                <Text style={styles.title}>Mening javonim</Text>
                <Text style={styles.subtitle}>
                  Kitobni bosib turing, so‘ng kerakli joyga suring
                </Text>
              </View>
            </View>

            <View style={styles.cabinet}>
              <View style={styles.cabinetTop} />
              <View style={styles.cabinetInner}>
                {shelfList.map((shelf, index) => (
                  <Shelf
                    key={shelf.id}
                    shelfId={shelf.id}
                    label={shelf.label}
                    number={index + 1}
                    books={shelves[shelf.id]}
                    draggedBookId={draggedBookId}
                    dropTarget={dropTarget}
                    onDragStart={beginDrag}
                    onDragMove={updateDrag}
                    onDragEnd={finishDrag}
                    onDragCancel={cancelDrag}
                    onRename={renameShelf}
                    onDelete={requestDeleteShelf}
                    registerBookNode={(bookId, node) => {
                      bookNodes.current[bookId] = node;
                    }}
                    registerShelfNode={(node) => {
                      shelfNodes.current[shelf.id] = node;
                    }}
                    refreshMeasurements={refreshDropMeasurements}
                  />
                ))}
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Yangi javon qo‘shish"
                  onPress={addShelf}
                  style={({ pressed }) => [
                    styles.addShelfButton,
                    pressed && styles.addShelfButtonPressed,
                  ]}
                >
                  <View style={styles.addShelfIcon}>
                    <Plus color="#5B3823" size={19} strokeWidth={2.4} />
                  </View>
                  <View style={styles.addShelfCopy}>
                    <Text style={styles.addShelfTitle}>Yangi javon qo‘shish</Text>
                    <Text style={styles.addShelfSubtitle}>
                      Kitoblaringiz uchun yana bir bo‘lim yarating
                    </Text>
                  </View>
                </Pressable>
              </View>
              <View style={styles.cabinetBottom} />
            </View>

            <View style={styles.tip}>
              <GripVertical color="#94775A" size={17} />
              <Text style={styles.tipText}>
                Tartibni o‘zgartirish uchun kitobni 0.2 soniya bosib turing
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      {draggedBook && dragPosition && (
        <Animated.View
          entering={FadeIn.duration(80)}
          pointerEvents="none"
          style={[
            styles.dragOverlay,
            {
              left: dragPosition.x - draggedBook.width / 2,
              top: dragPosition.y - draggedBook.height / 2,
            },
          ]}
        >
          <BookVisual book={draggedBook} />
          <View style={styles.holdingBadge}>
            <GripVertical color="#3F291D" size={12} strokeWidth={2.5} />
            <Text style={styles.holdingBadgeText}>Joylashtiring</Text>
          </View>
        </Animated.View>
      )}
    </GestureHandlerRootView>
  );
}

function Shelf({
  shelfId,
  label,
  number,
  books,
  draggedBookId,
  dropTarget,
  onDragStart,
  onDragMove,
  onDragEnd,
  onDragCancel,
  onRename,
  onDelete,
  registerBookNode,
  registerShelfNode,
  refreshMeasurements,
}: {
  shelfId: string;
  label: string;
  number: number;
  books: Book[];
  draggedBookId: string | null;
  dropTarget: DropTarget | null;
  onDragStart: (payload: DragPayload) => void;
  onDragMove: (x: number, y: number, payload: DragPayload) => void;
  onDragEnd: (x: number, y: number, payload: DragPayload) => void;
  onDragCancel: () => void;
  onRename: (shelfId: string, label: string) => void;
  onDelete: (shelfId: string, label: string) => void;
  registerBookNode: (bookId: string, node: View | null) => void;
  registerShelfNode: (node: View | null) => void;
  refreshMeasurements: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftName, setDraftName] = useState(label);

  const startEditing = () => {
    setDraftName(label);
    setIsEditing(true);
  };

  const saveName = () => {
    if (!draftName.trim()) return;
    onRename(shelfId, draftName);
    setIsEditing(false);
  };

  const cancelEditing = () => {
    setDraftName(label);
    setIsEditing(false);
  };

  return (
    <Animated.View
      entering={FadeIn.duration(220)}
      exiting={FadeOut.duration(160)}
      layout={LinearTransition.springify().damping(18).stiffness(180)}
      style={[
        styles.shelfSection,
        draggedBookId !== null &&
          books.some((book) => book.id === draggedBookId) &&
          styles.shelfSectionDragging,
      ]}
    >
      <View style={styles.shelfHeading}>
        <Text style={styles.shelfNumber}>
          {String(number).padStart(2, "0")}
        </Text>
        {isEditing ? (
          <View style={styles.renameRow}>
            <TextInput
              autoFocus
              maxLength={30}
              onChangeText={setDraftName}
              onSubmitEditing={saveName}
              placeholder="Javon nomi"
              placeholderTextColor="#A68564"
              returnKeyType="done"
              selectTextOnFocus
              style={styles.renameInput}
              value={draftName}
            />
            <Pressable
              accessibilityLabel="Nomni saqlash"
              accessibilityRole="button"
              hitSlop={7}
              onPress={saveName}
              style={styles.renameAction}
            >
              <Check color="#F4D39F" size={15} strokeWidth={2.6} />
            </Pressable>
            <Pressable
              accessibilityLabel="Tahrirlashni bekor qilish"
              accessibilityRole="button"
              hitSlop={7}
              onPress={cancelEditing}
              style={styles.renameAction}
            >
              <X color="#C9A27D" size={15} strokeWidth={2.3} />
            </Pressable>
          </View>
        ) : (
          <>
            <Text numberOfLines={1} style={styles.shelfLabel}>
              {label}
            </Text>
            <Pressable
              accessibilityLabel={`${label} nomini o‘zgartirish`}
              accessibilityRole="button"
              hitSlop={8}
              onPress={startEditing}
              style={({ pressed }) => [
                styles.editNameButton,
                pressed && styles.editNameButtonPressed,
              ]}
            >
              <Pencil color="#D2AD84" size={12} strokeWidth={2.2} />
            </Pressable>
            <Pressable
              accessibilityLabel={`${label} javonini o‘chirish`}
              accessibilityRole="button"
              hitSlop={8}
              onPress={() => onDelete(shelfId, label)}
              style={({ pressed }) => [
                styles.deleteShelfButton,
                pressed && styles.deleteShelfButtonPressed,
              ]}
            >
              <Trash2 color="#D99A84" size={12} strokeWidth={2.2} />
            </Pressable>
          </>
        )}
        <View style={styles.headingLine} />
        <Text style={styles.bookCount}>{books.length} ta</Text>
      </View>

      <Animated.View
        ref={registerShelfNode}
        onLayout={refreshMeasurements}
        style={[
          styles.shelfDropZone,
          dropTarget?.shelfId === shelfId && styles.shelfReceiving,
          draggedBookId !== null &&
            dropTarget?.shelfId !== shelfId &&
            styles.shelfInactive,
        ]}
      >
        <LinearGradient
          colors={["#4A2D1E", "#68422B", "#3B2418"]}
          locations={[0, 0.52, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.shelfBack}
        >
          <View style={[styles.woodGrain, styles.woodGrainOne]} />
          <View style={[styles.woodGrain, styles.woodGrainTwo]} />
          <ScrollView
            contentContainerStyle={styles.booksRow}
            directionalLockEnabled
            horizontal
            nestedScrollEnabled
            onMomentumScrollEnd={refreshMeasurements}
            onScrollEndDrag={refreshMeasurements}
            removeClippedSubviews={false}
            scrollEnabled={draggedBookId === null}
            showsHorizontalScrollIndicator={false}
            style={styles.booksScroller}
          >
            {books.map((book) => (
              <BookSpine
                key={book.id}
                book={book}
                shelfId={shelfId}
                dropSide={
                  dropTarget?.bookId === book.id ? dropTarget.side ?? null : null
                }
                onDragStart={onDragStart}
                onDragMove={onDragMove}
                onDragEnd={onDragEnd}
                onDragCancel={onDragCancel}
                registerNode={(node) => registerBookNode(book.id, node)}
                refreshMeasurements={refreshMeasurements}
              />
            ))}
            {books.length === 0 && (
              <View style={styles.emptyShelf}>
                <BookOpen color="#C8A982" size={24} strokeWidth={1.5} />
                <Text style={styles.emptyTitle}>Bu javon bo‘sh</Text>
                <Text style={styles.emptyHint}>Kitobni shu yerga tashlang</Text>
              </View>
            )}
          </ScrollView>
        </LinearGradient>
        <LinearGradient
          colors={["#9A6339", "#5A351F", "#B47A48", "#6C4027"]}
          locations={[0, 0.32, 0.66, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.shelfPlank}
        >
          <View style={styles.plankShine} />
        </LinearGradient>
      </Animated.View>
    </Animated.View>
  );
}

function BookSpine({
  book,
  shelfId,
  dropSide,
  onDragStart,
  onDragMove,
  onDragEnd,
  onDragCancel,
  registerNode,
  refreshMeasurements,
}: {
  book: Book;
  shelfId: string;
  dropSide: "left" | "right" | null;
  onDragStart: (payload: DragPayload) => void;
  onDragMove: (x: number, y: number, payload: DragPayload) => void;
  onDragEnd: (x: number, y: number, payload: DragPayload) => void;
  onDragCancel: () => void;
  registerNode: (node: View | null) => void;
  refreshMeasurements: () => void;
}) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const active = useSharedValue(0);
  const payload = useMemo<DragPayload>(
    () => ({ bookId: book.id, fromShelf: shelfId }),
    [book.id, shelfId],
  );

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .activateAfterLongPress(200)
        .maxPointers(1)
        .onStart(() => {
          active.value = withTiming(1, { duration: 120 });
          runOnJS(onDragStart)(payload);
        })
        .onUpdate((event) => {
          translateX.value = event.translationX;
          translateY.value = event.translationY;
          runOnJS(onDragMove)(event.absoluteX, event.absoluteY, payload);
        })
        .onEnd((event) => {
          runOnJS(onDragEnd)(event.absoluteX, event.absoluteY, payload);
        })
        .onFinalize((_event, success) => {
          if (!success) runOnJS(onDragCancel)();
          active.value = withTiming(0, { duration: 120 });
          translateX.value = withSpring(0, { damping: 19, stiffness: 210 });
          translateY.value = withSpring(0, { damping: 19, stiffness: 210 });
        }),
    [
      active,
      onDragCancel,
      onDragEnd,
      onDragMove,
      onDragStart,
      payload,
      translateX,
      translateY,
    ],
  );

  const dragStyle = useAnimatedStyle(() => ({
    opacity: active.value ? 0.16 : 1,
    zIndex: active.value ? 1000 : 1,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: 1 + active.value * 0.09 },
      { rotateZ: `${active.value * -1.5}deg` },
    ],
  }));

  return (
    <Animated.View
      ref={registerNode}
      onLayout={refreshMeasurements}
      layout={LinearTransition.springify().damping(17).stiffness(190)}
      entering={FadeIn.duration(160)}
      exiting={FadeOut.duration(100)}
      style={styles.bookPositioner}
    >
      {dropSide !== null && (
        <Animated.View
          entering={ZoomIn.duration(140)}
          exiting={ZoomOut.duration(90)}
          pointerEvents="none"
          style={[
            styles.dropPreview,
            dropSide === "left" ? styles.dropPreviewLeft : styles.dropPreviewRight,
          ]}
        >
          <View style={styles.dropPreviewBook} />
          <View style={styles.dropPreviewGlow} />
        </Animated.View>
      )}
      {dropSide === "left" && (
        <Animated.View
          entering={FadeIn.duration(100)}
          exiting={FadeOut.duration(80)}
          style={styles.dropLineLeft}
        />
      )}
      {dropSide === "right" && (
        <Animated.View
          entering={FadeIn.duration(100)}
          exiting={FadeOut.duration(80)}
          style={styles.dropLineRight}
        />
      )}

      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.bookDrax, dragStyle]}>
          <BookVisual book={book} />
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
}

function BookVisual({ book }: { book: Book }) {
  return (
    <View
      accessibilityLabel={`${book.title}, ${book.author}`}
      style={[
        styles.book,
        {
          backgroundColor: book.color,
          borderColor: book.accent,
          height: book.height,
          width: book.width,
        },
      ]}
    >
      <View style={[styles.bookTopBand, { backgroundColor: book.accent }]} />
      <View style={styles.bookHighlight} />
      <Text numberOfLines={2} style={[styles.bookTitle, { color: book.accent }]}>
        {book.shortTitle}
      </Text>
      <View style={[styles.bookSeal, { borderColor: book.accent }]}>
        <Text style={[styles.bookSealText, { color: book.accent }]}>B</Text>
      </View>
      <Text
        numberOfLines={1}
        style={[styles.bookAuthor, { color: book.accent }]}
      >
        {book.author}
      </Text>
      <View style={[styles.bookBottomBand, { backgroundColor: book.accent }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F4ECDF" },
  safeArea: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 38 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 22,
  },
  headerIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
    marginRight: 13,
    borderRadius: 16,
    backgroundColor: "#3E281D",
    shadowColor: "#2A160E",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 9,
    elevation: 5,
  },
  headerCopy: { flex: 1 },
  eyebrow: {
    marginBottom: 2,
    color: "#A07953",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.6,
  },
  title: {
    color: "#342218",
    fontSize: 27,
    fontWeight: "800",
    letterSpacing: -0.7,
  },
  subtitle: { marginTop: 4, color: "#856E5A", fontSize: 12, lineHeight: 17 },
  cabinet: {
    marginHorizontal: 14,
    borderRadius: 9,
    backgroundColor: "#613B25",
    shadowColor: "#2F170C",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 18,
    elevation: 10,
  },
  cabinetTop: {
    height: 17,
    marginHorizontal: -5,
    marginTop: -2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomWidth: 3,
    borderBottomColor: "#422719",
    backgroundColor: "#8B5935",
  },
  cabinetInner: {
    paddingHorizontal: 10,
    backgroundColor: "#593522",
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderColor: "#75482C",
  },
  cabinetBottom: {
    height: 22,
    marginHorizontal: -5,
    marginBottom: -4,
    borderTopWidth: 3,
    borderTopColor: "#A06A40",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: "#6E4329",
  },
  addShelfButton: {
    minHeight: 66,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    marginBottom: 16,
    marginHorizontal: 5,
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "rgba(242, 207, 164, 0.38)",
    borderStyle: "dashed",
    borderRadius: 10,
    backgroundColor: "rgba(42, 23, 14, 0.25)",
  },
  addShelfButtonPressed: {
    transform: [{ scale: 0.985 }],
    borderColor: "#E4B878",
    backgroundColor: "rgba(242, 200, 140, 0.12)",
  },
  addShelfIcon: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
    borderRadius: 19,
    backgroundColor: "#EAC795",
    shadowColor: "#1B0D07",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 4,
  },
  addShelfCopy: { flex: 1 },
  addShelfTitle: { color: "#F4DFC0", fontSize: 12, fontWeight: "800" },
  addShelfSubtitle: { marginTop: 3, color: "#C19C78", fontSize: 9.5 },
  shelfSection: { position: "relative", zIndex: 1, paddingTop: 12 },
  shelfSectionDragging: { zIndex: 500 },
  shelfHeading: {
    flexDirection: "row",
    alignItems: "center",
    height: 26,
    paddingHorizontal: 5,
  },
  shelfNumber: {
    marginRight: 7,
    color: "#C99D70",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1,
  },
  shelfLabel: {
    maxWidth: 145,
    flexShrink: 1,
    color: "#F3DEBF",
    fontSize: 12,
    fontWeight: "700",
  },
  editNameButton: {
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 3,
    borderRadius: 8,
  },
  editNameButtonPressed: { backgroundColor: "rgba(244, 213, 173, 0.14)" },
  deleteShelfButton: {
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 1,
    borderRadius: 8,
  },
  deleteShelfButtonPressed: { backgroundColor: "rgba(218, 116, 91, 0.18)" },
  renameRow: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },
  renameInput: {
    width: 126,
    height: 27,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: "#C99B68",
    borderRadius: 7,
    color: "#FFF0D5",
    fontSize: 11,
    fontWeight: "700",
    backgroundColor: "rgba(31, 16, 9, 0.5)",
  },
  renameAction: {
    width: 24,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 2,
    borderRadius: 7,
    backgroundColor: "rgba(239, 204, 157, 0.1)",
  },
  headingLine: {
    flex: 1,
    height: 1,
    marginHorizontal: 9,
    backgroundColor: "rgba(240, 207, 165, 0.2)",
  },
  bookCount: { color: "#C8A37D", fontSize: 10, fontWeight: "600" },
  shelfDropZone: { minHeight: 171, borderRadius: 3 },
  shelfReceiving: {
    transform: [{ scale: 1.008 }],
    shadowColor: "#F2C477",
    shadowOpacity: 0.42,
    shadowRadius: 8,
  },
  shelfInactive: { opacity: 0.97 },
  shelfBack: {
    minHeight: 150,
    zIndex: 2,
    justifyContent: "flex-end",
    overflow: "visible",
    borderTopWidth: 1,
    borderTopColor: "#2E1A11",
  },
  booksScroller: {
    width: "100%",
    minHeight: 142,
  },
  woodGrain: {
    position: "absolute",
    height: 1,
    backgroundColor: "rgba(221, 166, 108, 0.11)",
  },
  woodGrainOne: { top: 42, left: 18, right: 38 },
  woodGrainTwo: { top: 96, left: 54, right: 12 },
  booksRow: {
    flexGrow: 1,
    minHeight: 142,
    flexDirection: "row",
    alignItems: "flex-end",
    paddingLeft: 13,
    paddingRight: 22,
  },
  shelfPlank: {
    height: 21,
    zIndex: 1,
    borderTopWidth: 2,
    borderTopColor: "#C18A56",
    borderBottomWidth: 5,
    borderBottomColor: "#3F2517",
  },
  plankShine: {
    height: 1,
    marginTop: 5,
    backgroundColor: "rgba(255, 225, 184, 0.18)",
  },
  emptyShelf: {
    flex: 1,
    minHeight: 140,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 4,
  },
  emptyTitle: {
    marginTop: 7,
    color: "#E2C29C",
    fontSize: 12,
    fontWeight: "700",
  },
  emptyHint: { marginTop: 2, color: "#A88464", fontSize: 10 },
  bookPositioner: {
    position: "relative",
    justifyContent: "flex-end",
    marginRight: 7,
  },
  bookDrax: { justifyContent: "flex-end", cursor: "pointer" as const },
  book: {
    position: "relative",
    overflow: "hidden",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 2,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
    shadowColor: "#190C06",
    shadowOffset: { width: 3, height: 1 },
    shadowOpacity: 0.45,
    shadowRadius: 3,
    elevation: 5,
  },
  bookTopBand: { width: "100%", height: 5, marginTop: 8, opacity: 0.88 },
  bookHighlight: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 5,
    width: 2,
    backgroundColor: "rgba(255,255,255,0.13)",
  },
  bookTitle: {
    width: "92%",
    marginTop: 10,
    paddingHorizontal: 2,
    textAlign: "center",
    fontSize: 8,
    fontWeight: "900",
    lineHeight: 11,
    letterSpacing: 0.35,
  },
  bookSeal: {
    width: 19,
    height: 19,
    marginTop: "auto",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
    opacity: 0.8,
  },
  bookSealText: { fontSize: 8, fontWeight: "900" },
  bookAuthor: {
    width: "90%",
    marginTop: 5,
    marginBottom: 6,
    textAlign: "center",
    fontSize: 6.5,
    fontWeight: "700",
  },
  bookBottomBand: { width: "100%", height: 5, opacity: 0.88 },
  dragOverlay: {
    position: "absolute",
    zIndex: 10000,
    transform: [{ scale: 1.09 }, { rotate: "-1.5deg" }],
    shadowColor: "#120904",
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.55,
    shadowRadius: 12,
    elevation: 30,
  },
  holdingBadge: {
    position: "absolute",
    top: -30,
    left: "50%",
    flexDirection: "row",
    alignItems: "center",
    width: 102,
    marginLeft: -51,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.7)",
    borderRadius: 14,
    backgroundColor: "#F7E7C8",
    shadowColor: "#1F1008",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  holdingBadgeText: {
    marginLeft: 3,
    color: "#3F291D",
    fontSize: 9,
    fontWeight: "800",
  },
  dropPreview: {
    position: "absolute",
    zIndex: 19,
    bottom: 2,
    width: 13,
    height: 112,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  dropPreviewLeft: { left: -10 },
  dropPreviewRight: { right: -3 },
  dropPreviewBook: {
    width: 10,
    height: 104,
    borderWidth: 1,
    borderColor: "#FFE1A3",
    borderRadius: 2,
    backgroundColor: "rgba(255, 210, 125, 0.25)",
  },
  dropPreviewGlow: {
    position: "absolute",
    right: 0,
    bottom: 0,
    left: 0,
    height: 25,
    borderRadius: 10,
    backgroundColor: "rgba(255, 196, 90, 0.2)",
  },
  dropLineLeft: {
    position: "absolute",
    zIndex: 20,
    top: 6,
    bottom: 2,
    left: -5,
    width: 3,
    borderRadius: 3,
    backgroundColor: "#FFD27D",
    shadowColor: "#FFD27D",
    shadowOpacity: 0.9,
    shadowRadius: 5,
  },
  dropLineRight: {
    position: "absolute",
    zIndex: 20,
    top: 6,
    right: 2,
    bottom: 2,
    width: 3,
    borderRadius: 3,
    backgroundColor: "#FFD27D",
    shadowColor: "#FFD27D",
    shadowOpacity: 0.9,
    shadowRadius: 5,
  },
  tip: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 24,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: "#DDCEBC",
    borderRadius: 20,
    backgroundColor: "#EEE3D5",
  },
  tipText: { marginLeft: 5, color: "#796451", fontSize: 10.5 },
});
