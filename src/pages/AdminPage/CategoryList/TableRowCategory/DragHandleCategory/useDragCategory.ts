import { useDraggableItem } from "@/hooks/useDraggableItem";
import { useCategories } from "@/providers/CategoriesProvider/useCategories";

type Params = {
  categoryIndex: number;
};

export default function useDragCategory({ categoryIndex }: Params) {
  const { dispatch } = useCategories();

  const draggableItem = useDraggableItem({
    dragItem: {
      type: "categories",
      index: categoryIndex,
    },
    moveItem: (fromIndex, toIndex) => {
      dispatch({ type: "MOVE-CATEGORIES", payload: { fromIndex, toIndex } });
    },
  });

  return draggableItem;
}
