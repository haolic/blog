import { TableCell } from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { ListRestart, Trash2 } from "lucide-react";
import { BlogItem } from "@/lib/db";

const ActionButtons = ({
  blog,
  handleDelete,
  handleRestore,
}: {
  blog: BlogItem;
  handleDelete: (id: string) => void;
  handleRestore: (id: string) => void;
}) => {
  return (
    <TableCell>
      {blog.delete ? (
        <AlertDialog>
          <AlertDialogTrigger className="text-green-500">
            <ListRestart size={18} />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>确定要恢复这篇博客吗？</AlertDialogTitle>
              <AlertDialogDescription>
                恢复后将可以正常展示在文章列表中。
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>取消</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleRestore(blog.id)}>
                恢复
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <AlertDialog>
          <AlertDialogTrigger className="text-red-500">
            <Trash2 size={18} />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>确定要删除这篇博客吗？</AlertDialogTitle>
              <AlertDialogDescription>
                删除后将不展示在博客列表中。
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>取消</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDelete(blog.id)}>
                删除
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </TableCell>
  );
};

export default ActionButtons;
