import Header from "@/components/Header";
import { Container } from "@mui/material";
import CategoryList from "./CategoryList";
import useAppQueryParams from "@/hooks/useAppQueryParams";
import SingleCategory from "./SingleCategory";
import CategoryEdit from "./CategoryEdit";

type Props = {};

export default function AdminPage({}: Props) {
  const [queryParams] = useAppQueryParams();

  return (
    <>
      <Header />

      <Container maxWidth="md" sx={{ py: 5 }}>
        {queryParams["category"] ? <SingleCategory /> : <CategoryList />}

        <CategoryEdit />
      </Container>
    </>
  );
}
