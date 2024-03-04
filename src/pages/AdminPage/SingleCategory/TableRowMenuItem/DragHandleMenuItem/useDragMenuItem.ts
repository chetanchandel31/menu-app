import useAppQueryParams from "@/hooks/useAppQueryParams";
import { useDraggableItem } from "@/hooks/useDraggableItem";
import { useCategories } from "@/providers/CategoriesProvider/useCategories";

type Params = {
  menuItemIndex: number;
};

export default function useDragMenuItem({ menuItemIndex }: Params) {
  const [queryParams] = useAppQueryParams();
  const { dispatch } = useCategories();

  const draggableItem = useDraggableItem({
    dragItem: {
      type: "menu-items",
      index: menuItemIndex,
    },
    moveItem: (fromIndex, toIndex) => {
      dispatch({
        type: "MOVE-MENU-ITEMS",
        payload: {
          categoryName: queryParams["category"] || "",
          fromIndex,
          toIndex,
        },
      });
    },
  });

  return draggableItem;
}
