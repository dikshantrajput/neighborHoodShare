import {dataTypes} from "$lib/utils/constants";
import { format } from 'date-fns';

export const downloadURL = (data, fileName) => {
    const a = document.createElement("a");
    a.href = data;
    a.download = fileName;
    document.body.appendChild(a);
    a.style.display = "none";
    a.click();
    a.remove();
};

export const downloadBlob = (data, fileName, mimeType) => {
    const blob = new Blob([data], { type: mimeType });
    const url = URL.createObjectURL(blob);
    downloadURL(url, fileName);
    setTimeout(() => {
        URL.revokeObjectURL(url);
    }, 1000);
};

export const combineUint8Arrays = (arrays) => {
    // Get the total length of all arrays.
    let length = 0;
    const a = arrays.map((item) => {
        if(item instanceof ArrayBuffer){
            item = new Uint8Array(item)
        }
        return item;
    });

    a.forEach((item)=>{
        length += item.length
    })

    // Create a new array with total length and merge all source arrays.
    let mergedArray = new Uint8Array(length);
    let offset = 0;
    a.forEach((item) => {
        mergedArray.set(item, offset);
        offset += item.length;
    });
    return mergedArray;
}

export function* chunkGenerator(buffer, chunkSize) {
    let startPointer = 0;
    const end = buffer.byteLength;

    while (startPointer < end) {
        const newStartPointer = Math.min(startPointer + chunkSize, end);
        const chunk = buffer.slice(startPointer, newStartPointer);
        yield chunk;
        startPointer = newStartPointer;
    }
}

export const prepareMessages = (messages, currentUserId) => {
    return messages?.map((message, index) => ({
        id: index,
        sender: message?.peerId === currentUserId ? "me" : "friend",
        content: message?.message,
        file: message?.type === dataTypes.file ? {name: message?.fileName, url: message?.file} : undefined,
        createdAt: message?.createdAt
    }))
}

// Function to format current time date in the desired format
export const formatCurrentDateTime = () => {
  const now = new Date();
  const formattedDate = format(now, "do MMM hh:mm a");
  
  // Convert 'st', 'nd', 'rd', 'th' for day
  const day = formattedDate.substring(0, 2);
  let suffix = 'th';
  if (day.endsWith('1') && !day.endsWith('11')) {
    suffix = 'st';
  } else if (day.endsWith('2') && !day.endsWith('12')) {
    suffix = 'nd';
  } else if (day.endsWith('3') && !day.endsWith('13')) {
    suffix = 'rd';
  }

  return formattedDate.replace(/(\d+)(st|nd|rd|th)/, `$1${suffix}`);
}

export const bufferToObjectURL = (buffer) => {
    const blob = new Blob([buffer]);

    const objectURL = URL.createObjectURL(blob);

    return objectURL;
}
