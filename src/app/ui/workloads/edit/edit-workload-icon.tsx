"use client"

import { memo } from "react"
import Link from "next/link";
import { PencilSquareIcon } from "@heroicons/react/24/solid";


const EditWorkloadIcon = memo( ( {id, heightClass} : {id: number|string, heightClass: string}) => {
  return (
    <Link
      href={`/workloads/edit/${id}`}
      className={`${heightClass} mx-1`}
    >
      < PencilSquareIcon className="h-full text-blue-600" />
    </Link>
  );
});

export default EditWorkloadIcon;
