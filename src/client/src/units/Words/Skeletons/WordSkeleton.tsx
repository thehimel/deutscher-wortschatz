import {Card, Divider, Skeleton} from "@nextui-org/react";
import {FC} from "react";

export interface WordSkeletonProps {
  isFull?: boolean;
}

const WordSkeleton: FC<WordSkeletonProps> = ({isFull}) => {
  return (
    <Card className="shadow-sm shadow-purple-500 dark:bg-zinc-800 space-y-5 p-4" radius="lg">
      <div className="flex justify-center">
        <Skeleton className="rounded-lg w-2/5 h-4 bg-default-300"/>
      </div>
      <div className="flex justify-center">
        <Skeleton className="rounded-lg w-1/5 h-4 bg-default-300"/>
      </div>
      {isFull &&
        <>
          <Divider/>
          <div className="flex justify-center">
            <Skeleton className="rounded-lg w-4/5 h-4 bg-default-300"/>
          </div>
        </>
      }
    </Card>
  );
}

export default WordSkeleton;
