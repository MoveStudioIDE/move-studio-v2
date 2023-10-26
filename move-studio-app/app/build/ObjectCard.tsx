import { useWallet } from "@suiet/wallet-kit";
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


export default function ObjectCard(
  props: {
    objectId: string, 
    name: string
  }
) {

  const wallet = useWallet();

  const [objectDetails, setObjectDetails] = useState<{
    data: {
      content: {
        type: string,
        fields: {
          [key: string]: any
        }
      }, 
    }
  } | undefined>(undefined);

  useEffect(() => {
    fetchObjectDetails().then((data) => {
      console.log('data', data)
      setObjectDetails(data);
    });
  }, [props.objectId])

  const fetchObjectDetails = async () => {
    const response = await fetch(
      'http://localhost:80/object-details',
      {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({objectId: props.objectId, rpc: wallet.chain?.rpcUrl || ''})
      }
    );

    return await response.json();

  }

  if (objectDetails == undefined) {
    return (
      <div className="border rounded-xl h-[350px] w-[300px] flex flex-col items-center justify-start py-3 px-2">
        Loading...
      </div>
    )
  }

  return (
    <div className="border rounded-xl min-h-[350px] min-w-[300px] max-h-[350px] max-w-[300px] flex flex-col items-center justify-start py-2 px-4 shadow shadow-teal-500/75">
      <span className="font-mono text-xl">{props.name}</span>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <span className="font-mono text-sm text-teal-800 hover:text-teal-500">{`${props.objectId.slice(0, 6)}...${props.objectId.slice(-4)}`}</span>
          </TooltipTrigger>
          <TooltipContent className="font-mono bg-amber-500 text-amber-950">
            <p>{props.objectId}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="py-2 w-full">
        <div className="w-full flex flex-row items-center justify-between">
          <span>
            Type: 
          </span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <span className="font-mono text-teal-800 hover:text-teal-500 truncate max-w-[100px]">
                  {objectDetails.data.content.type.split(`${objectDetails.data.content.type.split('::')[0]}::${objectDetails.data.content.type.split('::')[1]}::`)}
                </span>
              </TooltipTrigger>
              <TooltipContent className="font-mono bg-amber-500 text-amber-950">
                <p>{objectDetails.data.content.type.split(`${objectDetails.data.content.type.split('::')[0]}::${objectDetails.data.content.type.split('::')[1]}::`)}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="w-full flex flex-row items-center justify-between">
          <span>
          Module: 
          </span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <span className="font-mono text-teal-800 hover:text-teal-500 truncate max-w-[100px]">
                  {objectDetails.data.content.type.split('::')[1]}
                </span>
              </TooltipTrigger>
              <TooltipContent className="font-mono bg-amber-500 text-amber-950">
                <p>{objectDetails.data.content.type.split('::')[1]}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="w-full flex flex-row items-center justify-between">
          <span>
            Package:  
          </span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <span className="font-mono text-teal-800 hover:text-teal-500">
                  {
                    `${objectDetails.data.content.type.split('::')[0]}`.length < 10 ?
                    `${objectDetails.data.content.type.split('::')[0]}`
                    : 
                    `${objectDetails.data.content.type.split('::')[0].slice(0, 10)}...${objectDetails.data.content.type.split('::')[0].slice(-4)}`
                  }
                </span>
              </TooltipTrigger>
              <TooltipContent className="font-mono bg-amber-500 text-amber-950">
                <p>{objectDetails.data.content.type.split('::')[0]}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center w-[75px]">Attribute</TableHead>
            <TableHead className="text-center w-[175px] ps-4">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="h-fit max-h-[200px] overflow-y-auto" >
          {
            Object.keys(objectDetails.data.content.fields).filter((attributeName) => attributeName != 'id').map((key) => {
              return (
                <TableRow>
                  <TableCell className="text-center max-w-[75px] truncate">{key}</TableCell>
                  
                  <TableCell className="font-mono text-center max-w-[175px] truncate ps-4 text-teal-800 hover:text-teal-500">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="text-center max-w-[175px] truncate">
                          {objectDetails.data.content.fields[key].toString()}
                        </TooltipTrigger>
                        <TooltipContent className="font-mono bg-amber-500 text-amber-950">
                          <p>{objectDetails.data.content.fields[key].toString()}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
      {/* {JSON.stringify(objectDetails)} */}
    </div>
  )
}