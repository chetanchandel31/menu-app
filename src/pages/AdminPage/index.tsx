import Header from "@/components/Header";
import { Container } from "@mui/material";
import CategoryList from "./CategoryList";
import useAppQueryParams from "@/hooks/useAppQueryParams";
import SingleCategory from "./SingleCategory";
import CategoryEdit from "./CategoryEdit";
import { useCategories } from "@/providers/CategoriesProvider/useCategories";
import NotFound from "../NotFound";

type Props = {};

export default function AdminPage({}: Props) {
  const [queryParams] = useAppQueryParams();
  const { categories } = useCategories();
  const category = categories.find(
    (category) => category.categoryName === queryParams["category"]
  );

  let pageContent: React.ReactNode;
  if (!queryParams["category"]) {
    pageContent = <CategoryList />;
  } else if (!category) {
    pageContent = <NotFound />;
  } else {
    pageContent = <SingleCategory category={category} />;
  }

  return (
    <>
      <Header />

      <Container maxWidth="md" sx={{ py: 5 }}>
        {pageContent}

        <CategoryEdit />
      </Container>
    </>
  );
}
