import { Button } from "~/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/Dialog";
import { Input } from "~/components/ui/Input";
import { Label } from "~/components/ui/Label";
import { Quality, type Kind } from "~/utils/types";
import { SelectQuality } from "./SelectQuality";
import { useState } from "react";
import { api } from "~/utils/api";
import { ButtonLoading } from "./ui/ButtonLoading";

type AddEntryDialogProps = {
  kind: Kind;
};

const INITIAL_STATE = {
  name: "",
  duration: null,
  quality: Quality.Ok,
};

export const AddEntryDialog = ({ kind }: AddEntryDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(INITIAL_STATE.name);
  const [duration, setDuration] = useState<string | null>(
    INITIAL_STATE.duration
  );
  const [quality, setQuality] = useState(INITIAL_STATE.quality);

  const apiContext = api.useContext();

  const { mutate: insert, isLoading } = api.entry.insert.useMutation({
    onSuccess: async () => {
      setName(INITIAL_STATE.name);
      setDuration(INITIAL_STATE.duration);
      setQuality(INITIAL_STATE.quality);
      await apiContext.entry.get.invalidate({ Kind: kind });
      setIsOpen(false);
    },
  });

  const handleSubmit = () => {
    insert({
      name,
      duration,
      quality,
      kind,
    });
  };

  return (
    <Dialog
      defaultOpen={false}
      open={isOpen}
      onOpenChange={(state) => setIsOpen(state)}
    >
      <DialogTrigger asChild>
        {isLoading ? (
          <ButtonLoading />
        ) : (
          <Button variant="outline" onClick={() => setIsOpen(true)}>
            Add new {kind} record
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new {kind} record</DialogTitle>
          <DialogDescription>
            Click save when you{"'"}re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name*
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="duration" className="text-right">
              Duration
            </Label>
            <Input
              id="duration"
              value={duration ?? ""}
              onChange={(e) => setDuration(e.currentTarget.value)}
              type="number"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quality" className="text-right">
              Quality*
            </Label>
            <SelectQuality value={quality} onChange={(q) => setQuality(q)} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
