import { BlogItem } from "@/lib/db";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES } from "@/constants";

const ChangeCat = ({
  blog,
  handleCategoryChange,
}: {
  blog: BlogItem;
  handleCategoryChange: (id: string, value: string) => void;
}) => {
  return (
    <Select
      defaultValue={blog.category}
      disabled={blog.delete}
      onValueChange={(value) => handleCategoryChange(blog.id, value)}
    >
      <SelectTrigger className="w-48 h-7 border-none shadow-none">
        <SelectValue placeholder="选择分类" />
      </SelectTrigger>
      <SelectContent>
        {CATEGORIES.map((category) => (
          <SelectItem key={category} value={category}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ChangeCat;
