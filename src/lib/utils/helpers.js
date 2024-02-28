const downloadURL = (data, fileName) => {
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