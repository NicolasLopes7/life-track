import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/Table";
import type { Kind, Quality } from "~/utils/types";
import { api } from "~/utils/api";
import { QualityBadge } from "./QualityBadge";
import { AddEntryDialog } from "./AddEntryDialog";

type EntryTableProps = {
  kind: Kind;
};

export const EntryTable = ({ kind }: EntryTableProps) => {
  const { data } = api.entry.get.useQuery({ Kind: kind });

  if (!data) return null;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead className="w-[100px]">Quality</TableHead>
          <TableHead className="w-[100px]">Duration</TableHead>
          <TableHead className="w-[100px]">Created At</TableHead>
          <TableHead className="w-[100px]">
            <AddEntryDialog kind={kind} />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((entry) => (
          <TableRow key={entry.id}>
            <TableCell className="font-medium">{entry.name}</TableCell>
            <TableCell>
              <QualityBadge quality={entry.quality as Quality} />
            </TableCell>
            <TableCell>{entry.duration ?? "-"}</TableCell>
            <TableCell>
              {`${new Date(entry.createdAt).toLocaleDateString()} ${new Date(
                entry.createdAt
              ).toLocaleTimeString()}`}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
